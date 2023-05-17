import styles from "src/styles/MyPage.module.scss";
import Navbar from "@/components/Navbar/Navbar";
import LogoutButton from "@/components/Logout/LogoutButton";

export default function CreateAccount() {
  return (
    <div>
    <title> Min sida | VHVH </title>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.button}>
          <LogoutButton />
        </div>
        <div className={styles.title}>
          <h2>Min sida</h2>
        </div>
        <div className={styles.resten}>
          <div className={styles.places}>Mina platser etc...</div>
          <div className={styles.myData}>Mina användaruppgifter</div>
        </div>
      </div>
    </div>
  );
}
