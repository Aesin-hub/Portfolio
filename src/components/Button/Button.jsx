// Generic Button component //
import styles from './Button.module.scss';

function Button({ 
  children, 
  variant = 'primary',  // primary | secondary | outline
  size = 'medium',      // small | medium | large
  onClick,
  disabled = false,
  type = 'button',
  className = ''
}) {
  // Combine les classes
  const buttonClass = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;

  return (
    <button 
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;