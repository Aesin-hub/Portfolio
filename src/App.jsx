import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from './store/slices/projectsSlice';
import { setSkillCategory } from './store/slices/skillsSlice';
import Header from './components/Header/Header.jsx';
import Button from './components/Button/Button.jsx';
import ProjectCard from './components/ProjectCard/ProjectCard.jsx';
import SkillCard from './components/SkillCard/SkillCard.jsx';

function App() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.filteredProjects);
  const activeFilter = useSelector((state) => state.projects.activeFilter);
  const skills = useSelector((state) => state.skills.filteredSkills);
  const activeCategory = useSelector((state) => state.skills.activeCategory);

  return (
    <>
      <Header />
      
      <main style={{ marginTop: '80px' }}>
        {/* Hero Section */}
        <section id="hero" style={{ 
          minHeight: '100vh', 
          padding: '4rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ maxWidth: '800px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>
              Lewis Bock
            </h1>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              Développeur Frontend
            </h2>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              De l'ingénierie industrielle au développement web : je mets ma rigueur technique et ma créativité au service d'interfaces utilisateur performantes.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Button variant="primary" size="large">
                Voir mes projets
              </Button>
              <Button variant="outline" size="large">
                Me contacter
              </Button>
            </div>
          </div>
        </section>

        {/* About Section (placeholder) */}
        <section id="about" style={{ 
          minHeight: '100vh', 
          padding: '4rem 2rem',
          background: 'var(--bg-alt)'
        }}>
          <h2 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '2rem' }}>
            À Propos
          </h2>
          <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.125rem' }}>
            Section À propos (à venir)
          </p>
        </section>

        {/* Skills Section */}
        <section id="skills" style={{ 
          minHeight: '100vh', 
          padding: '4rem 2rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <h2 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '3rem' }}>
            Compétences ({skills.length})
          </h2>
          
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            marginBottom: '3rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Button 
              variant={activeCategory === 'all' ? 'primary' : 'secondary'}
              size="small" 
              onClick={() => dispatch(setSkillCategory('all'))}
            >
              Toutes
            </Button>
            <Button 
              variant={activeCategory === 'frontend' ? 'primary' : 'secondary'}
              size="small" 
              onClick={() => dispatch(setSkillCategory('frontend'))}
            >
              Frontend
            </Button>
            <Button 
              variant={activeCategory === 'backend' ? 'primary' : 'secondary'}
              size="small" 
              onClick={() => dispatch(setSkillCategory('backend'))}
            >
              Backend
            </Button>
            <Button 
              variant={activeCategory === 'tools' ? 'primary' : 'secondary'}
              size="small" 
              onClick={() => dispatch(setSkillCategory('tools'))}
            >
              Tools
            </Button>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            {skills.map(skill => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" style={{ 
          minHeight: '100vh', 
          padding: '4rem 2rem',
          background: 'var(--bg-alt)',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <h2 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '3rem' }}>
            Projets ({projects.length})
          </h2>
          
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            marginBottom: '3rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Button 
              variant={activeFilter === 'all' ? 'primary' : 'secondary'}
              size="small" 
              onClick={() => dispatch(setFilter('all'))}
            >
              Tous
            </Button>
            <Button 
              variant={activeFilter === 'html' ? 'primary' : 'secondary'}
              size="small" 
              onClick={() => dispatch(setFilter('html'))}
            >
              HTML/CSS
            </Button>
            <Button 
              variant={activeFilter === 'javascript' ? 'primary' : 'secondary'}
              size="small" 
              onClick={() => dispatch(setFilter('javascript'))}
            >
              JavaScript
            </Button>
            <Button 
              variant={activeFilter === 'react' ? 'primary' : 'secondary'}
              size="small" 
              onClick={() => dispatch(setFilter('react'))}
            >
              React
            </Button>
            <Button 
              variant={activeFilter === 'optimization' ? 'primary' : 'secondary'}
              size="small" 
              onClick={() => dispatch(setFilter('optimization'))}
            >
              Optimization
            </Button>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* Contact Section (placeholder) */}
        <section id="contact" style={{ 
          minHeight: '100vh', 
          padding: '4rem 2rem'
        }}>
          <h2 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '2rem' }}>
            Contact
          </h2>
          <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.125rem', textAlign: 'center' }}>
            Section Contact (à venir)
          </p>
        </section>
      </main>
    </>
  );
}

export default App;