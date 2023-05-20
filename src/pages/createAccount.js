import styles from "src/styles/CreateAccount.module.scss";
import Navbar from "@/components/Navbar/Navbar";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { useRouter } from "next/router";
import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import { useEffect } from "react";

export default function CreateAccount() {
  const [username, setUsername] = useState("");
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [noMatchPassword, setNoMatchPassword] = useState(false);
  const [passwordDuplicated, setPasswordDuplicated] = useState("");
  const [userAlreadyExists, setUserAlreadyExists] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [role, setRole] = useState("USER");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const router = useRouter();

  const handleChangedRole = (event) => {
    setRole(event.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!passwordRegex.test(password)) {
      setInvalidPassword(true);
      return;
    }
    if (password !== passwordDuplicated) {
      setNoMatchPassword(true);
      return;
    }
    if (!usernameRegex.test(username)) {
      setInvalidUsername(true);
      return;
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const payload = JSON.stringify({
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      role: role,
    });

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: payload,
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/registeruser", requestOptions)
      .then((response) => {
        if (response.ok) {
          setUserCreated(true);
        } else if (response.status === 409 || response.status === 500) {
          setUserAlreadyExists(true);
        }
        return response.json();
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    if (userCreated) {
      const redirectTimeout = setTimeout(() => {
        router.push("/login");
      }, 4500);

      return () => clearTimeout(redirectTimeout);
    }
  }, [userCreated, router]);

  return (
    <div>
      <title>Skapa konto | VHVH </title>
      <Navbar />
      <div>
        <p className={styles.title}>
          <b>Skapa ett konto</b>
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          {userAlreadyExists && (
            <Alert severity="error">
              Det finns redan ett konto med denna e-postadress
            </Alert>
          )}
          {userCreated && (
            <div>
              <Alert severity="success">
                Konto är skapat! Går vidare till inlogg...
              </Alert>
            </div>
          )}

          <TextField
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="outlined-basic"
            label="Användarnamn"
            type="username"
            error={invalidUsername}
            helperText={
              invalidUsername
                ? "Ange en mailadress"
                : "Användarnamnet är din mailadress"
            }
            className={styles.textfield}
          />
          <TextField
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={invalidPassword}
            helperText={
              invalidPassword
                ? "Lösenordet måste innehålla minst 8 tecken, varav minst en siffra, en stor och en liten bokstav"
                : "Välj ett starkt lösenord med minst 8 tecken, varav minst en siffra, en stor och en liten bokstav"
            }
            id="outlined-password-input"
            label="Lösenord"
            className={styles.textfield1}
          />
          <TextField
            required
            value={passwordDuplicated}
            onChange={(e) => setPasswordDuplicated(e.target.value)}
            error={noMatchPassword}
            helperText={noMatchPassword ? "Löseorden matchar inte" : ""}
            id="outlined-password-confirm-input"
            label="Bekräfta lösenord"
            className={styles.textfield}
          />
          <TextField
            required
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            id="outlined-basic"
            label="Förnamn"
            type="text"
            autoComplete="given-name"
            className={styles.textfield}
          />
          <TextField
            required
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            id="outlined-basic"
            label="Efternamn"
            type="text"
            autoComplete="family-name"
            className={styles.textfield}
          />
          <Box>
            <FormControl className={styles.accountType}>
              <InputLabel required>Kontotyp</InputLabel>
              <Select
                value={role}
                label="Konto-typ"
                onChange={handleChangedRole}
              >
                <MenuItem
                  value={"USER"}
                  onChange={(e) => setRole(e.target.value)}
                >
                  Användare
                </MenuItem>
                <MenuItem
                  value={"ADMIN"}
                  onChange={(e) => setRole(e.target.value)}
                >
                  Administratör
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <div className={styles.checkbox}>
            <FormControlLabel
              required
              control={<Checkbox />}
              className={styles.checkbox}
            />
            <p className={styles.checkboxText}>
              Jag förstår att VHVH sparar min mailadress
            </p>
          </div>
          <Button variant="contained" type="submit" className={styles.button}>
            Skapa användare
          </Button>
        </form>
        <Link href="/comingSoon">
          <p className={styles.terms}>
            Genom att klicka på knappen&nbsp;&quot;Skapa Användare&quot;&nbsp;godkänner du våra användarvillkor*
          </p>
        </Link>
        <p className={styles.link}>
          Har du redan ett konto?&nbsp; <Link href="/login">Logga in!</Link>
        </p>
      </div>
    </div>
  );
}
