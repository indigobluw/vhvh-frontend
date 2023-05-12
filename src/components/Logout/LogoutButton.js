import styles from "src/components/Logout/LogoutButton.module.scss";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";

export default function LogoutButton() {
  const router = useRouter();

  function sendLogoutRequest() {
    fetch("http://localhost:8080/api/logout", {
      headers: {},
      method: "post",
    })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("token");
          console.log("Du loggade ut!");
          return response.json();
        } else {
          console.log("Oj! Något gick fel!");
          throw new Error("Misslyckades att logga ut");
        }
      })
      .then((data) => {
        console.log(data.message);
        router.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <Button
        variant="contained"
        type="submit"
        className={styles.button}
        onClick={() => sendLogoutRequest()}
      >
        Logga ut
      </Button>
    </div>
  );
}
