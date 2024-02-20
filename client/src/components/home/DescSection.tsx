import styles from "../../styles/components/desc-section.module.css";

const DescSection = (props: {key: number, desc: string, src: string}) => {
    return(
        <div className={`${styles.section} ${styles.left}`}>
          <div className={styles.image}>
            <img src={props.src} alt="Virtu-Lib Image" />
          </div>
          <p>
            {props.desc}
          </p>
        </div>
    )
}

export default DescSection;
