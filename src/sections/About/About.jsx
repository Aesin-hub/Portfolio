// about section //

import Button from '../../components/Button/Button';
import styles from './About.module.scss';

function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          {/* Photo placeholder - remplacez par votre vraie photo */}
          <div className={styles.imagePlaceholder}>
            <span className={styles.placeholderEmoji}>👨‍💻</span>
          </div>
          
          {/* Decorative elements */}
          <div className={styles.decoration1}></div>
          <div className={styles.decoration2}></div>
        </div>

        <div className={styles.content}>
          {/* Tag */}
          <div className={styles.tag}>
            <span className={styles.tagDot}></span>
            À propos de moi
          </div>

          {/* Titre */}
          <h2 className={styles.title}>
            Développeur frontend issu d'une reconversion réussie
          </h2>

          {/* Texte (votre contenu validé) */}
          <div className={styles.text}>
            <p>
              Après 15 ans en ingénierie industrielle, j'ai choisi de mettre ma rigueur technique au service du web. Diplômé d'OpenClassrooms en Intégration Web, je maîtrise React, JavaScript et SASS pour créer des interfaces performantes et accessibles.
            </p>
            
            <p>
              <strong>Ma force ?</strong> Une double casquette rare : l'exigence méthodologique d'un technicien d'études et la sensibilité créative d'un passionné. Je ne code pas juste des fonctionnalités : je conçois des interfaces pensées dans les moindres détails.
            </p>
            
            <p>
              <strong>Ce qui me différencie ?</strong> Cette expertise technique acquise pendant 15 ans — résolution de problèmes, analyse rigoureuse, respect des normes — combinée à une vraie sensibilité pour le design et l'expérience utilisateur. Un profil hybride précieux dans un métier où technique et créativité doivent s'équilibrer.
            </p>
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>15+</div>
              <div className={styles.statLabel}>Années d'expérience technique</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>6</div>
              <div className={styles.statLabel}>Projets OpenClassrooms</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>20+</div>
              <div className={styles.statLabel}>Technologies maîtrisées</div>
            </div>
          </div>

          {/* CTA */}
          <div className={styles.actions}>
            <Button variant="primary" size="large">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Télécharger mon CV
            </Button>
            <Button variant="outline" size="large">
              En savoir plus
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;