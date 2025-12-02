import { useCallback } from 'react';
import Button from './components/Button/Button.jsx';

function App() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  // eslint-disable-next-line no-unused-vars
  const toggleDarkMode = useCallback(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
  }, []);

  return (
    <div style={{ 
      padding: '4rem', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '2rem',
      alignItems: 'center'
    }}>
      {/* BOUTON DARK MODE - EN HAUT À DROITE */}
      <button 
        onClick={toggleDarkMode}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '10px 20px',
          background: '#333',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 'bold',
          zIndex: 1000
        }}
      >
        🌙 Toggle Dark Mode
      </button>

      <h1>🔘 Test des Buttons</h1>
      
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button variant="primary" onClick={handleClick}>
          Primary Button
        </Button>
        
        <Button variant="secondary" onClick={handleClick}>
          Secondary Button
        </Button>
        
        <Button variant="outline" onClick={handleClick}>
          Outline Button
        </Button>
      </div>
      
      <h2>Sizes</h2>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button variant="primary" size="small">
          Small
        </Button>
        
        <Button variant="primary" size="medium">
          Medium
        </Button>
        
        <Button variant="primary" size="large">
          Large
        </Button>
      </div>
      
      <h2>States</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button variant="primary" disabled>
          Disabled
        </Button>
        
        <Button variant="outline" onClick={handleClick}>
          Hover me!
        </Button>
      </div>
    </div>
  );
}

export default App;