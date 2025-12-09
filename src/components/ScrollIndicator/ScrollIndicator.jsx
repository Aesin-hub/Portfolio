import styles from './ScrollIndicator.module.scss';

function ScrollIndicator({ onClick }) {
  return (
    <button className={styles.scrollButton} onClick={onClick} aria-label="Scroll to next section">
      <svg width="20" height="32" viewBox="0 0 40 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Contour de la souris */}
        <rect 
          x="2" 
          y="2" 
          width="36" 
          height="60" 
          rx="18" 
          stroke="currentColor" 
          strokeWidth="3"
          fill="none"
        />
        
        {/* Bille animée */}
        <circle 
          cx="20" 
          cy="16" 
          r="4" 
          fill="currentColor"
          className={styles.scrollDot}
        />
      </svg>
    </button>
  );
}

export default ScrollIndicator;