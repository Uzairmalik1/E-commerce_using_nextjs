import Sidebar from '@/components/Sidebar'
import { getSession } from '@/utils/actions';
import { redirect } from 'next/navigation';
import React from 'react'


const DashboardLayout = async ({children}) => {
  const session = await getSession();
  const role = session.user.role;
  return (
    <div className='flex w-full overflow-x-hidden'>
        <Sidebar role={role} />
        {children}
    </div>
  )
}

export default DashboardLayout