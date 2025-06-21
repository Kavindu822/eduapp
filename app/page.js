// import Footer from "@/components/footer";
// import styles from "./page.module.css";

// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <h2 className={styles.heading}>Home</h2>
//       <p className={styles.paragraph}>
//         Welcome to iGuide, the Academic Wing of the Independent Law Student Movement

//         iGuide serves as a dedicated platform for legal learning and academic excellence. Designed with the modern law student in mind, it offers structured resources including curated notes, past paper analysis, examination strategies, and seminars led by distinguished legal professionals.

//         Our aim is not only to support academic success but to nurture the next generation of advocates, scholars, and leaders in law.
//       </p>
//       <Footer/>
//     </div>
//   );
// }
"use client";

import Footer from "@/components/footer";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.textSection}>
          <h1 className={styles.heading}>
            Welcome to <span className={styles.highlight}>iGuide</span>
          </h1>
          <p className={styles.paragraph}>
            The Academic Wing of the Independent Law Student Movement
          </p>
          <p className={styles.description}>
            iGuide serves as a dedicated platform for legal learning and
            academic excellence. Designed with the modern law student in mind,
            it offers structured resources including curated notes, past paper
            analysis, examination strategies, and seminars led by distinguished
            legal professionals.
          </p>
          <p className={styles.description}>
            Our aim is not only to support academic success but to nurture the
            next generation of advocates, scholars, and leaders in law.
          </p>
        </div>

        <div className={styles.imageSection}>
          <Image
            src="/home.jpeg" // Make sure this image is in your `public` folder
            alt="Students learning"
            width={600}
            height={400}
            className={styles.heroImage}
            priority
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
