import React, { useState, useEffect } from 'react';
import {
  FiSun, FiMoon, FiHome, FiUsers, FiShoppingCart, FiBarChart2,
  FiSettings, FiBox, FiTruck, FiDollarSign, FiFileText, FiCalendar,
  FiCreditCard, FiDatabase, FiGrid, FiLogOut, FiBell, FiSearch,
  FiChevronDown, FiChevronRight, FiActivity
} from 'react-icons/fi';

function ERPSystem() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [language, setLanguage] = useState('ar');
  const [notifications, setNotifications] = useState(5);
  const [user] = useState({
    name: 'محمد الأحمد',
    role: 'مدير النظام',
    email: 'admin@eatemad.com'
  });

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
    document.dir = language === 'ar' ? 'ltr' : 'rtl';
  };

  useEffect(() => {
    // Apply theme on mount
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
    }

    // Set document direction based on language
    document.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, []);

  // Modules configuration
  const modules = [
    { id: 'dashboard', label: 'لوحة التحكم', labelEn: 'Dashboard', icon: FiGrid, color: '#995d26' },
    { id: 'hr', label: 'الموارد البشرية', labelEn: 'HR', icon: FiUsers, color: '#7d0a12' },
    { id: 'accounting', label: 'المحاسبة', labelEn: 'Accounting', icon: FiDollarSign, color: '#22c55e' },
    { id: 'inventory', label: 'المخزون', labelEn: 'Inventory', icon: FiBox, color: '#3b82f6' },
    { id: 'sales', label: 'المبيعات', labelEn: 'Sales', icon: FiShoppingCart, color: '#f59e0b' },
    { id: 'purchases', label: 'المشتريات', labelEn: 'Purchases', icon: FiTruck, color: '#8b5cf6' },
    { id: 'reports', label: 'التقارير', labelEn: 'Reports', icon: FiBarChart2, color: '#ef4444' },
    { id: 'projects', label: 'المشاريع', labelEn: 'Projects', icon: FiFileText, color: '#06b6d4' },
    { id: 'payroll', label: 'الرواتب', labelEn: 'Payroll', icon: FiCreditCard, color: '#ec4899' },
    { id: 'settings', label: 'الإعدادات', labelEn: 'Settings', icon: FiSettings, color: '#64748b' },
  ];

  // Theme colors
  const theme = {
    dark: {
      bg: 'linear-gradient(135deg, #0a0806 0%, #1a1b1d 100%)',
      surface: 'rgba(45, 46, 49, 0.95)',
      surfaceLight: 'rgba(61, 62, 66, 0.85)',
      text: '#f7edd2',
      textMuted: '#ead395',
      border: 'rgba(234, 211, 149, 0.15)',
      accent: '#995d26',
      accentLight: '#b37840',
      shadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
      cardBg: 'linear-gradient(145deg, rgba(45, 46, 49, 0.9), rgba(26, 27, 29, 0.9))',
      glass: 'rgba(45, 46, 49, 0.7)',
    },
    light: {
      bg: 'linear-gradient(135deg, #ffffff 0%, #f7edd2 100%)',
      surface: 'rgba(255, 255, 255, 0.95)',
      surfaceLight: 'rgba(247, 237, 210, 0.85)',
      text: '#1a1a1c',
      textMuted: '#6b6c70',
      border: 'rgba(153, 93, 38, 0.15)',
      accent: '#995d26',
      accentLight: '#b37840',
      shadow: '0 4px 20px rgba(153, 93, 38, 0.15)',
      cardBg: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(247, 237, 210, 0.9))',
      glass: 'rgba(255, 255, 255, 0.7)',
    }
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <div
      className="erp-container"
      style={{
        minHeight: '100vh',
        background: currentTheme.bg,
        color: currentTheme.text,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: "'Segoe UI', 'Cairo', 'Tajawal', system-ui, sans-serif",
      }}
    >
      {/* Top Header */}
      <header style={{
        height: '70px',
        background: currentTheme.glass,
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${currentTheme.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        boxShadow: currentTheme.shadow,
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}>
        {/* Logo and Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img
            src="/eatemad-logo.png"
            alt="Al Eatemad"
            style={{
              height: '50px',
              filter: isDarkMode ? 'brightness(1.2)' : 'none',
            }}
          />
          <div>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              background: `linear-gradient(135deg, ${currentTheme.accent}, ${currentTheme.accentLight})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
            }}>
              نظام الاعتماد ERP
            </h1>
            <p style={{ fontSize: '0.8rem', color: currentTheme.textMuted, margin: 0 }}>
              Enterprise Resource Planning
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {/* Search Bar */}
          <div style={{
            position: 'relative',
            background: currentTheme.surface,
            borderRadius: '50px',
            padding: '0.5rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            minWidth: '300px',
          }}>
            <FiSearch style={{ color: currentTheme.textMuted }} />
            <input
              type="text"
              placeholder={language === 'ar' ? 'بحث...' : 'Search...'}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: currentTheme.text,
                width: '100%',
              }}
            />
          </div>

          {/* Notifications */}
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <FiBell size={22} />
            {notifications > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#ef4444',
                color: '#fff',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem',
                fontWeight: 'bold',
              }}>
                {notifications}
              </span>
            )}
          </div>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            style={{
              background: currentTheme.surface,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              color: currentTheme.text,
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          >
            {language === 'ar' ? 'EN' : 'عربي'}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              background: currentTheme.accent,
              border: 'none',
              borderRadius: '50%',
              width: '45px',
              height: '45px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#fff',
              transition: 'all 0.3s',
              boxShadow: '0 4px 15px rgba(153, 93, 38, 0.3)',
            }}
            onMouseEnter={e => e.target.style.transform = 'rotate(180deg) scale(1.1)'}
            onMouseLeave={e => e.target.style.transform = 'rotate(0) scale(1)'}
          >
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* User Profile */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.5rem 1rem',
            background: currentTheme.surface,
            borderRadius: '50px',
            cursor: 'pointer',
          }}>
            <div style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
              <p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.9rem' }}>{user.name}</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: currentTheme.textMuted }}>{user.role}</p>
            </div>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${currentTheme.accent}, ${currentTheme.accentLight})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 'bold',
            }}>
              {user.name.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 70px)' }}>
        {/* Sidebar */}
        <aside style={{
          width: sidebarExpanded ? '280px' : '80px',
          background: currentTheme.surface,
          borderRight: language === 'ar' ? `1px solid ${currentTheme.border}` : 'none',
          borderLeft: language === 'en' ? `1px solid ${currentTheme.border}` : 'none',
          transition: 'all 0.3s',
          padding: '1.5rem 0',
          overflow: 'hidden',
        }}>
          {/* Sidebar Toggle */}
          <button
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
            style={{
              background: currentTheme.accent,
              border: 'none',
              borderRadius: '0 8px 8px 0',
              padding: '0.5rem',
              color: '#fff',
              cursor: 'pointer',
              position: 'absolute',
              top: '100px',
              [language === 'ar' ? 'left' : 'right']: sidebarExpanded ? '260px' : '60px',
              transition: 'all 0.3s',
            }}
          >
            {sidebarExpanded ?
              (language === 'ar' ? <FiChevronRight /> : <FiChevronDown />) :
              (language === 'ar' ? <FiChevronDown /> : <FiChevronRight />)
            }
          </button>

          {/* Module List */}
          <nav style={{ padding: '0 1rem', marginTop: '2rem' }}>
            {modules.map((module) => {
              const Icon = module.icon;
              const isActive = activeModule === module.id;

              return (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    marginBottom: '0.5rem',
                    background: isActive ? currentTheme.accent : 'transparent',
                    border: 'none',
                    borderRadius: '12px',
                    color: isActive ? '#fff' : currentTheme.text,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    textAlign: language === 'ar' ? 'right' : 'left',
                    flexDirection: language === 'ar' ? 'row-reverse' : 'row',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = currentTheme.surfaceLight;
                      e.currentTarget.style.transform = 'translateX(5px)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }
                  }}
                >
                  <Icon size={22} style={{ minWidth: '22px' }} />
                  {sidebarExpanded && (
                    <span style={{
                      fontWeight: isActive ? 'bold' : '500',
                      fontSize: '0.95rem',
                      whiteSpace: 'nowrap',
                    }}>
                      {language === 'ar' ? module.label : module.labelEn}
                    </span>
                  )}
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      [language === 'ar' ? 'right' : 'left']: 0,
                      top: 0,
                      bottom: 0,
                      width: '4px',
                      background: '#fff',
                      borderRadius: '0 4px 4px 0',
                    }} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Logout Button */}
          {sidebarExpanded && (
            <button
              style={{
                position: 'absolute',
                bottom: '2rem',
                left: '1rem',
                right: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                background: 'transparent',
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '8px',
                color: currentTheme.textMuted,
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = currentTheme.surface;
                e.currentTarget.style.borderColor = currentTheme.accent;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = currentTheme.border;
              }}
            >
              <FiLogOut />
              <span>{language === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
            </button>
          )}
        </aside>

        {/* Main Content */}
        <main style={{
          flex: 1,
          padding: '2rem',
          overflowY: 'auto',
        }}>
          {activeModule === 'dashboard' && (
            <DashboardModule theme={currentTheme} language={language} />
          )}
          {activeModule === 'hr' && (
            <HRModule theme={currentTheme} language={language} />
          )}
          {activeModule === 'accounting' && (
            <AccountingModule theme={currentTheme} language={language} />
          )}
          {/* Add other modules as needed */}
        </main>
      </div>
    </div>
  );
}

