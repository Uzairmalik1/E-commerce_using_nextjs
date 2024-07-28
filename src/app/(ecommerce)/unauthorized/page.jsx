import { getSession } from '@/utils/actions';
import Link from 'next/link';
import React from 'react';

const Unauthorized = async () => {
  const session = await getSession();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 w-full text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
      <p className="text-lg text-gray-700 mb-4">You do not have permission to view this page.</p>
        {
          session?.user?.role === 'ADMIN' || session?.user?.role === 'MANIGER' ? (
          <Link href="/dashboard">
            <span className="text-blue-600">Go to Dashboard</span>
          </Link>
        ) : 
          <Link href="/">
            <span className="text-blue-600">Go to Home</span>
          </Link>
        }
      
    </div>
  );
};

export default Unauthorized;
