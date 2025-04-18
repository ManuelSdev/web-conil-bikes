'use client'

import React from 'react'
import useDialogWindow from '../../common/useDialogWindow'
import { DialogWindow } from '../../common/DialogWindow'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DialogWindowPageHandler({
   initialDialog,
   onOpenChangeLink,
}) {
   const router = useRouter()

   const { dialog, handleSetDialog } = useDialogWindow()

   useEffect(() => {
      /*
      onOpenChangeLink &&
         handleSetDialog({
            onOpenChange: (bool) => router.push(onOpenChangeLink),
         })
      initialDialog && handleSetDialog(initialDialog)
*/
      handleSetDialog({
         ...initialDialog,
         onOpenChange: (bool) => router.push(onOpenChangeLink),
      })
   }, [])

   return <DialogWindow {...dialog} />
}
