import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import {
  LayoutDashboard, Users, Briefcase, UserPlus, FileText,
  DollarSign, TrendingUp, Bell, MessageSquare, LogOut,
  ChevronRight, UserCheck, FileCheck, Wallet, ClipboardList
} from 'lucide-react';

// ═══════════════════════════════════════════════
// Luxury Dark Theme - Al Eatemad HR System
// Exact Match to Reference Design
// ═══════════════════════════════════════════════

const C = {
  bgDark: "#0a0806",
  bgPrimary: "#1a1512",
  bgSecondary: "#1c1410",
  bgCard: "#221a15",
  bgCardHover: "#2d231c",
  bgSidebar: "#1a0e08",

  gold: "#d4a574",
  goldLight: "#e8c9a0",
  goldDark: "#b8935f",

  red: "#8b3a3a",
  redLight: "#a64d4d",
  redDark: "#6b2828",

  text: "#e8d5c4",
  textMuted: "#a89580",
  textDark: "#6b5d52",

  green: "#4a7c59",

  border: "rgba(212,165,116,0.2)",
  borderLight: "rgba(212,165,116,0.1)",
  shadow: "0 8px 32px rgba(0,0,0,0.4)",
};

// ═══════════════════════════════════════════════
// DECORATIVE WHEAT/LEAF ELEMENT
// ═══════════════════════════════════════════════

function LeafDecor({ size = 100, opacity = 0.25, flip = false, style = {} }) {
  return (
    <svg
      width={size * 0.6}
      height={size}
      viewBox="0 0 60 100"
      fill="none"
      style={{
        display: "block",
        transform: flip ? "scaleX(-1)" : "none",
        opacity,
        pointerEvents: "none",
        ...style
      }}
    >
      <path
        d="M30 5 Q32 50 30 95"
        stroke={C.gold}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      {[[30,15,8,4],[25,25,9,5],[35,35,10,5],[25,45,9,5],[35,55,10,5],[25,65,9,5],[35,75,10,5],[30,85,8,4]].map(([cx,cy,rx,ry],i)=>{
        const left = i % 2 === 0;
        const finalCx = left ? cx - 12 : cx + 12;
        return (
          <ellipse
            key={i}
            cx={finalCx}
            cy={cy}
            rx={rx}
            ry={ry}
            transform={`rotate(${left ? -35 : 35} ${finalCx} ${cy})`}
            fill={C.gold}
            opacity={0.7 - i * 0.05}
          />
        );
      })}
    </svg>
  );
}

// ═══════════════════════════════════════════════
// TOP BAR COMPONENT
// ═══════════════════════════════════════════════

