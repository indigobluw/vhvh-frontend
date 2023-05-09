import Link from "next/link";
import styles from "src/styles/404.module.scss";
import Button from "@mui/material/Button";

export default function FyraNollFyra() {
  return (
    <>
      <div className={styles.fyraNollFyra}>
        <h1 className={styles.rubrik}>404 - Hittar inte sidan!</h1>
        <p>Eller något annat blev fel...</p>
        <Link href="/">
          <Button variant="contained" className={styles.button}>
            Tillbaka hem
          </Button>
        </Link>
      </div>
    </>
  );
}
