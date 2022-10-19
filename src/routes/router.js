import {createBrowserRouter} from "react-router-dom";
import Authorization from "../pages/authorization/authorization";
import TwoFactorsAuthentication from "../pages/authorization/twoFactorsAuthentication";
import HomePage from "../pages/mainpage/homepage";
import React from "react";
import NotFoundPage from "../components/notFoundPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Authorization />,
        errorElement: <NotFoundPage />,
    },
    {
        path: '/:id/two-factors-authentication/',
        element: <TwoFactorsAuthentication state={Authorization.state}/>,
        errorElement: <NotFoundPage />,
    },
    {
        path: '/home/',
        element: <HomePage />,
        errorElement: <NotFoundPage />,
        children: [

        ]
    },
]);