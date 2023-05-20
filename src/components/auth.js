import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = (WrappedComponent) => {
  const token =
    typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
  const decodedToken = jwt.decode(token);
  const role = decodedToken ? decodedToken.role : null;

  return function WithAuthComp(props) {
    const router = useRouter();
    useEffect(() => {
      const isAuthenticated = checkIfUserIsAuthenticated();

      if (!isAuthenticated) {
        router.push("/login");
      }
    }, [router]);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
