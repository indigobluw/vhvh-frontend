import styles from "src/components/Place/Place.module.scss";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import AddPlaceButton from "@/components/AddPlaceButton/AddPlaceButton";
import PlaceObjects from "../PlaceObjects/PlaceObjects";

export default function Place() {
  return (
    <div>
      <div className={styles.container}>
        <h3 className={styles.title}>Mina platser</h3>
        <div className={styles.addbutton}>
          <AddPlaceButton />
        </div>
      </div>
      <div>
        <PlaceObjects />
      </div>
    </div>
  );
}
