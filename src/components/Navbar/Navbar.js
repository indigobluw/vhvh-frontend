import styles from "src/components/Navbar/Navbar.module.scss";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useRef, useEffect } from "react";
import AppBar from "@mui/material/AppBar";

export default function Navbar() {
  const [phoneMenuOpen, setPhoneMenuOpen] = useState(false);

  const openMenu = () => {
    setPhoneMenuOpen(!phoneMenuOpen);
  };

  const onblur = useRef(null);

  useEffect(() => {
    function handleClickOutsideMenu(event) {
      if (onblur.current && !onblur.current.contains(event.target)) {
        setPhoneMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, [onblur]);

  return (
    <div>
      <AppBar className={styles.navbar}>
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
            {phoneMenuOpen ? (
              <CloseIcon fontSize="large" onClick={openMenu} />
            ) : (
              <MenuIcon fontSize="large" onClick={openMenu} />
            )}
          </li>
        </ul>
        <div
          ref={onblur}
          className={`${styles.hamburgermenu} ${
            phoneMenuOpen ? styles.active : ""
          }`}
          onClick={openMenu}
        >
          <ul>
            <Link href="/">
              <li className={styles.menuItem}>Startsida</li>
            </Link>
            <Link href="/comingSoon">
              <li className={styles.menuItem}>Kontakt</li>
            </Link>
            <Link href="/comingSoon">
              <li className={styles.menuItem}>Om oss</li>
            </Link>
          </ul>
        </div>
      </AppBar>
    </div>
  );
}
