import { createBrowserRouter } from "react-router-dom";
import Home from "./shared/containers/home";
import About from "./shared/containers/about";
import Dashboard from "./features/dashboard/containers/dashboard";
import ConnectWalletPage from "./shared/components/connectWalletPage";
import CreateNetid from "./shared/containers/createNetid";

const routes = [
  {
    path: "/",
    element: <Home />,
    // loader: rootLoader,
  },
  {
    path: "about",
    element: <About />,
    // loader: teamLoader,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    // loader: teamLoader,
  },
  {
    path: "connect",
    element: <ConnectWalletPage />,
    // loader: teamLoader,
  },
  {
    path: "create-netid",
    element: <CreateNetid />,
    // loader: teamLoader,
  },
];

export const router = createBrowserRouter(routes);
