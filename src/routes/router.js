import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/mainpage/homepage";
import React from "react";
import NotFoundPage from "../components/notFoundPage";
import Authorization from "../pages/authorization/authorization";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Authorization/>,
        errorElement: <NotFoundPage />,
    },
    {
        path: '/home/',
        element: <HomePage />,
        errorElement: <NotFoundPage />,
    },
]);