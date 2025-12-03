// Skills section //
import { useSelector, useDispatch } from 'react-redux';
import { setSkillCategory } from '../../store/slices/skillsSlice';
import SkillCard from '../../components/SkillCard/SkillCard';
import styles from './Skills.module.scss';

function Skills() {
  const dispatch = useDispatch();
  
  // Récupérer les données depuis Redux
  const { categories, filteredSkills, activeCategory } = useSelector(
    (state) => state.skills
  );

  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        
        {/* Header avec titre */}
        <div className={styles.header}>
          <span className={styles.tag}>Mes compétences</span>
          <h2 className={styles.title}>Technologies & Outils</h2>
          <p className={styles.subtitle}>
            Un aperçu des technologies que je maîtrise pour créer des applications web modernes et performantes.
          </p>
        </div>

        {/* Filtres par catégorie */}
        <div className={styles.filters}>
          <button
            className={`${styles.filter} ${activeCategory === 'all' ? styles.active : ''}`}
            onClick={() => dispatch(setSkillCategory('all'))}
          >
            <span className={styles.filterIcon}>⚡</span>
            Toutes
            <span className={styles.filterCount}>
              {categories.reduce((total, cat) => total + cat.skills.length, 0)}
            </span>
          </button>

          {/* Boutons pour chaque catégorie */}
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.filter} ${activeCategory === category.id ? styles.active : ''}`}
              onClick={() => dispatch(setSkillCategory(category.id))}
              style={{ '--category-color': category.color }}
            >
              <span className={styles.filterIcon}>
                {category.id === 'frontend' && '💻'}
                {category.id === 'backend' && '⚙️'}
                {category.id === 'tools' && '🔧'}
              </span>
              {category.label}
              <span className={styles.filterCount}>{category.skills.length}</span>
            </button>
          ))}
        </div>

        {/* Grille de compétences */}
        <div className={styles.grid}>
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>

        {/* Message si aucune compétence */}
        {filteredSkills.length === 0 && (
          <div className={styles.empty}>
            <p>Aucune compétence dans cette catégorie.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Skills;