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
import AdminDashboard from "../Admin/AdminDashboard";
import PrivetRoute from "../PrivetRoute/PrivetRoute";
import ErrorPage from "../Components/ErrorPage";
import ContactUs from "../Components/ContactUs";
import Message from "../Components/Message";
import AboutUs from "../Components/AboutUs";




const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement:<ErrorPage></ErrorPage>,
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
          path:'/contactus',
          element:<ContactUs></ContactUs>
        },
        {
          path:'/emdashboard',
          element:<PrivetRoute>
          <Dashboard></Dashboard>
          </PrivetRoute>
        },
        {
          path:'/about',
          element:<AboutUs></AboutUs>
        },
        {
          path:'/message',
          element:<Message></Message>
        },
        {
          path:'/hrdashboard',
          element:<PrivetRoute>
          <HrDashboard></HrDashboard>
          </PrivetRoute>
        },
        {
          path:'/employee-details/:email',
          element:<PrivetRoute>
          <EmployeeDetails></EmployeeDetails>
          </PrivetRoute>
        },
        {
          path:'admindashboard',
          element:<PrivetRoute>
          <AdminDashboard></AdminDashboard>
          </PrivetRoute>
        }
      ]
    },
  ]);

  export default router;