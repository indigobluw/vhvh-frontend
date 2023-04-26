import styles from "src/styles/MyPage.module.scss";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function CreateAccount() {
  return (
    <div>
      <Navbar />
      <div>
        <h2>Welcome</h2>
        <h3>user</h3>
      </div>
      <Footer />
    </div>
  );
}
