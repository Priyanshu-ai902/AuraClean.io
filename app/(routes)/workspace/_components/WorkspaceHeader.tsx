import { Button } from '@/components/ui/button'
import { Link, Save } from 'lucide-react'
import React from 'react'

function WorkspaceHeader({onSave}:any) {
    return (
        <div className='p-3 border-b flex justify-between items-center'>
            <div className="flex gap-2 items-center">
                <h3 className='font-bold'>File Name</h3>
            </div>

            <div className='flex items-center gap-4'>
                <Button className='h-8 text-[12px] gap-2
                bg-violet-500 hover:bg-violet-700  '
                onClick={()=>onSave()}>
                    <Save className='h-4 w-4 ' /> Save
                </Button>
                <Button className='h-8 text-[12px] gap-2 bg-green-500 hover:bg-green-700'>
                    Share <Link className='h-4 w-4 ' />
                </Button>
            </div>
        </div>
    )
}

export default WorkspaceHeader
