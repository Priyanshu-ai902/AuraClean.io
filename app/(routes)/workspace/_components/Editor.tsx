"use client";

import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
// @ts-ignore
import Header from "@editorjs/header";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Checklist from "@editorjs/checklist";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FILE } from "../../dashboard/_components/FileList";

const rawDocument = {
  time: 12345678,
  blocks: [
    {
      data: {
        text: "Getting Started",
        level: 2,
      },
      id: "123",
      type: "header",
    },
    {
      data: {
        text: "Welcome to your PixErase document space. Start writing ideas, notes, or build your canvas alongside.",
      },
      id: "12345",
      type: "paragraph",
    },
  ],
  version: "2.8.1",
};

interface EditorProps {
  onSaveTrigger: any;
  fileId: any;
  fileData: FILE;
}

function Editor({ onSaveTrigger, fileId, fileData }: EditorProps) {
  const ref = useRef<EditorJS>();
  const updateDocument = useMutation(api.files.updateDocument);
  const updateFileName = useMutation(api.files.updateFileName);

  const [title, setTitle] = useState("");
  const titleInitialized = useRef(false);

  // Initialize title once fileData loads
  useEffect(() => {
    if (fileData && !titleInitialized.current) {
      setTitle(fileData.fileName || "");
      titleInitialized.current = true;
    }
  }, [fileData]);

  // Handle editor initialization
  useEffect(() => {
    if (fileData && !ref.current) {
      initEditor();
    }
    return () => {
      if (ref.current && typeof ref.current.destroy === "function") {
        ref.current.destroy();
        ref.current = undefined;
      }
    };
  }, [fileData]);

  // Handle save trigger
  useEffect(() => {
    if (onSaveTrigger) {
      onSaveDocument();
    }
  }, [onSaveTrigger]);

  const initEditor = () => {
    const editor = new EditorJS({
      tools: {
        header: {
          class: Header,
          shortcut: "SHIFT+H",
          config: {
            placeholder: "Heading",
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
      },
      holder: "editorjs",
      data: fileData.document ? JSON.parse(fileData.document) : rawDocument,
    });
    ref.current = editor;
  };

  const onSaveDocument = () => {
    if (ref.current) {
      ref.current
        .save()
        .then((outputData) => {
          console.log("Saving document data:", outputData);
          
          const docsPromise = updateDocument({
            _id: fileId,
            document: JSON.stringify(outputData),
          });

          const titlePromise = updateFileName({
            _id: fileId,
            fileName: title.trim() || "Untitled Document",
          });

          Promise.all([docsPromise, titlePromise])
            .then(() => {
              toast.success("Document updated successfully!");
            })
            .catch((err) => {
              console.error("Save error:", err);
              toast.error("Error saving document!");
            });
        })
        .catch((error) => {
          console.error("Saving failed:", error);
        });
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-56px)] bg-zinc-950 text-zinc-200 flex flex-col items-center select-text">
      {/* EditorJS Styling Overrides */}
      <style>{`
        .ce-editor-dark-override {
          color: #e4e4e7; /* zinc-200 */
        }
        .ce-editor-dark-override .ce-paragraph {
          color: #d4d4d8; /* zinc-300 */
          line-height: 1.7;
          font-size: 1rem;
        }
        .ce-editor-dark-override .ce-header {
          color: #f4f4f5; /* zinc-100 */
          font-weight: 700;
          margin-top: 1.75rem;
          margin-bottom: 0.75rem;
          letter-spacing: -0.025em;
        }
        .ce-editor-dark-override .cdx-list__item {
          color: #d4d4d8;
          line-height: 1.6;
        }
        .ce-editor-dark-override .ce-toolbar__plus,
        .ce-editor-dark-override .ce-toolbar__settings-btn {
          color: #e4e4e7 !important;
          background-color: #27272a !important; /* zinc-800 */
          border-radius: 6px;
        }
        .ce-editor-dark-override .ce-toolbar__plus:hover,
        .ce-editor-dark-override .ce-toolbar__settings-btn:hover {
          background-color: #3f3f46 !important; /* zinc-700 */
        }
        .ce-editor-dark-override .ce-inline-toolbar {
          background-color: #18181b !important; /* zinc-900 */
          border: 1px solid #27272a !important; /* zinc-800 */
          color: #f4f4f5 !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
          border-radius: 8px;
        }
        .ce-editor-dark-override .ce-inline-toolbar__button:hover {
          background-color: #27272a !important;
        }
        .ce-editor-dark-override .ce-inline-toolbar__dropdown:hover {
          background-color: #27272a !important;
        }
        .ce-editor-dark-override .ce-conversion-toolbar,
        .ce-editor-dark-override .ce-settings {
          background-color: #18181b !important;
          border: 1px solid #27272a !important;
          color: #f4f4f5 !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
          border-radius: 8px;
        }
        .ce-editor-dark-override .ce-settings__button:hover,
        .ce-editor-dark-override .ce-conversion-tool:hover {
          background-color: #27272a !important;
        }
        .ce-editor-dark-override .ce-inline-tool-input {
          background-color: #09090b !important;
          color: #fff !important;
          border: 1px solid #27272a !important;
        }
        .ce-editor-dark-override .ce-block--selected .ce-block__content {
          background-color: #18181b !important;
        }
        .ce-editor-dark-override [data-placeholder]::before {
          color: #52525b !important; /* zinc-600 */
        }
        .ce-editor-dark-override ::selection {
          background-color: #3f3f46; /* zinc-700 */
          color: #ffffff;
        }
        .codex-editor {
          width: 100% !important;
        }
        .codex-editor__redactor {
          padding-bottom: 80px !important;
        }
        /* Fix list sizing */
        .cdx-list {
          padding-left: 1.5rem;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
      `}</style>

      <div className="w-full max-w-2xl px-6 py-8 md:py-12 flex flex-col gap-6">
        {/* Document Title Input */}
        <div className="flex flex-col gap-1 w-full border-b border-zinc-800/80 pb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled Document"
            className="text-3xl md:text-4xl font-extrabold bg-transparent text-zinc-100 placeholder-zinc-800 outline-none w-full border-none focus:outline-none focus:ring-0 tracking-tight"
          />
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium pl-0.5 select-none">
            <span>PixErase Smart Docs</span>
          </div>
        </div>

        {/* EditorJS Div */}
        <div className="w-full ce-editor-dark-override">
          <div id="editorjs"></div>
        </div>
      </div>
    </div>
  );
}

export default Editor;
