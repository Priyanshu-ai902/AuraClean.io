"use client";

import React, { useEffect, useState, useRef } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import Editor from "../_components/Editor";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FILE } from "../../dashboard/_components/FileList";
import Canvas from "../_components/Canvas";
import { 
  X, 
  Library, 
  Workflow, 
  Server, 
  Sparkles, 
  FileText, 
  MousePointer, 
  Info 
} from "lucide-react";
import { toast } from "sonner";

// Pre-configured Excalidraw templates
const flowchartTemplate = [
  {
    id: "flow_start",
    type: "rectangle",
    x: 200,
    y: 100,
    width: 140,
    height: 50,
    strokeColor: "#8b5cf6",
    backgroundColor: "#8b5cf61a",
    fillStyle: "solid",
    strokeWidth: 2,
    roundness: { type: 3 },
    version: 10,
    isDeleted: false,
  },
  {
    id: "flow_start_text",
    type: "text",
    x: 210,
    y: 115,
    width: 120,
    height: 20,
    text: "Start Process",
    fontSize: 14,
    fontFamily: 1,
    textAlign: "center",
    verticalAlign: "middle",
    strokeColor: "#ffffff",
    version: 10,
    isDeleted: false,
  },
  {
    id: "flow_arrow1",
    type: "arrow",
    x: 270,
    y: 150,
    width: 0,
    height: 60,
    strokeColor: "#a1a1aa",
    strokeWidth: 2,
    points: [[0, 0], [0, 60]],
    version: 10,
    isDeleted: false,
  },
  {
    id: "flow_proc1",
    type: "rectangle",
    x: 180,
    y: 210,
    width: 180,
    height: 60,
    strokeColor: "#3b82f6",
    backgroundColor: "#3b82f61a",
    fillStyle: "solid",
    strokeWidth: 2,
    version: 10,
    isDeleted: false,
  },
  {
    id: "flow_proc1_text",
    type: "text",
    x: 195,
    y: 230,
    width: 150,
    height: 20,
    text: "Review Input Data",
    fontSize: 14,
    fontFamily: 1,
    textAlign: "center",
    verticalAlign: "middle",
    strokeColor: "#ffffff",
    version: 10,
    isDeleted: false,
  },
  {
    id: "flow_arrow2",
    type: "arrow",
    x: 270,
    y: 270,
    width: 0,
    height: 60,
    strokeColor: "#a1a1aa",
    strokeWidth: 2,
    points: [[0, 0], [0, 60]],
    version: 10,
    isDeleted: false,
  },
  {
    id: "flow_dec1",
    type: "diamond",
    x: 180,
    y: 330,
    width: 180,
    height: 80,
    strokeColor: "#eab308",
    backgroundColor: "#eab3081a",
    fillStyle: "solid",
    strokeWidth: 2,
    version: 10,
    isDeleted: false,
  },
  {
    id: "flow_dec1_text",
    type: "text",
    x: 215,
    y: 360,
    width: 110,
    height: 20,
    text: "Is Valid?",
    fontSize: 14,
    fontFamily: 1,
    textAlign: "center",
    verticalAlign: "middle",
    strokeColor: "#ffffff",
    version: 10,
    isDeleted: false,
  },
  {
    id: "flow_arrow_yes",
    type: "arrow",
    x: 270,
    y: 410,
    width: 0,
    height: 70,
    strokeColor: "#22c55e",
    strokeWidth: 2,
    points: [[0, 0], [0, 70]],
    version: 10,
    isDeleted: false,
  },
  {
    id: "flow_yes_label",
    type: "text",
    x: 285,
    y: 430,
    width: 30,
    height: 18,
    text: "Yes",
    fontSize: 12,
    fontFamily: 1,
    strokeColor: "#22c55e",
    version: 10,
    isDeleted: false,
  },
  {
    id: "flow_success",
    type: "rectangle",
    x: 180,
    y: 480,
    width: 180,
    height: 55,
    strokeColor: "#22c55e",
    backgroundColor: "#22c55e1a",
    fillStyle: "solid",
    strokeWidth: 2,
    roundness: { type: 3 },
    version: 10,
    isDeleted: false,
  },
  {
    id: "flow_success_text",
    type: "text",
    x: 195,
    y: 497,
    width: 150,
    height: 20,
    text: "Complete & Save",
    fontSize: 14,
    fontFamily: 1,
    textAlign: "center",
    verticalAlign: "middle",
    strokeColor: "#ffffff",
    version: 10,
    isDeleted: false,
  },
  {
    id: "flow_arrow_no",
    type: "arrow",
    x: 360,
    y: 370,
    width: 100,
    height: 0,
    strokeColor: "#ef4444",
    strokeWidth: 2,
    points: [[0, 0], [100, 0]],
    version: 10,
    isDeleted: false,
  },
  {
    id: "flow_no_label",
    type: "text",
    x: 395,
    y: 345,
    width: 25,
    height: 18,
    text: "No",
    fontSize: 12,
    fontFamily: 1,
    strokeColor: "#ef4444",
    version: 10,
    isDeleted: false,
  },
  {
    id: "flow_reject",
    type: "rectangle",
    x: 460,
    y: 340,
    width: 150,
    height: 60,
    strokeColor: "#ef4444",
    backgroundColor: "#ef44441a",
    fillStyle: "solid",
    strokeWidth: 2,
    version: 10,
    isDeleted: false,
  },
  {
    id: "flow_reject_text",
    type: "text",
    x: 475,
    y: 360,
    width: 120,
    height: 20,
    text: "Display Alert",
    fontSize: 14,
    fontFamily: 1,
    textAlign: "center",
    verticalAlign: "middle",
    strokeColor: "#ffffff",
    version: 10,
    isDeleted: false,
  }
];

