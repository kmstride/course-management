import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navigation from "../components/shared/Navbar";
import { useDispatch } from "react-redux";
import { setToken } from "../feature/rootSlice";

function RootLayout() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
  if (token) {
    dispatch(setToken(token));
  }
  return (
    <div>
      <Navigation />
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default RootLayout;
