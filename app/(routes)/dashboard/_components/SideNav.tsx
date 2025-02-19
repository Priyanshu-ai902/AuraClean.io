import React, { useContext, useEffect, useState } from 'react';
import SideNavTopSection, { Team } from './SideNavTopSection';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import SideNavBottom from './SideNavBottom';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FileListContext } from '@/app/_context/FilesListContext';
import { Button } from '@/components/ui/button';
import PricingSection from './PricingSection';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';


function SideNav() {
  const { user } = useKindeBrowserClient();
  const [activeTeam, setActiveTeam] = useState<Team>();
  const convex = useConvex();
  const [totalFiles, setTotalFiles] = useState<Number>();

  const { fileList_, setFileList_ } = useContext(FileListContext);
  const createFile = useMutation(api.files.createFile);

  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam]);

  const onFileCreate = (fileName: string) => {
    createFile({
      fileName,
      teamId: activeTeam?._id as string || "",
      createdBy: user?.email || undefined,
      archive: false,
      document: '',
      whiteboard: '',
    }).then(
      (resp) => {
        if (resp) {
          getFiles();
          toast('File created successfully!');
        }
      },
      (e) => {
        toast('Error while creating file');
      }
    );
  };


  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, {
      teamId: activeTeam?._id as string || "",
    });
    setFileList_(result);
    setTotalFiles(result?.length);
  };

  return (
    <div className="bg-gray-900 h-screen fixed w-80 border-r border-gray-700 p-6 flex flex-col shadow-lg">
      <div className="flex-1">
        <SideNavTopSection
          user={user}
          setActiveTeamInfo={(activeTeam: Team) => setActiveTeam(activeTeam)}
        />
      </div>
      <div>
        <SideNavBottom totalFiles={totalFiles} onFileCreate={onFileCreate} />
      </div>
      <Dialog>
        <DialogTrigger className="pt-2">
          <Button className='bg-purple-500 hover:bg-purple-600 w-full'>
            Upgrade
            <PricingSection />
          </Button>
        </DialogTrigger>
      </Dialog>
    </div>
  );
}

export default SideNav;
