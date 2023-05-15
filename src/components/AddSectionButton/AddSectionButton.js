import styles from "src/components/AddSectionButton/AddSectionButton.module.scss";
import Button from "@mui/material/Button";

export default function AddSectionButton() {
  return (
    <div>
      <Button variant="contained" type="submit" className={styles.button}>
        Lägg till område
      </Button>
    </div>
  );
}
