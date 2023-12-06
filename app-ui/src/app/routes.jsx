import SessionPage from './views/Session/SessionPage'
import viewRoutes from './views/ViewPage/ViewRoutes';
import NotFound from './component/NotFound'
import AppLayout from './component/AppLayout';
import AuthGuard from './component/AuthGuard';
import { Navigate } from 'react-router-dom';
import ValidateUser from './component/ValidateUser';

const routes = [
    {
        element: (
            <AuthGuard>
                <AppLayout />
            </AuthGuard>
        ),
        children: [
            ...viewRoutes,
        ],
    },

    {
        path: "/session/signin", element: (
            <ValidateUser>
                <SessionPage />
            </ValidateUser>
        )
    },
    { path: "/", element: <Navigate to="/view/default" /> },
    { path: "*", element: <NotFound /> },
];

export default routes;