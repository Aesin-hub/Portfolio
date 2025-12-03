// Skill card component //

import styles from './SkillCard.module.scss';

function SkillCard({ skill }) {
  // Fonction pour afficher le niveau en étoiles
  const renderLevel = () => {
    const levels = {
      beginner: 1,
      intermediate: 2,
      advanced: 3,
    };
    
    const stars = levels[skill.level] || 0;
    
    return (
      <div className={styles.level}>
        {[...Array(3)].map((_, index) => (
          <span 
            key={index} 
            className={`${styles.star} ${index < stars ? styles.active : ''}`}
          >
            ⭐
          </span>
        ))}
      </div>
    );
  };

  return (
    <article className={styles.card}>
      {/* Icône */}
      <div className={styles.iconWrapper}>
        <img 
          src={skill.icon} 
          alt={skill.name}
          className={styles.icon}
        />
      </div>

      {/* Nom */}
      <h3 className={styles.name}>{skill.name}</h3>

      {/* Description */}
      <p className={styles.description}>{skill.description}</p>

      {/* Niveau */}
      {renderLevel()}
      
      {/* Label niveau */}
      <span className={styles.levelLabel}>
        {skill.level === 'beginner' && 'Débutant'}
        {skill.level === 'intermediate' && 'Intermédiaire'}
        {skill.level === 'advanced' && 'Avancé'}
      </span>
    </article>
  );
}

export default SkillCard;