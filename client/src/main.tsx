import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./components/Authentication/AuthProvider.jsx";
import routes from "./components/routes.jsx";
import "./index.css";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router} />
      </LocalizationProvider>
    </AuthProvider>
  </StrictMode>
);
