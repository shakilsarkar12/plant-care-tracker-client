import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root/Root";
import Home from "../Components/Home/Home";
import Error from "../Pages/Error/Error";
import AllPlants from "../Pages/AllPlants/AllPlants";
import AddPlants from "../Pages/AddPlants/AddPlants";
import Myplants from "../Pages/Myplants/Myplants";
import Register from "../Pages/Register/Register";
import SignUp from "../Pages/Register/SignUp";
import Login from "../Pages/Login/Login";
import PlantDetails from "../Pages/PlantDetails/PlantDetails";
import Private from "../private/Private";
import UpdatePage from "../Pages/UpdatePage/UpdatePage";
import Loader from "../Components/Loader/Loader";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import Profile from "../Pages/Profile/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        loader: () => fetch("https://plant-care-tracker-server-black.vercel.app/newplants"),
        id: "newplants",
        hydrateFallbackElement: <Loader />,
        Component: Home,
      },
      {
        path: "/allplants",
        Component: AllPlants,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/plantdetails/:id",
        Component: PlantDetails,
      },
      {
        path: "/register",
        Component: SignUp,
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
  {
    path: "/",
    element: (
      <Private>
        <DashboardLayout />
      </Private>
    ),
    children: [
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "addplants",
        Component: AddPlants
      },
      {
        path: "myplants",
        Component: Myplants 
      },
      {
        path: "profile",
        Component: Profile 
      },
      {
        path: "/update/:id",
        loader: ({ params }) =>
          fetch(
            `https://plant-care-tracker-server-black.vercel.app/plant/${params.id}`
          ),
        hydrateFallbackElement: <Loader />,
        Component: UpdatePage,
      },
    ],
  },
]);
