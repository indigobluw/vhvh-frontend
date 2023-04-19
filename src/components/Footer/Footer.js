import styles from "src/components/Footer/Footer.module.css";
import CopyrightIcon from "@mui/icons-material/Copyright";

export default function Footer() {
  return (
    <div className={styles.container}>
      <div>
        <p className={styles.copyright}>
          <CopyrightIcon />
          VHVH med ensamrätt
        </p>
      </div>
    </div>
  );
}
