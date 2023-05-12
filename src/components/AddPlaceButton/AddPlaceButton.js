import styles from "src/components/AddPlaceButton/AddPlaceButton.module.scss";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";

export default function LogoutButton() {
  return (
    <div>
      <Button
        variant="contained"
        type="submit"
        className={styles.button}
        //onClick={() => sendAddPlaceRequest()}
      >
        Lägg till plats
      </Button>
    </div>
  );
}
