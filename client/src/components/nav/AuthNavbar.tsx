import { Link } from "react-router-dom";
import styles from "../../styles/components/nav.module.css";
import { BookOpenText } from "lucide-react";

const Navbar = (props: {isAdmin: boolean}) => {
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
        {props.isAdmin && (
          <Link to="/admin" className={styles.navItem}>
            Admin
          </Link>
        )}
        <Link to="/profile" className={styles.navItem}>
          Profile
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
