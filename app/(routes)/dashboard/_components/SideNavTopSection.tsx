import { ChevronDown, LayoutGrid, LogOut, Settings, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'
import { Separator } from '@radix-ui/react-separator'
import Image from 'next/image'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'


export interface Team {
    createdBy: String,
    teamName: String,
    _id: String
}

function SideNavTopSection({ user, setActiveTeamInfo }: any) {
    const menu = [
        {
            id: 1,
            name: 'Create Team',
            path: '/teams/create',
            icon: Users
        },
        {
            id: 2,
            name: 'Settings',
            path: '',
            icon: Settings
        }
    ];

    const router = useRouter();
    const convex = useConvex();

    const [activeTeam, setActiveTeam] = useState<Team>();


    const [teamList, setTeamList] = useState<Team[]>();

    useEffect(() => {
        user && getTeamList();
    }, [user])

    useEffect(() => {
        activeTeam && setActiveTeamInfo(activeTeam)
    }, [activeTeam])
    const getTeamList = async () => {
        const result = await convex.query(api.teams.getTeam, { email: user?.email });
        setTeamList(result);
        setActiveTeam(result[0]);
    }


    const onMenuClick = (item: any) => {
        router.push(item.path);
    }

    return (
        <div>
            <Popover>
                <PopoverTrigger className='w-full'>
                    <div className="text-white  items-center gap-3  bg-gray-700 p-3 rounded-lg cursor-pointer w-full">
                        
                        <h2 className='flex gap-2 items-center font-medium '>
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/016/012/682/non_2x/eraser-creative-icon-design-free-vector.jpg"
                            alt="logo"
                            width={30}
                            height={30}
                            className="rounded-full"
                        />
                            {activeTeam?.teamName}
                            <ChevronDown/>
                        </h2>

                    </div>
                </PopoverTrigger>
                <PopoverContent className='ml-7 p-4 '>
                    <div>
                        {teamList?.map((team, index) => (
                            <h2 key={index} className={`p-2 hover:bg-purple-500 hover:text-white rounded-lg mb-1 cursor-pointer ${activeTeam?._id == team._id && 'bg-violet-600 text-white'}`}
                                onClick={() => setActiveTeam(team)}>
                                {team.teamName}</h2>
                        ))}

                    </div>
                    <Separator className='mt-2 bg-red-500' />
                    <div>
                        {menu.map((item, index) => (
                            <h2 key={index} className='flex gap-2 items-center p-2 hover:bg-green-200'
                                onClick={() => onMenuClick(item)}>
                                <item.icon className='h-4 w-4' />
                                {item.name}</h2>
                        ))}
                        <LogoutLink>
                            <h2 className='flex gap-2 items-center p-2 hover:bg-green-200'>
                                <LogOut className='h-4 w-4' />
                                Logout</h2>
                        </LogoutLink>
                    </div>
                    <Separator className='mt-2 bg-slate-500' />

                    {user && <div className='mt-2 flex gap-2 items-center'>
                        <Image src={user?.picture} alt='user' width={30} height={30} className='rounded-full' />
                        <div className="">
                            <h2 className='text-[14px] font-bold'>{user?.given_name} {user?.family_name}</h2>
                            <h2 className='text-[12px] text-blue-500'>{user?.email}</h2>
                        </div>
                    </div>}
                </PopoverContent>
            </Popover>

            <Button variant='outline' className='w-full h-14 justify-start gap-2 font-bold mt-8 bg-black text-white'>
                <LayoutGrid className='h-6 w-5 ' />
                All Files
            </Button>


            
        </div>



    )
}

export default SideNavTopSection
