"use client";

import React, { useState } from "react";
import Header from "./_components/Header";
import { LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { 
  Workflow, 
  Layers, 
  FileText, 
  Sparkles, 
  Server, 
  Info, 
  ChevronRight, 
  Play, 
  MousePointer, 
  Code 
} from "lucide-react";

export default function Home() {
  const { user } = useKindeBrowserClient();
  const [activeTab, setActiveTab] = useState<"dashboard" | "workflow">("dashboard");

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-zinc-800 selection:text-white overflow-x-clip max-w-full font-sans relative">
      {/* Floating Gradient Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .bg-grid-pattern {
          background-size: 40px 40px;
          background-image: radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px);
        }
      `}</style>

      {/* Grid background effect */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none -z-20 opacity-80" />

      {/* Global Gradient Ambient Glows (Wrapped to prevent horizontal overflow leaks) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full bg-teal-600/5 blur-[150px]" />
        <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-[120px]" />
      </div>

      <Header />

      {/* ================= SECTION 1: HERO ================= */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Info */}
          <div className="lg:col-span-5 flex flex-col text-left">
            {/* AI Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-semibold tracking-wide mb-6 uppercase w-fit select-none">
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI Diagram & Documentation Workspace</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.1] mb-6">
              Design, Document, and Visualize Ideas in One Place
            </h1>

            <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-lg">
              Create system designs, workflows, architecture diagrams, and documentation together in a single collaborative workspace.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              {user ? (
                <Link
                  href="/dashboard"
                  className="rounded-xl bg-violet-600 hover:bg-violet-500 active:bg-violet-700 px-6 py-3.5 text-sm font-bold text-white transition-all duration-200 shadow-lg shadow-violet-950/20 hover:shadow-violet-900/30 flex items-center gap-1.5"
                >
                  Open Workspace
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : (
                <LoginLink>
                  <span className="block rounded-xl bg-violet-600 hover:bg-violet-500 active:bg-violet-700 px-6 py-3.5 text-sm font-bold text-white transition-all duration-200 shadow-lg shadow-violet-950/20 hover:shadow-violet-900/30 flex items-center gap-1.5 cursor-pointer">
                    Get Started
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </LoginLink>
              )}

              <Link
                href="/dashboard"
                className="rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white px-6 py-3.5 text-sm font-bold border border-zinc-800 transition-all duration-200"
              >
                Open Workspace
              </Link>
            </div>
          </div>

          {/* Hero Right Main Graphic */}
          <div className="lg:col-span-7 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 to-transparent blur-2xl -z-10 rounded-3xl" />
            
            {/* macOS Browser Mockup */}
            <div className="animate-float relative rounded-2xl border border-zinc-800/80 bg-zinc-950 overflow-hidden shadow-2xl shadow-black/80 max-w-full">
              {/* macOS Window header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-900 bg-zinc-900/40 select-none">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                <div className="mx-auto bg-zinc-950/80 border border-zinc-850 text-[10px] font-medium text-zinc-500 rounded-md px-8 py-0.5 tracking-wide">
                  pixerase.io/dashboard
                </div>
              </div>
              {/* Main Screenshot */}
              <div className="bg-zinc-950 p-1">
                <img
                  src="/dashboard.png"
                  alt="PixErase Dashboard Visual Overview"
                  className="w-full object-cover rounded-b-xl border border-zinc-900"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= SECTION 2: PRODUCT OVERVIEW ================= */}
      <section className="py-20 border-y border-zinc-900/60 bg-zinc-950/40 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-bold text-violet-500 uppercase tracking-widest mb-3">Product Tour</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            A Workspace Designed for Builders
          </h3>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="bg-zinc-900/80 border border-zinc-800 p-1 rounded-xl flex gap-1 select-none">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
                activeTab === "dashboard"
                  ? "bg-zinc-800 text-white shadow-sm border border-zinc-700/50"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Dashboard View
            </button>
            <button
              onClick={() => setActiveTab("workflow")}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
                activeTab === "workflow"
                  ? "bg-zinc-800 text-white shadow-sm border border-zinc-700/50"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Workspace View
            </button>
          </div>
        </div>

        {/* Tab Switcher Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Side: Mockup Image */}
          <div className="lg:col-span-8">
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 overflow-hidden shadow-2xl shadow-black/60 relative">
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-zinc-900 bg-zinc-900/30 select-none">
                <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                <div className="mx-auto bg-zinc-950/70 border border-zinc-850/80 text-[9px] text-zinc-500 rounded px-6 py-0.5 tracking-wide">
                  {activeTab === "dashboard" ? "pixerase.io/dashboard" : "pixerase.io/workspace/active"}
                </div>
              </div>
              <div className="bg-zinc-950 p-0.5">
                <img
                  src={activeTab === "dashboard" ? "/dashboard.png" : "/workspace.png"}
                  alt={activeTab === "dashboard" ? "Dashboard screenshot" : "Workflow workspace screenshot"}
                  className="w-full object-cover rounded-b-lg border border-zinc-900 transition-opacity duration-300"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Text & Explanation */}
          <div className="lg:col-span-4 flex flex-col text-left">
            <div className="w-10 h-10 rounded-xl bg-violet-600/10 text-violet-400 border border-violet-500/10 flex items-center justify-center mb-6">
              {activeTab === "dashboard" ? <Server className="h-5 w-5" /> : <Workflow className="h-5 w-5" />}
            </div>
            
            <h4 className="text-xl font-bold text-white tracking-tight mb-4">
              {activeTab === "dashboard" 
                ? "Manage diagrams and projects in a clean workspace." 
                : "Create visual workflows and documentation together."}
            </h4>

            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              {activeTab === "dashboard"
                ? "An intuitive dashboard workspace designed to let you structure file paths, manage team diagrams, archive projects, and search through items instantly."
                : "A side-by-side split editor layout allowing you to write formatted documents using standard text blocks, while simultaneously mapping visual systems on an infinite Excalidraw board."}
            </p>

            <ul className="space-y-3.5 text-xs font-semibold text-zinc-300">
              {activeTab === "dashboard" ? (
                <>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    <span>Workspace file directories & folders</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    <span>Team creation and fast selector toggle</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    <span>File status updates, deletes & search</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    <span>40% Docs / 60% Canvas panel split</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    <span>Rich markdown block document headers & checklists</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    <span>Preloaded flowchart, system, & mindmap templates</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: FEATURES GRID ================= */}
      <section id="features" className="py-20 md:py-28 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-3">Explore features</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Everything You Need to Ship Designs
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-zinc-900/30 border border-zinc-850 p-6 rounded-2xl hover:border-zinc-700/80 hover:bg-zinc-900/50 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-violet-600/10 text-violet-400 border border-violet-500/10 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Workflow className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-zinc-100 tracking-tight mb-2">Diagram Editor</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Drag, draw, and connect elements with Excalidraw's powerful whiteboard. Design shapes, systems, and user flows with ease.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-zinc-900/30 border border-zinc-850 p-6 rounded-2xl hover:border-zinc-700/80 hover:bg-zinc-900/50 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-violet-600/10 text-violet-400 border border-violet-500/10 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Layers className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-zinc-100 tracking-tight mb-2">Visual Workflow Builder</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Map complex logic, business processes, and customer journeys with standard flowchart boxes, connectors, and notes.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-zinc-900/30 border border-zinc-850 p-6 rounded-2xl hover:border-zinc-700/80 hover:bg-zinc-900/50 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-violet-600/10 text-violet-400 border border-violet-500/10 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <FileText className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-zinc-100 tracking-tight mb-2">Documentation Workspace</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Write structured markdown docs with headers, paragraphs, lists, and checklists side-by-side with your whiteboard.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-zinc-900/30 border border-zinc-850 p-6 rounded-2xl hover:border-zinc-700/80 hover:bg-zinc-900/50 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-violet-600/10 text-violet-400 border border-violet-500/10 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-zinc-100 tracking-tight mb-2">Infinite Canvas</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              An boundless canvas that gives you the freedom to scale diagrams from simple components to complex microservice networks.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-zinc-900/30 border border-zinc-850 p-6 rounded-2xl hover:border-zinc-700/80 hover:bg-zinc-900/50 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-violet-600/10 text-violet-400 border border-violet-500/10 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Server className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-zinc-100 tracking-tight mb-2">Project Organization</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Organize files, manage teams, search documents, and separate personal workspaces inside a clean directory tree.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-zinc-900/30 border border-zinc-850 p-6 rounded-2xl hover:border-zinc-700/80 hover:bg-zinc-900/50 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-violet-600/10 text-violet-400 border border-violet-500/10 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Info className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-zinc-100 tracking-tight mb-2">AI Assisted Diagram Creation</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Create templates, speed up workflows, and build systems with structured visual canvas blocks designed for modern development teams.
            </p>
          </div>

        </div>
      </section>

      {/* ================= SECTION 4: HOW IT WORKS ================= */}
      <section id="how-it-works" className="py-20 border-t border-zinc-900/60 bg-zinc-950/20 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-violet-500 uppercase tracking-widest mb-3">Simple Workflow</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How PixErase Works
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Step 1 */}
          <div className="flex flex-col text-left bg-zinc-900/30 border border-zinc-850 rounded-2xl p-6 relative">
            <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent mb-4">
              01
            </div>
            <h4 className="text-base font-bold text-white mb-2">Create a Workspace</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Launch a clean diagram workspace in seconds. Give it a name and start mapping your software model or layout.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col text-left bg-zinc-900/30 border border-zinc-850 rounded-2xl p-6 relative">
            <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent mb-4">
              02
            </div>
            <h4 className="text-base font-bold text-white mb-2">Build Diagrams & Workflows</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Draw shapes, configure nodes, group components, and build flows on a premium glassmorphic canvas.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col text-left bg-zinc-900/30 border border-zinc-850 rounded-2xl p-6 relative">
            <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent mb-4">
              03
            </div>
            <h4 className="text-base font-bold text-white mb-2">Document & Share Ideas</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Write rich text document logs, code specs, and checklists alongside your diagram. Export your whiteboard as images for slides or updates.
            </p>
          </div>

        </div>
      </section>

      {/* ================= SECTION 5: WORKSPACE SHOWCASE ================= */}
      <section id="showcase" className="py-20 md:py-28 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Explanation Text */}
          <div className="lg:col-span-4 text-left">
            <span className="text-[10px] font-extrabold tracking-widest text-violet-500 uppercase">
              Split Screen Workspace
            </span>
            
            <h3 className="text-3xl font-extrabold text-white tracking-tight mt-3 mb-6">
              The Power of Split Editing
            </h3>

            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              No more switching between documentation tabs and whiteboard tools. Keep the full picture of your systems, architectures, and design logs in a single screen. When you edit documents, it autosaves with your visual whiteboard drawings.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-violet-600/10 text-violet-400 flex items-center justify-center shrink-0">
                  <Play className="h-3 w-3 fill-current" />
                </div>
                <span className="text-xs font-semibold text-zinc-300">Autosync documents and drawings</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-violet-600/10 text-violet-400 flex items-center justify-center shrink-0">
                  <MousePointer className="h-3 w-3" />
                </div>
                <span className="text-xs font-semibold text-zinc-300">Fast page load times</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-violet-600/10 text-violet-400 flex items-center justify-center shrink-0">
                  <Code className="h-3 w-3" />
                </div>
                <span className="text-xs font-semibold text-zinc-300">Keyboard hotkey support</span>
              </div>
            </div>
          </div>

          {/* Large Image Showcase */}
          <div className="lg:col-span-8 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-violet-600/10 blur-3xl -z-10 rounded-full" />
            
            <div className="rounded-xl border border-zinc-850 bg-zinc-950 overflow-hidden shadow-2xl shadow-black/80">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-900 bg-zinc-900/40 select-none">
                <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                <div className="mx-auto bg-zinc-950/70 border border-zinc-850 text-[9px] text-zinc-500 rounded px-6 py-0.5 tracking-wide">
                  pixerase.io/workspace/wireframe_flow
                </div>
              </div>
              <div className="bg-zinc-950 p-1">
                <img
                  src="/workspace.png"
                  alt="Large Workspace split-screen editor visual"
                  className="w-full object-cover rounded-b-lg border border-zinc-900"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= SECTION 6: CTA CARD ================= */}
      <section className="py-16 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-zinc-950 via-zinc-900/60 to-zinc-950 border border-zinc-850 p-8 sm:p-16 rounded-[2rem] text-center relative overflow-hidden">
          {/* Subtle backdrop light */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-violet-600/10 blur-3xl -z-10 rounded-full" />
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 max-w-xl mx-auto">
            Start Building Better Diagrams Today
          </h2>
          
          <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-md mx-auto">
            Create workflows, documentation, and diagrams from a single workspace.
          </p>

          <div className="flex justify-center flex-wrap gap-4 items-center">
            {user ? (
              <Link
                href="/dashboard"
                className="rounded-xl bg-violet-600 hover:bg-violet-500 active:bg-violet-700 px-6 py-3.5 text-sm font-bold text-white transition-all duration-200 shadow-md shadow-violet-950/10"
              >
                Open Workspace
              </Link>
            ) : (
              <LoginLink>
                <span className="block rounded-xl bg-violet-600 hover:bg-violet-500 active:bg-violet-700 px-6 py-3.5 text-sm font-bold text-white transition-all duration-200 shadow-md shadow-violet-950/10 cursor-pointer">
                  Get Started
                </span>
              </LoginLink>
            )}

            <Link
              href="/dashboard"
              className="rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white px-6 py-3.5 text-sm font-bold border border-zinc-800 transition-all duration-200"
            >
              Open Workspace
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SECTION 7: FOOTER ================= */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-12 select-none">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Trademark */}
          <div className="flex items-center gap-2.5">
            <img
              src="https://static.vecteezy.com/system/resources/previews/016/012/682/non_2x/eraser-creative-icon-design-free-vector.jpg"
              alt="PixErase Logo"
              width={24}
              height={24}
              className="rounded-full border border-zinc-800"
            />
            <span className="font-bold text-sm tracking-tight">
              <span className="text-teal-500">Pix</span>
              <span className="text-zinc-300">Erase</span>
            </span>
          </div>

          {/* Quick Footer Links */}
          <div className="flex items-center gap-6 text-xs font-semibold text-zinc-500">
            <a href="#" className="hover:text-zinc-300 transition-colors">Home</a>
            <Link href="/dashboard" className="hover:text-zinc-300 transition-colors">Workspace</Link>
            <a href="#features" className="hover:text-zinc-300 transition-colors">Features</a>
          </div>

          {/* Copyright notice */}
          <div className="text-[10px] font-medium text-zinc-650 text-zinc-500">
            &copy; {new Date().getFullYear()} PixErase. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
