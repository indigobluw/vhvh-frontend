import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = (WrappedComponent) => {
  const token =
    typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
  const decodedToken = jwt.decode(token);
  const role = decodedToken ? decodedToken.role : null;
  return (props) => {
    const router = useRouter();

    // Perform authentication checks
    useEffect(() => {
      // Implement your authentication logic here
      // For example, check if the user has a valid token
      const isAuthenticated = checkIfUserIsAuthenticated();

      if (!isAuthenticated) {
        // Redirect to the login page or unauthorized page
        router.push("/login");
      }
    }, []);

    // Render the protected page if authenticated
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
