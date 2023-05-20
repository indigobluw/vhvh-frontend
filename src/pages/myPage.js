import styles from "src/styles/MyPage.module.scss";
import Navbar from "@/components/Navbar/Navbar";
import LogoutButton from "@/components/Logout/LogoutButton";
import Place from "@/components/Place/Place";
import MyData from "@/components/MyData/MyData";
import Welcome from "@/components/Welcome/Welcome";
import jwt from "jsonwebtoken";
import withAuth from "@/components/auth.js";

function MyPage() {
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
          <div className={styles.welcome}>
            <Welcome />
          </div>
          <div className={styles.places}>
            <Place />
          </div>
          <div className={styles.myData}>
            <MyData />
          </div>
        </div>
      </div>
    </div>
  );
}
export default withAuth(MyPage);
