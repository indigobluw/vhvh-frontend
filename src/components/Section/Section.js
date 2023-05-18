import styles from "src/components/Section/Section.module.scss";
import AddSectionButton from "../AddSectionButton/AddSectionButton";
import SectionObjects from "../SectionObjects/SectionObjects";

export default function Section({ placeId }) {
  return (
    <div>
      <div className={styles.container}>
        <h4 className={styles.title}>Områden</h4>
        <div className={styles.addbutton}>
          <AddSectionButton placeId={placeId} />
        </div>
      </div>
      <div>
        <SectionObjects placeId={placeId} />
      </div>
    </div>
  );
}
