import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { getUser } from '../utils/user';

type ProtectedRouteProps = {
    children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const location = useLocation();
    const user = getUser();

    if (!user) {
        return <Navigate state={location.pathname} to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
