import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function PrivateRoute({ children }) {
  const token = localStorage.getItem("authToken");
  let location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export default PrivateRoute;
