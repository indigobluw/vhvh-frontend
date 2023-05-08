import styles from "src/styles/Login.module.scss";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function CreateAccount() {
  return (
    <div>
      <Navbar />
      <div>
        <input
          className={styles.input}
          type="text"
          placeholder="Användarnamn"
        ></input>
        <input
          className={styles.input}
          type="password"
          placeholder="Lösenord"
        ></input>
        <button className={styles.button} type="submit">
          Skapa konto
        </button>
      </div>
      <Footer />
    </div>
  );
}
