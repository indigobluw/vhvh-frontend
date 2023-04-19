import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "src/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Navbar />
      <p>hej</p>
      <Footer />
    </div>
  );
}
