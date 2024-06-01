import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Home/Home";
import AllServices from "../Page/AllServices";
import ViewDetails from "../Page/ViewDetails";




const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children:[
        {
           path:'/',
           element:<Home></Home>
        },
        {
            path:'allservices',
            element:<AllServices></AllServices>
        },
        {
            path:'/viewdetails/:id',
            element:<ViewDetails></ViewDetails>
        }
      ]
    },
  ]);

  export default router;