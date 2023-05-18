import styles from "src/components/DeletePlaceButton/DeletePlaceButton.module.scss";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeletePlaceButton() {
  return (
    <div>
      <IconButton variant="contained" type="submit" className={styles.button}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
