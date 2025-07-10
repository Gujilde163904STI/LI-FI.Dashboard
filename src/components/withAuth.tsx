import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '@/providers/firebase-auth-provider';

export function withAuth(Component: React.ComponentType) {
  return function WithAuthWrapper(props: any) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login');
      } else if (!loading) {
        setIsCheckingAuth(false);
      }
    }, [user, loading, router]);

    if (isCheckingAuth) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Checking authentication...</div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}