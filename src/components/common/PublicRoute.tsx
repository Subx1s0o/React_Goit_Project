import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '@/redux/hooks';
import { selectIsAuthenticated } from '@/redux/store/selectors';

type PublicRouteProps = {
  children: ReactNode;
  redirectTo?: string;
};

export default function PublicRoute({
  children,
  redirectTo = '/',
}: PublicRouteProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  if (isAuthenticated && location.pathname !== redirectTo) {
    return <Navigate to={redirectTo} />;
  }

  return <>{children}</>;
}