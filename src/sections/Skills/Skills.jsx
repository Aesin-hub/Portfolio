// Skills section //
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ScrollIndicator from '../../components/ScrollIndicator/ScrollIndicator';
import { scrollToSection } from '../../utils/scroll';
import skillsData from '../../data/skills.json';
import styles from './Skills.module.scss';

function Skills() {
  const [openCategory, setOpenCategory] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');
  const skillsContainerRef = useRef(null);
  const theme = useSelector((state) => state.theme.mode);

  const toggleCategory = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  // Détecte desktop (≥ 1024px) ET taille écran (laptop/desktop)
  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1024);
      
      // Détermine laptop ou desktop
      if (width >= 1440) {
        setScreenSize('desktop');
      } else if (width >= 1024) {
        setScreenSize('laptop');
      } else {
        setScreenSize('mobile');
      }
    };
    
    checkScreen();
    window.addEventListener('resize', checkScreen);
    
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (skillsContainerRef.current && !skillsContainerRef.current.contains(event.target)) {
        setOpenCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // ✅ Fonction pour choisir l'icône selon le thème
  const getSkillIcon = (skill) => {
    if (skill.iconDark && theme === 'light') {
      return skill.iconDark;
    }
    return skill.icon;
  };

  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        
        {/* Skills categories container */}
        <div className={styles.skillsContainer} ref={skillsContainerRef}>
          {skillsData.skillCategories.map((category) => (
            <div 
              key={category.id} 
              className={`${styles.skillCategory} ${openCategory === category.id ? styles.open : ''}`}
            >
              {/* Category content with skill icons */}
              <div className={styles.categoryContent}>
                <div className={styles.iconGrid}>
                  {category.skills.map((skill) => {
                    const getStars = (level) => {
                      const stars = { filled: 0, empty: 0 };
                      if (level === 'beginner') {
                        stars.filled = 1;
                        stars.empty = 2;
                      } else if (level === 'intermediate') {
                        stars.filled = 2;
                        stars.empty = 1;
                      } else if (level === 'advanced') {
                        stars.filled = 3;
                        stars.empty = 0;
                      }
                      return stars;
                    };
                    
                    const stars = getStars(skill.level);
                    
                    return (
                      <div key={skill.id} className={styles.skillIcon}>
                        <div className={styles.skillTooltip}>
                          {[...Array(stars.filled)].map((_, i) => (
                            <div key={`filled-${i}`} className={styles.star}>
                              <img 
                                src="/assets/icons/star_1.webp" 
                                alt="Étoile pleine"
                                title="Niveau de maîtrise"
                                loading="lazy"
                                width="16"
                                height="16"
                              />
                            </div>
                          ))}
                          {[...Array(stars.empty)].map((_, i) => (
                            <div key={`empty-${i}`} className={styles.star}>
                              <img 
                                src="/assets/icons/star_0.webp" 
                                alt="Étoile vide"
                                title="Niveau de maîtrise"
                                loading="lazy"
                                width="16"
                                height="16"
                              />
                            </div>
                          ))}
                        </div>
                        
                        <img 
                          src={getSkillIcon(skill)}
                          alt={`Logo ${skill.name}`}
                          title={`Compétence en ${skill.name}`}
                          loading="lazy"
                          width="64"
                          height="64"
                        />
                        
                        <span className={styles.skillName}>{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button 
                className={styles.categoryHeader}
                onClick={() => toggleCategory(category.id)}
              >
                <span className={styles.headerIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className={styles.categoryTitle}>{category.label}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Side panel with description */}
        <div className={styles.sidePanel}>
          <h2>Je travaille avec</h2>
          <p>
            Des technologies modernes et performantes pour créer des interfaces utilisateur de qualité professionnelle.
          </p>
        </div>
      </div>

      {/* ScrollIndicator : Position responsive laptop/desktop */}
      {isDesktop && (
        <ScrollIndicator 
          onClick={() => scrollToSection('projects')}
          customBottom={screenSize === 'desktop' ? '64px' : '18px'}
        />
      )}
    </section>
  );
}

export default Skills;
