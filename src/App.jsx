import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from './store/slices/projectsSlice';
import { setSkillCategory } from './store/slices/skillsSlice';
import Header from './components/Header/Header.jsx';
import Hero from './sections/Hero/Hero.jsx';
import About from './sections/About/About.jsx';
import Contact from './sections/Contact/Contact.jsx';
import Footer from './components/Footer/Footer.jsx';
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
      
      <main>
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Skills Section */}
        <section id="skills" style={{ 
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

      <Contact />

      <Footer />
      </main>
    </>
  );
}

export default App;