// Dashboard Module Component
function DashboardModule({ theme, language }) {
  const stats = [
    { label: 'إجمالي الإيرادات', value: '2,456,789 ر.س', change: '+12%', icon: FiDollarSign, color: '#22c55e' },
    { label: 'الموظفين النشطين', value: '248', change: '+5%', icon: FiUsers, color: '#3b82f6' },
    { label: 'المبيعات اليوم', value: '45,678 ر.س', change: '+8%', icon: FiShoppingCart, color: '#f59e0b' },
    { label: 'المشاريع الجارية', value: '12', change: '+2', icon: FiActivity, color: '#8b5cf6' },
  ];

  return (
    <div>
      <h2 style={{
        fontSize: '2rem',
        marginBottom: '2rem',
        background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentLight})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        {language === 'ar' ? 'لوحة التحكم الرئيسية' : 'Main Dashboard'}
      </h2>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem',
      }}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              style={{
                background: theme.cardBg,
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '1.5rem',
                border: `1px solid ${theme.border}`,
                boxShadow: theme.shadow,
                transition: 'all 0.3s',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(153, 93, 38, 0.25)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = theme.shadow;
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <p style={{ color: theme.textMuted, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    {stat.label}
                  </p>
                  <h3 style={{ fontSize: '1.8rem', margin: '0.5rem 0', fontWeight: 'bold' }}>
                    {stat.value}
                  </h3>
                  <span style={{
                    color: stat.change.startsWith('+') ? '#22c55e' : '#ef4444',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                  }}>
                    {stat.change}
                  </span>
                </div>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: stat.color,
                }}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '1.5rem',
      }}>
        {/* Sales Chart */}
        <div style={{
          background: theme.cardBg,
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '2rem',
          border: `1px solid ${theme.border}`,
        }}>
          <h3 style={{ marginBottom: '1.5rem' }}>
            {language === 'ar' ? 'مخطط المبيعات الشهرية' : 'Monthly Sales Chart'}
          </h3>
          <div style={{
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.textMuted,
          }}>
            <FiBarChart2 size={48} />
            <p style={{ marginLeft: '1rem' }}>مخطط المبيعات</p>
          </div>
        </div>

        {/* Recent Activities */}
        <div style={{
          background: theme.cardBg,
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '2rem',
          border: `1px solid ${theme.border}`,
        }}>
          <h3 style={{ marginBottom: '1.5rem' }}>
            {language === 'ar' ? 'الأنشطة الأخيرة' : 'Recent Activities'}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{
                padding: '0.75rem',
                background: theme.surface,
                borderRadius: '8px',
                fontSize: '0.9rem',
              }}>
                <p style={{ margin: 0, marginBottom: '0.25rem' }}>نشاط رقم {i}</p>
                <span style={{ color: theme.textMuted, fontSize: '0.8rem' }}>منذ {i * 5} دقائق</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// HR Module Component
