"use client"

import React, { useContext, useState } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useRouter } from 'next/navigation';
import { Search, Plus } from 'lucide-react';
import Image from 'next/image';
import { FileListContext } from '@/app/_context/FilesListContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

function Header() {
  const { user }: any = useKindeBrowserClient();
  const { searchQuery, setSearchQuery, onFileCreate } = useContext(FileListContext);
  const [isOpen, setIsOpen] = useState(false);
  const [diagramName, setDiagramName] = useState('');
  const router = useRouter();

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
    <div className="flex items-center justify-between px-8 py-5 bg-zinc-950 border-b border-zinc-800/80 sticky top-0 z-20 backdrop-blur-md bg-zinc-950/80">
      
      {/* Search Input (Dynamic) */}
      <div className="flex items-center gap-2.5 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 w-80 focus-within:border-zinc-700 focus-within:ring-1 focus-within:ring-zinc-700 transition duration-150">
        <Search className="h-4 w-4 text-zinc-500 shrink-0" />
        <input
          type="text"
          placeholder="Search diagrams..."
          value={searchQuery || ''}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent outline-none text-zinc-200 text-sm placeholder-zinc-500 w-full"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')} 
            className="text-zinc-500 hover:text-zinc-300 text-xs font-semibold shrink-0"
          >
            Clear
          </button>
        )}
      </div>

      {/* Profile & Action Button */}
      <div className="flex items-center gap-4">
        {user && (
          <div className="flex items-center shrink-0">
            {user.picture ? (
              <Image 
                src={user.picture} 
                alt="user avatar" 
                width={32} 
                height={32} 
                className="rounded-full border border-zinc-800 shadow-inner" 
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center font-semibold text-xs border border-zinc-700 uppercase">
                {user.given_name?.substring(0, 2) || "U"}
              </div>
            )}
          </div>
        )}

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-violet-600 hover:bg-violet-700 text-white font-medium shadow-md shadow-violet-900/20 gap-2 border border-violet-500/20">
              <Plus className="h-4 w-4" /> New Diagram
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-white tracking-tight">Create New Diagram</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Input
                placeholder="Diagram Name (e.g. System Architecture)"
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

    </div>
  );
}

export default Header;
