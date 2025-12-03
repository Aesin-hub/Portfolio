// Header component //

import { useState, useEffect } from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './Header.module.scss';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Détecter le scroll pour ajouter shadow au header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll vers les sections
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false); // Fermer le menu mobile après clic
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo / Nom */}
        <div className={styles.logo}>
          <button 
            onClick={() => scrollToSection('hero')}
            className={styles.logoButton}
          >
            <span className={styles.logoText}>LB</span>
            <span className={styles.logoName}>Lewis Bock</span>
          </button>
        </div>

        {/* Navigation Desktop */}
        <nav className={styles.nav}>
          <button 
            onClick={() => scrollToSection('hero')}
            className={styles.navLink}
          >
            Accueil
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className={styles.navLink}
          >
            À propos
          </button>
          <button 
            onClick={() => scrollToSection('skills')}
            className={styles.navLink}
          >
            Compétences
          </button>
          <button 
            onClick={() => scrollToSection('projects')}
            className={styles.navLink}
          >
            Projets
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className={styles.navLink}
          >
            Contact
          </button>
        </nav>

        {/* Theme Toggle + Burger Menu */}
        <div className={styles.actions}>
          <ThemeToggle />
          
          {/* Burger Menu (Mobile) */}
          <button 
            className={`${styles.burger} ${isMobileMenuOpen ? styles.open : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        <nav className={styles.mobileNav}>
          <button onClick={() => scrollToSection('hero')}>
            Accueil
          </button>
          <button onClick={() => scrollToSection('about')}>
            À propos
          </button>
          <button onClick={() => scrollToSection('skills')}>
            Compétences
          </button>
          <button onClick={() => scrollToSection('projects')}>
            Projets
          </button>
          <button onClick={() => scrollToSection('contact')}>
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;