// @ts-nocheck
import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app'

//https://firebase.google.com/docs/admin/setup?hl=es-419#linux-or-macos
//https://firebase.google.com/docs/auth/admin?hl=es-419

export const app = () =>
   !getApps().length
      ? initializeApp({
           credential: cert({
              type: process.env.FBA_TYPE,
              project_id: process.env.FBA_PROJECT_ID,
              private_key_id: process.env.FBA_PRIVATE_KEY_ID,
              private_key: process.env.FBA_PRIVATE_KEY,
              client_email: process.env.FBA_CLIENT_EMAIL,
              client_id: process.env.FBA_CLIENT_ID,
              auth_uri: process.env.FBA_AUTH_URL,
              token_uri: process.env.FBA_TOKEN_URI,
              auth_provider_x509_cert_url: process.env.FBA_AUTH_PROV_URL,
              client_x509_cert_url: process.env.FBA_CLIENT_URL,
              //ADMIN EMULATOR ENV VAR
           }),
           projectId: process.env.FBA_PROJECT_ID,
           storageBucket: process.env.FBA_STORAGE_BUCKET,
           //  databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
        })
      : getApp()
