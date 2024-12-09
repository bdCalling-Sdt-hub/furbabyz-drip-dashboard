import { ReactNode } from 'react';
import { useAppSelector } from '../../redux/hook';
import { useCurrentToken } from '../../redux/features/auth/authSlice';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function ProtectedRoute({ children }: { children: ReactNode }) {
    const token: string | null = useAppSelector(useCurrentToken); // Ensure token can be null

    if (!token) {
        return <Navigate to="/login" replace={true} />;
    }

    try {
        const decoded: any = jwtDecode(token); // Decode the token
        const role = decoded?.role;

        if (role !== 'ADMIN') {
            return <Navigate to="/login" replace={true} />;
        }

        return children; // Allow access to children if role is ADMIN
    } catch (error) {
        console.error('Invalid token:', error); // Handle invalid token errors
        return <Navigate to="/login" replace={true} />;
    }
}

export default ProtectedRoute;
