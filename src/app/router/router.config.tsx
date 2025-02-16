import {createBrowserRouter, Navigate, RouterProvider} from "react-router";
import {RepositoriesPage} from "pages/repositories-page";
import {BackLayout, MainLayout} from "widgets/layouts";
import {RepositoryDetailsPage} from "pages/repository-page";
import {FavoritesPage} from "pages/favorites-page";
import {ROUTES} from "shared/config/router/router.const";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to={ROUTES.repositories.index} replace/>
    },
    {
        element: <MainLayout/>,
        children: [
            {
                path: ROUTES.repositories.index,
                element: <RepositoriesPage/>
            },
        ]
    },
    {
        element: <BackLayout/>,
        children: [
            {
                path: ROUTES.repositories.byId(':id'),
                element: <RepositoryDetailsPage/>
            },
            {
                path: ROUTES.favorites.index,
                element: <FavoritesPage/>
            },
        ]
    }
]);

export const Router = () => <RouterProvider router={router}/>
