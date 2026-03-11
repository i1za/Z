import { useState } from "react";

const C = {
  bronze: "#995d26",
  bronzeDark: "#7a4a1e",
  bronzeLight: "#b37840",
  beige: "#ead395",
  beigeDark: "#d4b876",
  beigeLight: "#f7edd2",
  darkRed: "#7d0a12",
  gray: "#2d2e31",
  grayDark: "#1a1b1d",
  black: "#0a0806",
  white: "#ffffff",
  error: "#ef4444",
};

function WheatDecor({ size = 100, opacity = 0.15, flip = false }) {
  return (
    <svg width={size*0.45} height={size} viewBox="0 0 50 160" fill="none" style={{display:"block",transform:flip?"scaleX(-1)":"none",opacity,pointerEvents:"none"}}>
      <path d="M25 5 Q27 80 24 158" stroke={C.bronze} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {[[25,15],[32,30],[20,44],[34,58],[18,72],[33,88],[17,104],[31,120],[16,136],[28,150]].map(([cx,cy],i)=>{
        const left=i%2===0; const cx2=left?cx-16:cx+16;
        return <ellipse key={i} cx={cx2} cy={cy} rx="11" ry="6" transform={`rotate(${left?-38:38} ${cx2} ${cy})`} fill={C.beige}/>;
      })}
    </svg>
  );
}

