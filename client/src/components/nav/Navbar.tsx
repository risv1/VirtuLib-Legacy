import { Link } from "react-router-dom";
import styles from "../../styles/components/nav.module.css";
import { BookOpenText } from "lucide-react"

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <Link className={styles.head} to="/">
      <BookOpenText size={40} /> 
      <p>Virtu-Lib</p>
      </Link>
      <div className={styles.navs}>
        <Link className={styles.navItem} to="/">Home</Link>
        <Link className={styles.navItem} to="/about">About</Link>
        <Link to="/admin" className={styles.navItem}>Admin</Link>
      </div>
    </nav>
  );
};
export default Navbar;
