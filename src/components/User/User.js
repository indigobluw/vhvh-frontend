import { useState } from "react";

export default function User() {
const [user, setUser] = useState([]);
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const payload = JSON.stringify({
    username: username,
    firstname: firstname,
    lastname: lastname,
    role: role,
  });

  const requestOptions = {
    method: "GET",
    headers: headers,
    body: payload,
    redirect: "follow",
  };

  fetch("http://localhost:8080/api/showusers", requestOptions).then(
    (response) => {
      if (response.ok) {
        console.log("Hämtat användare");
      } else {
        console.log("Gick inte att hämta användare");
      }
    }
  );
  return (
    <ul className={styles.container}>
      {userNames.map((userName, index) => (
        <li className={styles.list} key={index}>
          {userName}
          <div className={styles.icons}>
            <ShowSectionButton />
            <EditPlaceButton />
            <DeletePlaceButton />
          </div>
        </li>
      ))}
    </ul>
  );
}