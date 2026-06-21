"use client"

import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex, useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SideNav from './_components/SideNav';
import { FileListContext } from '@/app/_context/FilesListContext';
import { toast } from 'sonner';

export interface Team {
    createdBy: string;
    teamName: string;
    _id: string;
}

function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const convex = useConvex();
    const { user }: any = useKindeBrowserClient();
    const router = useRouter();

    const [teamList, setTeamList] = useState<Team[]>([]);
    const [activeTeam, setActiveTeam] = useState<Team>();
    const [fileList, setFileList] = useState<any[]>([]);

    useEffect(() => {
        if (user) {
            checkTeam();
        }
    }, [user]);

    const checkTeam = async () => {
        try {
            const result = await convex.query(api.teams.getTeam, { email: user?.email });
            if (!result?.length) {
                router.push('/teams/create');
            } else {
                setTeamList(result);
                setActiveTeam(result[0]);
            }
        } catch (error) {
            console.error('Error fetching teams:', error);
        }
    };

    useEffect(() => {
        if (activeTeam) {
            refreshFiles();
        }
    }, [activeTeam]);

    const refreshFiles = async () => {
        if (!activeTeam) return;
        try {
            const result = await convex.query(api.files.getFiles, {
                teamId: activeTeam._id,
            });
            setFileList(result || []);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    const createFile = useMutation(api.files.createFile);
    const onFileCreate = async (fileName: string) => {
        if (!activeTeam) {
            toast('No active team selected');
            return;
        }
        try {
            const resp = await createFile({
                fileName,
                teamId: activeTeam._id,
                createdBy: user?.email || undefined,
                archive: false,
                document: '',
                whiteboard: '',
            });
            if (resp) {
                await refreshFiles();
                toast('Diagram created successfully!');
                return resp;
            }
        } catch (e) {
            toast('Error while creating file');
        }
    };

    return (
        <div className="bg-zinc-950 min-h-screen text-zinc-100 antialiased">
            <FileListContext.Provider value={{
                fileList_ : fileList,
                setFileList_ : setFileList,
                activeTeam,
                setActiveTeam,
                teamList,
                setTeamList,
                onFileCreate,
                refreshFiles,
                totalFiles: fileList.length
            }}>
                <div className="flex">
                    <aside className="w-64 border-r border-zinc-800 h-screen fixed top-0 left-0 bg-zinc-900/50 backdrop-blur-md z-30">
                        <SideNav />
                    </aside>
                    <main className="flex-1 ml-64 min-h-screen bg-zinc-950">
                        {children}
                    </main>
                </div>
            </FileListContext.Provider>
        </div>
    );
}

export default DashboardLayout;
