import { useState, useEffect, useRef } from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import styles from './ProjectSlider.module.scss';

function ProjectSlider({ projects, onProjectClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const autoplayRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const totalProjects = projects.length;
  const AUTOPLAY_DURATION = 5000; // 5 seconds
  const PROGRESS_UPDATE_INTERVAL = 50; // Update every 50ms for smooth animation

  // Reset progress when slide changes
  useEffect(() => {
    setProgress(0);
  }, [currentIndex]);

  // Autoplay with progress
  useEffect(() => {
    if (isPaused || totalProjects <= 1) {
      // Clear intervals when paused
      if (autoplayRef.current) clearTimeout(autoplayRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    // Reset progress
    setProgress(0);

    // Progress animation
    const progressIncrement = (PROGRESS_UPDATE_INTERVAL / AUTOPLAY_DURATION) * 100;
    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + progressIncrement;
        if (newProgress >= 100) {
          return 100;
        }
        return newProgress;
      });
    }, PROGRESS_UPDATE_INTERVAL);

    // Auto advance to next slide
    autoplayRef.current = setTimeout(() => {
      nextSlide();
    }, AUTOPLAY_DURATION);

    return () => {
      if (autoplayRef.current) clearTimeout(autoplayRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentIndex, isPaused, totalProjects]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalProjects);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Calculer les indices pour prev, current, next
  const getPrevIndex = () => {
    return (currentIndex - 1 + totalProjects) % totalProjects;
  };

  const getNextIndex = () => {
    return (currentIndex + 1) % totalProjects;
  };

  if (totalProjects === 0) {
    return (
      <div className={styles.empty}>
        <p>Aucun projet à afficher</p>
      </div>
    );
  }

  return (
    <div 
      className={styles.slider}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Container 3D */}
      <div className={styles.carousel}>
        {/* Carte précédente (gauche, background) */}
        {totalProjects > 1 && (
          <div className={`${styles.slideWrapper} ${styles.prev}`}>
            <ProjectCard 
              project={projects[getPrevIndex()]}
              onClick={() => prevSlide()}
            />
          </div>
        )}

        {/* Carte actuelle (centre, principale) */}
        <div className={`${styles.slideWrapper} ${styles.current}`}>
          <ProjectCard 
            project={projects[currentIndex]}
            onClick={() => onProjectClick?.(projects[currentIndex])}
          />
        </div>

        {/* Carte suivante (droite, background) */}
        {totalProjects > 1 && (
          <div className={`${styles.slideWrapper} ${styles.next}`}>
            <ProjectCard 
              project={projects[getNextIndex()]}
              onClick={() => nextSlide()}
            />
          </div>
        )}
      </div>

      {/* Navigation - Flèches et Dots en dessous */}
      {totalProjects > 1 && (
        <div className={styles.navigation}>
          <button 
            className={styles.arrow}
            onClick={prevSlide}
            aria-label="Projet précédent"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className={styles.dots}>
            {projects.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Aller au projet ${index + 1}`}
              >
                {/* Progress bar inside active dot */}
                {index === currentIndex && !isPaused && (
                  <div 
                    className={styles.progressBar}
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>

          <button 
            className={styles.arrow}
            onClick={nextSlide}
            aria-label="Projet suivant"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default ProjectSlider;
