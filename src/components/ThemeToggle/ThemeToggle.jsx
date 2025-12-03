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
              <path d="M12 17.5C14.7614 17.5 17 15.2614 17 12.5C17 9.73858 14.7614 7.5 12 7.5C9.23858 7.5 7 9.73858 7 12.5C7 15.2614 9.23858 17.5 12 17.5Z"/>
              <path d="M12 1.25V3.75M12 21.25V23.75M23.75 12.5H21.25M3.75 12.5H1.25M20.4853 4.51472L18.7175 6.28251M6.28249 18.7175L4.5147 20.4853M20.4853 20.4853L18.7175 18.7175M6.28249 6.28251L4.5147 4.51472"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}

export default ThemeToggle;