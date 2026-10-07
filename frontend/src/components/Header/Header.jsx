import { Link } from "react-router-dom";

import Logo from "../Logo/Logo";

import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <Logo />

      <nav className={styles.navigation}>
        <Link
          to="/register"
          className={styles.joinButton}
        >
          Join now
        </Link>

        <Link
          to="/login"
          className={styles.signInButton}
        >
          Sign in
        </Link>
      </nav>
    </header>
  );
}

export default Header;