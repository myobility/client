import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Mypage from "./pages/Mypage";

const router = createBrowserRouter([
  {
      path: "/",
      element: <Home />,
  },
  {
      path: "/main",
      element: <Main />,
  },
  {
      path: "/main/mypage",
      element: <Mypage />,
  },
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
