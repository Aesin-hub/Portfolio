// Project section //
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../store/slices/projectsSlice';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import styles from './Projects.module.scss';

function Projects() {
  const dispatch = useDispatch();
  
  // Récupérer les données depuis Redux
  const { filteredProjects, activeFilter } = useSelector(
    (state) => state.projects
  );

  // Catégories de filtres
  const filters = [
    { id: 'all', label: 'Tous les projets', icon: '🎯' },
    { id: 'html', label: 'HTML/CSS', icon: '🎨' },
    { id: 'javascript', label: 'JavaScript', icon: '⚡' },
    { id: 'react', label: 'React', icon: '⚛️' },
    { id: 'optimization', label: 'Optimisation', icon: '🚀' },
  ];

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        
        {/* Header avec titre */}
        <div className={styles.header}>
          <span className={styles.tag}>Portfolio</span>
          <h2 className={styles.title}>Mes Projets</h2>
          <p className={styles.subtitle}>
            Une sélection de projets réalisés lors de ma formation OpenClassrooms, 
            démontrant mes compétences en développement frontend.
          </p>
        </div>

        {/* Filtres */}
        <div className={styles.filters}>
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`${styles.filter} ${activeFilter === filter.id ? styles.active : ''}`}
              onClick={() => dispatch(setFilter(filter.id))}
            >
              <span className={styles.filterIcon}>{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </div>

        {/* Compteur de projets */}
        <div className={styles.count}>
          {filteredProjects.length} projet{filteredProjects.length > 1 ? 's' : ''} trouvé{filteredProjects.length > 1 ? 's' : ''}
        </div>

        {/* Grille de projets */}
        <div className={styles.grid}>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Message si aucun projet */}
        {filteredProjects.length === 0 && (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🔍</span>
            <p>Aucun projet ne correspond à ce filtre.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;