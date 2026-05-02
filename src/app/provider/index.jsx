import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "@/entities/auth/store/AuthContext";
import { router } from "./routes";

const AppProvider = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default AppProvider;
