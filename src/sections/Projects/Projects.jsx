// Project section //
import { useSelector, useDispatch } from 'react-redux';
import ProjectSlider from '../../components/ProjectSlider/ProjectSlider';
import ScrollIndicator from '../../components/ScrollIndicator/ScrollIndicator';
import { scrollToSection } from '../../utils/scroll';
import styles from './Projects.module.scss';

function Projects() {
  const dispatch = useDispatch();
  
  // Récupérer les données depuis Redux
  const { filteredProjects} = useSelector(
    (state) => state.projects
  );


  // Handler pour l'ouverture du modal (à implémenter plus tard)
  const handleProjectClick = (project) => {
    console.log('Open modal for project:', project);
    // TODO: Ouvrir le modal avec les détails du projet
  };

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        
        {/* Header avec titre */}
        <div className={styles.header}>
          <h2 className={styles.title}>Mes Projets</h2>
        </div>

        {/* Slider de projets avec effet 3D */}
        <ProjectSlider 
          projects={filteredProjects}
          onProjectClick={handleProjectClick}
        />

        {/* Message si aucun projet */}
        {filteredProjects.length === 0 && (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🔍</span>
            <p>Aucun projet ne correspond à ce filtre.</p>
          </div>
        )}
      </div>

      <ScrollIndicator onClick={() => scrollToSection('contact')} />
    </section>
  );
}

export default Projects;
