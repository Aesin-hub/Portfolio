// Project section //
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProjectSlider from '../../components/ProjectSlider/ProjectSlider';
import ProjectModal from '../../components/ProjectModal/ProjectModal';
import ScrollIndicator from '../../components/ScrollIndicator/ScrollIndicator';
import { scrollToSection } from '../../utils/scroll';
import styles from './Projects.module.scss';

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');
  
  // Récupérer les projets depuis Redux
  const { filteredProjects } = useSelector((state) => state.projects);

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

  // Handler pour l'ouverture du modal
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Handler pour la fermeture du modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Petit délai avant de reset le projet pour l'animation de fermeture
    setTimeout(() => setSelectedProject(null), 300);
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
            <p>Aucun projet à afficher.</p>
          </div>
        )}
      </div>

      {/* ScrollIndicator : Centré, hauteur responsive laptop/desktop */}
      {isDesktop && (
        <ScrollIndicator 
          onClick={() => scrollToSection('contact')}
          customBottom={screenSize === 'desktop' ? '48px' : '24px'}
          // customLeft et customRight non définis = centré par défaut
        />
      )}

      {/* Modal de détails du projet */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}

export default Projects;
