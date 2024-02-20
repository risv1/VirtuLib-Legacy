import styles from "../../styles/components/dashboard.module.css";

const BaseDash = () => {
  return (
    <div className={styles.base_container}>
      <div>
        <h1>Admin Panel</h1>
        <p>Manage application's users, books, and track reservation process</p>
      </div>
    </div>
  );
};

export default BaseDash;
