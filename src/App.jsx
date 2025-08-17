import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout/Layout";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Notfound from "./Component/404NotFound/Notfound";
import Home from "./Pages/Home/Home";
import { Toaster } from "react-hot-toast";
import PostDetails from "./Pages/PostDetails/PostDetails";
import { UserContextProvider } from "./Context/UserContext/UserContext";
import { ProtectUser } from "./Guard/ProtectUser";
import EditProfile from "./Pages/EditProfile/EditProfile";
import Profile from "./Pages/Profile/Profile";

export default function App() {
  useEffect(()=>{
        initFlowbite();
  },[])
  let routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "/", element: <ProtectUser><Home /></ProtectUser>  },
        { path: "home", element:<ProtectUser><Home /></ProtectUser>  },
        { path: "postDetails/:id", element: <ProtectUser><PostDetails /></ProtectUser>  },
        { path: "editProfile", element: <ProtectUser><EditProfile /></ProtectUser> },
        { path: "profile", element: <ProtectUser><Profile /></ProtectUser>  },
        { path: "login", element: <Login /> },
        { path: "reges", element: <Register /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);
  return (
    <>
      <UserContextProvider >
        <RouterProvider router={routes} />
        <Toaster />
      </UserContextProvider>
    </>
  );
}
