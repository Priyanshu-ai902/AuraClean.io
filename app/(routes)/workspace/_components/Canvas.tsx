import React, { useEffect, useState } from 'react'
import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import { FILE } from '../../dashboard/_components/FileList';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

function Canvas({ onSaveTrigger, fileId, fileData }: { onSaveTrigger: any, fileId: any, fileData: FILE }) {


    const [whiteBoardData, setWhiteBoardData] = useState<any>();

    const updateWhiteboard = useMutation(api.files.updateWhiteboard)
    useEffect(() => {
        onSaveTrigger && saveWhiteboard();
    }, [onSaveTrigger])
    const saveWhiteboard = () => {
        updateWhiteboard({
            _id: fileId,
            whiteboard: JSON.stringify(whiteBoardData)
        }).then(resp => console.log(resp))
    }

 
    return (
        <div className='h-screen'>
            {fileData && <Excalidraw
                theme='dark'
                initialData={{
                    elements:fileData?.whiteboard&&JSON.parse(fileData.whiteboard)
                }}
                onChange={(excalidrawElements, appState, files) => setWhiteBoardData(excalidrawElements)}
                UIOptions={{
                    canvasActions: {
                        saveToActiveFile: false,
                        loadScene: false,
                        export: false,
                        toggleTheme: false

                    }
                }}>

                <MainMenu>
                    <MainMenu.DefaultItems.ClearCanvas />
                    <MainMenu.DefaultItems.SaveAsImage />
                    <MainMenu.DefaultItems.ChangeCanvasBackground />
                </MainMenu>
            </Excalidraw>}
        </div>
    )
}

export default Canvas
