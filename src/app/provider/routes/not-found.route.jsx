import React from "react";
import NotFoundPage from "@/pages/not-found";

const notFoundRoutes = [
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default notFoundRoutes;
