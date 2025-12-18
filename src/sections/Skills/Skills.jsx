// Skills section //
import { useState, useRef, useEffect } from 'react';
import ScrollIndicator from '../../components/ScrollIndicator/ScrollIndicator';
import { scrollToSection } from '../../utils/scroll';
import skillsData from '../../data/skills.json';
import styles from './Skills.module.scss';

function Skills() {
  const [openCategory, setOpenCategory] = useState(null);
  const skillsContainerRef = useRef(null);

  const toggleCategory = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  // Close category when clicking outside the skills container
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
                    // Calculate filled and empty stars based on skill level
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
                        {/* Star rating tooltip */}
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
                        
                        {/* Skill icon */}
                        <img 
                          src={skill.icon} 
                          alt={`Logo ${skill.name}`}
                          title={`Compétence en ${skill.name}`}
                          loading="lazy"
                          width="64"
                          height="64"
                        />
                        
                        {/* Skill name */}
                        <span className={styles.skillName}>{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category header with toggle button */}
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

      <ScrollIndicator onClick={() => scrollToSection('projects')} />
    </section>
  );
}

export default Skills;