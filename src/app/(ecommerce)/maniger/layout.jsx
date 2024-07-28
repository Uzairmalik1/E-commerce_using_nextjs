import Sidebar from '@/components/Sidebar'
// import { getSession } from '@/utils/actions';
// import { redirect } from 'next/navigation';
import React from 'react'


const ManagerLayout = async ({children}) => {
  // const session = await getSession();
  
  // if (!session.isLoggedIn || session.user.role !== 'MANIGER') {
  //   redirect('/login');
  // }
  return (
    <div className='flex h-screen'>
        <Sidebar />
        {children}
    </div>
  )
}

export default ManagerLayout