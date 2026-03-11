import React, { useState, useEffect } from 'react';
import { FiUser, FiLock, FiEye, FiEyeOff, FiGlobe } from 'react-icons/fi';
import { getRolePermissions, getRoleTitle } from '../config/roleConfig';

// Brand Colors - Matching HR1 Design
const Colors = {
  bronze: "#c4915c",
  bronzeDark: "#8b6239",
  bronzeLight: "#d4a574",
  gold: "#d4a574",
  goldLight: "#e8c9a0",
  goldDark: "#b8935f",
  goldBright: "#f4c430",
  darkRed: "#8b2c2c",
  red: "#c73e3e",
  bgDark: "#0f0c0a",
  bgPrimary: "#1a1410",
  bgSecondary: "#201812",
  bgCard: "#2a1f18",
  textDark: "#f5e6d3",
  textMuted: "#b8a088",
  textGold: "#d4a574",
  success: "#22c55e",
  error: "#ef4444",
  borderDark: "rgba(212,165,116,0.25)",
  borderGold: "rgba(212,165,116,0.4)",
  shadowDark: "0 20px 60px rgba(0,0,0,0.7)",
  shadowGold: "0 10px 40px rgba(212,165,116,0.2)",
};

// Users Database with Roles
const USERS_DATABASE = {
  'zaid.alazzam': {
    username: 'zaid.alazzam',
    password: 'admin@2024',
    fullName: 'زيد العزام',
    englishName: 'Zaid Al-Azzam',
    role: 'admin',
    title: 'مدير النظام',
    titleEn: 'System Administrator',
    department: 'الإدارة العامة',
    permissions: ['*'],
    email: 'zaid@eatemad.com'
  },
  'akram.qasim': {
    username: 'akram.qasim',
    password: 'hr@2024',
    fullName: 'أكرم قاسم',
    englishName: 'Akram Qasim',
    role: 'hr_manager',
    title: 'مدير الموارد البشرية',
    titleEn: 'HR Manager',
    department: 'الموارد البشرية',
    permissions: ['hr', 'employees', 'attendance', 'leaves', 'payroll', 'recruitment', 'performance', 'reports'],
    email: 'akram@eatemad.com'
  },
  'sarah.ahmad': {
    username: 'sarah.ahmad',
    password: 'hr@123',
    fullName: 'سارة أحمد',
    englishName: 'Sarah Ahmad',
    role: 'hr_specialist',
    title: 'أخصائي موارد بشرية',
    titleEn: 'HR Specialist',
    department: 'الموارد البشرية',
    permissions: ['hr', 'employees', 'attendance'],
    email: 'sarah@eatemad.com'
  }
};

