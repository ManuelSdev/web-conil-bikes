// @ts-nocheck
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
//import { getAuth } from 'firebase/auth'
//import { getAnalytics } from 'firebase/analytics'
//import Firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
   authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
   projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
   storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
   messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
   appId: process.env.NEXT_PUBLIC_FB_APP_ID,
   measurementId: process.env.NEXT_PUBLIC_FB_MEASUREMENT_ID,
}

// Initialize Firebase

//console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@', getApps())
//export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)
const storage = getStorage(app)
export { auth, storage }
//console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@', getApp())
//console.log(getApp())
//console.log(getApps())
//console.log(app)
//const analytics = getAnalytics(app)
//export const auth = getAuth(app)