function TopBar({ currentUser, lang }) {
  const isRTL = lang === 'ar';

  return (
    <div style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: C.bgPrimary,
      borderBottom: `1px solid ${C.border}`,
      padding: "16px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      direction: isRTL ? "rtl" : "ltr",
    }}>
      {/* Title */}
      <h1 style={{
        fontSize: 20,
        fontWeight: 600,
        color: C.text,
        letterSpacing: 0.5,
      }}>
        Human Resources System
      </h1>

      {/* Right Side Actions */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
      }}>
        {/* Notifications */}
        <button style={{
          background: "transparent",
          border: "none",
          color: C.gold,
          cursor: "pointer",
          position: "relative",
          padding: 8,
        }}>
          <Bell size={22} />
          <span style={{
            position: "absolute",
            top: 6,
            right: 6,
            width: 8,
            height: 8,
            background: C.red,
            borderRadius: "50%",
          }}/>
        </button>

        {/* Messages */}
        <button style={{
          background: "transparent",
          border: "none",
          color: C.gold,
          cursor: "pointer",
          padding: 8,
        }}>
          <MessageSquare size={22} />
        </button>

        {/* Language Toggle */}
        <button style={{
          background: C.bgCard,
          border: `1px solid ${C.border}`,
          borderRadius: 6,
          padding: "6px 12px",
          color: C.text,
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
        }}>
          ER
        </button>

        {/* User Profile */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 16px",
          background: C.bgCard,
          borderRadius: 12,
          border: `1px solid ${C.border}`,
        }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 16,
            color: C.bgDark,
          }}>
            {currentUser.name.charAt(0)}
          </div>
          <div style={{ textAlign: isRTL ? "right" : "left" }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>
              {currentUser.name}
            </div>
            <div style={{ fontSize: 11, color: C.textMuted }}>
              {currentUser.role}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// SIDEBAR COMPONENT
// ═══════════════════════════════════════════════

function Sidebar({ activeTab, setActiveTab, lang }) {
  const isRTL = lang === 'ar';

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', labelAr: 'لوحة التحكم' },
    { id: 'employees', icon: Users, label: 'Employees', labelAr: 'الموظفون' },
    { id: 'employment', icon: Briefcase, label: 'Employment', labelAr: 'التوظيف' },
    { id: 'recruitment', icon: UserPlus, label: 'Recruitment', labelAr: 'التوظيف' },
    { id: 'mansa', icon: FileText, label: 'Mansa', labelAr: 'منسا' },
    { id: 'payroll', icon: DollarSign, label: 'Payroll', labelAr: 'الرواتب' },
    { id: 'performance', icon: TrendingUp, label: 'Performance', labelAr: 'الأداء' },
  ];

  return (
    <div style={{
      width: 280,
      height: "100vh",
      position: "sticky",
      top: 0,
      background: `linear-gradient(180deg, ${C.bgSidebar} 0%, ${C.bgDark} 100%)`,
      borderRight: `1px solid ${C.border}`,
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Cairo', sans-serif",
    }}>
      {/* Logo Section */}
      <div style={{
        padding: "24px 20px",
        borderBottom: `1px solid ${C.border}`,
        background: C.red,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          position: "relative",
          zIndex: 2,
        }}>
          <div style={{
            width: 60,
            height: 60,
            borderRadius: 8,
            background: `radial-gradient(circle at 30% 30%, ${C.red}, ${C.redDark})`,
            border: `2px solid ${C.gold}`,
            boxShadow: `0 4px 24px rgba(139,58,58,0.5)`,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <img
              src="/logo.png"
              alt="Al Eatemad"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <div>
            <div style={{
              fontSize: 16,
              fontWeight: 800,
              color: C.gold,
              letterSpacing: 1,
              textAlign: isRTL ? "right" : "left",
            }}>
              {isRTL ? "الإعتماد" : "AL EATEMAD"}
            </div>
            <div style={{
              fontSize: 11,
              color: C.goldLight,
              opacity: 0.9,
              textAlign: isRTL ? "right" : "left",
            }}>
              Human Resources
            </div>
          </div>
        </div>

        {/* Decorative corner */}
        <div style={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 100,
          height: 100,
          background: `radial-gradient(circle, ${C.goldDark}20, transparent)`,
          borderRadius: "50%",
        }}/>
      </div>

      {/* Navigation Items */}
      <nav style={{
        flex: 1,
        padding: "24px 0",
        overflowY: "auto",
      }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: "100%",
                padding: "14px 24px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: isActive ? `linear-gradient(90deg, ${C.red}60, transparent)` : "transparent",
                border: "none",
                borderLeft: isActive ? `3px solid ${C.gold}` : "3px solid transparent",
                color: isActive ? C.gold : C.textMuted,
                fontSize: 14,
                fontWeight: isActive ? 700 : 500,
                cursor: "pointer",
                transition: "all 0.3s ease",
                textAlign: "left",
                fontFamily: "'Cairo', sans-serif",
                direction: isRTL ? "rtl" : "ltr",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = `${C.bgCardHover}40`;
                  e.currentTarget.style.color = C.gold;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = C.textMuted;
                }
              }}
            >
              <Icon size={20} />
              <span style={{ flex: 1 }}>
                {isRTL ? item.labelAr : item.label}
              </span>
              {isActive && <ChevronRight size={16} />}
            </button>
          );
        })}
      </nav>

      {/* User Info at Bottom */}
      <div style={{
        padding: 20,
        borderTop: `1px solid ${C.border}`,
        background: C.bgCard,
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 12,
        }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 16,
            color: C.bgDark,
          }}>
            S
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>
              {lang === 'ar' ? 'سارة الموتلق' : 'Sarah Almutlaq'}
            </div>
            <div style={{ fontSize: 11, color: C.textMuted }}>
              {lang === 'ar' ? 'مسؤول الموارد البشرية' : 'HR Specialist'}
            </div>
          </div>
        </div>
        <button style={{
          width: "100%",
          padding: "10px",
          background: "transparent",
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          color: C.textMuted,
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = C.red;
          e.currentTarget.style.color = C.gold;
          e.currentTarget.style.borderColor = C.gold;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = C.textMuted;
          e.currentTarget.style.borderColor = C.border;
        }}
        >
          <LogOut size={16} />
          {lang === 'ar' ? 'تسجيل الخروج' : 'Logout'}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// STATS CARD WITH ICON
