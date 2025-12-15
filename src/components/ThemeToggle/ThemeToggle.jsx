// Dark mode button component //

import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../store/slices/themeSlice';
import styles from './ThemeToggle.module.scss';

function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  return (
    <button 
      className={styles.toggle}
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
    >
      <div className={`${styles.track} ${theme === 'dark' ? styles.dark : ''}`}>
        <div className={styles.thumb}>
          {theme === 'light' ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
              {/* Simple sun icon - circle + rays */}
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
              {/* Moon icon */}
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}

export default ThemeToggle;
