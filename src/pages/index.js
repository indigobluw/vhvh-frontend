import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "src/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div>
        <Link href="/login">
          <button className={styles.button}>Login</button>
        </Link>
        <Link href="/myPage">
          <button className={styles.button}>My page</button>
        </Link>
        <Link href="/createAccount">
          <button className={styles.button}>Create Account</button>
        </Link>
        <div className={styles.text}>
          <h1>VHVH</h1>
          <p>- Vad har vi hemma?</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
