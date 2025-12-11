import { useState } from 'react';
import styles from './ProjectCard.module.scss';

function ProjectCard({ project, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Bandeau titre en haut */}
      <div className={styles.titleBanner}>
        <h3 className={styles.bannerTitle}>{project.title}</h3>
        <div className={styles.bannerIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Image principale */}
      <div className={styles.imageContainer}>
        <img 
          src={project.thumbnail} 
          alt={project.title}
          className={styles.image}
        />
      </div>

      {/* Overlay qui apparaît au hover */}
      <div className={`${styles.overlay} ${isHovered ? styles.visible : ''}`}>
        <div className={styles.info}>
          {/* Subtitle */}
          <p className={styles.subtitle}>{project.subtitle}</p>
          
          {/* Tags */}
          <div className={styles.tags}>
            {project.tags.slice(0, 4).map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          {/* Description courte */}
          <p className={styles.description}>
            {project.description.short}
          </p>

          {/* Footer avec date et lien GitHub */}
          <div className={styles.footer}>
            <span className={styles.date}>{project.date}</span>
            {project.links?.github && (
              <a 
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.githubLink}
                onClick={(e) => e.stopPropagation()}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bouton "Voir le projet" au centre de la carte (visible au hover) */}
      {isHovered && (
        <button className={styles.viewMoreButton}>
          Voir le projet
        </button>
      )}
    </div>
  );
}

export default ProjectCard;
