import { Button } from '@/components/ui/button'
import { Archive, Flag, Github } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import Constant from '@/app/_constant/Constant'
import PricingSection from './PricingSection'



function SideNavBottom({ onFileCreate, totalFiles }: any) {
  const menuList = [
    {
      id: 1,
      name: 'Getting Started',
      icon: Flag,
      path: ''
    },
    {
      id: 2,
      name: 'Github',
      icon: Github,
      path: ''
    },
    {
      id: 3,
      name: 'Archieve',
      icon: Archive,
      path: ''
    },
  ]
  const [fileInput, setFileInput] = useState('');

  return (
    <div>
      {menuList.map((menu, index) => (
        <h2 key={index} className='flex gap-2 p-1.5 px-2 text-[14px] hover:bg-blue-500 rounded-lg cursor-pointer'>
          <menu.icon className='h-5 w-5' />
          {menu.name}
        </h2>
      ))}

      <Dialog>
        <DialogTrigger className='w-full'>
          <Button className='w-full bg-green-500 hover:bg-green-800 justify-start mt-3 '>
            New File
          </Button>
          {totalFiles < Constant.MAX_FREE_FILE ? <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New File
                <DialogDescription>
                  <Input placeholder='Enter your file name' className='mt-3'
                    onChange={(e) => setFileInput(e.target.value)}
                  />
                </DialogDescription>
              </DialogTitle>
            </DialogHeader>
            <DialogFooter className=''>
              <DialogClose asChild>
                <Button type='button' className='bg-green-500 hover:bg-green-700'
                  disabled={!(fileInput && fileInput.length > 4)
                  }
                  onClick={() => onFileCreate(fileInput)}>
                  Create
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent> : <PricingSection/>}
        </DialogTrigger>
      </Dialog>




      <div className="h-4 w-full bg-gray-200 rounded-full mt-5">
        <div className={'h-4 bg-green-800 rounded-full'}
          style={{ width: `${(totalFiles / 5) * 100}%` }}></div>
      </div>

      <h2 className='text-[12px] mt-3'>
        <strong>{totalFiles}</strong> out of <strong>{Constant.MAX_FREE_FILE}</strong> files used</h2>
      <h2 className='text-[12px] mt-1'>Upgrade your plan for unlimited access.</h2>
    </div>


  )
}

export default SideNavBottom
