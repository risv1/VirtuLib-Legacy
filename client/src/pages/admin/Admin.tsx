import Dashboard from "../../components/admin/Dashboard";
import { ModalProvider } from "../../layouts/ModalContext";
import styles from "../../styles/pages/admin.module.css";

const Admin = () => {
  return (
    <ModalProvider>
      <div className={styles.container}>
        <Dashboard />
      </div>
    </ModalProvider>
  );
};

export default Admin;
