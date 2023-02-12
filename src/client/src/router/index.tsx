

import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import ErrorBoundary from "../components/ErrorBoundary";



export const router = createBrowserRouter([
    {
      path: "/",
      errorElement:<ErrorBoundary />,
      children: [
        {
            path: "/",
            element: <Homepage />,
        },
      ],
    },
  ]);