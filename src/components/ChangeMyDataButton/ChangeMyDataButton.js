import styles from "src/components/ChangeMyDataButton/ChangeMyDataButton.module.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";

export default function ChangeMyDataButton() {
  const [open, setOpen] = useState(false);
  const [savedUsername, setSavedUsername] = useState("");
  const [savedFirstname, setSavedFirstname] = useState("");
  const [savedLastname, setSavedLastname] = useState("");
  const [savedPassword, setSavedPassword] = useState("");
  const [savedRole, setSavedRole] = useState("");
  const [updatedFirstname, setUpdatedFirstname] = useState("");
  const [updatedLastname, setUpdatedLastname] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwt.decode(token);
    const username = decodedToken ? decodedToken.sub : null;
    const url = `http://localhost:8080/api/showuser/${username}`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user data");
        }
      })
      .then((data) => {
        setSavedUsername(username);
        setSavedFirstname(data.firstname);
        setSavedLastname(data.lastname);
        setSavedPassword(data.password);
        setSavedRole(data.role);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleUpdateUser(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const decodedToken = jwt.decode(token);
    const username = decodedToken ? decodedToken.sub : null;
    const url = `http://localhost:8080/api/updateuser/${username}`;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const payload = JSON.stringify({
      username: savedUsername,
      firstname: updatedFirstname !== "" ? updatedFirstname : savedFirstname,
      lastname: updatedLastname !== "" ? updatedLastname : savedLastname,
      password: savedPassword,
      role: savedRole,
    });

    const requestOptions = {
      method: "PUT",
      headers: headers,
      body: payload,
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          console.log("Du har uppdaterat dina användaruppgifter");
          setOpen(false);
          return response.json();
        } else {
          setOpen(true);
          console.log("Oj! Något gick fel!");
          throw new Error("Gick inte att uppdatera dina användaruppgifter");
        }
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <div>
      <Button
        variant="contained"
        type="submit"
        className={styles.button}
        onClick={() => handleClickOpen()}
      >
        Ändra
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ändra dina användaruppgifter</DialogTitle>
        <DialogContent className={styles.form}>
          Ändra valfritt antal fält.
          <TextField
            value={updatedFirstname}
            onChange={(e) => setUpdatedFirstname(e.target.value)}
            id="outlined-basic"
            label="Förnamn"
            type="text"
            autoComplete="given-name"
            className={styles.textfield}
          />
          <TextField
            required
            value={updatedLastname}
            onChange={(e) => setUpdatedLastname(e.target.value)}
            id="outlined-basic-2"
            label="Efternamn"
            type="text"
            autoComplete="family-name"
            className={styles.textfield}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Avbryt</Button>
          <Button onClick={handleUpdateUser}>Ändra</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
