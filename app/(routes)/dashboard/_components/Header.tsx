import { Button } from '@/components/ui/button';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Search, Send } from 'lucide-react'
import Image from 'next/image';
import React from 'react'

function Header() {

    const { user }: any = useKindeBrowserClient();
    return (
        <div className="bg-black text-white p-12">
            {/* Top Navigation */}
            <div className="flex justify-between items-center w-full">
                {/* Left: Navigation Tabs */}
                <div className="flex gap-4">
                    <Button className="bg-gray-700 text-white px-3 py-1 rounded-md">All</Button>
                    <Button variant="ghost">Recents</Button>
                    <Button variant="ghost">Created by Me</Button>
                    <Button variant="ghost">Folders</Button>
                    <Button variant="ghost">Unsorted</Button>
                </div>

                {/* Right: Search, Profile, and Invite */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-600 rounded-md px-2 py-1 bg-gray-900">
                        <Search className="h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent outline-none px-2 text-white w-32"
                        />
                    </div>
                    <div>
                        <Image src={user?.picture} alt='user' width={30} height={30} className='rounded-full' />
                    </div>
                    <Button className="flex items-center gap-2 text-sm h-8 hover:bg-green-700 bg-green-500">
                        <Send className="h-4 w-4" /> Invite
                    </Button>
                </div>
            </div>

            {/* Main Content: Grid Layout */}
            <div className="grid grid-cols-4 gap-4 mt-8">
                <div className="bg-gray-800 p-6 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 transition">
                    <span className="text-4xl">+</span>
                    <p className="mt-2">Create a Blank File</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 transition">
                    <span className="text-4xl">📄</span>
                    <p className="mt-2">Generate an AI outline</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 transition">
                    <span className="text-4xl">📚</span>
                    <p className="mt-2">Browse Diagram Catalog</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 transition">
                    <span className="text-4xl">🖥️</span>
                    <p className="mt-2">(Example) System Architecture</p>
                </div>
            </div>
        </div>
    );
}

export default Header


