import styles from "src/components/AddPlaceButton/AddPlaceButton.module.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import jwt from "jsonwebtoken";
import { useEffect } from "react";

export default function AddPlaceButton() {
  const [open, setOpen] = useState(false);
  const [placeName, setPlaceName] = useState("");
  const [placeAlreadyExists, setPlaceAlreadyExists] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleAddPlace(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const decodedToken = jwt.decode(token);
    const username = decodedToken ? decodedToken.sub : null;
    const url = `http://localhost:8080/api/createplace/${username}`;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const payload = JSON.stringify({
      placeName: placeName,
    });

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: payload,
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (response.status === 201) {
          console.log("Du har skapat en plats");
          setOpen(false);
          return response.json();
        } else if (response.status === 409) {
          console.log("Finns redan en plats med samma namn");
          setPlaceAlreadyExists(true);
        } else {
          setOpen(true);
          console.log("Oj! Något gick fel!");
          throw new Error("Gick inte att skapa en plats");
        }
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    setPlaceAlreadyExists(false);
  }, [placeName]);

  return (
    <div>
      <Button
        sx={{
          fontWeight: "bold",
          backgroundColor: "#489fb5",
          color: "#ffffff"
        }}
        variant="contained"
        type="submit"
        className={styles.button}
        onClick={() => handleClickOpen()}
      >
        Lägg till plats
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Skapa plats</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lägg till en valfri plats, t.ex. &quot;Hemma&quot;,
            &quot;Landstället&quot; eller &quot;Adressvägen 1&quot;
          </DialogContentText>
          <TextField
            onChange={(e) => setPlaceName(e.target.value)}
            value={placeName}
            autoFocus
            margin="dense"
            id="name"
            label="Plats"
            type="text"
            fullWidth
            variant="standard"
            helperText={placeAlreadyExists 
            ? "Du har redan en plats med det här namnet"
            : ""
            }
            error={placeAlreadyExists}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Avbryt</Button>
          <Button onClick={handleAddPlace}>Lägg till</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
