"use client"

import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex, useMutation } from 'convex/react';
import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import FileList from './_components/FileList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileListContext } from '@/app/_context/FilesListContext';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

function Dashboard() {
  const convex = useConvex();
  const { user }: any = useKindeBrowserClient();
  const createUser = useMutation(api.user.createUser);
  const { onFileCreate } = useContext(FileListContext);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [diagramName, setDiagramName] = useState('');

  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

  const checkUser = async () => {
    try {
      const result = await convex.query(api.user.getUser, { email: user?.email });
      if (!result?.length) {
        await createUser({
          name: user.given_name || 'Guest User',
          email: user.email,
          image: user.picture || ''
        });
      }
    } catch (error) {
      console.error('Error verifying user:', error);
    }
  };

  const handleCreate = async () => {
    if (!diagramName.trim()) return;
    const fileId = await onFileCreate(diagramName);
    if (fileId) {
      setIsOpen(false);
      setDiagramName('');
      router.push(`/workspace/${fileId}`);
    }
  };

  return (
    <div className="bg-zinc-950 min-h-screen pb-16 flex flex-col pt-12">

      <div className="max-w-7xl w-full mx-auto px-8 space-y-8 flex-1">
        
        {/* Workspace Title & Welcome */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/60 pb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              i am back to complete Diagrams
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Create, view, and manage your whiteboards and documents.
            </p>
          </div>
        </div>

        {/* Dashboard Card: Create New Diagram (Keep Only This) */}
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-900/50 border border-zinc-800 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-md">
          <div className="space-y-1">
            <h3 className="font-semibold text-white text-base">New Diagram</h3>
            <p className="text-zinc-400 text-sm max-w-xl">
              Start a new design draft. Use the diagram board to sketch system designs, process flows, or wireframes with markdown documents side-by-side.
            </p>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-violet-600 hover:bg-violet-700 text-white font-medium shadow-md shadow-violet-900/20 gap-2 shrink-0 self-start sm:self-auto">
                <Plus className="h-4 w-4" /> Create New Diagram
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-sm">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold text-white tracking-tight">Create New Diagram</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <Input
                  placeholder="Diagram Name"
                  value={diagramName}
                  onChange={(e) => setDiagramName(e.target.value)}
                  className="bg-zinc-950 border-zinc-800 text-white focus-visible:ring-violet-500 focus-visible:ring-offset-0"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCreate();
                  }}
                  autoFocus
                />
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white hover:!bg-zinc-800 hover:!text-white transition-all duration-200"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  onClick={handleCreate}
                  disabled={!diagramName.trim()}
                  className="bg-violet-600 hover:bg-violet-700 text-white font-medium"
                >
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Diagrams List Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Workspace Files
            </h3>
          </div>
          
          <div className="bg-zinc-900/20 border border-zinc-800/50 rounded-2xl">
            <FileList />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;