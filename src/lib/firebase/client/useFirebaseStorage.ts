// @ts-nocheck
import {
   getStorage,
   ref,
   uploadBytes,
   uploadBytesResumable,
   getDownloadURL,
   deleteObject,
} from 'firebase/storage'
import React, { useState } from 'react'
import { app, storage } from './firebaseClient'
import { v4 as uuidv4 } from 'uuid'
import { set } from 'date-fns'

export default function useFirebaseStorage() {
   // Get a reference to the storage service, which is used to create references
   // in your storage bucket
   // Create a storage reference from our storage service
   // const storageRef = ref(storage)

   //const refsArray = (files) => files.map((file) => storageRef(file))
   const [uploadingFiles, setUploadingFiles] = useState(false)

   const [successUploadsRefs, setSuccessUploadsRefs] = useState([])

   /**
    * TODO: Implementar la función deleteFiles cuando falle una subida.
    * Debe borrar los archivos que se subieron correctamente.
    * También debe
    */
   const deleteFiles = async (refs) => {
      try {
         await Promise.all(successUploadsRefs.map((ref) => deleteObject(ref)))
         console.log('Deleted all files successfully!')
      } catch (error) {
         console.log('Error deleting files - ', error)
      }
   }

   async function uploadFile(file) {
      /**
       * Método que sube archivos
       * https://firebase.google.com/docs/storage/web/upload-files?hl=es
       */
      const fileId = uuidv4()

      const storageRef = ref(storage, `uploads/${fileId}_${file.name}`)
      try {
         const snapshot = await uploadBytes(storageRef, file)
         console.log('Uploaded a blob or file! - ', snapshot)
         const downloadURL = await getDownloadURL(snapshot.ref)
         console.log('File available at', downloadURL)
         //si se sube correctamente se guarda la referencia
         setSuccessUploadsRefs((prev) => [...prev, storageRef])
         return downloadURL
      } catch (error) {
         console.log('Error uploading file - ', error)
      }
   }

   const uploadFiles = async (files) => {
      setUploadingFiles(true)
      try {
         //const downloadURLs = files.map(async (file) => await uploadFile(file))
         const downloadURLs = await Promise.all(
            files.map((file) => uploadFile(file))
         )
         console.log('Uploaded all files successfully!')
         return downloadURLs
      } catch (error) {
         console.log('Error uploading files - ', error)
      } finally {
         setUploadingFiles(false)
      }
   }

   return { uploadingFiles, uploadFiles }
}

async function uploadFileResum(file) {
   /**
    * Método que sube archivos y permite pausar y reanudar la subida
    * https://firebase.google.com/docs/storage/web/upload-files?hl=es#manage_uploads
    */
   const fileId = uuidv4()
   const storageRef = ref(storage, `uploads/${fileId}_${file.name}`)

   const uploadTask = uploadBytesResumable(storageRef, file)
   let downloadURL
   // Register three observers:
   // 1. 'state_changed' observer, called any time the state changes
   // 2. Error observer, called on failure
   // 3. Completion observer, called on successful completion
   uploadTask.on(
      'state_changed',
      (snapshot) => {
         // Observe state change events such as progress, pause, and resume
         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
         const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
         console.log('Upload is ' + progress + '% done')
         switch (snapshot.state) {
            case 'paused':
               console.log('Upload is paused')
               break
            case 'running':
               console.log('Upload is running')
               break
         }
      },
      (error) => {
         // Handle unsuccessful uploads
         console.error('Error uploading file - ', error)
      },
      async () => {
         // Handle successful uploads on complete
         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL)
         })
         downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
      }
   )
   return downloadURL
}

const uploadFiless = async (files) => {
   const downloadURLs = files.map((file) => uploadFile(file))

   const refs = refsArray(files)
   try {
      await Promise.all(
         files.map((file, index) => uploadBytes(refs[index], file))
      )
      console.log('Uploaded all files successfully!')
   } catch (error) {
      console.log('Error uploading files - ', error)
   }
}
