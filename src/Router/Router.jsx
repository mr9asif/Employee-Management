import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Home/Home";
import AllServices from "../Page/AllServices";
import ViewDetails from "../Page/ViewDetails";
import Login from '../Page/Login'
import Signup from "../Page/Signup";




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
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/signup',
          element:<Signup></Signup>
        }
      ]
    },
  ]);

  export default router;