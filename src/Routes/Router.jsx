import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Components/Home/Home";
import Error from "../Pages/Error/Error";
import AllPlants from "../Pages/AllPlants/AllPlants";
import AddPlants from "../Pages/AddPlants/AddPlants";
import Myplants from "../Pages/Myplants/Myplants";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import PlantDetails from "../Pages/PlantDetails/PlantDetails";
import Private from "../private/Private";
import UpdatePage from "../Pages/UpdatePage/UpdatePage";
import Loader from "../Components/Loader/Loader";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        loader: () =>
          fetch("https://plant-care-tracker-server-black.vercel.app/newplants"),
        id: "newplants",
        hydrateFallbackElement: <Loader />,
        Component: Home,
      },
      {
        path: "/allplants",
        Component: AllPlants,
      },
      {
        path: "/addplants",
        element: (
          <Private>
            <AddPlants />
          </Private>
        ),
      },
      {
        path: "/myplants",
        element: (
          <Private>
            <Myplants />
          </Private>
        ),
      },
      {
        path: "/plantdetails/:id",
        Component: PlantDetails,
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
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
]);
