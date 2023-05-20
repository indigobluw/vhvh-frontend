import styles from "src/components/AddArticleButton/AddArticleButton.module.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useEffect } from "react";

export default function AddArticleButton({ sectionId }) {
  const [open, setOpen] = useState(false);
  const [articleName, setArticleName] = useState("");
  const [articleAmount, setArticleAmount] = useState("");
  const [typeOfAmount, setTypeOfAmount] = useState("");
  const [bestBefore, setBestBefore] = useState("");
  const [invalidDate, setInvalidDate] = useState(false);
  const [inavlidAmount, setInvalidAmount] = useState(false);

  useEffect(() => {
    const articleAmountRegex = /^[0-9]*$/;
    const dateRegex = /^(\d{4}-\d{2}-\d{2})?$/;

    if (!articleAmountRegex.test(articleAmount)) {
      setInvalidAmount(true);
    } else {
      setInvalidAmount(false);
    }

    if (!dateRegex.test(bestBefore)) {
      setInvalidDate(true);
    } else {
      setInvalidDate(false);
    }
  }, [articleAmount, bestBefore]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleAddArticle(e) {
    e.preventDefault();
    const url = `http://localhost:8080/api/createArticle/${sectionId}`;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const payload = JSON.stringify({
      articleName: articleName,
      articleAmount: articleAmount,
      typeOfAmount: typeOfAmount,
      bestBefore: bestBefore,
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
          console.log("Du har skapat en artikel");
          setOpen(false);
          return response.json();
        } else {
          setOpen(true);
          console.log("Oj! Något gick fel!");
          throw new Error("Gick inte att skapa en artikel");
        }
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <div>
      <Button
        sx={{
          color: "#489fb5",
          backgroundColor: "#ffffff",
          fontWeight: "bold",
        }}
        variant="contained"
        type="submit"
        className={styles.button}
        onClick={() => handleClickOpen()}
      >
        Lägg till artikel
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Lägg till artkiel</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lägg till ett namn på din artikel,
            t.ex.&nbsp;&quot;Goudaost&quot;&nbsp;eller&nbsp;&quot;Toapappaer&quot;
          </DialogContentText>
          <TextField
            onChange={(e) => setArticleName(e.target.value)}
            value={articleName}
            id="name"
            label="Artikel"
            type="text"
            required
            className={styles.textfield}
          />
          <DialogContentText>
            Valfritt: Lägg till mängd av artikeln i heltal,
            t.ex.&nbsp;&quot;1&quot;&nbsp;eller&nbsp;&quot;10&quot;
          </DialogContentText>
          <TextField
            value={articleAmount}
            onChange={(e) => setArticleAmount(e.target.value)}
            id="outlined-basic"
            label="Mängd"
            type="text"
            error={inavlidAmount}
            className={styles.textfield}
          />
          <DialogContentText>
            Valfritt: Lägg till typ av enhet t.ex.&nbsp;&quot;Påse&quot;
            &quot;Liter&quot;&nbsp;eller&nbsp;&quot;g&quot;
          </DialogContentText>
          <TextField
            value={typeOfAmount}
            onChange={(e) => setTypeOfAmount(e.target.value)}
            id="outlined-basic"
            label="Typ av enhet"
            type="text"
            className={styles.textfield}
          />
          <DialogContentText>
            Valfritt: Lägg till ett bäst-före-datum i följade
            format&nbsp;&quot;2023-06-01&quot;
          </DialogContentText>
          <TextField
            value={bestBefore}
            onChange={(e) => setBestBefore(e.target.value)}
            id="outlined-basic"
            label="Bäst före"
            type="text"
            error={invalidDate}
            className={styles.textfield}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Avbryt</Button>
          <Button onClick={handleAddArticle}>Lägg till</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
