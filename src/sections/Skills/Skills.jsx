// Skills section //
import { useState, useRef, useEffect } from 'react';
import ScrollIndicator from '../../components/ScrollIndicator/ScrollIndicator';
import { scrollToSection } from '../../utils/scroll';
import skillsData from '../../data/skills.json';
import styles from './Skills.module.scss';

function Skills() {
  const [openCategory, setOpenCategory] = useState(null);
  const containerRef = useRef(null);

  const toggleCategory = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  // ✅ Fermer quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
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
        
        {/* Partie gauche : Les compétences */}
        <div className={styles.skillsContainer} ref={containerRef}>
          {skillsData.skillCategories.map((category) => (
            <div 
              key={category.id} 
              className={`${styles.tupperware} ${openCategory === category.id ? styles.open : ''}`}
            >
              {/* Le container transparent avec les icônes (toujours visible) */}
              <div className={styles.container_}>
                <div className={styles.iconGrid}>
                  {category.skills.map((skill) => (
                    <div key={skill.id} className={styles.skillIcon}>
                      <img src={skill.icon} alt={skill.name} />
                      <span className={styles.skillTooltip}>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Le couvercle avec le titre (cliquable) */}
              <button 
                className={styles.lid}
                onClick={() => toggleCategory(category.id)}
              >
                <span className={styles.arrow}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className={styles.categoryTitle}>{category.label}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Partie droite : "Je travaille avec" */}
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