import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Authorization from './authorization/authorization';
import TwoFactorsAuthentication from "./authorization/twoFactorsAuthentication";
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Authorization />,
    },
    {
        path: "/two-factors-authentication",
        element: <TwoFactorsAuthentication />,
    },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
