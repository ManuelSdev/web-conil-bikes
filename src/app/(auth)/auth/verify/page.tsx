// @ts-nocheck
import VerifyEmailFormPageHandler from '@/components/auth/emailActions/VeriffyEmailFormPageHandler'
import React from 'react'

export default async function VerifyEmailPage({ searchParams }) {
   /*
   const { error_code } = searchParams
   const isVerifyError = error_code ? JSON.parse(error_code) : false
   */
   return <VerifyEmailFormPageHandler />
}
