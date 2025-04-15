// @ts-nocheck
import { useState } from 'react'

export default function useDialogWindow(initialDialog) {
   const initialDialogState = initialDialog
      ? initialDialog
      : {
           open: false,
           title: '',
           description: '',
           actionText: '',
           closeText: '',
           handleAction: () => {
              // //console.log('handleAction')
           },
           onOpenChange: (bool) => {
              //console.log('onOpenChange', bool)
              handleSetDialog({ open: bool })
           },
        }

   const [dialog, setDialog] = useState(initialDialogState)
   ////console.log('dialog ->', dialog)
   function handleSetDialog(newDialog) {
      setDialog({ ...dialog, ...newDialog })
   }

   return {
      dialog,
      handleSetDialog,
   }
}
