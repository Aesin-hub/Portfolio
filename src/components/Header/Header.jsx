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
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>}
                onClick={() => scrollToSection('about')}
                label="À propos"
              />
              
              <ActionButton
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>}
                onClick={() => scrollToSection('skills')}
                label="Compétences"
              />
              
              <ActionButton
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
                </svg>}
                onClick={() => scrollToSection('projects')}
                label="Projets"
              />
            </div>
          )}
        </div>

        <div className={styles.right}>
          <ActionButton
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>}
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