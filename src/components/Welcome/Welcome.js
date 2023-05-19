import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";

export default function Welcome() {
  const [firstname, setFirstname] = useState("");
  const token =
    typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
  const decodedToken = jwt.decode(token);
  const username = decodedToken ? decodedToken.sub : null;

  const url = `http://localhost:8080/api/showuser/${username}`;

  useEffect(() => {
    const fetchUserFirstname = async () => {
      try {
        const fetchResponse = await fetch(url);
        const data = await fetchResponse.json();
        const firstname = data.firstname;
        setFirstname(firstname);
        console.log("firstname wohoo!");
      } catch (error) {
        console.error("error with fetching firstname: ", error);
      }
    };

    fetchUserFirstname();
  }, []);

  return <div>Välkommen {firstname}!</div>;
}
