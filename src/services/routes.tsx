import { createBrowserRouter } from "react-router";
import Layout from "../Layout/Layout";
import CommunityPage from "../pages/CommunityPage/CommunityPage";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";
import PostDetailPage from "../pages/PostDetailPage/PostDetailPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

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
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: `/:communityName/post/:postId/:title`,
        element: <PostDetailPage />,
      },
      {
        path: `/:communityName`,
        element: <CommunityPage />,
      },
    ],
  },
]);

export default router;
