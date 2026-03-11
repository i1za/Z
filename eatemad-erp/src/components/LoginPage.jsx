import React, { useState, useEffect } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiGlobe, FiAlertCircle } from 'react-icons/fi';
import { api } from '../config/supabase';

// Brand Colors
const Colors = {
  bronze: "#995d26",
  bronzeLight: "#b37840",
  gold: "#d4a574",
  goldLight: "#e8c9a0",
  darkRed: "#7d0a12",
  bgDark: "#0a0806",
  bgPrimary: "#1a1512",
  bgCard: "#221a15",
  textDark: "#e8d5c4",
  textMuted: "#a89580",
  success: "#22c55e",
  error: "#ef4444",
  borderDark: "rgba(212,165,116,0.2)",
};

function LoginPage({ onLogin, language = 'ar', setLanguage, isDarkMode = true }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  // Demo credentials
  const demoCredentials = {
    email: 'admin@eatemad.com',
    password: 'admin123'
  };

  useEffect(() => {
    document.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Check for demo credentials
      if (email === demoCredentials.email && password === demoCredentials.password) {
        const demoUser = {
          id: 'demo-user',
          email: demoCredentials.email,
          full_name: 'مدير النظام',
          role: 'admin',
          access_token: 'demo-token'
        };
        localStorage.setItem('authToken', 'demo-token');
        localStorage.setItem('user', JSON.stringify(demoUser));
        onLogin(demoUser);
        return;
      }

      if (isSignUp) {
        const result = await api.signUp(email, password, fullName);
        if (result.success) {
          setError(language === 'ar' ?
            'تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول.' :
            'Account created successfully! Please login.');
          setIsSignUp(false);
        } else {
          setError(result.error || (language === 'ar' ? 'فشل إنشاء الحساب' : 'Sign up failed'));
        }
      } else {
        const result = await api.signIn(email, password);
        if (result.success) {
          const userProfile = await api.getProfile(result.data.user.id, result.data.access_token);
          const userData = {
            ...result.data.user,
            ...userProfile.data,
            access_token: result.data.access_token
          };
          onLogin(userData);
        } else {
          // For demo purposes, allow any login
          if (email && password) {
            const mockUser = {
              id: 'mock-user',
              email: email,
              full_name: email.split('@')[0],
              role: 'user',
              access_token: 'mock-token'
            };
            localStorage.setItem('authToken', 'mock-token');
            localStorage.setItem('user', JSON.stringify(mockUser));
            onLogin(mockUser);
          } else {
            setError(language === 'ar' ?
              'البريد الإلكتروني أو كلمة المرور غير صحيحة' :
              'Invalid email or password');
          }
        }
      }
    } catch (err) {
      setError(language === 'ar' ? 'حدث خطأ في النظام' : 'System error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await api.resetPassword(resetEmail);
    if (result.success) {
      setResetSuccess(true);
    } else {
      setError(language === 'ar' ? 'فشل إرسال رابط إعادة التعيين' : 'Failed to send reset link');
    }
    setIsLoading(false);
  };

  const theme = {
    bg: isDarkMode ? Colors.bgDark : '#ffffff',
    surface: isDarkMode ? Colors.bgPrimary : '#f9f9f9',
    card: isDarkMode ? Colors.bgCard : '#ffffff',
    text: isDarkMode ? Colors.textDark : '#1a1a1c',
    textMuted: isDarkMode ? Colors.textMuted : '#6b6c70',
    border: isDarkMode ? Colors.borderDark : 'rgba(0,0,0,0.1)',
    accent: Colors.gold,
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${theme.bg} 0%, ${theme.surface} 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      fontFamily: language === 'ar' ?
        "'Cairo', 'Tajawal', system-ui" :
        "'Inter', 'Segoe UI', system-ui",
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
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${Colors.gold}10 0%, transparent 70%)`,
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${Colors.bronze}08 0%, transparent 70%)`,
        }} />
      </div>

      {/* Language Toggle */}
      <button
        onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
        style={{
          position: 'absolute',
          top: '2rem',
          [language === 'ar' ? 'left' : 'right']: '2rem',
          background: theme.card,
          border: `1px solid ${theme.border}`,
          borderRadius: '12px',
          padding: '0.75rem 1.25rem',
          color: theme.text,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 600,
          transition: 'all 0.3s',
          zIndex: 10,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <FiGlobe size={18} />
        {language === 'ar' ? 'English' : 'عربي'}
      </button>

      {/* Login Card */}
      <div style={{
        width: '100%',
        maxWidth: '450px',
        background: theme.card,
        borderRadius: '24px',
        padding: '3rem',
        boxShadow: isDarkMode ?
          '0 20px 60px rgba(0,0,0,0.5)' :
          '0 20px 60px rgba(0,0,0,0.1)',
        border: `1px solid ${theme.border}`,
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Logo and Title */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 1.5rem',
            background: `linear-gradient(135deg, ${Colors.gold}, ${Colors.bronzeLight})`,
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 12px 30px ${Colors.gold}30`,
            position: 'relative',
          }}>
            <img
              src="/eatemad-logo.png"
              alt="Eatemad"
              style={{
                width: '70%',
                height: '70%',
                objectFit: 'contain',
                filter: 'brightness(1.1)',
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<span style="font-size: 40px;">🥩</span>';
              }}
            />
          </div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 800,
            background: `linear-gradient(135deg, ${Colors.gold}, ${Colors.bronzeLight})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 0.5rem',
          }}>
            {language === 'ar' ? 'نظام الاعتماد' : 'Al Eatemad ERP'}
          </h1>
          <p style={{
            color: theme.textMuted,
            fontSize: '0.95rem',
          }}>
            {language === 'ar' ?
              'نظام إدارة الموارد المؤسسية المتكامل' :
              'Integrated Enterprise Resource Planning'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: `${Colors.error}15`,
            border: `1px solid ${Colors.error}30`,
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: Colors.error,
          }}>
            <FiAlertCircle size={20} />
            <span style={{ fontSize: '0.9rem' }}>{error}</span>
          </div>
        )}

        {/* Reset Password Mode */}
        {resetMode ? (
          <form onSubmit={handleReset}>
            {resetSuccess ? (
              <div style={{
                textAlign: 'center',
                padding: '2rem',
                background: `${Colors.success}10`,
                borderRadius: '12px',
                border: `1px solid ${Colors.success}30`,
              }}>
                <p style={{ color: Colors.success, marginBottom: '1rem' }}>
                  {language === 'ar' ?
                    'تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني' :
                    'Reset link sent to your email'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setResetMode(false);
                    setResetSuccess(false);
                    setResetEmail('');
                  }}
                  style={{
                    background: Colors.success,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.75rem 2rem',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  {language === 'ar' ? 'العودة لتسجيل الدخول' : 'Back to Login'}
                </button>
              </div>
            ) : (
              <>
                <h3 style={{
                  color: theme.text,
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                }}>
                  {language === 'ar' ? 'استعادة كلمة المرور' : 'Reset Password'}
                </h3>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: theme.textMuted,
                    fontSize: '0.9rem',
                    fontWeight: 600,
                  }}>
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <div style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                    <FiMail style={{
                      position: 'absolute',
                      [language === 'ar' ? 'right' : 'left']: '1rem',
                      color: theme.textMuted,
                    }} />
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '0.9rem',
                        paddingLeft: language === 'ar' ? '1rem' : '3rem',
                        paddingRight: language === 'ar' ? '3rem' : '1rem',
                        background: theme.surface,
                        border: `1px solid ${theme.border}`,
                        borderRadius: '12px',
                        color: theme.text,
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s',
                      }}
                      onFocus={e => {
                        e.target.style.borderColor = Colors.gold;
                        e.target.style.boxShadow = `0 0 0 3px ${Colors.gold}20`;
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = theme.border;
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      flex: 1,
                      background: `linear-gradient(135deg, ${Colors.gold}, ${Colors.bronzeLight})`,
                      color: '#fff',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '0.9rem',
                      fontSize: '1rem',
                      fontWeight: 700,
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      opacity: isLoading ? 0.7 : 1,
                      transition: 'all 0.3s',
                    }}
                  >
                    {isLoading ?
                      (language === 'ar' ? 'جاري الإرسال...' : 'Sending...') :
                      (language === 'ar' ? 'إرسال رابط الاستعادة' : 'Send Reset Link')
                    }
                  </button>
                  <button
                    type="button"
                    onClick={() => setResetMode(false)}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      color: theme.text,
                      border: `1px solid ${theme.border}`,
                      borderRadius: '12px',
                      padding: '0.9rem',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}
                  >
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                </div>
              </>
            )}
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Sign Up Name Field */}
            {isSignUp && (
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: theme.textMuted,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                }}>
                  {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <FiUser style={{
                    position: 'absolute',
                    [language === 'ar' ? 'right' : 'left']: '1rem',
                    color: theme.textMuted,
                  }} />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required={isSignUp}
                    style={{
                      width: '100%',
                      padding: '0.9rem',
                      paddingLeft: language === 'ar' ? '1rem' : '3rem',
                      paddingRight: language === 'ar' ? '3rem' : '1rem',
                      background: theme.surface,
                      border: `1px solid ${theme.border}`,
                      borderRadius: '12px',
                      color: theme.text,
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s',
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = Colors.gold;
                      e.target.style.boxShadow = `0 0 0 3px ${Colors.gold}20`;
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = theme.border;
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: theme.textMuted,
                fontSize: '0.9rem',
                fontWeight: 600,
              }}>
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </label>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
              }}>
                <FiMail style={{
                  position: 'absolute',
                  [language === 'ar' ? 'right' : 'left']: '1rem',
                  color: theme.textMuted,
                }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={language === 'ar' ? 'admin@eatemad.com' : 'admin@eatemad.com'}
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    paddingLeft: language === 'ar' ? '1rem' : '3rem',
                    paddingRight: language === 'ar' ? '3rem' : '1rem',
                    background: theme.surface,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '12px',
                    color: theme.text,
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = Colors.gold;
                    e.target.style.boxShadow = `0 0 0 3px ${Colors.gold}20`;
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = theme.border;
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
                color: theme.textMuted,
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
                  color: theme.textMuted,
                }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder={language === 'ar' ? 'admin123' : 'admin123'}
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    paddingLeft: language === 'ar' ? '3rem' : '3rem',
                    paddingRight: language === 'ar' ? '3rem' : '3rem',
                    background: theme.surface,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '12px',
                    color: theme.text,
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = Colors.gold;
                    e.target.style.boxShadow = `0 0 0 3px ${Colors.gold}20`;
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = theme.border;
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
                    color: theme.textMuted,
                    cursor: 'pointer',
                    padding: '0.25rem',
                  }}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            {!isSignUp && (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
              }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: theme.textMuted,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}>
                  <input type="checkbox" />
                  {language === 'ar' ? 'تذكرني' : 'Remember me'}
                </label>
                <button
                  type="button"
                  onClick={() => setResetMode(true)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: Colors.gold,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  {language === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                background: `linear-gradient(135deg, ${Colors.gold}, ${Colors.bronzeLight})`,
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                padding: '1rem',
                fontSize: '1.05rem',
                fontWeight: 700,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1,
                transition: 'all 0.3s',
                boxShadow: `0 8px 20px ${Colors.gold}30`,
              }}
              onMouseEnter={e => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 12px 30px ${Colors.gold}40`;
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 8px 20px ${Colors.gold}30`;
              }}
            >
              {isLoading ?
                (language === 'ar' ? 'جاري التحميل...' : 'Loading...') :
                (isSignUp ?
                  (language === 'ar' ? 'إنشاء حساب' : 'Sign Up') :
                  (language === 'ar' ? 'تسجيل الدخول' : 'Sign In')
                )
              }
            </button>

            {/* Switch Mode */}
            <div style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              color: theme.textMuted,
              fontSize: '0.95rem',
            }}>
              {isSignUp ?
                (language === 'ar' ? 'لديك حساب بالفعل؟' : 'Already have an account?') :
                (language === 'ar' ? 'ليس لديك حساب؟' : "Don't have an account?")
              }
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: Colors.gold,
                  marginLeft: language === 'ar' ? '0' : '0.5rem',
                  marginRight: language === 'ar' ? '0.5rem' : '0',
                  cursor: 'pointer',
                  fontWeight: 600,
                  textDecoration: 'underline',
                }}
              >
                {isSignUp ?
                  (language === 'ar' ? 'تسجيل الدخول' : 'Sign In') :
                  (language === 'ar' ? 'إنشاء حساب جديد' : 'Sign Up')
                }
              </button>
            </div>

            {/* Demo Credentials Info */}
            <div style={{
              marginTop: '2rem',
              padding: '1rem',
              background: `${Colors.gold}10`,
              borderRadius: '12px',
              border: `1px solid ${Colors.gold}30`,
              textAlign: 'center',
            }}>
              <p style={{
                color: theme.text,
                fontSize: '0.85rem',
                margin: '0 0 0.5rem',
                fontWeight: 600,
              }}>
                {language === 'ar' ? 'بيانات الدخول التجريبية' : 'Demo Credentials'}
              </p>
              <code style={{
                display: 'block',
                color: Colors.gold,
                fontSize: '0.9rem',
                fontFamily: 'monospace',
              }}>
                admin@eatemad.com / admin123
              </code>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginPage;