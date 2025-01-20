import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, anonymouse = false, isLoggedIn }) {
  const location = useLocation();
  const from = location.state?.from || "/profile";

  if (anonymouse && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymouse && !isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  } else {
    return children;
  }
}

export default ProtectedRoute;
