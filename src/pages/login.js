import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "src/styles/Login.module.scss";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const payload = JSON.stringify({
      username: username,
      password: password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.parse(payload),
      redirect: "follow",
    };

    console.log(requestOptions);
    fetch("http://localhost:8080/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.user);
        setIsLoggedIn(true);
        console.log(data.token);
        console.log(data.user);
      })
      .catch((error) => console.log("error", error));
  }
  if (isLoggedIn == true) {
    return <h1>Du är inloggad!</h1>; //<Navigate to="/myPage" />;
  }
  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="outlined-basic"
          label="Användarnamn"
          type="username"
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
        <Button variant="contained" type="submit" className={styles.button}>
          Logga in
        </Button>
      </form>
      <Footer />
    </div>
  );
}
