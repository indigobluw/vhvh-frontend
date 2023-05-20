import styles from "src/components/Footer/Footer.module.scss";
import CopyrightIcon from "@mui/icons-material/Copyright";

export default function Footer() {
  return (
    <div>
      <div>
        <p className={styles.copyright}>
          <CopyrightIcon sx={{ color: "#ede7e3" }} />
          VHVH med ensamrätt
        </p>
      </div>
    </div>
  );
}
