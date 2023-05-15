import styles from "src/components/EditPlaceButton/EditPlaceButton.module.scss";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

export default function EditPlaceButton() {
  return (
    <div>
      <IconButton variant="contained" type="submit" className={styles.button}>
        <EditIcon />
      </IconButton>
    </div>
  );
}
