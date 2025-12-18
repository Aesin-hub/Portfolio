import { useEffect, useState } from 'react';
import styles from './ProjectModal.module.scss';

function ProjectModal({ project, isOpen, onClose }) {
  const [lightboxImage, setLightboxImage] = useState(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (lightboxImage) {
          setLightboxImage(null);
        } else {
          onClose();
        }
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, lightboxImage]);

  if (!isOpen || !project) return null;

  const images = project.images || [];
  const imageLayout = project.imageLayout || 'view1'; // Default to view1

  const handleImageClick = (imageSrc) => {
    setLightboxImage(imageSrc);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <>
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          
          {/* Close button */}
          <button className={styles.closeButton} onClick={onClose} aria-label="Fermer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Modal body */}
          <div className={styles.modalBody}>
            
            {/* Left side - Images with layout */}
            <div className={styles.imageSection}>
              <h2 className={styles.title}>{project.title}</h2>
              
              {images.length > 0 ? (
                <div className={`${styles.imagesGrid} ${styles[imageLayout]}`}>
                  {images.map((imageSrc, index) => (
                    <div 
                      key={index} 
                      className={styles.imageWrapper}
                      onClick={() => handleImageClick(imageSrc)}
                    >
                      <img 
                        src={imageSrc} 
                        alt={`Capture d'écran ${index + 1} du projet ${project.title} - ${project.subtitle}`}
                        title={`Agrandir l'image du projet ${project.title}`}
                        className={styles.image}
                        loading="lazy"
                        width="800"
                        height="600"
                      />
                      <div className={styles.imageOverlay}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noImage}>
                  <p>Aucune image disponible</p>
                </div>
              )}
            </div>

            {/* Right side - Project details */}
            <div className={styles.detailsSection}>
              
              {/* Subtitle */}
              <p className={styles.subtitle}>{project.subtitle}</p>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className={styles.tags}>
                  {project.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              {project.description?.long && (
                <div className={styles.block}>
                  <h3 className={styles.blockTitle}>Description</h3>
                  <p className={styles.blockText}>{project.description.long}</p>
                </div>
              )}

              {/* Challenge */}
              {project.challenge && (
                <div className={styles.block}>
                  <h3 className={styles.blockTitle}>Challenge</h3>
                  <p className={styles.blockText}>{project.challenge}</p>
                </div>
              )}

              {/* Solution */}
              {project.solution && (
                <div className={styles.block}>
                  <h3 className={styles.blockTitle}>Solution</h3>
                  <p className={styles.blockText}>{project.solution}</p>
                </div>
              )}

              {/* Compétences */}
              {project.skills && project.skills.length > 0 && (
                <div className={styles.block}>
                  <h3 className={styles.blockTitle}>Compétences</h3>
                  <div className={styles.skills}>
                    {project.skills.map((skill, index) => (
                      <span key={index} className={styles.skill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer info */}
              <div className={styles.footer}>
                <div className={styles.metaInfo}>
                  {project.date && (
                    <span className={styles.date}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      {project.date}
                    </span>
                  )}
                  {project.duration && (
                    <span className={styles.duration}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {project.duration}
                    </span>
                  )}
                </div>
                
                {project.links?.github && (
                  <a 
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.githubLink}
                    aria-label={`Voir le code source du projet ${project.title} sur GitHub`}
                    title="Voir le code source sur GitHub"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span>Voir sur GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox pour afficher l'image en plein écran */}
      {lightboxImage && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.closeLightbox} onClick={closeLightbox} aria-label="Fermer">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <img 
            src={lightboxImage} 
            alt={`Agrandissement de capture d'écran du projet ${project.title}`}
            title={`Image en plein écran - ${project.title}`}
            className={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

export default ProjectModal;
