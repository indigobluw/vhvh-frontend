import styles from "src/components/SectionObject/SectionObject.module.scss";
import EditPlaceButton from "../EditPlaceButton/EditPlaceButton";
import DeletePlaceButton from "../DeletePlaceButton/DeletePlaceButton";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function SectionObject() {
  return (
    <div>
      <ul className={styles.container}>
        <li>
          <div>
            <div className={styles.list}>
              tillfällig post
              <div className={styles.icons}>
                <div>
                  <IconButton
                    variant="contained"
                    type="submit"
                    className={styles.button}
                  >
                    <KeyboardArrowDownIcon />
                  </IconButton>
                </div>
                <EditPlaceButton />
                <DeletePlaceButton />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
