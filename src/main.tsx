import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AddNewResource } from "./components/AddNewResource";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/newresource",
        element: <AddNewResource />,
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider>
            <RouterProvider router={router} />
        </ChakraProvider>
    </React.StrictMode>
);
