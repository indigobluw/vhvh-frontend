import styles from "src/styles/MyPage.module.scss";
import Navbar from "@/components/Navbar/Navbar";
import LogoutButton from "@/components/Logout/LogoutButton";

export default function Admin() {
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
          <div className={styles.places}>Våra användare</div>
          <div className={styles.myData}>Ta bort användare</div>
        </div>
      </div>
    </div>
  );
}