const architectureTemplate = [
  {
    id: "arch_client",
    type: "rectangle",
    x: 100,
    y: 200,
    width: 140,
    height: 100,
    strokeColor: "#22c55e",
    backgroundColor: "#22c55e1a",
    fillStyle: "solid",
    strokeWidth: 2,
    version: 10,
    isDeleted: false,
  },
  {
    id: "arch_client_text",
    type: "text",
    x: 110,
    y: 232,
    width: 120,
    height: 35,
    text: "Client App\n(Next.js Dashboard)",
    fontSize: 13,
    fontFamily: 1,
    textAlign: "center",
    verticalAlign: "middle",
    strokeColor: "#ffffff",
    version: 10,
    isDeleted: false,
  },
  {
    id: "arch_arrow1",
    type: "arrow",
    x: 240,
    y: 250,
    width: 100,
    height: 0,
    strokeColor: "#a1a1aa",
    strokeWidth: 2,
    points: [[0, 0], [100, 0]],
    version: 10,
    isDeleted: false,
  },
  {
    id: "arch_gateway",
    type: "rectangle",
    x: 340,
    y: 170,
    width: 180,
    height: 160,
    strokeColor: "#3b82f6",
    backgroundColor: "#3b82f61a",
    fillStyle: "solid",
    strokeWidth: 2,
    version: 10,
    isDeleted: false,
  },
  {
    id: "arch_gateway_text",
    type: "text",
    x: 355,
    y: 232,
    width: 150,
    height: 35,
    text: "Application API\n(Node.js Server)",
    fontSize: 13,
    fontFamily: 1,
    textAlign: "center",
    verticalAlign: "middle",
    strokeColor: "#ffffff",
    version: 10,
    isDeleted: false,
  },
  {
    id: "arch_arrow2",
    type: "arrow",
    x: 520,
    y: 220,
    width: 120,
    height: -50,
    strokeColor: "#a1a1aa",
    strokeWidth: 2,
    points: [[0, 0], [120, -50]],
    version: 10,
    isDeleted: false,
  },
  {
    id: "arch_db",
    type: "rectangle",
    x: 640,
    y: 130,
    width: 160,
    height: 90,
    strokeColor: "#eab308",
    backgroundColor: "#eab3081a",
    fillStyle: "solid",
    strokeWidth: 2,
    version: 10,
    isDeleted: false,
  },
  {
    id: "arch_db_text",
    type: "text",
    x: 650,
    y: 157,
    width: 140,
    height: 35,
    text: "Relational DB\n(Postgres / Convex)",
    fontSize: 13,
    fontFamily: 1,
    textAlign: "center",
    verticalAlign: "middle",
    strokeColor: "#ffffff",
    version: 10,
    isDeleted: false,
  },
  {
    id: "arch_arrow3",
    type: "arrow",
    x: 520,
    y: 280,
    width: 120,
    height: 50,
    strokeColor: "#a1a1aa",
    strokeWidth: 2,
    points: [[0, 0], [120, 50]],
    version: 10,
    isDeleted: false,
  },
  {
    id: "arch_redis",
    type: "rectangle",
    x: 640,
    y: 280,
    width: 160,
    height: 90,
    strokeColor: "#f97316",
    backgroundColor: "#f973161a",
    fillStyle: "solid",
    strokeWidth: 2,
    version: 10,
    isDeleted: false,
  },
  {
    id: "arch_redis_text",
    type: "text",
    x: 650,
    y: 312,
    width: 140,
    height: 35,
    text: "Key-Value Cache\n(Redis Store)",
    fontSize: 13,
    fontFamily: 1,
    textAlign: "center",
    verticalAlign: "middle",
    strokeColor: "#ffffff",
    version: 10,
    isDeleted: false,
  }
];

