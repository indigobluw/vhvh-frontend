import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Navbar from "src/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <Link href="/login">
          <button className={styles.button}>Logga in</button>
        </Link>
        <Link href="/myPage">
          <button className={styles.button}>Min sida</button>
        </Link>
        <Link href="/createAccount">
          <button className={styles.button}>Skapa konto</button>
        </Link>
        <div className={styles.text}>
          <h1 className={styles.title}>VHVH</h1>
          <p className={styles.subtitle}>- Vad har vi hemma?</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
