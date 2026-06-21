"use client"

import { FileListContext } from '@/app/_context/FilesListContext';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import { MoreVertical, FileText, Trash2, ExternalLink, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
export interface FILE {
  archive: boolean;
  createdBy: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: number;
}

function FileList() {
  const { 
    fileList_, 
    refreshFiles 
  } = useContext(FileListContext);
  
  const router = useRouter();
  const deleteFileMutation = useMutation(api.files.deleteFile);

  const handleDeleteFile = async (fileId: string) => {
    try {
      await deleteFileMutation({ _id: fileId as any });
      await refreshFiles();
      toast('Diagram deleted successfully');
    } catch (error) {
      toast('Error deleting diagram');
    }
  };

  const filteredFileList = fileList_ || [];

  // Center empty state if NO files exist in this workspace/filter combination
  if (!fileList_ || fileList_.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-6 shadow-inner">
          <FileText className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">No diagrams yet</h2>
        <p className="text-zinc-400 text-sm mt-2 max-w-xs">
          Create your first diagram to get started.
        </p>
      </div>
    );
  }



  return (
    <div className="px-8 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredFileList.map((file: FILE) => (
          <div
            key={file._id}
            onClick={() => router.push('/workspace/' + file._id)}
            className="group relative bg-zinc-900 border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all duration-200 cursor-pointer flex flex-col justify-between h-44 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-lg bg-violet-600/10 text-violet-400 flex items-center justify-center border border-violet-500/10">
                <FileText className="h-5 w-5" />
              </div>

              {/* Three-dot Action Menu */}
              <div onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger className="p-1 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 focus:outline-none transition">
                    <MoreVertical className="h-4.5 w-4.5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-zinc-900 border border-zinc-800 text-zinc-300">
                    <DropdownMenuItem
                      className="gap-2.5 cursor-pointer hover:bg-zinc-800 hover:text-white"
                      onClick={() => router.push('/workspace/' + file._id)}
                    >
                      <ExternalLink className="h-4 w-4" /> Open Workspace
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="gap-2.5 cursor-pointer text-red-400 hover:bg-red-950/20 hover:text-red-300"
                      onClick={() => handleDeleteFile(file._id)}
                    >
                      <Trash2 className="h-4 w-4" /> Delete Diagram
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Bottom Card Title and Relative Time */}
            <div className="space-y-1.5 mt-auto">
              <h3 className="font-semibold text-zinc-100 text-[15px] leading-snug group-hover:text-violet-400 transition-colors line-clamp-1">
                {file.fileName}
              </h3>
              <p className="text-[11px] text-zinc-500 font-medium">
                Updated {moment(file._creationTime).fromNow()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileList;