const mindmapTemplate = [
  {
    id: "mind_center",
    type: "rectangle",
    x: 350,
    y: 250,
    width: 180,
    height: 70,
    strokeColor: "#8b5cf6",
    backgroundColor: "#8b5cf61a",
    fillStyle: "solid",
    strokeWidth: 2,
    roundness: { type: 3 },
    version: 10,
    isDeleted: false,
  },
  {
    id: "mind_center_text",
    type: "text",
    x: 365,
    y: 275,
    width: 150,
    height: 20,
    text: "Launch Strategy",
    fontSize: 15,
    fontFamily: 1,
    textAlign: "center",
    verticalAlign: "middle",
    strokeColor: "#ffffff",
    version: 10,
    isDeleted: false,
  },
  {
    id: "mind_n1",
    type: "rectangle",
    x: 120,
    y: 130,
    width: 140,
    height: 50,
    strokeColor: "#3b82f6",
    backgroundColor: "#3b82f61a",
    fillStyle: "solid",
    strokeWidth: 2,
    version: 10,
    isDeleted: false,
  },
  {
    id: "mind_n1_text",
    type: "text",
    x: 135,
    y: 145,
    width: 110,
    height: 20,
    text: "Beta Marketing",
    fontSize: 13,
    fontFamily: 1,
    textAlign: "center",
    verticalAlign: "middle",
    strokeColor: "#ffffff",
    version: 10,
    isDeleted: false,
  },
  {
    id: "mind_a1",
    type: "arrow",
    x: 350,
    y: 260,
    width: -90,
    height: -80,
    strokeColor: "#a1a1aa",
    strokeWidth: 2,
    points: [[0, 0], [-90, -80]],
    version: 10,
    isDeleted: false,
  },
  {
    id: "mind_n2",
    type: "rectangle",
    x: 620,
    y: 130,
    width: 140,
    height: 50,
    strokeColor: "#eab308",
    backgroundColor: "#eab3081a",
    fillStyle: "solid",
    strokeWidth: 2,
    version: 10,
    isDeleted: false,
  },
  {
    id: "mind_n2_text",
    type: "text",
    x: 635,
    y: 145,
    width: 110,
    height: 20,
    text: "Interactive Design",
    fontSize: 13,
    fontFamily: 1,
    textAlign: "center",
    verticalAlign: "middle",
    strokeColor: "#ffffff",
    version: 10,
    isDeleted: false,
  },
  {
    id: "mind_a2",
    type: "arrow",
    x: 530,
    y: 260,
    width: 90,
    height: -80,
    strokeColor: "#a1a1aa",
    strokeWidth: 2,
    points: [[0, 0], [90, -80]],
    version: 10,
    isDeleted: false,
  },
  {
    id: "mind_n3",
    type: "rectangle",
    x: 120,
    y: 380,
    width: 140,
    height: 50,
    strokeColor: "#22c55e",
    backgroundColor: "#22c55e1a",
    fillStyle: "solid",
    strokeWidth: 2,
    version: 10,
    isDeleted: false,
  },
  {
    id: "mind_n3_text",
    type: "text",
    x: 135,
    y: 395,
    width: 110,
    height: 20,
    text: "Feature Roadmap",
    fontSize: 13,
    fontFamily: 1,
    textAlign: "center",
    verticalAlign: "middle",
    strokeColor: "#ffffff",
    version: 10,
    isDeleted: false,
  },
  {
    id: "mind_a3",
    type: "arrow",
    x: 350,
    y: 310,
    width: -90,
    height: 80,
    strokeColor: "#a1a1aa",
    strokeWidth: 2,
    points: [[0, 0], [-90, 80]],
    version: 10,
    isDeleted: false,
  },
  {
    id: "mind_n4",
    type: "rectangle",
    x: 620,
    y: 380,
    width: 140,
    height: 50,
    strokeColor: "#f43f5e",
    backgroundColor: "#f43f5e1a",
    fillStyle: "solid",
    strokeWidth: 2,
    version: 10,
    isDeleted: false,
  },
  {
    id: "mind_n4_text",
    type: "text",
    x: 635,
    y: 395,
    width: 110,
    height: 20,
    text: "DevOps & Cloud",
    fontSize: 13,
    fontFamily: 1,
    textAlign: "center",
    verticalAlign: "middle",
    strokeColor: "#ffffff",
    version: 10,
    isDeleted: false,
  },
  {
    id: "mind_a4",
    type: "arrow",
    x: 530,
    y: 310,
    width: 90,
    height: 80,
    strokeColor: "#a1a1aa",
    strokeWidth: 2,
    points: [[0, 0], [90, 80]],
    version: 10,
    isDeleted: false,
  }
];

