import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/mainpage/homepage";
import React from "react";
import NotFoundPage from "../components/notFoundPage";
import Authorization from "../pages/authorization/authorization";
import ObjectComponent from "../components/objectComponent";
import {urls} from "./urls";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Authorization bg="bg-black"/>,
        errorElement: <NotFoundPage />,
    },
    {
        path: urls.home,
        element: <HomePage bg="bg-white" />,
        errorElement: <NotFoundPage />,
    },
    {
        path: urls.createObject,
        element: <ObjectComponent bg="bg-white" newObject={true}/>,
        errorElement: <NotFoundPage />,
    },
    {
        path: urls.objectDetails(":id"),
        element: <ObjectComponent bg="bg-white" newObject={false}/>,
        errorElement: <NotFoundPage />,
    },
]);