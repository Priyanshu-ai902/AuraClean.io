import { FileListContext } from '@/app/_context/FilesListContext'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import moment from 'moment';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import { Archive, MoreHorizontal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';


export interface FILE {
    archive: boolean,
    createdBy: string,
    document: string,
    fileName: string,
    teamId: string,
    whiteboard: string,
    _id: string,
    _creationTime: number
}

function FileList() {


    const { fileList_, setFileList_ } = useContext(FileListContext);
    const [fileList, setFileList] = useState<any>();

    const { user }: any = useKindeBrowserClient();

    const router = useRouter();
    useEffect(() => {
        fileList_ && setFileList(fileList_);
        
    }, [fileList_])


    return (
        <div>
            <div className="overflow-x-auto  px-20 ">
                <table className="min-w-full divide-y-2 divide-gray-200  text-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <td className="whitespace-nowrap px-4 py-2 text-xl text-gray-200">File Name</td>
                            <td className="whitespace-nowrap px-4 py-2 text-xl text-gray-200">Created At</td>
                            <td className="whitespace-nowrap px-4 py-2 text-xl text-gray-200">Edited</td>
                            <td className="whitespace-nowrap px-4 py-2 text-xl text-gray-200">Author</td>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {fileList && fileList.map((file: FILE, index: number) => (
                            <tr
                                key={file._id} 
                                className="cursor-pointer text-white"
                                onClick={() => router.push('/workspace/' + file._id)}
                            >
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-200">{file.fileName}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-200">{moment(file._creationTime).format('DD MMM YYYY')}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-200">{moment(file._creationTime).format('DD MMM YYYY')}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-200">
                                    <Image src={user?.picture} alt='user' width={30} height={30} className='rounded-full' />
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-200">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger><MoreHorizontal /></DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem className='gap-3'><Archive className='h-4 w-4' />Archive</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default FileList
