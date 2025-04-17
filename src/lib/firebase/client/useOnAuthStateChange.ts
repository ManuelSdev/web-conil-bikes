// @ts-nocheck
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { app, auth } from './firebaseClient'

const formatAuthUser = (user) => ({
   ...user,
})

const useOnAuthStateChange = () => {
   //importo el auth de firebaseClient en lugar de crearlo aquí
   //const auth = getAuth(app)

   const [authUser, setAuthUser] = useState(null)
   const [loading, setLoading] = useState(true)

   const authStateChanged = async (authState) => {
      console.log('useOnAuthStateChange authState->', authState)
      if (!authState) {
         setAuthUser(null)
         setLoading(false)
         return
      }

      setLoading(true)
      const formattedUser = formatAuthUser(authState)
      setAuthUser(formattedUser)
      setLoading(false)
   }

   // listen for Firebase state change
   useEffect(() => {
      //   //console.log('=============', auth)
      const unsubscribe = onAuthStateChanged(auth, authStateChanged)
      return () => unsubscribe()
   }, [])
   //  //console.log('LOADING 1 -> ', loading)
   return {
      authUser,
      loading,
   }
}

export default useOnAuthStateChange
