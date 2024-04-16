import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrimaryLayout from "./components/layout/primary";
import { useState } from "react";

import Home from "./pages/home";

function App() {
  const [open, setOpen] = useState(false);
  const router = createBrowserRouter([
    {
      element: <PrimaryLayout setOpen={setOpen} />,
      children: [
        {
          path: "/",
          element: <Home open={open} setOpen={setOpen} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
