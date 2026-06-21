"use client"

import React, { useContext, useState } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FileListContext } from '@/app/_context/FilesListContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  LayoutGrid, 
  Settings as SettingsIcon, 
  ChevronDown, 
  LogOut, 
  Plus,
  ChevronsUpDown,
  Building
} from 'lucide-react';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import Image from 'next/image';



function SideNav() {
  const { user }: any = useKindeBrowserClient();
  const convex = useConvex();
  
  const { 
    activeTeam, 
    setActiveTeam, 
    teamList, 
    setTeamList
  } = useContext(FileListContext);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const createTeamMutation = useMutation(api.teams.createTeam);

  const handleCreateTeam = async () => {
    if (!newTeamName.trim() || !user?.email) return;
    try {
      const resp = await createTeamMutation({
        teamName: newTeamName,
        createdBy: user.email
      });
      if (resp) {
        toast('Team workspace created successfully!');
        const updatedTeams = await convex.query(api.teams.getTeam, { email: user.email });
        setTeamList(updatedTeams);
        const newTeam = updatedTeams.find((t: any) => t._id === resp || t.teamName === newTeamName);
        if (newTeam) setActiveTeam(newTeam);
        setNewTeamName('');
        setIsSettingsOpen(false);
      }
    } catch (e) {
      toast('Error creating team workspace');
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-between p-4 bg-zinc-900 border-r border-zinc-800 select-none">
      
      {/* Top Section: Logo & Team Swapper */}
      <div className="space-y-6">
        <nav
          aria-label="Global"
          className="flex items-center gap-3 p-4"
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/016/012/682/non_2x/eraser-creative-icon-design-free-vector.jpg"
            alt="PixErase Logo"
            width={30}
            height={30}
            className="rounded-full"
          />
          <span className="font-bold text-lg select-none">
            <span className="text-teal-500">Pix</span>
            <span className="text-gray-300">Erase</span>
          </span>
        </nav>

        {/* Team Selector Popover */}
        <Popover>
          <PopoverTrigger className="w-full focus:outline-none">
            <div className="flex items-center justify-between text-zinc-200 bg-zinc-850/50 hover:bg-zinc-850 border border-zinc-800/80 p-2.5 rounded-lg cursor-pointer transition-all duration-200">
              <div className="flex items-center gap-2.5 text-left min-w-0">
                <div className="w-6 h-6 rounded bg-violet-600/20 text-violet-400 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                  {activeTeam?.teamName?.substring(0, 2) || "T"}
                </div>
                <span className="font-medium text-sm text-zinc-200 truncate">{activeTeam?.teamName || "Loading..."}</span>
              </div>
              <ChevronsUpDown className="h-4 w-4 text-zinc-500 shrink-0" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-lg shadow-xl z-50">
            <div className="px-2 py-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Switch Team
            </div>
            <div className="max-h-48 overflow-y-auto space-y-0.5">
              {teamList?.map((team: any) => (
                <button
                  key={team._id}
                  onClick={() => setActiveTeam(team)}
                  className={`w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors flex items-center gap-2 ${
                    activeTeam?._id === team._id 
                      ? 'bg-violet-600 text-white font-medium' 
                      : 'hover:bg-zinc-800 text-zinc-300 hover:text-white'
                  }`}
                >
                  <Building className="h-3.5 w-3.5 opacity-80" />
                  <span className="truncate">{team.teamName}</span>
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Navigation Section */}
        <nav className="space-y-1">
          <div className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm bg-zinc-800 text-white font-medium shadow-sm cursor-default">
            <LayoutGrid className="h-4 w-4 shrink-0 text-violet-400" />
            <span>All Diagrams</span>
          </div>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 text-zinc-400 hover:text-white hover:bg-zinc-850"
          >
            <SettingsIcon className="h-4 w-4 shrink-0" />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* Bottom Section: Profile */}
      <div className="border-t border-zinc-800 pt-4">
        {user && (
          <Popover>
            <PopoverTrigger className="w-full focus:outline-none">
              <div className="flex items-center gap-3 p-2 hover:bg-zinc-850 rounded-lg cursor-pointer transition-all duration-200 text-left">
                {user.picture ? (
                  <Image 
                    src={user.picture} 
                    alt="avatar" 
                    width={32} 
                    height={32} 
                    className="rounded-full border border-zinc-800 shrink-0" 
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center font-semibold text-xs border border-zinc-700 uppercase shrink-0">
                    {user.given_name?.substring(0, 2) || "U"}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-zinc-200 truncate">{user.given_name} {user.family_name}</p>
                  <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-lg shadow-xl z-50">
              <div className="px-2 py-1 border-b border-zinc-800 mb-1">
                <p className="text-xs font-semibold text-zinc-300 truncate">{user.given_name} {user.family_name}</p>
                <p className="text-[10px] text-zinc-500 truncate mb-1">{user.email}</p>
              </div>
              <LogoutLink className="w-full">
                <span className="w-full flex items-center gap-2.5 px-2 py-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-950/20 rounded-md cursor-pointer transition-colors">
                  <LogOut className="h-4 w-4" />
                  Logout
                </span>
              </LogoutLink>
            </PopoverContent>
          </Popover>
        )}
      </div>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold tracking-tight text-white">Workspace Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            
            {/* Current Team Info */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-0.5">Active Workspace</label>
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 flex items-center gap-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-violet-600/20 text-violet-400 flex items-center justify-center font-bold text-sm uppercase shrink-0 border border-violet-500/10">
                  {activeTeam?.teamName?.substring(0, 2) || "W"}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-base text-zinc-100 tracking-tight truncate">{activeTeam?.teamName}</p>
                  <p className="text-xs text-zinc-500 mt-0.5 font-medium">Currently active workspace</p>
                </div>
              </div>
            </div>

            {/* Create New Team */}
            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Create New Workspace</label>
              <div className="flex gap-2">
                <Input 
                  placeholder="Workspace Name" 
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  className="bg-zinc-950 border-zinc-800 text-zinc-200 focus-visible:ring-violet-500 focus-visible:ring-offset-0"
                />
                <Button 
                  onClick={handleCreateTeam} 
                  disabled={!newTeamName.trim()}
                  className="bg-violet-600 hover:bg-violet-700 text-white font-medium"
                >
                  Create
                </Button>
              </div>
            </div>

          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SideNav;
