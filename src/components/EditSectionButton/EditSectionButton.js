import styles from "src/components/EditSectionButton/EditSectionButton.module.scss";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

export default function EditSectionButton() {
  return (
    <div>
      <IconButton variant="contained" type="submit" className={styles.button}>
        <EditIcon className={styles.icons}/>
      </IconButton>
    </div>
  );
}
