// about section //

import { useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import ScrollIndicator from '../../components/ScrollIndicator/ScrollIndicator';
import { scrollToSection } from '../../utils/scroll';
import styles from './About.module.scss';

function About() {
  const [isDesktop, setIsDesktop] = useState(false);

  // Détecte si on est sur desktop (≥ 1024px)
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handleDownloadCV = () => {
    // Crée un lien temporaire
    const link = document.createElement('a');
    link.href = '/assets/documents/CV_Lewis_Bock_Developpeur_Frontend.pdf';
    link.download = 'CV_Lewis_Bock_Developpeur_Frontend.pdf';
    
    // Déclenche le téléchargement
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <div className={styles.photoContainer}>
            <img 
              src='/assets/images/AboutImg.webp'
              alt="Photo de profil professionnelle de Lewis Bock, développeur front-end junior spécialisé en React"
              title="Lewis Bock - Développeur Front-End"
              className={styles.photo}
              loading="lazy"
              width="400"
              height="400"
            />
          </div>
        </div>

        <div className={styles.content}>
          {/* Groupe texte en haut */}
          <div className={styles.textContent}>
            <h2>Developpeur Front-end</h2>

            <h5>Développeur front-end issu d'une reconversion réussie</h5>

            <div className={styles.paragraphs}>
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
          </div>

          {/* Stats + Bouton en bas sur la même ligne */}
          <div className={styles.footer}>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statNumber}>15+</div>
                <div className={styles.statLabel}>Années d'expérience technique</div>
              </div>
              
              <div className={styles.stat}>
                <div className={styles.statNumber}>20+</div>
                <div className={styles.statLabel}>Technologies maîtrisées</div>
              </div>
            </div>
            
            <div className={styles.actions}>
              <Button variant="primary" size="medium" onClick={handleDownloadCV}>
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                  aria-hidden="true"
                  role="img"
                >
                  <title>Icône téléchargement</title>
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Télécharger mon CV
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* ScrollIndicator : Visible SEULEMENT sur desktop ≥ 1024px */}
      {isDesktop && <ScrollIndicator onClick={() => scrollToSection('skills')} />}
    </section>
  );
}

export default About;