function LoginPage({ onLogin, language = 'ar', setLanguage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    document.dir = language === 'ar' ? 'rtl' : 'ltr';

    // Load saved username if remember me was checked
    const savedUsername = localStorage.getItem('rememberedUsername');
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, [language]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      // Check credentials against database
      const user = USERS_DATABASE[username];

      if (user && user.password === password) {
        const resolvedPermissions = Array.isArray(user.permissions) && user.permissions.length > 0
          ? user.permissions
          : getRolePermissions(user.role);

        const resolvedTitle = language === 'ar'
          ? (user.title || getRoleTitle(user.role, 'ar'))
          : (user.titleEn || getRoleTitle(user.role, 'en'));

        // Successful login
        const userData = {
          id: username,
          username: user.username,
          fullName: user.fullName,
          englishName: user.englishName,
          role: user.role,
          title: resolvedTitle,
          department: user.department,
          permissions: resolvedPermissions,
          email: user.email,
          loginTime: new Date().toISOString()
        };

        // Handle remember me
        if (rememberMe) {
          localStorage.setItem('rememberedUsername', username);
        } else {
          localStorage.removeItem('rememberedUsername');
        }

        localStorage.setItem('authToken', `token-${username}`);
        localStorage.setItem('user', JSON.stringify(userData));
        onLogin(userData);
      } else {
        setError(language === 'ar' ?
          'اسم المستخدم أو كلمة المرور غير صحيحة' :
          'Invalid username or password');
      }
    } catch (err) {
      setError(language === 'ar' ? 'حدث خطأ في النظام' : 'System error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${Colors.bgDark} 0%, ${Colors.bgPrimary} 25%, ${Colors.bgSecondary} 50%, ${Colors.bgPrimary} 75%, ${Colors.bgDark} 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      fontFamily: language === 'ar' ?
        "'Cairo', 'Tajawal', 'Arial', sans-serif" :
        "'Inter', 'Segoe UI', 'Arial', sans-serif",
      direction: language === 'ar' ? 'rtl' : 'ltr',
    }}>
      {/* Background Decorations */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        {/* Gold accent gradients */}
        <div style={{
          position: 'absolute',
          top: '-30%',
          right: '-20%',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${Colors.gold}15 0%, transparent 60%)`,
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-20%',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${Colors.bronze}10 0%, transparent 60%)`,
          filter: 'blur(60px)',
        }} />
      </div>

      {/* Language Toggle */}
      <button
        onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
        style={{
          position: 'absolute',
          top: '2rem',
          [language === 'ar' ? 'left' : 'right']: '2rem',
          background: `linear-gradient(135deg, ${Colors.bgCard}, ${Colors.bgSecondary})`,
          border: `1px solid ${Colors.borderGold}`,
          borderRadius: '12px',
          padding: '0.75rem 1.25rem',
          color: Colors.textGold,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 600,
          transition: 'all 0.3s',
          zIndex: 10,
          boxShadow: Colors.shadowGold,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = `${Colors.shadowGold}, 0 0 20px rgba(212,165,116,0.3)`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = Colors.shadowGold;
        }}
      >
        <FiGlobe size={18} />
        {language === 'ar' ? 'English' : 'عربي'}
      </button>

      {/* Login Card */}
      <div style={{
        width: '100%',
        maxWidth: '480px',
        background: `linear-gradient(135deg, ${Colors.bgCard} 0%, ${Colors.bgSecondary} 100%)`,
        borderRadius: '24px',
        padding: '3.5rem 3rem',
        boxShadow: `${Colors.shadowDark}, 0 0 60px rgba(212,165,116,0.1)`,
        border: `1px solid ${Colors.borderGold}`,
        position: 'relative',
        zIndex: 1,
        backdropFilter: 'blur(10px)',
      }}>
        {/* Logo and Title */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          {/* Logo Circle */}
          <div style={{
            width: '100px',
            height: '100px',
            margin: '0 auto 1.5rem',
            background: `linear-gradient(135deg, ${Colors.gold}, ${Colors.bronzeDark})`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 15px 40px rgba(212,165,116,0.4)`,
            position: 'relative',
            border: `2px solid ${Colors.borderGold}`,
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#fff',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}>
              <span style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                marginBottom: '2px',
              }}>الاعتماد</span>
              <span style={{
                fontSize: '0.6rem',
                letterSpacing: '2px',
                opacity: 0.95,
              }}>AL EATEMAD</span>
            </div>
          </div>

          <h1 style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: Colors.textGold,
            margin: '0 0 0.5rem',
            textShadow: '0 2px 10px rgba(212,165,116,0.2)',
          }}>
            {language === 'ar' ? 'نظام الموارد البشرية' : 'Human Resources System'}
          </h1>
          <p style={{
            color: Colors.textMuted,
            fontSize: '0.95rem',
          }}>
            {language === 'ar' ?
              'مرحباً بك في نظام إدارة الموارد البشرية' :
              'Welcome to HR Management System'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: `${Colors.error}15`,
            border: `1px solid ${Colors.error}40`,
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1.5rem',
            textAlign: 'center',
            color: '#ff6b6b',
            fontSize: '0.9rem',
            animation: 'fadeIn 0.3s ease',
          }}>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: Colors.textGold,
              fontSize: '0.9rem',
              fontWeight: 600,
            }}>
              {language === 'ar' ? 'اسم المستخدم' : 'Username'}
            </label>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}>
              <FiUser style={{
                position: 'absolute',
                [language === 'ar' ? 'right' : 'left']: '1rem',
                color: Colors.bronzeDark,
                fontSize: '1.2rem',
              }} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل اسم المستخدم' : 'Enter username'}
                required
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '1rem 3rem',
                  background: 'rgba(0,0,0,0.3)',
                  border: `1px solid ${Colors.borderDark}`,
                  borderRadius: '12px',
                  color: Colors.textDark,
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s',
                  fontFamily: 'inherit',
                }}
                onFocus={e => {
                  e.target.style.borderColor = Colors.gold;
                  e.target.style.background = 'rgba(0,0,0,0.5)';
                  e.target.style.boxShadow = `0 0 20px ${Colors.gold}30`;
                }}
                onBlur={e => {
                  e.target.style.borderColor = Colors.borderDark;
                  e.target.style.background = 'rgba(0,0,0,0.3)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: Colors.textGold,
              fontSize: '0.9rem',
              fontWeight: 600,
            }}>
              {language === 'ar' ? 'كلمة المرور' : 'Password'}
            </label>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}>
              <FiLock style={{
                position: 'absolute',
                [language === 'ar' ? 'right' : 'left']: '1rem',
                color: Colors.bronzeDark,
                fontSize: '1.2rem',
              }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter password'}
                required
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '1rem 3rem',
                  background: 'rgba(0,0,0,0.3)',
                  border: `1px solid ${Colors.borderDark}`,
                  borderRadius: '12px',
                  color: Colors.textDark,
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s',
                  fontFamily: 'inherit',
                }}
                onFocus={e => {
                  e.target.style.borderColor = Colors.gold;
                  e.target.style.background = 'rgba(0,0,0,0.5)';
                  e.target.style.boxShadow = `0 0 20px ${Colors.gold}30`;
                }}
                onBlur={e => {
                  e.target.style.borderColor = Colors.borderDark;
                  e.target.style.background = 'rgba(0,0,0,0.3)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  [language === 'ar' ? 'left' : 'right']: '1rem',
                  background: 'transparent',
                  border: 'none',
                  color: Colors.bronzeDark,
                  cursor: 'pointer',
                  padding: '0.5rem',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = Colors.gold}
                onMouseLeave={e => e.currentTarget.style.color = Colors.bronzeDark}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div style={{
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{
                width: '18px',
                height: '18px',
                cursor: 'pointer',
                accentColor: Colors.gold,
              }}
            />
            <label
              htmlFor="rememberMe"
              style={{
                color: Colors.textMuted,
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              {language === 'ar' ? 'تذكرني' : 'Remember me'}
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              background: `linear-gradient(135deg, ${Colors.gold}, ${Colors.bronzeDark})`,
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              padding: '1.1rem',
              fontSize: '1.1rem',
              fontWeight: 700,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              transition: 'all 0.3s',
              boxShadow: `0 10px 30px ${Colors.gold}40`,
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={e => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 15px 40px ${Colors.gold}50`;
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 10px 30px ${Colors.gold}40`;
            }}
          >
            {isLoading ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '3px solid rgba(255,255,255,0.3)',
                  borderTopColor: '#fff',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
                {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
              </div>
            ) : (
              language === 'ar' ? 'تسجيل الدخول' : 'Sign In'
            )}
          </button>

          {/* Demo Accounts Info */}
          <div style={{
            marginTop: '2rem',
            padding: '1.2rem',
            background: `linear-gradient(135deg, rgba(212,165,116,0.05), rgba(212,165,116,0.1))`,
            borderRadius: '12px',
            border: `1px solid ${Colors.borderGold}`,
          }}>
            <p style={{
              color: Colors.textGold,
              fontSize: '0.85rem',
              margin: '0 0 0.75rem',
              fontWeight: 600,
              textAlign: 'center',
            }}>
              {language === 'ar' ? 'حسابات تجريبية للاختبار' : 'Demo Accounts for Testing'}
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.5rem 0.75rem',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '8px',
                fontSize: '0.8rem',
              }}>
                <span style={{ color: Colors.textGold, fontWeight: 500 }}>
                  {language === 'ar' ? 'مدير النظام:' : 'Admin:'}
                </span>
                <span style={{ color: Colors.textMuted, fontFamily: 'monospace' }}>
                  zaid.alazzam / admin@2024
                </span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.5rem 0.75rem',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '8px',
                fontSize: '0.8rem',
              }}>
                <span style={{ color: Colors.textGold, fontWeight: 500 }}>
                  {language === 'ar' ? 'مدير HR:' : 'HR Manager:'}
                </span>
                <span style={{ color: Colors.textMuted, fontFamily: 'monospace' }}>
                  akram.qasim / hr@2024
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Inline Styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        input::placeholder {
          color: #6b5d4f;
          opacity: 0.7;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type=checkbox] {
          -webkit-appearance: none;
          appearance: none;
          background-color: rgba(0,0,0,0.3);
          margin: 0;
          font: inherit;
          color: currentColor;
          width: 1.15em;
          height: 1.15em;
          border: 1px solid ${Colors.borderDark};
          border-radius: 0.25em;
          display: grid;
          place-content: center;
        }

        input[type=checkbox]::before {
          content: "";
          width: 0.65em;
          height: 0.65em;
          transform: scale(0);
          transition: 120ms transform ease-in-out;
          box-shadow: inset 1em 1em ${Colors.gold};
          background-color: ${Colors.gold};
          transform-origin: bottom left;
          clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
        }

        input[type=checkbox]:checked::before {
          transform: scale(1);
        }

        input[type=checkbox]:focus {
          outline: 2px solid ${Colors.gold};
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}

export default LoginPage;