export default function Login({ onLogin, lang, setLang, theme, setTheme }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isDark = theme === 'dark';

  const t = {
    ar: {
      title: "تسجيل الدخول",
      subtitle: "مرحباً بك في نظام الموارد البشرية",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      login: "تسجيل الدخول",
      forgotPassword: "نسيت كلمة المرور؟",
      demoHint: "للتجربة استخدم: admin@eatemad.com / admin123",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      passwordPlaceholder: "أدخل كلمة المرور",
      invalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      fillAllFields: "الرجاء ملء جميع الحقول",
    },
    en: {
      title: "Sign In",
      subtitle: "Welcome to HR Management System",
      email: "Email Address",
      password: "Password",
      login: "Sign In",
      forgotPassword: "Forgot Password?",
      demoHint: "Demo: admin@eatemad.com / admin123",
      emailPlaceholder: "Enter your email",
      passwordPlaceholder: "Enter your password",
      invalidCredentials: "Invalid email or password",
      fillAllFields: "Please fill all fields",
    }
  };

  const text = t[lang];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(text.fillAllFields);
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Demo credentials
      if (email === "admin@eatemad.com" && password === "admin123") {
        localStorage.setItem("eatemad_token", "demo_token_12345");
        localStorage.setItem("eatemad_user", JSON.stringify({
          id: 1,
          name: lang === 'ar' ? "المسؤول" : "Admin",
          email: email,
          role: "admin"
        }));
        onLogin();
      } else {
        setError(text.invalidCredentials);
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: isDark
        ? `linear-gradient(135deg, ${C.grayDark} 0%, ${C.black} 50%, ${C.bronzeDark} 100%)`
        : `linear-gradient(135deg, ${C.beigeLight} 0%, ${C.white} 50%, ${C.beige} 100%)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Cairo', sans-serif",
      transition: "background 0.5s ease",
    }}>
      {/* Background Decorations */}
      <div style={{position:"absolute",top:-100,right:-100,opacity:0.03}}>
        <WheatDecor size={600} flip/>
      </div>
      <div style={{position:"absolute",bottom:-100,left:-100,opacity:0.03}}>
        <WheatDecor size={600}/>
      </div>

      {/* Switchers */}
      <div style={{position:"absolute",top:24,right:24,zIndex:10,display:"flex",gap:12}}>
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          style={{
            background: `linear-gradient(135deg, ${C.bronze}, ${C.bronzeDark})`,
            border: `2px solid ${C.beige}`,
            color: C.white,
            padding: "10px 16px",
            borderRadius: 12,
            fontSize: 18,
            fontWeight: 800,
            cursor: "pointer",
            fontFamily: "'Cairo', sans-serif",
            boxShadow: "0 4px 16px rgba(153,93,38,0.4)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 24px rgba(153,93,38,0.6)";
          }}
          onMouseLeave={e => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 16px rgba(153,93,38,0.4)";
          }}
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        {/* Language Toggle */}
        <button
          onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
          style={{
            background: `linear-gradient(135deg, ${C.bronze}, ${C.bronzeDark})`,
            border: `2px solid ${C.beige}`,
            color: C.white,
            padding: "10px 20px",
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 800,
            cursor: "pointer",
            fontFamily: "'Cairo', sans-serif",
            boxShadow: "0 4px 16px rgba(153,93,38,0.4)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 24px rgba(153,93,38,0.6)";
          }}
          onMouseLeave={e => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 16px rgba(153,93,38,0.4)";
          }}
        >
          {lang === 'ar' ? 'English' : 'العربية'}
        </button>
      </div>

      {/* Login Card */}
      <div style={{
        background: C.white,
        borderRadius: 24,
        width: "100%",
        maxWidth: 460,
        padding: "48px 40px",
        boxShadow: "0 30px 90px rgba(0,0,0,0.5), 0 0 0 2px rgba(234,211,149,0.3)",
        border: `3px solid ${C.beige}`,
        position: "relative",
        overflow: "hidden",
        animation: "fadeInUp 0.6s ease",
        direction: lang === 'ar' ? 'rtl' : 'ltr',
      }}>
        {/* Decorative Elements */}
        <div style={{position:"absolute",top:-30,right:lang === 'ar' ? -30 : undefined,left:lang === 'en' ? -30 : undefined,opacity:0.06}}>
          <WheatDecor size={180} flip={lang === 'ar'}/>
        </div>

        {/* Logo */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 32,
          position: "relative",
          zIndex: 1,
        }}>
          <div style={{
            width: 100,
            height: 100,
            borderRadius: 20,
            background: C.beigeLight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 8px 32px rgba(153,93,38,0.25), inset 0 2px 4px rgba(255,255,255,0.3)`,
            border: `3px solid ${C.beige}`,
            padding: 8,
          }}>
            <img
              src="/logo.png"
              alt="Al Eatemad"
              style={{width: "100%", height: "100%", objectFit: "contain"}}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `
                  <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="45" r="32" stroke="${C.bronze}" stroke-width="3" fill="none"/>
                    <path d="M28 60 Q28 40 40 30 M72 60 Q72 40 60 30" stroke="${C.bronze}" stroke-width="2.5" stroke-linecap="round"/>
                    <text x="50" y="88" font-size="11" fill="${C.bronze}" text-anchor="middle" font-weight="700">الإعتماد</text>
                  </svg>
                `;
              }}
            />
          </div>
        </div>

        {/* Title */}
        <div style={{textAlign: "center", marginBottom: 36, position: "relative", zIndex: 1}}>
          <h1 style={{
            fontSize: 32,
            fontWeight: 900,
            background: `linear-gradient(135deg, ${C.bronzeDark}, ${C.bronze}, ${C.beige})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 8,
            letterSpacing: -0.5,
          }}>
            {text.title}
          </h1>
          <p style={{fontSize: 14, color: C.gray, fontWeight: 600}}>
            {text.subtitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{position: "relative", zIndex: 1}}>
          {/* Email */}
          <div style={{marginBottom: 20}}>
            <label style={{
              display: "block",
              fontSize: 12,
              fontWeight: 800,
              color: C.bronze,
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}>
              {text.email}
            </label>
            <div style={{position: "relative"}}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={text.emailPlaceholder}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  paddingLeft: lang === 'ar' ? 16 : 45,
                  paddingRight: lang === 'ar' ? 45 : 16,
                  fontSize: 14,
                  border: `2px solid ${C.beige}`,
                  borderRadius: 12,
                  outline: "none",
                  fontFamily: "'Cairo', sans-serif",
                  fontWeight: 600,
                  background: C.beigeLight,
                  color: C.black,
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = C.bronze;
                  e.target.style.boxShadow = `0 0 0 4px rgba(153,93,38,0.1)`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = C.beige;
                  e.target.style.boxShadow = "none";
                }}
              />
              <span style={{
                position: "absolute",
                top: "50%",
                [lang === 'ar' ? 'right' : 'left']: 16,
                transform: "translateY(-50%)",
                fontSize: 18,
              }}>📧</span>
            </div>
          </div>

          {/* Password */}
          <div style={{marginBottom: 24}}>
            <label style={{
              display: "block",
              fontSize: 12,
              fontWeight: 800,
              color: C.bronze,
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}>
              {text.password}
            </label>
            <div style={{position: "relative"}}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={text.passwordPlaceholder}
                style={{
                  width: "100%",
                  padding: "14px 50px 14px 16px",
                  fontSize: 14,
                  border: `2px solid ${C.beige}`,
                  borderRadius: 12,
                  outline: "none",
                  fontFamily: "'Cairo', sans-serif",
                  fontWeight: 600,
                  background: C.beigeLight,
                  color: C.black,
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = C.bronze;
                  e.target.style.boxShadow = `0 0 0 4px rgba(153,93,38,0.1)`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = C.beige;
                  e.target.style.boxShadow = "none";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  top: "50%",
                  [lang === 'ar' ? 'left' : 'right']: 16,
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 18,
                  padding: 0,
                }}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              background: `linear-gradient(135deg, ${C.error}15, ${C.error}05)`,
              border: `2px solid ${C.error}`,
              borderRadius: 12,
              padding: "12px 16px",
              marginBottom: 20,
              fontSize: 13,
              color: C.error,
              fontWeight: 700,
              animation: "shake 0.5s",
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Demo Hint */}
          <div style={{
            background: `linear-gradient(135deg, ${C.bronze}08, ${C.beige}15)`,
            border: `2px solid ${C.beige}`,
            borderRadius: 12,
            padding: "10px 14px",
            marginBottom: 24,
            fontSize: 12,
            color: C.bronze,
            fontWeight: 600,
            textAlign: "center",
          }}>
            💡 {text.demoHint}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: 16,
              fontWeight: 900,
              color: C.white,
              background: loading
                ? C.gray
                : `linear-gradient(135deg, ${C.bronze}, ${C.bronzeDark})`,
              border: "none",
              borderRadius: 12,
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "'Cairo', sans-serif",
              boxShadow: loading ? "none" : "0 8px 24px rgba(153,93,38,0.4)",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 12px 32px rgba(153,93,38,0.6)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 24px rgba(153,93,38,0.4)";
              }
            }}
          >
            {loading ? (
              <span style={{display: "flex", alignItems: "center", justifyContent: "center", gap: 8}}>
                <span className="spinner" style={{
                  width: 16,
                  height: 16,
                  border: `3px solid ${C.white}`,
                  borderTopColor: "transparent",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}/>
                {lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}
              </span>
            ) : (
              <span style={{display: "flex", alignItems: "center", justifyContent: "center", gap: 8}}>
                <span>🔓</span>
                {text.login}
              </span>
            )}
          </button>

          {/* Forgot Password */}
          <div style={{textAlign: "center", marginTop: 20}}>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                fontSize: 13,
                color: C.bronze,
                textDecoration: "none",
                fontWeight: 700,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = C.bronzeDark;
                e.target.style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = C.bronze;
                e.target.style.textDecoration = "none";
              }}
            >
              {text.forgotPassword}
            </a>
          </div>
        </form>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        input::placeholder {
          color: rgba(153,93,38,0.4);
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
