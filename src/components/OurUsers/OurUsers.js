import styles from "src/components/OurUsers/OurUsers.module.scss";
import { useState, useEffect } from "react";
import DeleteSectionButton from "../DeleteSectionButton/DeleteSectionButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";

export default function OurUsers({ sorting }) {
  const [user, setUser] = useState([]);

  const url = `http://localhost:8080/api/showusers`;
  const url2 = `http://localhost:8080/api/showusersbyrole`;
  const url3 = `http://localhost:8080/api/showusersbyfirstname`;
  const url4 = `http://localhost:8080/api/showusersbylastname`;

  const getURL = () => {
    if (sorting === "default") {
      return url;
    } else if (sorting === "accountType") {
      return url2;
    } else if (sorting === "firstname") {
      return url3;
    } else if (sorting === "lastname") {
      return url4;
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchResponse = await fetch(getURL());
        const data = await fetchResponse.json();
        setUser(data);
        console.log("användare wohoo!");
      } catch (error) {
        console.error("error with fetching users: ", error);
      }
    };

    fetchUsers();
  }, [sorting]);

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Användarnamn</TableCell>
              <TableCell>Förnamn</TableCell>
              <TableCell>Efternamn</TableCell>
              <TableCell>Kontotyp</TableCell>
              <TableCell>Ta bort</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.map((userModel, index) => (
              <TableRow key={index}>
                <TableCell>{userModel.username}</TableCell>
                <TableCell>{userModel.firstname}</TableCell>
                <TableCell>{userModel.lastname}</TableCell>
                <TableCell>{userModel.role}</TableCell>
                <TableCell>
                  <DeleteSectionButton />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
