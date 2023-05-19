import styles from "src/components/Article/Article.module.scss";
import AddArticleButton from "../AddArticleButton/AddArticleButton";
import ArticleObjects from "../ArticleObjects/ArticleObjects";

export default function Article({ sectionId }) {
  return (
    <div>
      <div className={styles.container}>
        <h4 className={styles.title}>Artiklar</h4>
        <div className={styles.addbutton}>
          <AddArticleButton sectionId={sectionId} />
        </div>
      </div>
      <div>{/* <ArticleObjects sectionId={sectionId} />*/}</div>
    </div>
  );
}
