import styles from "src/components/MyData/MyData.module.scss";
import ChangeMyDataButton from "../ChangeMyDataButton/ChangeMyDataButton.js";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

export default function MyData() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [userName, setUserName] = useState("");
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
        const userName = data.username;
        const firstname = data.firstname;
        const lastname = data.lastname;
        setUserName(userName);
        setLastName(lastname);
        setFirstname(firstname);
        console.log("firstname wohoo!");
      } catch (error) {
        console.error("error with fetching firstname: ", error);
      }
    };

    fetchUserFirstname();
  }, [url]);

  return (
    <div>
      <div className={styles.container}>
        <h3 className={styles.title}>Mina användaruppgifter</h3>
        <div className={styles.changebutton}>
          <ChangeMyDataButton />
        </div>
      </div>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Användarnamn:
              </TableCell>
              <TableCell>{userName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Förnamn:
              </TableCell>
              <TableCell>{firstname}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Efternamn:
              </TableCell>
              <TableCell>{lastname}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
