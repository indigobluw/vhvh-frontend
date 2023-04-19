import styles from "src/components/Navbar/Navbar.module.css";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  return (
    <div>
      <navbar className={styles.navbar}>
        <ul className={styles.ul}>
          <Link href="/">
            <li className={styles.li}>Home</li>
          </Link>
          <Link href="/comingSoon">
            <li className={styles.li}>Contact</li>
          </Link>
          <Link href="/comingSoon">
            <li className={styles.li}>About us</li>
          </Link>
          <li className={styles.burger}>
            <MenuIcon fontSize="large" color="primary" />
          </li>
        </ul>
      </navbar>
    </div>
  );
}
