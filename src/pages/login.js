import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "src/styles/Login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function sendLoginRequest() {
    const requestBody = {
      username: username,
      password: password,
    };
    fetch("http://localhost:8080/api/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Du är inloggad!");
          return response.json();
        } else {
          console.log("Oj! Något gick fel!");
          throw new Error("Failed to log in");
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.userRole);
        console.log(data.token);
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        fetch("http://localhost:8080/api/getAuthenticatedUser", {
          headers,
        }).then((response) => {
          if (response.status === 200) {
            console.log("Success");
            if (localStorage.getItem("userRole") == "ADMIN") {
              router.push("/admin");
            }
            else {
              router.push("/myPage");
            }
          } else {
            console.log("Failed");
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <Navbar />
      <h1 className={styles.logintitle}>Logga in här</h1>
      <div className={styles.login}>
        <TextField
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          id="outlined-basic"
          label="Användarnamn"
          type="username"
          className={styles.username}
        />
        <TextField
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          id="outlined-password-input"
          label="Lösenord"
          type="password"
          autoComplete="current-password"
          className={styles.password}
        />
        <Button
          variant="contained"
          type="submit"
          className={styles.button}
          onClick={() => sendLoginRequest()}
        >
          Logga in
        </Button>
      </div>
      <Footer />
    </div>
  );
}
