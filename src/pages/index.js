import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Navbar from "src/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import Button from "@mui/material/Button";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <title>VHVH - Vad har vi hemma? </title>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.index}>
          <div className={styles.text}>
            <h1 className={styles.title}>VHVH</h1>
            <p className={styles.subtitle}>- Vad har vi hemma?</p>
          </div>
          <div className={styles.buttons}>
            <Link href="/login">
              <Button
                sx={{
                  backgroundColor: "#489fb5",
                  padding: 1,
                  width: 224,
                  margin: 1,
                }}
                variant="contained"
                className={styles.button}
              >
                Logga in
              </Button>
            </Link>
            <Link href="/myPage">
              <Button
                sx={{
                  backgroundColor: "#489fb5",
                  padding: 1,
                  width: 224,
                  margin: 1,
                }}
                variant="contained"
                className={styles.button}
              >
                Min sida
              </Button>
            </Link>
            <Link href="/createAccount">
              <Button
                sx={{
                  backgroundColor: "#489fb5",
                  padding: 1,
                  width: 224,
                  margin: 1,
                }}
                variant="contained"
                className={styles.button}
              >
                Skapa konto
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
