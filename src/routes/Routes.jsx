import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import DashboardLayour from "../layouts/DashboardLayour";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import Courses from "../pages/Dashboard/Courses/Courses";
import EditCourse from "../pages/Dashboard/EditCourse/EditCourse";
import SingleCourse from "../pages/SingleCourse/SingleCourse";
import Payment from "../pages/Payment/Payment";
import CreateCourse from "../pages/Dashboard/CreateCourse/CreateCourse";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: "/courses/:id",
        element: <SingleCourse />
      },
      {
        path: "/payment",
        element: <Payment />
      }
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayour /></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "create-course",
        element: <CreateCourse />
      },
      {
        path: "my-courses",
        element: <Courses />
      },
      {
        path: "edit-courses/:id",
        element: <EditCourse />
      }
    ],
  },
]);
