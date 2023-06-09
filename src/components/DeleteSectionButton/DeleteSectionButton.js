import styles from "src/components/DeleteSectionButton/DeleteSectionButton.module.scss";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteSectionButton() {
  return (
    <div>
      <IconButton variant="contained" type="submit" className={styles.button}>
        <DeleteIcon sx={{ color: "#82c0cc" }} className={styles.icons} />
      </IconButton>
    </div>
  );
}
