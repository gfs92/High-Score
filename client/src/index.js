import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Leaderboard from "./components/Leaderboard";
import CreateGame from "./components/CreateGame";
import Layout from "./components/Layout";
import CreateGameSuccess from "./components/CreateGameSuccess";
import CreateGameError from "./components/CreateGameError";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./routes/error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <App />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/leaderboard",
    children: [
      {
        path: ":id",
        element: (
          <Layout>
            <Leaderboard />
          </Layout>
        ),
      },
    ],
  },
  {
    path: "/CreateGame",
    element: (
      <Layout>
        <CreateGame />
      </Layout>
    ),
  },
  {
    path: "/CreateGameSuccess",
    element: (
      <Layout>
        <CreateGameSuccess />
      </Layout>
    ),
  },
  {
    path: "/CreateGameError",
    element: (
      <Layout>
        <CreateGameError />
      </Layout>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
