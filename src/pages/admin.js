import styles from "src/styles/MyPage.module.scss";
import Navbar from "@/components/Navbar/Navbar";
import LogoutButton from "@/components/Logout/LogoutButton";
import OurUsers from "@/components/OurUsers/OurUsers";

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
          <div className={styles.places}>
            <h3 className={styles.usersheading}>Våra användare</h3>
            <OurUsers />
          </div>
        </div>
      </div>
    </div>
  );
}
