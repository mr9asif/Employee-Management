import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './Router/Router';
import  { Toaster } from 'react-hot-toast';
import "./index.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Authprovider from './AuthProvider/Authprovider';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
  <Authprovider>
  <RouterProvider router={router} />
  <Toaster />
  </Authprovider>
  </QueryClientProvider>
  </React.StrictMode>,
)
