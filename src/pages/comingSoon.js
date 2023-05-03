import styles from "src/styles/ComingSoon.module.scss";
import Link from "next/link";

export default function ComingSoon() {
  return (
    <div className={styles.container}>
      <h1>Häng kvar...</h1>
      <h2>Vi arbetar för nuvarande på den här sidan</h2>
      <h2>Kommer snart</h2>
      <Link href="/">
      <br></br>
        <h3>Gå tillbaka till startsidan?</h3>
      </Link>
    </div>
  );
}
