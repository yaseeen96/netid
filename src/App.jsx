import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./index.css";
import CustomNavbar from "./shared/components/navbar";

function App() {
  return (
    <div className="flex flex-col ">
      <CustomNavbar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
