import styles from "src/components/AddSectionButton/AddSectionButton.module.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

export default function AddSectionButton({ placeId }) {
  const [open, setOpen] = useState(false);
  const [sectionName, setSectionName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleAddPlace(e) {
    e.preventDefault();
    const url = `http://localhost:8080/api/createSection/${placeId}`;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const payload = JSON.stringify({
      sectionName: sectionName,
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
          console.log("Du har skapat ett område");
          setOpen(false);
          return response.json();
        } else {
          setOpen(true);
          console.log("Oj! Något gick fel!");
          throw new Error("Gick inte att skapa ett område");
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
        Lägg till område
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Skapa område</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lägg till ett valfritt område, t.ex. "Kylskåpet", "Städskåpet" eller
            "Kryddhyllan"
          </DialogContentText>
          <TextField
            onChange={(e) => setSectionName(e.target.value)}
            value={sectionName}
            autoFocus
            margin="dense"
            id="name"
            label="Område"
            type="text"
            fullWidth
            variant="standard"
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
