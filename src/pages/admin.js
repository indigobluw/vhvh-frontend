import styles from "src/styles/MyPage.module.scss";
import Navbar from "@/components/Navbar/Navbar";
import LogoutButton from "@/components/Logout/LogoutButton";
import OurUsers from "@/components/OurUsers/OurUsers";
import { useState } from "react";
import SortingUsers from "@/components/SortingUsers/SortingUsers";

export default function Admin() {
  const [sorting, setSorting] = useState("default");

  const handleChangeSorting = (event) => {
    const selectedSorting = event.target.value;
    setSorting(selectedSorting);
  };

  return (
    <div>
      <title> Admin | VHVH </title>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.button}>
          <LogoutButton />
        </div>
        <div className={styles.title}>
          <h2>Admin sida</h2>
        </div>
        <div className={styles.resten}>
          <div className={styles.places}>
            <div className={styles.usersheading}>
              <h3>Våra användare</h3>
              <SortingUsers value={sorting} onChange={handleChangeSorting} />
            </div>
            <OurUsers sorting={sorting} />
          </div>
        </div>
      </div>
    </div>
  );
}
