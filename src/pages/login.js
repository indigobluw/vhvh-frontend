import Navbar from "@/components/Navbar/Navbar";
import styles from "src/styles/Login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checked, setChecked] = useState(false);
  const label = { inputProps: { "aria-label": "Kom ihåg mig" } };

  const handleChecked = (event) => {
    setChecked(event.target.checked);
  };

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
    }).then((response) => {
      if (response.status === 200) {
        console.log("Du är inloggad!");
        return response.json().then((data) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("username", data.username);
          console.log(data.token);
        });
      } else {
        console.log("Oj! Något gick fel!");
      }
    });
    //router.push("myPage");
  }

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Välkommen tillbaka!</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="outlined-basic"
            label="Användarnamn"
            type="username"
            autoComplete="username"
            className={styles.username}
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="outlined-password-input"
            label="Lösenord"
            type="password"
            autoComplete="current-password"
            className={styles.password}
          />
          <Button variant="contained" type="submit" className={styles.buttonl}>
            Logga in
          </Button>
        </form>
        <div className={styles.lessmargin}>
          <label>Kom ihåg mig?</label>
          <Checkbox
            checked={checked}
            onChange={handleChecked}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>{" "}
        <p className={styles.lessmargin}>
          Har du inget konto?&nbsp;
          <Link href="/createAccount">Skapa ett här!</Link>
        </p>
      </div>
    </div>
  );
}
