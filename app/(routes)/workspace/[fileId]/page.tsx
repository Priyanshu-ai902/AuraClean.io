"use client";

import React, { useEffect, useState } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import Editor from "../_components/Editor";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FILE } from "../../dashboard/_components/FileList";
import Canvas from "../_components/Canvas";
import { Button } from "@/components/ui/button";

function Workspace({ params }: any) {
  const [triggerSave, setTriggerSave] = useState(false);
  const [view, setView] = useState<"document" | "canvas" | "both">("both");
  const convex = useConvex();
  const [fileData, setFileData] = useState<FILE | any>();

  useEffect(() => {
    if (params.fileId) getFileData();
  }, []);

  const getFileData = async () => {
    const result = await convex.query(api.files.getFilesById, { _id: params.fileId });
    setFileData(result);
  };

  return (
    <div className="bg-black text-white h-screen">
      {/* Header */}
      <WorkspaceHeader onSave={() => setTriggerSave(!triggerSave)} />

      {/* View Toggle Buttons */}
      <div className="flex justify-center gap-2 py-4">
        <Button variant={view === "document" ? "default" : "default"} onClick={() => setView("document")}>
          Document
        </Button>
        <Button variant={view === "both" ? "default" : "default"} onClick={() => setView("both")}>
          Both
        </Button>
        <Button variant={view === "canvas" ? "default" : "default"} onClick={() => setView("canvas")}>
          Canvas
        </Button>
      </div>

      {/* Dynamic Content Based on Selected View */}
      <div className="text-black font-bold h-screen">
        {view === "document" && (
          <div className="font-bold bg-slate-400 h-screen">
            <Editor onSaveTrigger={triggerSave} fileId={params.fileId} fileData={fileData} />
          </div>
        )}

        {view === "canvas" && (
          <div className="border-l h-screen">
            <Canvas onSaveTrigger={triggerSave} fileId={params.fileId} fileData={fileData} />
          </div>
        )}

        {view === "both" && (
          <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
            <div className="font-bold bg-slate-400">
              <Editor onSaveTrigger={triggerSave} fileId={params.fileId} fileData={fileData} />
            </div>
            <div className="border-l">
              <Canvas onSaveTrigger={triggerSave} fileId={params.fileId} fileData={fileData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Workspace;
