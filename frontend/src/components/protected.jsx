import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Corrected import

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found. Redirecting to login.");
    return <Navigate to="/register" />;
  }

  try {
    const decoded = jwtDecode(token); // Correct usage
    const currentTime = Date.now() / 1000; // Convert to seconds

    if (decoded.exp) {
      const remainingTime = decoded.exp - currentTime;

      if (remainingTime <= 0) {
        console.log("Token has expired. Redirecting to login.");
        localStorage.removeItem("token"); // Remove expired token
        return <Navigate to="/register" />;
      }

      console.log(
        `Token is valid. Remaining time: ${Math.floor(
          remainingTime / 60
        )} minutes and ${Math.floor(remainingTime % 60)} seconds`
      );
    }

    return <Outlet />;
  } catch (error) {
    console.log("Invalid token. Redirecting to login.", error);
    localStorage.removeItem("token");
    return <Navigate to="/register" />;
  }
};

export default ProtectedRoute;
