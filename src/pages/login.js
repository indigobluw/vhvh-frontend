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
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        console.log(data.token);

        fetch("http://localhost:8080/api/login", {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        })
          .then((response) => response.text())
          .then((data) => console.log(data))
          .catch((error) => console.error(error));
      });
  }

  return (
    <div>
      <Navbar />
      <div>
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
