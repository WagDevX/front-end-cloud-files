import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Root from "./routes/root";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./routes/error-page";
import { DrivePage } from "./routes/drive";
import { Login } from "./routes/login";
import { SignUp } from "./routes/sign-up";
import { PermissionsPage } from "./routes/permissions";
import { Users } from "./routes/users";
import createStore, { createStoreReturn } from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import { PrivateRoute } from "./routes/private-route";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const store: createStoreReturn<object> = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: false,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <DrivePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/:folderId",
        element: (
          <PrivateRoute>
            <DrivePage />
          </PrivateRoute>
        ),
      },
      {
        path: "admin/permissions",
        element: (
          <PrivateRoute>
            <PermissionsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "admin/users",
        element: (
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "sign-up",
    element: <SignUp />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <RouterProvider router={router} />
    </AuthProvider>
    <ToastContainer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
