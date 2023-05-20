import { useRouter } from "next/router";
import { useEffect } from "react";
import jwt from "jsonwebtoken";

const withAuth = (WrappedComponent) => {
  const token =
    typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
  const decodedToken = jwt.decode(token);
  const role = decodedToken ? decodedToken.role : null;

  function checkIfUserIsAuthenticated() {
    const token =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("token")
        : null;
    if ((token && role === "ADMIN") || (token && role === "USER")) {
      return true;
    } else {
      return false;
    }
  }

   function checkIfAdminIsAuthenticated() {
     const token =
       typeof localStorage !== "undefined"
         ? localStorage.getItem("token")
         : null;
     if ((token && role === "ADMIN") || (token && role === "USER")) {
       return true;
     } else {
       return false;
     }
   } 

  return function WithAuthComp(props) {
    const router = useRouter();
    const isAuthenticated = checkIfUserIsAuthenticated();
    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }, [router, isAuthenticated]);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
