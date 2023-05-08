import styles from "src/components/Navbar/Navbar.module.scss";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  return (
    <div>
      <navbar className={styles.navbar}>
        <ul className={styles.ul}>
          <Link href="/">
            <li className={styles.li}>Startsida</li>
          </Link>
          <Link href="/comingSoon">
            <li className={styles.li}>Kontakt</li>
          </Link>
          <Link href="/comingSoon">
            <li className={styles.li}>Om oss</li>
          </Link>
          <li className={styles.burger}>
            <MenuIcon fontSize="large" color="$Moonstone" />
          </li>
        </ul>
      </navbar>
    </div>
  );
}
