import { useRouter } from "next/router";
import { useEffect } from "react";
import jwt from "jsonwebtoken";

const withAuth = (WrappedComponent, allowedRoles = []) => {
  return (props) => {
    const router = useRouter();
    const token =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("token")
        : null;
    const decodedToken = token ? jwt.decode(token) : null;
    const role = decodedToken ? decodedToken.role : null;
    const isAuthenticated = !!role;

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (!allowedRoles.includes(role)) {
        router.push("/");
      }
    }, [isAuthenticated, allowedRoles, role]);

    if (!isAuthenticated || !allowedRoles.includes(role)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
