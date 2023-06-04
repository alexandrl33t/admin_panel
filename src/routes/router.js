import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/mainpage/homepage";
import React from "react";
import NotFoundPage from "../components/notFoundPage";
import Authorization from "../pages/authorization/authorization";
import {urls} from "./urls";
import CreateUserPage from "../pages/usersPage/createUserPage/CreateUserPage";
import ObjectComponent from "../pages/objects/objectDetails/ObjectComponent";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Authorization bg="bg-black"/>,
        errorElement: <NotFoundPage />,
    },
    {
        path: urls.objects,
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
    {
        path: urls.createUser,
        element: <CreateUserPage bg="bg-white"/>,
        errorElement: <NotFoundPage />,
    },
]);