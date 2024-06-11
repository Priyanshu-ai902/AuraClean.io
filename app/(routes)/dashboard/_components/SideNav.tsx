import React, { useContext, useEffect, useState } from 'react'
import SideNavTopSection, { Team } from './SideNavTopSection'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import SideNavBottom from './SideNavBottom';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FileListContext } from '@/app/_context/FilesListContext';


function SideNav() {
  const { user } = useKindeBrowserClient();
  const [activeTeam, setActiveTeam] = useState<Team>();
  const convex = useConvex();
  const [totalFiles,setTotalFiles]=useState<Number
  >();

  const {fileList_,setFileList_}=useContext(FileListContext);

  const createFile = useMutation(api.files.createFile)

  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam])


  const onFileCreate = (fileName: string) => {
    console.log(fileName)


    createFile({
      fileName: fileName,
      teamId: activeTeam?._id,
      createdBy: user?.email,
      archive: false,
      document: "",
      whiteboard: ""

    }).then(resp => {
      if (resp) {
        getFiles();
        toast('file created successfully!')
      }
    }, (e) => {
      toast('error while creating file')
    })
  }


  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, { teamId: activeTeam?._id });
    console.log(result);
    setFileList_(result);
    setTotalFiles(result?.length)
  }



  return (
    <div className='bg-violet-400 h-screen fixed w-72 borde-r p-6 flex flex-col'>

      <div className='flex-1'>
        <SideNavTopSection user={user}
          setActiveTeamInfo={(activeTeam: Team) => setActiveTeam(activeTeam)}
        />
      </div>

      <div>
        <SideNavBottom
        totalFiles={totalFiles}
          onFileCreate={onFileCreate}
        />
      </div>

    </div>
  )
}

export default SideNav
