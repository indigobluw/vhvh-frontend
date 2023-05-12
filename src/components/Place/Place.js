import styles from "src/components/Place/Place.module.scss";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import AddPlaceButton from "@/components/AddPlaceButton/AddPlaceButton";

export default function Place() {
  return (
    <div>
      <div className={styles.container}>
        <h3 className={styles.title}>Mina platser</h3>
        <div className={styles.addbutton}>
          <AddPlaceButton />
        </div>
        <p></p>
      </div>
      <div>plats 1 osv..</div>
    </div>
  );
}