// ═══════════════════════════════════════════════

function StatsCard({ title, titleAr, value, valueAr, icon, lang }) {
  const isRTL = lang === 'ar';

  return (
    <div style={{
      background: `linear-gradient(135deg, ${C.bgCard}, ${C.bgSecondary})`,
      borderRadius: 16,
      padding: 24,
      border: `1px solid ${C.border}`,
      position: "relative",
      overflow: "hidden",
      transition: "all 0.3s ease",
      cursor: "pointer",
      direction: isRTL ? "rtl" : "ltr",
    }}
    className="stats-card"
    >
      {/* Decorative corner element */}
      <div style={{
        position: "absolute",
        top: -30,
        right: isRTL ? "auto" : -30,
        left: isRTL ? -30 : "auto",
        width: 120,
        height: 120,
        background: `radial-gradient(circle, ${C.gold}15, transparent)`,
        borderRadius: "50%",
      }}/>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{
          fontSize: 13,
          color: C.textMuted,
          marginBottom: 12,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}>
          {isRTL ? titleAr : title}
        </div>

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}>
          <div style={{
            fontSize: 40,
            fontWeight: 900,
            color: C.gold,
            textShadow: `0 2px 12px ${C.gold}60`,
          }}>
            {value}
          </div>

          {/* Icon Badge */}
          <div style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${C.gold}30, ${C.goldDark}20)`,
            border: `2px solid ${C.gold}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
          }}>
            {icon}
          </div>
        </div>

        {/* Arabic subtitle */}
        {valueAr && (
          <div style={{
            marginTop: 8,
            fontSize: 12,
            color: C.textMuted,
            fontWeight: 500,
          }}>
            {valueAr}
          </div>
        )}
      </div>

      {/* Leaf decoration */}
      <LeafDecor
        size={80}
        opacity={0.08}
        style={{
          position: "absolute",
          bottom: -10,
          right: isRTL ? "auto" : 10,
          left: isRTL ? 10 : "auto",
        }}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════
// QUICK ACTION BUTTON
// ═══════════════════════════════════════════════

