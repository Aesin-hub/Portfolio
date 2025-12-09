import { useState, useEffect } from 'react';
import MenuButton from '../MenuButton/MenuButton';
import ActionButton from '../ActionButton/ActionButton';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './Header.module.scss';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        
        <div className={styles.left}>
          <MenuButton 
            isOpen={isMenuOpen} 
            onToggle={() => setIsMenuOpen(!isMenuOpen)}
          />
          
          {isMenuOpen && (
            <div className={styles.cascadeButtons}>
              <ActionButton
                icon={<img
                  src="/assets/icons/about.webp" 
                  alt="À propos"
                  style={{ width: '28px', height: '28px', objectFit: 'contain' }} />}
                onClick={() => scrollToSection('about')}
                label="À propos"
              />
              
              <ActionButton
                icon={<img 
                  src="/assets/icons/skill.webp" 
                  alt="Compétences"
                  style={{ width: '28px', height: '28px', objectFit: 'contain' }} />}
                onClick={() => scrollToSection('skills')}
                label="Compétences"
              />
              
              <ActionButton
                icon={<img 
                  src="/assets/icons/project.webp" 
                  alt="Projets" 
                  style={{ width: '28px', height: '28px', objectFit: 'contain' }} />}
                onClick={() => scrollToSection('projects')}
                label="Projets"
              />
            </div>
          )}
        </div>

        <div className={styles.right}>
          <ActionButton
            icon={<img 
              src="/assets/icons/contact.webp" 
              alt="Contact"
              style={{ width: '28px', height: '28px', objectFit: 'contain' }} />}
            onClick={() => scrollToSection('contact')}
            label="Contact"
          />
          
          <div className={styles.toggleStack}>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;