import Header from './components/Header/Header.jsx';
import Hero from './sections/Hero/Hero.jsx';
import About from './sections/About/About.jsx';
import Skills from './sections/Skills/Skills.jsx';       
import Projects from './sections/Projects/Projects.jsx';
import Contact from './sections/Contact/Contact.jsx';
import Footer from './components/Footer/Footer.jsx';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function App() {
  // Removed unused variables:
  // - dispatch (not used)
  // - projects (not used in App.jsx)
  // - activeFilter (not used in App.jsx)
  // - skills (not used in App.jsx)
  // - activeCategory (not used in App.jsx)

  return (
    <>
      <Header />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
