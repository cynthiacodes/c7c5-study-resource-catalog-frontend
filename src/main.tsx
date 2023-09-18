import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NewResource } from "./components/NewResource";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/newresource",
        element: <NewResource />,
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider>
            <RouterProvider router={router} />
        </ChakraProvider>
    </React.StrictMode>
);
