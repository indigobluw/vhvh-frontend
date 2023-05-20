import styles from "src/styles/ComingSoon.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ComingSoon() {
  const router = useRouter();

  useEffect(() => {
    const redirect = setTimeout(() => {
      router.push("/");
    }, 5500);

    return () => clearTimeout(redirect);
  }, [router]);

  return (
    <div className={styles.container}>
      <title> Under Konstruktion | VHVH</title>
      <h1>Häng kvar...</h1>
      <br></br>
      <h2>Vi arbetar för nuvarande på den här sidan</h2>
      <br></br>
      <h2>Kommer snart</h2>
      <br></br>
      <br></br>
      <h3>Går tillbaka till startsidan...</h3>
      <h5>
        Blir du inte omdirigerad?{" "}
        <Link href="/">Klicka här för att gå tillbaka</Link>
      </h5>
    </div>
  );
}
