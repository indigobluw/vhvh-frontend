import styles from "src/styles/ComingSoon.module.css";
import Link from "next/link";

export default function ComingSoon() {
  return (
    <div className={styles.container}>
      <h1>Hang on...</h1>
      <h2>We're currently working on this page</h2>
      <h2>Coming soon</h2>
      <Link href="/">
      <br></br>
        <h3>Go back?</h3>
      </Link>
    </div>
  );
}
