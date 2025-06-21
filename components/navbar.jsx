// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import styles from "./navbar.module.css";
// import { usePathname, useRouter } from "next/navigation";
// import { signOut, useSession } from "next-auth/react";

// const Navbar = () => {
//   const { data: session } = useSession();
//   const pathname = usePathname();
//   const router = useRouter();
//   const isLoggedIn = session?.user;
//   const isAdminRoute = pathname.startsWith("/admin");

//   const handleSignOut = async () => {
//     await signOut({ redirect: false });
//     router.push("/");
//   };

//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.leftSection}>
//         <Link href="/" className={styles.logo}>
//           <Image
//             src="/logo1.png"
//             alt="iGuide Logo"
//             width={100}
//             height={60}
//             priority
//           />
//         </Link>

//         <ul className={styles.navList}>
//           <li className={styles.navItem}>
//             <Link href="/pastpapers">Past Papers</Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link href="/notes">Notes</Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link href="/referencebooks">Reference Books</Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link href="/news">News</Link>
//           </li>
//         </ul>
//       </div>

//       <div className={styles.rightSection}>
//         {isLoggedIn ? (
//           <>
//             <div className={styles.dropdown}>
//               <button className={styles.dropdownToggle}>Admin</button>
//               <div className={styles.dropdownMenu}>
//                 <Link href="/addnote">Add Note</Link>
//                 <Link href="/addpastpaper">Add Past Paper</Link>
//                 <Link href="/addad">Add Ad</Link>
//                 <Link href="/addnews">Add News</Link>
//                 <Link href="/addreferencebook">Add Reference Books</Link>
//               </div>
//             </div>
//             <button onClick={handleSignOut} className={styles.logoutButton}>
//               Logout
//             </button>
//           </>
//         ) : isAdminRoute ? (
//           <>
//             <Link href="/login" className={styles.loginButton}>
//               Login
//             </Link>
//             <Link href="/signup" className={styles.loginButton}>
//               Signup
//             </Link>
//           </>
//         ) : null}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const isLoggedIn = session?.user;
  const isAdminRoute = pathname.startsWith("/admin");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo1.png"
            alt="iGuide Logo"
            width={100}
            height={60}
            priority
          />
        </Link>

        {/* Hamburger icon for mobile */}
        <button
          className={styles.hamburger}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span
            className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen1 : ""}`}
          ></span>
          <span
            className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen2 : ""}`}
          ></span>
          <span
            className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen3 : ""}`}
          ></span>
        </button>

        {/* Nav links */}
        <ul
          className={`${styles.navList} ${
            mobileMenuOpen ? styles.navListMobileActive : ""
          }`}
        >
          <li
            className={`${styles.navItem} ${
              pathname === "/pastpapers" ? styles.active : ""
            }`}
          >
            <Link href="/pastpapers">Past Papers</Link>
          </li>
          <li
            className={`${styles.navItem} ${
              pathname === "/notes" ? styles.active : ""
            }`}
          >
            <Link href="/notes">Notes</Link>
          </li>
          <li
            className={`${styles.navItem} ${
              pathname === "/referencebooks" ? styles.active : ""
            }`}
          >
            <Link href="/referencebooks">Reference Books</Link>
          </li>
          <li
            className={`${styles.navItem} ${
              pathname === "/news" ? styles.active : ""
            }`}
          >
            <Link href="/news">News</Link>
          </li>
        </ul>
      </div>

      <div className={styles.rightSection}>
        {isLoggedIn ? (
          <>
            <div className={styles.dropdown}>
              <button className={styles.dropdownToggle}>Admin</button>
              <div className={styles.dropdownMenu}>
                <Link href="/addnote">Add Note</Link>
                <Link href="/addpastpaper">Add Past Paper</Link>
                <Link href="/addad">Add Ad</Link>
                <Link href="/addnews">Add News</Link>
                <Link href="/addreferencebook">Add Reference Books</Link>
              </div>
            </div>
            <button onClick={handleSignOut} className={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : isAdminRoute ? (
          <>
            <Link href="/login" className={styles.loginButton}>
              Login
            </Link>
            <Link href="/signup" className={styles.loginButton}>
              Signup
            </Link>
          </>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
