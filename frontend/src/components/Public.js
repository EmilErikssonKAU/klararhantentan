import { Outlet } from "react-router-dom";
import Login from "./Login";

const Public = () => {
  return (
    <div className="wrapper-public">
      <Login />
    </div>
  );
};

export default Public;
