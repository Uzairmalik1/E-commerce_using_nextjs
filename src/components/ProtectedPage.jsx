"use client"
import { useEffect, useState } from 'react';
import { getSession } from '@/utils/actions';
import { useRouter } from 'next/navigation';

const ProtectedPage = ({ children }) => {
  const router = useRouter();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);

      // Check user role and redirect if unauthorized
      if (!session || !session.isLoggedIn) {
        router.push('/login');
      } else if (session.user.role === 'MANIGER' && (router.pathname === '/dashboard/users' || router.pathname === '/dashboard/orders')) {
        router.push('/unauthorized');
      }
    };

    fetchSession();
  }, [router]);

  if (!session || !session.isLoggedIn) {
    return <div>Loading...</div>; // Optionally, show a loading indicator
  }

  return <>{children}</>;
};

export default ProtectedPage;
