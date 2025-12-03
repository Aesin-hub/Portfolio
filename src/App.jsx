import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from './store/slices/projectsSlice';
import { setSkillCategory } from './store/slices/skillsSlice';
import Header from './components/Header/Header.jsx';
import Hero from './sections/Hero/Hero.jsx';
import About from './sections/About/About.jsx';
import Skills from './sections/Skills/Skills.jsx';       
import Projects from './sections/Projects/Projects.jsx';
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
        <Skills />

        {/* Projects Section */}
        <Projects />

        {/* Contact Section */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;