function HRModule({ theme, language }) {
  return (
    <div>
      <h2 style={{
        fontSize: '2rem',
        marginBottom: '2rem',
        background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentLight})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        {language === 'ar' ? 'إدارة الموارد البشرية' : 'Human Resources Management'}
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
      }}>
        {/* Employee Stats */}
        <div style={{
          background: theme.cardBg,
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '2rem',
          border: `1px solid ${theme.border}`,
        }}>
          <h3>{language === 'ar' ? 'إحصائيات الموظفين' : 'Employee Statistics'}</h3>
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span>إجمالي الموظفين</span>
              <strong>248</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span>الحضور اليوم</span>
              <strong style={{ color: '#22c55e' }}>235</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>في إجازة</span>
              <strong style={{ color: '#f59e0b' }}>13</strong>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          background: theme.cardBg,
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '2rem',
          border: `1px solid ${theme.border}`,
        }}>
          <h3>{language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button style={{
              padding: '0.75rem',
              background: theme.accent,
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}>
              {language === 'ar' ? 'إضافة موظف جديد' : 'Add New Employee'}
            </button>
            <button style={{
              padding: '0.75rem',
              background: 'transparent',
              color: theme.text,
              border: `1px solid ${theme.border}`,
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}>
              {language === 'ar' ? 'تسجيل الحضور' : 'Mark Attendance'}
            </button>
            <button style={{
              padding: '0.75rem',
              background: 'transparent',
              color: theme.text,
              border: `1px solid ${theme.border}`,
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}>
              {language === 'ar' ? 'طلبات الإجازة' : 'Leave Requests'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Accounting Module Component
function AccountingModule({ theme, language }) {
  return (
    <div>
      <h2 style={{
        fontSize: '2rem',
        marginBottom: '2rem',
        background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentLight})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        {language === 'ar' ? 'المحاسبة والمالية' : 'Accounting & Finance'}
      </h2>

      <div style={{
        background: theme.cardBg,
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '2rem',
        border: `1px solid ${theme.border}`,
      }}>
        <h3>{language === 'ar' ? 'الملخص المالي' : 'Financial Summary'}</h3>
        <p style={{ color: theme.textMuted }}>
          {language === 'ar' ? 'عرض البيانات المالية والحسابات' : 'Display financial data and accounts'}
        </p>
      </div>
    </div>
  );
}

export default ERPSystem;