function QuickAction({ icon: Icon, label, labelAr, onClick, lang }) {
  const isRTL = lang === 'ar';

  return (
    <button
      onClick={onClick}
      style={{
        background: `linear-gradient(135deg, ${C.red}, ${C.redDark})`,
        border: `2px solid ${C.gold}`,
        borderRadius: 12,
        padding: "20px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        cursor: "pointer",
        transition: "all 0.3s ease",
        fontFamily: "'Cairo', sans-serif",
        color: C.gold,
        boxShadow: `0 4px 16px rgba(139,58,58,0.4)`,
        minHeight: 120,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 8px 24px rgba(139,58,58,0.6)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = `0 4px 16px rgba(139,58,58,0.4)`;
      }}
    >
      <Icon size={32} strokeWidth={1.5} />
      <div style={{ textAlign: "center", direction: isRTL ? "rtl" : "ltr" }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>{label}</div>
        <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>{labelAr}</div>
      </div>
    </button>
  );
}

// ═══════════════════════════════════════════════
// MAIN APP COMPONENT
// ═══════════════════════════════════════════════

export default function AppLuxury({ onLogout, lang = 'ar', setLang, theme, setTheme }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const isRTL = lang === 'ar';

  const currentUser = {
    name: lang === 'ar' ? 'سارة الموتلق' : 'Sarah Almutlaq',
    role: lang === 'ar' ? 'مختص الموارد البشرية' : 'HR Specialist',
  };

  // Sample Data
  const attendanceData = [
    { name: 'Present', value: 215, color: C.gold },
    { name: 'Absent', value: 18, color: C.red },
    { name: 'On Leave', value: 15, color: C.textMuted },
  ];

  const recentEmployees = [
    {
      id: 1,
      name: 'Ahmed Al-Farsi',
      nameAr: 'أحمد الفارسي',
      position: 'HR Officer',
      positionAr: 'موظف موارد بشرية',
      department: 'Human Resources',
      departmentAr: 'الموارد البشرية',
      date: '2/04/2023',
      avatar: null,
    },
    {
      id: 2,
      name: 'Reem Al-Haribi',
      nameAr: 'ريم الحربي',
      position: 'Recruiter',
      positionAr: 'موظف توظيف',
      department: 'Recruitment',
      departmentAr: 'التوظيف',
      date: '1/04/2023',
      avatar: null,
    },
    {
      id: 3,
      name: 'Omar AL Saud',
      nameAr: 'عمر السعود',
      position: 'Payroll Specialist',
      positionAr: 'أخصائي رواتب',
      department: 'Finance',
      departmentAr: 'المالية',
      date: '2/03/2023',
      avatar: null,
    },
  ];

  const upcomingLeaves = [
    { name: 'Maha Al-Zahrani', nameAr: 'مها الزهراني', dates: '23 - 26 Apr' },
    { name: 'Faisal Al-Qahtani', nameAr: 'فيصل القحطاني', dates: '23 - 25 Apr' },
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background: ${C.bgDark};
          font-family: 'Cairo', sans-serif;
          overflow-x: hidden;
        }

        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: ${C.bgSecondary}; }
        ::-webkit-scrollbar-thumb {
          background: ${C.gold};
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover { background: ${C.goldLight}; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .stats-card:hover {
          transform: translateY(-4px);
          box-shadow: ${C.shadow};
          border-color: ${C.gold};
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>

      <div style={{
        display: "flex",
        minHeight: "100vh",
        background: C.bgDark,
        direction: isRTL ? "rtl" : "ltr",
      }}>
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} lang={lang} />

        {/* Main Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Top Bar */}
          <TopBar currentUser={currentUser} lang={lang} />

          {/* Main Dashboard */}
          <main style={{
            flex: 1,
            padding: 32,
            overflowY: "auto",
            background: C.bgPrimary,
          }}>
            {/* Welcome Banner */}
            <div style={{
              background: `linear-gradient(135deg, ${C.bgCard}, ${C.bgSecondary})`,
              borderRadius: 20,
              padding: "32px 40px",
              marginBottom: 32,
              border: `1px solid ${C.border}`,
              position: "relative",
              overflow: "hidden",
              direction: isRTL ? "rtl" : "ltr",
            }}>
              <div style={{ position: "relative", zIndex: 2 }}>
                <h2 style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: C.text,
                  marginBottom: 8,
                }}>
                  {isRTL ? 'مرحباً، سارة' : 'Welcome, Sarah'}
                </h2>
                <p style={{
                  fontSize: 15,
                  color: C.textMuted,
                  fontWeight: 500,
                }}>
                  {isRTL ? 'إدارة فريقك بكفاءة' : 'Manage your team efficiently'}
                </p>
              </div>

              {/* Decorative Leaves */}
              <LeafDecor
                size={140}
                opacity={0.15}
                style={{
                  position: "absolute",
                  top: -20,
                  right: isRTL ? "auto" : 40,
                  left: isRTL ? 40 : "auto",
                }}
              />
              <LeafDecor
                size={120}
                opacity={0.12}
                flip
                style={{
                  position: "absolute",
                  bottom: -20,
                  right: isRTL ? 200 : "auto",
                  left: isRTL ? "auto" : 200,
                }}
              />
            </div>

            {/* Stats Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
              marginBottom: 32,
              animation: "fadeInUp 0.6s ease",
            }}>
              <StatsCard
                title="Total Employees"
                titleAr="إجمالي الموظفين"
                value="248"
                valueAr="موظفون جدد"
                icon="👥"
                lang={lang}
              />
              <StatsCard
                title="New Hires"
                titleAr="موظفون جدد"
                value="12"
                valueAr="هذا الشهر"
                icon="🆕"
                lang={lang}
              />
            </div>

            {/* Main Content Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
              marginBottom: 32,
            }}>
              {/* Attendance Overview */}
              <div style={{
                background: `linear-gradient(135deg, ${C.bgCard}, ${C.bgSecondary})`,
                borderRadius: 16,
                padding: 28,
                border: `1px solid ${C.border}`,
                direction: isRTL ? "rtl" : "ltr",
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 24,
                }}>
                  <div>
                    <h3 style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: C.text,
                      marginBottom: 4,
                    }}>
                      Attendance Overview
                    </h3>
                    <p style={{
                      fontSize: 13,
                      color: C.textMuted,
                      fontWeight: 500,
                    }}>
                      {isRTL ? 'نظرة عامة على الحضور' : 'This Month'}
                    </p>
                  </div>
                  <button style={{
                    padding: "8px 16px",
                    background: C.bgPrimary,
                    border: `1px solid ${C.border}`,
                    borderRadius: 8,
                    color: C.textMuted,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}>
                    This Mt. Month ▼
                  </button>
                </div>

                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 32,
                }}>
                  {/* Pie Chart */}
                  <div style={{ width: 180, height: 180, position: "relative" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={attendanceData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {attendanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                    }}>
                      <div style={{
                        fontSize: 36,
                        fontWeight: 900,
                        color: C.gold,
                        lineHeight: 1,
                      }}>
                        92%
                      </div>
                      <div style={{
                        fontSize: 11,
                        color: C.textMuted,
                        marginTop: 4,
                        fontWeight: 600,
                      }}>
                        Attendance Rate
                      </div>
                      <div style={{
                        fontSize: 10,
                        color: C.textMuted,
                        marginTop: 2,
                      }}>
                        {isRTL ? 'نسبة الحضور' : ''}
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div style={{ flex: 1 }}>
                    {[
                      { label: 'Present', labelAr: 'حاضر', value: 215, color: C.gold },
                      { label: 'Absent', labelAr: 'غائب', value: 18, color: C.red },
                      { label: 'On Leave', labelAr: 'في إجازة', value: 15, color: C.textMuted },
                    ].map((item, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "12px 0",
                          borderBottom: i < 2 ? `1px solid ${C.borderLight}` : "none",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            background: item.color,
                          }}/>
                          <span style={{
                            fontSize: 14,
                            color: C.text,
                            fontWeight: 600,
                          }}>
                            {item.label}
                          </span>
                        </div>
                        <span style={{
                          fontSize: 18,
                          fontWeight: 700,
                          color: item.color,
                        }}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{
                background: `linear-gradient(135deg, ${C.bgCard}, ${C.bgSecondary})`,
                borderRadius: 16,
                padding: 28,
                border: `1px solid ${C.border}`,
                direction: isRTL ? "rtl" : "ltr",
              }}>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: C.text,
                  marginBottom: 4,
                }}>
                  {isRTL ? 'إجراءات سريعة' : 'Quick Actions'}
                </h3>
                <p style={{
                  fontSize: 13,
                  color: C.textMuted,
                  marginBottom: 24,
                  fontWeight: 500,
                }}>
                  {isRTL ? 'الإجراءات الأكثر استخداماً' : 'Most used actions'}
                </p>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}>
                  <QuickAction
                    icon={UserCheck}
                    label="Add Employee"
                    labelAr="إضافة موظف"
                    onClick={() => alert('Add Employee')}
                    lang={lang}
                  />
                  <QuickAction
                    icon={UserPlus}
                    label="Recruitment"
                    labelAr="التوظيف"
                    onClick={() => alert('Recruitment')}
                    lang={lang}
                  />
                  <QuickAction
                    icon={FileCheck}
                    label="Approval"
                    labelAr="الموافقة"
                    onClick={() => alert('Approval')}
                    lang={lang}
                  />
                  <QuickAction
                    icon={Wallet}
                    label="Payroll"
                    labelAr="إدارة الرواتب"
                    onClick={() => alert('Payroll')}
                    lang={lang}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: 24,
            }}>
              {/* Recent Employees Table */}
              <div style={{
                background: `linear-gradient(135deg, ${C.bgCard}, ${C.bgSecondary})`,
                borderRadius: 16,
                padding: 28,
                border: `1px solid ${C.border}`,
                direction: isRTL ? "rtl" : "ltr",
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 24,
                }}>
                  <div>
                    <h3 style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: C.text,
                      marginBottom: 4,
                    }}>
                      Recent Employees
                    </h3>
                    <p style={{
                      fontSize: 13,
                      color: C.textMuted,
                      fontWeight: 500,
                    }}>
                      {isRTL ? 'الموظفون الجدد' : 'Newly added employees'}
                    </p>
                  </div>
                  <button style={{
                    padding: "8px 16px",
                    background: "transparent",
                    border: `1px solid ${C.border}`,
                    borderRadius: 8,
                    color: C.gold,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}>
                    View All
                    <ChevronRight size={14} />
                  </button>
                </div>

                {/* Table */}
                <div style={{ overflowX: "auto" }}>
                  <table style={{
                    width: "100%",
                    borderCollapse: "collapse",
                  }}>
                    <thead>
                      <tr style={{
                        borderBottom: `1px solid ${C.border}`,
                      }}>
                        <th style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontSize: 12,
                          fontWeight: 700,
                          color: C.textMuted,
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}>
                          Name
                        </th>
                        <th style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontSize: 12,
                          fontWeight: 700,
                          color: C.textMuted,
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}>
                          Position
                        </th>
                        <th style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontSize: 12,
                          fontWeight: 700,
                          color: C.textMuted,
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}>
                          Department
                        </th>
                        <th style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontSize: 12,
                          fontWeight: 700,
                          color: C.textMuted,
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}>
                          View All
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentEmployees.map((emp, i) => (
                        <tr
                          key={emp.id}
                          style={{
                            borderBottom: i < recentEmployees.length - 1 ? `1px solid ${C.borderLight}` : "none",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = `${C.bgCardHover}60`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                          }}
                        >
                          <td style={{ padding: "16px" }}>
                            <div style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 12,
                            }}>
                              <div style={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 700,
                                fontSize: 14,
                                color: C.bgDark,
                              }}>
                                {emp.name.charAt(0)}
                              </div>
                              <span style={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: C.text,
                              }}>
                                {emp.name}
                              </span>
                            </div>
                          </td>
                          <td style={{
                            padding: "16px",
                            fontSize: 13,
                            color: C.textMuted,
                            fontWeight: 500,
                          }}>
                            {emp.position}
                          </td>
                          <td style={{
                            padding: "16px",
                            fontSize: 13,
                            color: C.textMuted,
                            fontWeight: 500,
                          }}>
                            {emp.department}
                          </td>
                          <td style={{
                            padding: "16px",
                            fontSize: 13,
                            color: C.textMuted,
                            fontWeight: 500,
                          }}>
                            {emp.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Upcoming Leaves */}
              <div style={{
                background: `linear-gradient(135deg, ${C.bgCard}, ${C.bgSecondary})`,
                borderRadius: 16,
                padding: 28,
                border: `1px solid ${C.border}`,
                position: "relative",
                overflow: "hidden",
                direction: isRTL ? "rtl" : "ltr",
              }}>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: C.text,
                  marginBottom: 4,
                }}>
                  Upcoming Leaves
                </h3>
                <p style={{
                  fontSize: 13,
                  color: C.textMuted,
                  marginBottom: 24,
                  fontWeight: 500,
                }}>
                  {isRTL ? 'الإجازات القادمة' : 'Next scheduled leaves'}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {upcomingLeaves.map((leave, i) => (
                    <div
                      key={i}
                      style={{
                        padding: 16,
                        background: C.bgPrimary,
                        borderRadius: 12,
                        border: `1px solid ${C.borderLight}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = C.gold;
                        e.currentTarget.style.transform = "translateX(-4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = C.borderLight;
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}>
                        <div style={{
                          width: 4,
                          height: 32,
                          background: C.gold,
                          borderRadius: 2,
                          marginRight: 8,
                        }}/>
                        <div>
                          <div style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: C.text,
                          }}>
                            {leave.name}
                          </div>
                          <div style={{
                            fontSize: 12,
                            color: C.textMuted,
                            marginTop: 2,
                          }}>
                            {leave.dates}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Decorative leaf */}
                <LeafDecor
                  size={100}
                  opacity={0.08}
                  style={{
                    position: "absolute",
                    bottom: -10,
                    right: isRTL ? "auto" : -10,
                    left: isRTL ? -10 : "auto",
                  }}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
