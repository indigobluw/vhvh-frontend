import styles from "src/components/SectionObjects/SectionObjects.module.scss";
import { useState, useEffect } from "react";
import EditSectionButton from "../EditSectionButton/EditSectionButton";
import DeleteSectionButton from "../DeleteSectionButton/DeleteSectionButton";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Article from "../Article/Article";

export default function SectionObjects({ placeId }) {
  const [sectionNames, setSectionNames] = useState([]);
  const [sectionIds, setSectionIds] = useState([]);
  const [showArticles, setShowArticles] = useState({});

  const url = `http://localhost:8080/api/showallsections/${placeId}`;

  useEffect(() => {
    const fetchSectionNames = async () => {
      try {
        const fetchResponse = await fetch(url);
        const data = await fetchResponse.json();
        const names = data.map((sectionModel) => sectionModel.sectionName);
        const ids = data.map((sectionModel) => sectionModel.sectionId);
        setSectionNames(names);
        setSectionIds(ids);
        console.log("områden wohoo!");
      } catch (error) {
        console.error("error with fetching place: ", error);
      }
    };

    fetchSectionNames();
  }, []);

  const handleToggleArticle = (sectionName) => {
    setShowArticles((prevArticles) => ({
      ...prevArticles,
      [sectionName]: !prevArticles[sectionName],
    }));
  };

  return (
    <div>
      <ul className={styles.container}>
        {sectionNames.map((sectionName, index) => (
          <li key={index}>
            <div>
              <div className={styles.list}>
                {sectionName}
                <div className={styles.icons}>
                  <div>
                    <IconButton
                      variant="contained"
                      type="submit"
                      className={styles.button}
                      onClick={() => handleToggleArticle(sectionName)}
                    >
                      <KeyboardArrowDownIcon />
                    </IconButton>
                  </div>
                  <EditSectionButton />
                  <DeleteSectionButton />
                </div>
              </div>
            </div>
            <div>
              {showArticles[sectionName] && (
                <Article sectionId={sectionIds[index]} />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
