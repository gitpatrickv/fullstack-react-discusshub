import { createBrowserRouter } from "react-router";
import Layout from "../Layout/Layout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
