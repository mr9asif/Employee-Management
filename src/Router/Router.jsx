import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Home/Home";
import AllServices from "../Page/AllServices";
import ViewDetails from "../Page/ViewDetails";
import Login from '../Page/Login'
import Signup from "../Page/Signup";
import Dashboard from "../EmployeDashboard/Dashboard";
import HrDashboard from "../HrDashboard/HrDashboard";
import EmployeeDetails from "../HrDashboard/EmployeeDetails";




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
        },
        {
          path:'/emdashboard',
          element:<Dashboard></Dashboard>
        },
        {
          path:'/hrdashboard',
          element:<HrDashboard></HrDashboard>
        },
        {
          path:'/employee-details/:email',
          element:<EmployeeDetails></EmployeeDetails>
        }
      ]
    },
  ]);

  export default router;