import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "src/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Food from "public/images/food.jpg";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div>
        <Image
        // src={Food}
        //className={styles.food}
        //alt="Food"
        //layout="fill"
        // objectFit="cover"
        />
        <Link href="/login">

            Logga in

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
