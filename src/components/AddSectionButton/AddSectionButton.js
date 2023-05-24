import styles from "src/components/AddSectionButton/AddSectionButton.module.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useEffect } from "react";
import { Alert } from "@mui/material";

export default function AddSectionButton({ placeId }) {
  const [open, setOpen] = useState(false);
  const [sectionName, setSectionName] = useState("");
  const [sectionAlreadyExists, setSectionAlreadyExists] = useState(false);
  const [placeNotExisting, setPlaceNotExisting] = useState(false);

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
        } else if (response.status === 409) {
          console.log("Finns redan en identisk sektion");
          setSectionAlreadyExists(true);
        } else if (response.status === 404) {
          console.log("Plats kan inte hittas...");
          setPlaceNotExisting(true);
        } else {
          setOpen(true);
          console.log("Oj! Något gick fel!");
          throw new Error("Gick inte att skapa ett område");
        }
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    setSectionAlreadyExists(false);
  }, [sectionName]);

  return (
    <div>
      <Button
        sx={{
          fontWeight: "bold",
          backgroundColor: "#16697a",
          color: "#ffffff",
        }}
        variant="contained"
        type="submit"
        className={styles.button}
        onClick={() => handleClickOpen()}
      >
        Lägg till område
      </Button>
      <Dialog open={open} onClose={handleClose}>
        {placeNotExisting && (
          <Alert severity="error">
            Kan inte hitta Platsen du försöker lägga till ett Område i
          </Alert>
        )}
        <DialogTitle>Skapa område</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lägg till ett valfritt område,
            t.ex.&nbsp;&quot;Kylskåpet&quot;,&nbsp;&quot;Städskåpet&quot; eller
            &quot;Kryddhyllan&quot;
          </DialogContentText>
          <TextField
            onChange={(e) => setSectionName(e.target.value)}
            value={sectionName}
            helperText={
              sectionAlreadyExists
                ? "Det finns redan ett område med samma namn inom denna Plats"
                : ""
            }
            error={sectionAlreadyExists}
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
