import { lazy } from 'react';
import { Loadable } from '../../component';

const PdfViewer = Loadable(lazy(() => import('./PdfView')))
const DataList = Loadable(lazy(() => import('./DataList')))

const viewRoutes = [
    {
        path: "/view/default",
        element: <DataList />,
    },
    {
        path: "/view/pdf",
        element: <PdfViewer />
    }
];

export default viewRoutes;