import styles from './FlashBanner.module.scss';

function FlashBanner() {
  const text = "En recherche d'opportunités • Développeur Front-End Junior • React • SASS • JavaScript • Disponible immédiatement";
  
  return (
    <div className={styles.flashBanner}>
      <div className={styles.ticker}>
        {/* Répétition du texte pour défilement infini sans coupure */}
        <div className={styles.tickerContent}>
          <span className={styles.text}>{text}</span>
          <span className={styles.separator}>•</span>
          <span className={styles.text}>{text}</span>
          <span className={styles.separator}>•</span>
          <span className={styles.text}>{text}</span>
          <span className={styles.separator}>•</span>
          <span className={styles.text}>{text}</span>
        </div>
      </div>
    </div>
  );
}

export default FlashBanner;
