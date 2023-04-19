import styles from "src/components/Navbar/Navbar.module.css";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  return (
    <div>
      <navbar className={styles.navbar}>
        <ul className={styles.ul}>
          <li className={styles.li}>Home</li>
          <li className={styles.li}>Contact</li>
          <li className={styles.li}>About us</li>
          <li className={styles.burger}>
            <MenuIcon fontSize="large" color="primary" />
          </li>
        </ul>
      </navbar>
    </div>
  );
}
