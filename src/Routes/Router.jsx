import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Components/Home/Home";
import Error from "../Pages/Error/Error";
import AllPlants from "../Pages/AllPlants/AllPlants";
import AddPlants from "../Pages/AddPlants/AddPlants";
import Myplants from "../Pages/Myplants/Myplants";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        errorElement: <Error/>,
        children: [
            {
                path: '/',
                Component: Home,
            },
            {
                path: '/allplants',
                Component: AllPlants,
            },
            {
                path: '/addplants',
                Component: AddPlants,
            },
            {
                path: '/myplants',
                Component: Myplants,
            },
        ]
    }
])