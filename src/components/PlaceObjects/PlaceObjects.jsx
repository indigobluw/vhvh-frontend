import styles from "src/components/PlaceObjects/PlaceObjects.module.scss";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import EditPlaceButton from "../EditPlaceButton/EditPlaceButton";
import DeletePlaceButton from "../DeletePlaceButton/DeletePlaceButton";
import ShowSectionButton from "../ShowSectionButton/ShowSectionButton";

export default function PlaceObjects() {
  const [placeNames, setPlaceNames] = useState([]);
  const token = localStorage.getItem("token");
  const decodedToken = jwt.decode(token);
  const username = decodedToken ? decodedToken.sub : null;

  const url = `http://localhost:8080/api/showallplaces/${username}`;

  useEffect(() => {
    const fetchPlaceNames = async () => {
      try {
        const fetchResponse = await fetch(url);
        const data = await fetchResponse.json();
        const names = data.map((placeModel) => placeModel.placeName);
        setPlaceNames(names);
        console.log(decodedToken);
        console.log("wohoo!");
      } catch (error) {
        console.error("error with fetching place: ", error);
      }
    };
    /*if(process.browser){
      fetch(url)
        .then((response) => response.json())
        .then((data) => setPlaces(data.places));
    };*/
    fetchPlaceNames();
  }, []);

  return (
    <div>
      <ul className={styles.container}>
        {placeNames.map((placeName, index) => (
          <li className={styles.list} key={index}>
            {placeName}
            <div className={styles.icons}>
              <ShowSectionButton />
              <EditPlaceButton />
              <DeletePlaceButton />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
