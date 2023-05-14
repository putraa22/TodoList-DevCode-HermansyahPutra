import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Activity from "../pages/Activity/Activity";
import DetailActivity from "../pages/DetailActivity/DetailActivity";
import ActivityContextProvider from "../store/Activity/ActivityContextProvider";
import DetailActivityContextProvider from "../store/DetailActivity/DetailActivityContextProvider";
import ModalContextProvider from "../store/Modal/ModalContextProvider";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ActivityContextProvider>
            <ModalContextProvider>
              <Activity />
            </ModalContextProvider>
          </ActivityContextProvider>
        ),
      },
      {
        path: "/detail/:id",
        element: (
          <DetailActivityContextProvider>
            <ModalContextProvider>
              <DetailActivity />
            </ModalContextProvider>
          </DetailActivityContextProvider>
        ),
      },
    ],
  },
]);

export default routes;
