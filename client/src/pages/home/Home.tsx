import DescSection from "../../components/home/DescSection";
import styles from "../../styles/pages/home.module.css";

const Home = () => {
  const content = [
    {
      id: 1,
      src: "image-url",
      desc: "Virtu-Lib stands as a sophisticated library management system, adept at optimizing operations for libraries of any scale, thanks to its intuitive interface and expansive feature set.",
    },
    {
      id: 2,
      src: "image-url",
      desc: "This comprehensive system boasts robust cataloging, circulation management, and patron management tools, accompanied by customizable dashboards and analytics, empowering libraries with actionable insights.",
    },
    {
      id: 3,
      src: "image-url",
      desc: "Libraries benefit from streamlined administrative tasks, enhanced user accessibility through its intuitive interface and mobile compatibility, and the flexibility to adapt to changing library requirements seamlessly, making Virtu-Lib an indispensable asset.",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to Virtu-Lib</h1>
        {content.map((contents) => (
          <DescSection key={contents.id} src={contents.src} desc={contents.desc} />
        ))}
      </div>
    </div>
  );
};

export default Home;
