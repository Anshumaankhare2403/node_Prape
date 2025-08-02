import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in
  if (!user) {
    return <Navigate to="/user" replace />;
  }

  // Role check
  if (role && user.role !== role) {
    return <Navigate to="/user" replace />;
  }

  return children;
}

export default ProtectedRoute;