function Workspace({ params }: any) {
  const [triggerSave, setTriggerSave] = useState(false);
  const [view, setView] = useState<"document" | "canvas" | "both">("both");
  const convex = useConvex();
  const [fileData, setFileData] = useState<FILE | any>();
  const [isSaving, setIsSaving] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [isLeftDocPanelOpen, setIsLeftDocPanelOpen] = useState(false);
  const [whiteboardVersion, setWhiteboardVersion] = useState(0);

  const updateWhiteboard = useMutation(api.files.updateWhiteboard);

  useEffect(() => {
    if (params.fileId) {
      getFileData();
    }
  }, [params.fileId]);

  // Handle mobile resize fallbacks: split screen is disabled on small views
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && view === "both") {
        setView("canvas");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Trigger once on mount
    return () => window.removeEventListener("resize", handleResize);
  }, [view]);

  const getFileData = async () => {
    try {
      const result = await convex.query(api.files.getFilesById, {
        _id: params.fileId,
      });
      setFileData(result);
    } catch (e) {
      console.error("Error fetching file:", e);
      toast.error("Failed to load workspace file.");
    }
  };

  const handleSaveAll = () => {
    setIsSaving(true);
    setTriggerSave((prev) => !prev);
    // Mimic saving completion animation state
    setTimeout(() => {
      setIsSaving(false);
    }, 1200);
  };

  const handleLoadTemplate = async (templateElements: any) => {
    try {
      setIsSaving(true);
      await updateWhiteboard({
        _id: params.fileId,
        whiteboard: JSON.stringify(templateElements),
      });
      setWhiteboardVersion((v) => v + 1);
      await getFileData();
      toast.success("Template loaded successfully into your whiteboard!");
    } catch (e) {
      console.error(e);
      toast.error("Error loading template.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100 font-sans">
      {/* Premium Sticky Header */}
      <WorkspaceHeader
        fileName={fileData?.fileName}
        onSave={handleSaveAll}
        view={view}
        setView={setView}
        isRightSidebarOpen={isRightSidebarOpen}
        setIsRightSidebarOpen={setIsRightSidebarOpen}
        isSaving={isSaving}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex min-h-0 overflow-hidden relative">
        
        {/* Floating Toggle Button for Tablet/Mobile Split view */}
        {!isLeftDocPanelOpen && view === "both" && (
          <button
            onClick={() => setIsLeftDocPanelOpen(true)}
            className="absolute left-4 top-4 z-20 flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 px-3.5 py-2 rounded-xl shadow-lg hover:shadow-xl lg:hidden hover:-translate-y-0.5 transition-all duration-200"
          >
            <FileText className="h-4 w-4 text-violet-400" />
            <span className="text-xs font-semibold">Docs Panel</span>
          </button>
        )}

        {/* Collapsible Left Drawer (Tablet Screen Mode) */}
        {isLeftDocPanelOpen && view === "both" && (
          <div className="absolute left-0 top-0 bottom-0 w-[380px] sm:w-[420px] max-w-[90%] bg-zinc-950 border-r border-zinc-850 z-20 shadow-2xl flex flex-col animate-in slide-in-from-left duration-300 lg:hidden select-text">
            <div className="flex justify-between items-center px-4 h-[48px] border-b border-zinc-800/80 shrink-0">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 select-none">
                <FileText className="h-3.5 w-3.5 text-violet-400" /> Document Panels
              </span>
              <button
                onClick={() => setIsLeftDocPanelOpen(false)}
                className="p-1.5 rounded-lg hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto min-h-0">
              <Editor
                onSaveTrigger={triggerSave}
                fileId={params.fileId}
                fileData={fileData}
              />
            </div>
          </div>
        )}

        {/* 1. Document Surface (Desktop: 40% Panel / Canvas: 60% Panel) */}
        {view !== "canvas" && (
          <div
            className={`
              h-full bg-zinc-950 overflow-y-auto border-r border-zinc-900 transition-all duration-300
              ${view === "both" ? "w-[40%] hidden lg:block" : "w-full"}
              ${view === "document" ? "w-full block" : ""}
            `}
          >
            <Editor
              onSaveTrigger={triggerSave}
              fileId={params.fileId}
              fileData={fileData}
            />
          </div>
        )}

        {/* 2. Drawing Whiteboard (Excalidraw Canvas Surface) */}
        {view !== "document" && (
          <div
            className={`
              h-full relative overflow-hidden flex-1
              ${view === "both" ? "w-[60%]" : "w-full"}
            `}
          >
            <Canvas
              key={`${params.fileId}_${whiteboardVersion}`}
              onSaveTrigger={triggerSave}
              fileId={params.fileId}
              fileData={fileData}
            />
          </div>
        )}

        {/* 3. Collapsible Library Sidebar (Right Panel) */}
        {isRightSidebarOpen && (
          <div className="w-80 h-full border-l border-zinc-900 bg-zinc-950/95 backdrop-blur-md flex flex-col shrink-0 z-10 select-none animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between px-4 h-[48px] border-b border-zinc-800/80 shrink-0">
              <div className="flex items-center gap-2">
                <Library className="h-4 w-4 text-teal-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Library & Templates
                </span>
              </div>
              <button
                onClick={() => setIsRightSidebarOpen(false)}
                className="p-1 rounded hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Sidebar Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              
              {/* Prebuilt Templates Section */}
              <div className="space-y-3">
                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-0.5">
                  Diagram Templates
                </h3>
                <div className="grid grid-cols-1 gap-2.5">
                  <button
                    onClick={() => handleLoadTemplate(flowchartTemplate)}
                    className="flex items-start gap-3 p-3 rounded-xl border border-zinc-850 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900 text-left transition-all duration-200 group"
                  >
                    <Workflow className="h-4.5 w-4.5 text-violet-400 mt-0.5 group-hover:scale-110 transition-transform" />
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-200">
                        Flowchart Loop
                      </h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5 leading-normal">
                        Decisions, process boxes, arrows, and start/end flow caps.
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() => handleLoadTemplate(architectureTemplate)}
                    className="flex items-start gap-3 p-3 rounded-xl border border-zinc-850 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900 text-left transition-all duration-200 group"
                  >
                    <Server className="h-4.5 w-4.5 text-blue-400 mt-0.5 group-hover:scale-110 transition-transform" />
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-200">
                        App Architecture
                      </h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5 leading-normal">
                        Client, Node API Gateway, DB backend, and Redis cache.
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() => handleLoadTemplate(mindmapTemplate)}
                    className="flex items-start gap-3 p-3 rounded-xl border border-zinc-850 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900 text-left transition-all duration-200 group"
                  >
                    <Sparkles className="h-4.5 w-4.5 text-yellow-400 mt-0.5 group-hover:scale-110 transition-transform" />
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-200">
                        Brainstorm Mindmap
                      </h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5 leading-normal">
                        Central design concepts with multi-directional branch topics.
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Whiteboard Hotkeys */}
              <div className="space-y-3">
                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-0.5">
                  Whiteboard Hotkeys
                </h3>
                <div className="bg-zinc-900/30 rounded-xl border border-zinc-850 p-3 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400 font-medium">Select Object</span>
                    <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-zinc-800 text-zinc-300 rounded border border-zinc-700">
                      V
                    </kbd>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400 font-medium">Draw Rectangle</span>
                    <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-zinc-800 text-zinc-300 rounded border border-zinc-700">
                      R
                    </kbd>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400 font-medium">Draw Ellipse</span>
                    <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-zinc-800 text-zinc-300 rounded border border-zinc-700">
                      O
                    </kbd>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400 font-medium">Draw Arrow</span>
                    <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-zinc-800 text-zinc-300 rounded border border-zinc-700">
                      A
                    </kbd>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400 font-medium">Add Text</span>
                    <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-zinc-800 text-zinc-300 rounded border border-zinc-700">
                      T
                    </kbd>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400 font-medium">Pan Canvas</span>
                    <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-zinc-800 text-zinc-300 rounded border border-zinc-700">
                      Space + Drag
                    </kbd>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-3">
                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-0.5">
                  Pro Tips
                </h3>
                <div className="bg-zinc-900/30 rounded-xl border border-zinc-850 p-3 space-y-2.5 text-xs text-zinc-400 font-medium">
                  <div className="flex gap-2">
                    <MousePointer className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      Double-click anywhere on the workspace canvas to append quick floating comments.
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Info className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      Saving is global: it stores both editor documentation drafts and canvas sketches concurrently.
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Workspace;
