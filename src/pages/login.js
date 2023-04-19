import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "src/styles/Login.module.css";

export default function Login() {
  return (
    <div>
      <Navbar />
      <div>
        <input
          className={styles.input}
          type="text"
          placeholder="username"
        ></input>
        <input
          className={styles.input}
          type="password"
          placeholder="password"
        ></input>
        <button className={styles.button}type="submit">Logga in</button>
      </div>
      <Footer />
    </div>
  );
}
