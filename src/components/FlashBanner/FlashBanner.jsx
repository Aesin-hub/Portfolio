import styles from './FlashBanner.module.scss';

function FlashBanner() {
  const text = "En recherche d'opportunités • Développeur Front-End Junior • React • SASS • JavaScript • Disponible immédiatement";
  
  return (
    <div className={styles.flashBanner}>
      <div className={styles.track}>
        <span className={styles.text}>{text}</span>
        <span className={styles.text}>{text}</span>
      </div>
    </div>
  );
}

export default FlashBanner;