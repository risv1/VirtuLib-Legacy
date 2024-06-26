import { Link } from "react-router-dom";
import styles from "../../styles/components/nav.module.css";
import { BookOpenText } from "lucide-react";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <Link className={styles.head} to="/">
        <BookOpenText size={40} />
        <p>Virtu-Lib</p>
      </Link>
      <div className={styles.navs}>
        <Link className={styles.navItem} to="/">
          Home
        </Link>
        <Link className={styles.navItem} to="/books">
          Books
        </Link>
          <Link to="/login" className={styles.navItem}>
            Login
          </Link>
      </div>
    </nav>
  );
};
export default Navbar;
