import styles from "src/components/SectionObjects/SectionObjects.module.scss";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import EditPlaceButton from "../EditPlaceButton/EditPlaceButton";
import DeletePlaceButton from "../DeletePlaceButton/DeletePlaceButton";
import Section from "@/components/Section/Section";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function SectionObjects() {
  //OBS! La till hela PlaceObject för att testa bara! OBS!
  const [placeNames, setPlaceNames] = useState([]);
  const [showSections, setShowSections] = useState({});
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

    fetchPlaceNames();
  }, []);

  const handleToggleSection = (placeName) => {
    setShowSections((prevSections) => ({
      ...prevSections,
      [placeName]: !prevSections[placeName],
    }));
  };

  return (
    <div>
      <ul className={styles.container}>
        {placeNames.map((placeName, index) => (
          <li key={index}>
            <div>
              <div className={styles.list}>
                {placeName}
                <div className={styles.icons}>
                  <div>
                    <IconButton
                      variant="contained"
                      type="submit"
                      className={styles.button}
                      onClick={() => handleToggleSection(placeName)}
                    >
                      <KeyboardArrowDownIcon />
                    </IconButton>
                  </div>
                  <EditPlaceButton />
                  <DeletePlaceButton />
                </div>
              </div>
            </div>
            <div>{showSections[placeName] && <Section />}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
