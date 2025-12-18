import { useState, useEffect } from 'react';
import MenuButton from '../MenuButton/MenuButton';
import ActionButton from '../ActionButton/ActionButton';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import FlashBanner from '../FlashBanner/FlashBanner';
import { scrollToSection } from '../../utils/scroll';
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
                  alt="Icône À propos"
                  title="Section À propos"
                  loading="lazy"
                  width="28"
                  height="28"
                  style={{ width: '28px', height: '28px', objectFit: 'contain' }} />}
                onClick={() => scrollToSection('about')}
                label="À propos"
              />
              
              <ActionButton
                icon={<img 
                  src="/assets/icons/skill.webp" 
                  alt="Icône Compétences"
                  title="Section Compétences"
                  loading="lazy"
                  width="28"
                  height="28"
                  style={{ width: '28px', height: '28px', objectFit: 'contain' }} />}
                onClick={() => scrollToSection('skills')}
                label="Compétences"
              />
              
              <ActionButton
                icon={<img 
                  src="/assets/icons/project.webp" 
                  alt="Icône Projets"
                  title="Section Projets"
                  loading="lazy"
                  width="28"
                  height="28"
                  style={{ width: '28px', height: '28px', objectFit: 'contain' }} />}
                onClick={() => scrollToSection('projects')}
                label="Projets"
              />
            </div>
          )}
        </div>

        <FlashBanner />

        <div className={styles.right}>
          <ActionButton
            icon={<img 
              src="/assets/icons/contact.webp" 
              alt="Icône Contact"
              title="Section Contact"
              loading="lazy"
              width="28"
              height="28"
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