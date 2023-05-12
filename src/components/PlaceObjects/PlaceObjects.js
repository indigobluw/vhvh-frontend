import styles from "src/components/PlaceObjects/PlaceObjects.module.scss";
import { useState, useEffect } from "react";

export default function PlaceObjects() {
  const [places, setPlaces] = useState([]);
  const userId = localStorage.getItem("userId");
  const url = `http://localhost:8080/api/showallplaces/${userId}`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setPlaces(data.places));
  }, []);

  return (
    <div>
      {places.map((place) => (
        <PlaceObjects key={place.placeId} name={place.placeName} />
      ))}
    </div>
  );
}