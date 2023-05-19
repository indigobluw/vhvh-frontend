import styles from "src/components/ArticleObjects/ArticleObjects.module.scss";
import ChangeMyDataButton from "../ChangeMyDataButton/ChangeMyDataButton.js";
import { useState, useEffect } from "react";
import EditSectionButton from "../EditSectionButton/EditSectionButton";
import DeleteSectionButton from "../DeleteSectionButton/DeleteSectionButton";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";

export default function ArticleObjects({ sectionId }) {
  const [articleName, setArticleName] = useState([]);
  const [articleAmount, setArticleAmount] = useState([]);
  const [typeOfAmount, setTypeOfAmount] = useState([]);
  const [bestBefore, setBestBefore] = useState([]);

  const url = `http://localhost:8080/api/viewAllArticles/${sectionId}`;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchResponse = await fetch(url);
        const data = await fetchResponse.json();
        const articleName = data.map(
          (articleModel) => articleModel.articleName
        );
        const articleAmount = data.map(
          (articleModel) => articleModel.articleAmount
        );
        const typeOfAmount = data.map(
          (articleModel) => articleModel.typeOfAmount
        );
        const bestBefore = data.map((articleModel) => articleModel.bestBefore);
        setArticleName(articleName);
        setArticleAmount(articleAmount);
        setTypeOfAmount(typeOfAmount);
        setBestBefore(bestBefore);

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
            </TableRow>
          </TableHead>
          <TableBody>
            
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
