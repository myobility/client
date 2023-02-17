import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Agora } from "./pages/Agora";
import { Dynamic } from "./pages/dynamic";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Agora />,
    },
    {
      path: "/Dynamic",
      element: <Dynamic />,
    },
  ]);

  return (
    <>
      <a href="/">AGORA</a>&nbsp;&nbsp;&nbsp;
      <a href="/dynamic">DYNAMIC</a>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
