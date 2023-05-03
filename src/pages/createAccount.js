import styles from "src/styles/Login.module.scss";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

export default function CreateAccount(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const label = { inputProps: { "aria-label": "Kom ihåg mig" } };
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChangedRole = (event) => {
    setRole(event.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const payload = JSON.stringify({
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      role: role,
      isAccountNonExpired: "true",
      isAccountNonLocked: "true",
      isCredentialsNonExpired: "true",
      isEnabled: "true",
    });

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: payload,
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/registeruser", requestOptions)
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
    return <h1>Du har skapat ett konto!</h1>;
  }

  return (
    <div>
      <title>Skapa användare | VHVH </title>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Skapa ett nytt konto</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="outlined-basic"
            label="Användarnamn"
            type="username"
            className={styles.username}
          />
          <TextField
            required
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            id="outlined-password-input"
            label="Lösenord"
            className={styles.password}
          />
          <br></br>
          <TextField
            required
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            id="outlined-basic"
            label="Förstanamn"
            type="text"
            autoComplete="given-name"
            className={styles.password}
          />
          <TextField
            required
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            id="outlined-basic"
            label="Efternamn"
            type="text"
            autoComplete="family-name"
            className={styles.password}
          />
          <Box>
            <FormControl sx={{ width: 150, marginLeft: 4 }}>
              <InputLabel required>Kontotyp</InputLabel>
              <Select
                value={role}
                label="Konto-typ"
                onChange={handleChangedRole}
              >
                <MenuItem value={"Användare"}>Användare</MenuItem>
                <MenuItem value={"Administratör"}>Administratör</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button variant="contained" type="submit" className={styles.button}>
            Skapa användare
          </Button>
        </form>
        <p className={styles.lessmargin}>
          Kom ihåg mig? <Checkbox {...label} />{" "}
        </p>
        <p className={styles.lessmargin}>
          {" "}
          Har du redan ett konto? &nbsp; <Link href="/login">Logga in!</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}
