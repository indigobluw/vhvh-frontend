import styles from "src/components/ArticleObjects/ArticleObjects.module.scss";
import ChangeMyDataButton from "../ChangeMyDataButton/ChangeMyDataButton.js";
import { useState, useEffect } from "react";
import EditSectionButton from "../EditSectionButton/EditSectionButton";
import DeleteSectionButton from "../DeleteSectionButton/DeleteSectionButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";

export default function ArticleObjects({ sectionId }) {
  const [article, setArticle] = useState([]);

  const url = `http://localhost:8080/api/viewAllArticles/${sectionId}`;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchResponse = await fetch(url);
        const data = await fetchResponse.json();
        setArticle(data);
        console.log("artikel wohoo!");
      } catch (error) {
        console.error("error with fetching artikel: ", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Namn</TableCell>
              <TableCell>Mängd</TableCell>
              <TableCell>Typ</TableCell>
              <TableCell>Bäst före</TableCell>
              <TableCell>Ändra</TableCell>
              <TableCell>Ta bort</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {article.map((articleModel, index) => (
              <TableRow key={index}>
                <TableCell>{articleModel.articleName}</TableCell>
                <TableCell>{articleModel.articleAmount}</TableCell>
                <TableCell>{articleModel.typeOfAmount}</TableCell>
                <TableCell>{articleModel.bestBefore}</TableCell>
                <TableCell>
                  <EditSectionButton />{" "}
                </TableCell>
                <TableCell>
                  <DeleteSectionButton />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
