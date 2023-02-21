<<<<<<< HEAD
import { useState } from "react";
=======
import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Mypage from "./pages/Mypage";
import ErrorPage from "./error-page";
import VideoRoom from "./pages/VideoRoom";
>>>>>>> FE_wonju

function App() {
  return (
    <>
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/main/mypage" element={<Mypage />} />
        <Route path="/main/matching-room" element={<VideoRoom />}>
          <Route path="matched" element={}/>
        </Route>

      </Routes> */}
    </>
  );
}

export default App;
