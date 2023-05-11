import styles from "src/styles/MyPage.module.scss";
import Navbar from "@/components/Navbar/Navbar";
import LogoutButton from "@/components/Logout/LogoutButton";

export default function CreateAccount() {
  return (
    <div>
      <Navbar />
      <div>
        <h2>Välkommen!</h2>
        <LogoutButton />
      </div>
    </div>
  );
}
