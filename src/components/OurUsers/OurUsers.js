import styles from "src/components/OurUsers/OurUsers.module.scss";
import { useState, useEffect } from "react";
import DeleteSectionButton from "../DeleteSectionButton/DeleteSectionButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";

export default function OurUsers() {
  const [user, setUser] = useState([]);

  const url = `http://localhost:8080/api/showusers`;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchResponse = await fetch(url);
        const data = await fetchResponse.json();
        setUser(data);
        console.log("användare wohoo!");
      } catch (error) {
        console.error("error with fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Användarnamn</TableCell>
              <TableCell>Förnamn</TableCell>
              <TableCell>Efternamn</TableCell>
              <TableCell>Roll</TableCell>
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
