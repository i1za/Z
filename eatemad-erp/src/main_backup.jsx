import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import AppLuxury from './AppLuxury.jsx';
import Login from './Login.jsx';
import './index.css';

function Root() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lang, setLang] = useState('ar');
  const [theme, setTheme] = useState('dark');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('eatemad_token');
    const savedLang = localStorage.getItem('eatemad_lang') || 'ar';
    const savedTheme = localStorage.getItem('eatemad_theme') || 'dark';

    setLang(savedLang);
    setTheme(savedTheme);

    if (token) {
      setIsAuthenticated(true);
    }

    setTimeout(() => setLoading(false), 800);
  }, []);

  useEffect(() => {
    localStorage.setItem('eatemad_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('eatemad_theme', theme);
  }, [theme]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('eatemad_token');
    localStorage.removeItem('eatemad_user');
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme === 'dark'
          ? 'linear-gradient(135deg, #1a1b1d 0%, #0a0806 50%, #7a4a1e 100%)'
          : 'linear-gradient(135deg, #f7edd2 0%, #ffffff 50%, #ead395 100%)',
        fontFamily: "'Cairo', sans-serif",
      }}>
        <div style={{textAlign: 'center'}}>
          <div style={{
            width: 80,
            height: 80,
            border: '6px solid #995d26',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 24px',
          }}/>
          <div style={{
            fontSize: 20,
            fontWeight: 900,
            background: 'linear-gradient(135deg, #7a4a1e, #995d26, #ead395)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}
          </div>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />;
  }

  return <AppLuxury onLogout={handleLogout} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
