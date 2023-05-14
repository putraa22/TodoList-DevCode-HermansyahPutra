import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={routes} />,
);
