import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Mypage from "./pages/Mypage";
import ErrorPage from "./error-page";
import VideoRoom from "./pages/VideoRoom";
import { MatchBar } from "./components/VideoRoom/MatchBar";
import { HiddenMatchBar } from "./components/VideoRoom/HiddenMatchBar";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/main",
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/main/matching-room",
    element: <VideoRoom />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HiddenMatchBar/> },
      { path: "matched", element: <MatchBar/> },
    ]
  },
  {
    path: "/main/mypage",
    element: <Mypage />,
    errorElement: <ErrorPage />,
  },
]);


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
