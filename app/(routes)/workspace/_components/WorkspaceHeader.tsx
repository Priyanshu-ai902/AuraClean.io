"use client";

import { Save, ChevronLeft, FileText, Columns, Layout, Library, Loader2 } from "lucide-react";
import React from "react";
import Link from "next/link";

interface WorkspaceHeaderProps {
  fileName: string;
  onSave: () => void;
  view: "document" | "canvas" | "both";
  setView: (view: "document" | "canvas" | "both") => void;
  isRightSidebarOpen: boolean;
  setIsRightSidebarOpen: (open: boolean) => void;
  isSaving?: boolean;
}

function WorkspaceHeader({
  fileName,
  onSave,
  view,
  setView,
  isRightSidebarOpen,
  setIsRightSidebarOpen,
  isSaving,
}: WorkspaceHeaderProps) {
  return (
    <div className="h-[56px] border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md px-4 flex justify-between items-center sticky top-0 z-30 select-none">
      {/* Left: Home link, Logo & File Name */}
      <div className="flex items-center gap-3 md:gap-4 min-w-0">
        <Link
          href="/dashboard"
          className="flex items-center gap-1 text-zinc-400 hover:text-zinc-200 transition-all duration-200 shrink-0"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="text-xs font-semibold hidden md:inline">Dashboard</span>
        </Link>

        <div className="h-4 w-px bg-zinc-800 shrink-0"></div>

        <div className="flex items-center gap-2 shrink-0">
          <img
            src="https://static.vecteezy.com/system/resources/previews/016/012/682/non_2x/eraser-creative-icon-design-free-vector.jpg"
            alt="PixErase Logo"
            className="w-6 h-6 rounded-full border border-zinc-800"
          />
          <span className="font-bold text-sm tracking-tight hidden sm:inline-block">
            <span className="text-teal-500">Pix</span>
            <span className="text-zinc-300">Erase</span>
          </span>
        </div>

        <div className="h-4 w-px bg-zinc-800 shrink-0"></div>

        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 uppercase shrink-0">
            File
          </span>
          <span className="text-xs md:text-sm font-medium text-zinc-200 truncate max-w-[100px] sm:max-w-[150px] md:max-w-[200px]">
            {fileName || "Untitled Document"}
          </span>
        </div>
      </div>

      {/* Center: Segmented Controls for Editor Modes */}
      <div className="flex items-center bg-zinc-900/80 border border-zinc-850 p-0.5 rounded-lg shrink-0">
        <button
          onClick={() => setView("document")}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
            view === "document"
              ? "bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/50"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
          title="Document View"
        >
          <FileText className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Document</span>
        </button>
        <button
          onClick={() => setView("both")}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
            view === "both"
              ? "bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/50"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
          title="Split View"
        >
          <Columns className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Split</span>
        </button>
        <button
          onClick={() => setView("canvas")}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
            view === "canvas"
              ? "bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/50"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
          title="Canvas View"
        >
          <Layout className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Canvas</span>
        </button>
      </div>

      {/* Right: Save & Library Actions */}
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-violet-500/20 shadow-md shadow-violet-950/20 hover:shadow-violet-900/30 transition-all duration-200 disabled:opacity-60"
        >
          {isSaving ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Save className="h-3.5 w-3.5" />
          )}
          <span>Save</span>
        </button>

        <div className="h-4 w-px bg-zinc-800"></div>

        <button
          onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
          className={`p-1.5 rounded-lg border transition-all duration-200 ${
            isRightSidebarOpen
              ? "bg-zinc-800 border-zinc-700 text-zinc-100"
              : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
          }`}
          title="Library & Templates"
        >
          <Library className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default WorkspaceHeader;
