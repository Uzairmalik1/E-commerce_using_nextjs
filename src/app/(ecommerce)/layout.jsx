import Header from '@/components/Header'
import { Toaster } from '@/components/ui/toaster'
import { getSession } from '@/utils/actions'
import prisma from '@/utils/connection'
import React from 'react'

const EcommerceLayout = async ({children}) => {
  const Categories = await prisma?.Category?.findMany();
  const session = await getSession();
  const userRole = session?.user?.role;
  return (
    <div>
        <Toaster/>
        <Header Categories={Categories} session={session} userRole={userRole}/>
        {children}
    </div>
  )
}

export default EcommerceLayout