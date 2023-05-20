import Navbar from "@/components/Navbar/Navbar";
import styles from "src/styles/Login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import Alert from "@mui/material/Alert";
import { useEffect } from "react";
import * as React from "react";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  function sendLoginRequest() {
    const requestBody = {
      username: username,
      password: password,
    };
    fetch("http://localhost:8080/api/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Du är inloggad!");
          return response.json();
        } else if (response.status === 500 || response.status === 401) {
          console.log("Oj! Något gick fel!");
          setLoginError(true);
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
            } else {
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

  useEffect(() => {
    setIsEmpty(username === "" || password === "");
  }, [username, password]);

  return (
    <div>
      <title>Logga in | VHVH </title>
      <Navbar />
      <p className={styles.logintitle}>
        <b>Logga in</b>
      </p>
      <div className={styles.login}>
        {loginError && (
          <Alert severity="error">
            Det finns inget konto med den mail adressen eller så är lösenordet
            fel
          </Alert>
        )}
        <TextField
          sx={{ width: 250 }}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          id="outlined-basic"
          label="Användarnamn"
          type="username"
          helperText="Användarnamnet är din mail-adress"
          className={styles.username}
        />
        <TextField
          sx={{ width: 250 }}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          id="outlined-password-input"
          label="Lösenord"
          type="password"
          autoComplete="current-password"
          className={styles.password}
        />
        <p className={styles.forgotPassword}>
          Har du glömt ditt lösenord?&nbsp;{" "}
          <Link href="/comingSoon">Klicka här!</Link>
        </p>
        {isEmpty ? (
          <Button
            sx={{ width: 150, backgroundColor: "#489fb5" }}
            variant="contained"
            type="submit"
            className={styles.button}
            disabled
          >
            Logga in
          </Button>
        ) : (
          <Button
            sx={{ width: 150, backgroundColor: "#489fb5" }}
            variant="contained"
            type="submit"
            className={styles.button}
            onClick={() => sendLoginRequest()}
          >
            Logga in
          </Button>
        )}
      </div>
    </div>
  );
}
