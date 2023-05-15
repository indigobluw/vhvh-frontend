import styles from "src/components/PlaceObjects/PlaceObjects.module.scss";
import { useState, useEffect } from "react";

export default function PlaceObjects() {
  const [placeNames, setPlaceNames] = useState([]);
  let userId;
  if (process.browser) {
    userId = localStorage.getItem("userId");
  }
  const url = `http://localhost:8080/api/showallplaces/${userId}`;

  useEffect(() => {
    const fetchPlaceNames = async () => {
      try {
        const fetchResponse = await fetch(url);
        const data = await fetchResponse.json();
        const names = data.map((placeModel) => placeModel.placeName);
        setPlaceNames(names);
      } catch (error) {
        console.error("error with fetching place: ", error)
      }
    }
    /*if(process.browser){
      fetch(url)
        .then((response) => response.json())
        .then((data) => setPlaces(data.places));
    };*/
    fetchPlaceNames();
  }, []);

  return (
    <div>
      <ul>
        {placeNames.map((placeName, index) => (
          <li key={index}>{placeName}</li>
        ))}
      </ul>
    </div>
  );
}