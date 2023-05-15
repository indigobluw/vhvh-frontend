import styles from "src/components/ShowSectionButton/ShowSectionButton.module.scss";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function ShowSectionButton() {
  return (
    <div>
      <IconButton variant="contained" type="submit" className={styles.button}>
        <KeyboardArrowDownIcon />
      </IconButton>
    </div>
  );
}
