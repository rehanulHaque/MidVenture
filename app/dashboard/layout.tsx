import React from 'react'
import Sidebar from './_components/Sidebar'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function Layout({children}: {children: React.ReactNode}) {
  const session = await auth()
  if(!session?.user){
    redirect("/auth")
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-6 min-h-screen relative'>
      <Sidebar session={session.user}/>
      <div className='col-span-1 md:col-span-5 h-full p-4 bg-gray-50'>
        {children}
      </div>
    </div>
  )
}
