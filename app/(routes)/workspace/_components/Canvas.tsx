"use client";

import React, { useEffect, useState } from "react";
import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import { FILE } from "../../dashboard/_components/FileList";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface CanvasProps {
  onSaveTrigger: any;
  fileId: any;
  fileData: FILE;
}

function Canvas({ onSaveTrigger, fileId, fileData }: CanvasProps) {
  const [whiteBoardData, setWhiteBoardData] = useState<any>();
  const updateWhiteboard = useMutation(api.files.updateWhiteboard);

  useEffect(() => {
    if (onSaveTrigger) {
      saveWhiteboard();
    }
  }, [onSaveTrigger]);

  const saveWhiteboard = () => {
    if (whiteBoardData) {
      updateWhiteboard({
        _id: fileId,
        whiteboard: JSON.stringify(whiteBoardData),
      })
        .then((resp) => console.log("Whiteboard saved:", resp))
        .catch((err) => console.error("Error saving whiteboard:", err));
    }
  };

  const parsedElements = React.useMemo(() => {
    if (!fileData?.whiteboard) return [];
    try {
      return JSON.parse(fileData.whiteboard);
    } catch (e) {
      console.error("Error parsing whiteboard elements:", e);
      return [];
    }
  }, [fileData?.whiteboard]);

  return (
    <div className="h-full w-full relative overflow-hidden bg-zinc-950">
      {/* Excalidraw Premium Glassmorphic Styles */}
      <style>{`
        /* Core Dark Theme Settings */
        .excalidraw.theme--dark {
          --ui-background: #09090b !important; /* zinc-950 */
          --canvas-background: #09090b !important;
          --border-color: #27272a !important; /* zinc-800 */
          --input-border-color: #27272a !important;
          --input-hover-border-color: #3f3f46 !important;
          --input-focus-border-color: #8b5cf6 !important;
        }

        /* Glassmorphic Panel Overrides (Islands) */
        .excalidraw .Island {
          background-color: rgba(20, 20, 23, 0.75) !important;
          backdrop-filter: blur(12px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(12px) saturate(180%) !important;
          border: 1px solid rgba(63, 63, 70, 0.4) !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5) !important;
          border-radius: 12px !important;
        }

        /* Make the toolbar rounded and floating */
        .excalidraw .App-toolbar-container {
          bottom: 24px !important;
        }
        .excalidraw .App-toolbar {
          background: none !important;
          border: none !important;
          box-shadow: none !important;
        }
        .excalidraw .App-toolbar .Island {
          border-radius: 9999px !important;
          padding: 5px 10px !important;
        }

        /* Toolbar item transitions and styling */
        .excalidraw .ToolButton__button {
          border-radius: 9999px !important;
          transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1) !important;
          margin: 0 2px !important;
        }
        .excalidraw .ToolButton__button:hover {
          background-color: rgba(255, 255, 255, 0.08) !important;
          transform: translateY(-1px);
        }
        .excalidraw .ToolButton__button:active {
          transform: translateY(0);
        }
        .excalidraw .ToolButton__button--selected {
          background-color: #8b5cf6 !important; /* Violet 500 */
          color: #ffffff !important;
          box-shadow: 0 0 12px rgba(139, 92, 246, 0.4) !important;
        }

        /* Sidebar Glassmorphic Override */
        .excalidraw .sidebar {
          background-color: rgba(20, 20, 23, 0.85) !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
          border-left: 1px solid rgba(63, 63, 70, 0.4) !important;
        }

        /* Scrollbars */
        .excalidraw ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .excalidraw ::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 3px;
        }
        .excalidraw ::-webkit-scrollbar-thumb:hover {
          background: #3f3f46;
        }

        /* Hints and layer elements */
        .excalidraw .font-sans {
          font-family: inherit !important;
        }
      `}</style>

      {fileData && (
        <Excalidraw
          theme="dark"
          initialData={{
            elements: parsedElements,
          }}
          onChange={(excalidrawElements) => setWhiteBoardData(excalidrawElements)}
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              toggleTheme: false,
            },
          }}
        >
          <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
          </MainMenu>
        </Excalidraw>
      )}
    </div>
  );
}

export default Canvas;
