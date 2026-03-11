import React, { useState, useEffect } from 'react';
import {
  FiUsers, FiCalendar, FiClock, FiDollarSign, FiFileText,
  FiSettings, FiFilter, FiTool, FiAlertCircle, FiCheckCircle,
  FiEdit, FiTrash2, FiEye, FiColumns, FiList, FiDatabase,
  FiUserCheck, FiUserX, FiBriefcase, FiHome, FiMail,
  FiPhone, FiMapPin, FiGlobe, FiSearch, FiPlus, FiDownload
} from 'react-icons/fi';

// Brand Colors - matching AppSheet style with Eatemad branding
const Colors = {
  primary: "#4285f4",
  primaryLight: "#669df6",
  primaryDark: "#1a73e8",

  bronze: "#995d26",
  gold: "#d4a574",
  goldLight: "#e8c9a0",

  bgLight: "#f8f9fa",
  surface: "#ffffff",
  border: "#dadce0",

  textDark: "#202124",
  textMuted: "#5f6368",
  textLight: "#80868b",

  success: "#1e8e3e",
  warning: "#f9ab00",
  error: "#d33b27",
  info: "#4285f4",
};

// Module configuration based on AppSheet screenshot
const modules = [
  {
    id: 'attendance',
    name: 'Attendance',
    nameAr: 'الحضور',
    source: 'AL EATEMAD CRM > Chatbot - Flow - New',
    qualifier: 'Attendance',
    datasource: 'google',
    icon: FiClock,
    color: Colors.primary
  },
  {
    id: 'chatbot_raw',
    name: 'Chatbot_Raw',
    nameAr: 'بيانات الروبوت',
    source: 'AL EATEMAD CRM > Chatbot - Flow - New',
    qualifier: 'Chatbot_Raw',
    datasource: 'google',
    icon: FiFileText,
    color: Colors.bronze
  },
  {
    id: 'crm_intake',
    name: 'CRM_Intake',
    nameAr: 'استقبال CRM',
    source: 'AL EATEMAD CRM > Chatbot - Flow - New',
    qualifier: 'CRM_Intake',
    datasource: 'google',
    icon: FiBriefcase,
    color: Colors.success
  },
  {
    id: 'crm_settings',
    name: 'CRM_Settings',
    nameAr: 'إعدادات CRM',
    source: 'AL EATEMAD CRM > Chatbot - Flow - New',
    qualifier: 'CRM_Settings',
    datasource: 'google',
    icon: FiSettings,
    color: Colors.warning
  },
  {
    id: 'customer_contacts',
    name: 'Customer Contacts',
    nameAr: 'جهات اتصال العملاء',
    source: 'AL EATEMAD CRM > Chatbot - Flow - New',
    qualifier: 'Customer Contacts',
    datasource: 'google',
    icon: FiUsers,
    color: Colors.info
  },
  {
    id: 'dash_filter',
    name: 'Dash_Filter',
    nameAr: 'فلتر لوحة التحكم',
    source: 'AL EATEMAD CRM > Chatbot - Flow - New',
    qualifier: 'Dash_Filter',
    datasource: 'google',
    icon: FiFilter,
    color: Colors.gold
  },
  {
    id: 'hr_department',
    name: 'HR Department',
    nameAr: 'قسم الموارد البشرية',
    source: 'AL EATEMAD CRM > Chatbot - Flow - New',
    qualifier: 'HR Department',
    datasource: 'google',
    icon: FiBriefcase,
    color: Colors.primaryDark
  },
  {
    id: 'leave_requests',
    name: 'Leave Requests',
    nameAr: 'طلبات الإجازة',
    source: 'AL EATEMAD CRM > Chatbot - Flow - New',
    qualifier: 'Leave Requests',
    datasource: 'google',
    icon: FiCalendar,
    color: Colors.error
  },
  {
    id: 'maintenance',
    name: 'Maintenance',
    nameAr: 'الصيانة',
    source: 'AL EATEMAD CRM > Chatbot - Flow - New',
    qualifier: 'Maintenance',
    datasource: 'google',
    icon: FiTool,
    color: Colors.warning
  },
  {
    id: 'requests',
    name: 'Requests',
    nameAr: 'الطلبات',
    source: 'AL EATEMAD CRM > Chatbot - Flow - New',
    qualifier: 'Requests',
    datasource: 'google',
    icon: FiFileText,
    color: Colors.success
  },
  {
    id: 'users',
    name: 'Users',
    nameAr: 'المستخدمين',
    source: 'AL EATEMAD CRM > Chatbot - Flow - New',
    qualifier: 'Users',
    datasource: 'google',
    icon: FiUsers,
    color: Colors.primary
  }
];

// Sample data for each module
const sampleData = {
  attendance: [
    { id: 1, employee: 'محمد أحمد', date: '2026-03-11', checkIn: '08:00', checkOut: '17:00', status: 'حاضر' },
    { id: 2, employee: 'فاطمة علي', date: '2026-03-11', checkIn: '08:15', checkOut: '17:30', status: 'حاضر' },
    { id: 3, employee: 'خالد محمد', date: '2026-03-11', checkIn: '09:00', checkOut: '--', status: 'متأخر' },
    { id: 4, employee: 'سارة أحمد', date: '2026-03-11', checkIn: '--', checkOut: '--', status: 'غائب' },
  ],
  hr_department: [
    { id: 1, name: 'محمد أحمد', position: 'مدير الموارد البشرية', department: 'الإدارة', email: 'mohammed@eatemad.com', phone: '+971501234567' },
    { id: 2, name: 'فاطمة علي', position: 'أخصائي توظيف', department: 'HR', email: 'fatima@eatemad.com', phone: '+971502345678' },
    { id: 3, name: 'خالد محمد', position: 'محاسب رواتب', department: 'المالية', email: 'khaled@eatemad.com', phone: '+971503456789' },
    { id: 4, name: 'سارة أحمد', position: 'منسق تدريب', department: 'التطوير', email: 'sara@eatemad.com', phone: '+971504567890' },
  ],
  leave_requests: [
    { id: 1, employee: 'أحمد خليل', type: 'إجازة سنوية', startDate: '2026-03-15', endDate: '2026-03-20', days: 5, status: 'معلق', reason: 'سفر عائلي' },
    { id: 2, employee: 'مريم سالم', type: 'إجازة مرضية', startDate: '2026-03-11', endDate: '2026-03-12', days: 2, status: 'موافق عليه', reason: 'مرض' },
    { id: 3, employee: 'عمر حسن', type: 'إجازة طارئة', startDate: '2026-03-10', endDate: '2026-03-10', days: 1, status: 'موافق عليه', reason: 'ظروف عائلية' },
  ],
  customer_contacts: [
    { id: 1, name: 'شركة النور', contact: 'أحمد النور', email: 'info@alnoor.com', phone: '+971501111111', type: 'عميل VIP' },
    { id: 2, name: 'مؤسسة الأمل', contact: 'محمد الأمل', email: 'info@alamal.com', phone: '+971502222222', type: 'عميل عادي' },
    { id: 3, name: 'شركة الفجر', contact: 'خالد الفجر', email: 'info@alfajr.com', phone: '+971503333333', type: 'عميل جديد' },
  ]
};

function HRDashboard({ language = 'ar', isDarkMode = false, theme }) {
  const [selectedModule, setSelectedModule] = useState('attendance');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('tables');

  // Get current module data
  const currentModule = modules.find(m => m.id === selectedModule);
  const currentData = sampleData[selectedModule] || [];

  const isRTL = language === 'ar';

  // Action buttons for each table
  const tableActions = [
    { icon: FiEye, label: language === 'ar' ? 'عرض' : 'View', color: Colors.info },
    { icon: FiColumns, label: language === 'ar' ? 'الأعمدة' : 'Columns', color: Colors.primary },
    { icon: FiList, label: language === 'ar' ? 'الأحداث' : 'View events', color: Colors.success },
    { icon: FiDatabase, label: language === 'ar' ? 'البيانات' : 'View Data', color: Colors.warning },
    { icon: FiTrash2, label: language === 'ar' ? 'حذف' : 'Delete', color: Colors.error },
  ];

  return (
    <div style={{
      minHeight: 'calc(100vh - 75px)',
      background: isDarkMode ? '#1a1512' : Colors.bgLight,
      padding: '1.5rem',
      fontFamily: isRTL ? "'Cairo', 'Tajawal', sans-serif" : "'Inter', 'Segoe UI', sans-serif",
      direction: isRTL ? 'rtl' : 'ltr',
    }}>
      {/* Header */}
      <div style={{
        background: isDarkMode ? '#221a15' : Colors.surface,
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        border: `1px solid ${isDarkMode ? 'rgba(212,165,116,0.2)' : Colors.border}`,
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <h1 style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: isDarkMode ? '#e8d5c4' : Colors.textDark,
              margin: 0,
            }}>
              {language === 'ar' ? 'نظام الموارد البشرية' : 'HR Management System'}
            </h1>
            <p style={{
              color: isDarkMode ? '#a89580' : Colors.textMuted,
              marginTop: '0.5rem',
              fontSize: '0.95rem',
            }}>
              {language === 'ar' ? 'إدارة شاملة لجميع عمليات الموارد البشرية' : 'Comprehensive HR operations management'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {/* Search */}
            <div style={{
              position: 'relative',
              background: isDarkMode ? '#1a1512' : Colors.bgLight,
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              minWidth: '250px',
              border: `1px solid ${isDarkMode ? 'rgba(212,165,116,0.2)' : Colors.border}`,
            }}>
              <FiSearch style={{ color: isDarkMode ? '#a89580' : Colors.textMuted }} />
              <input
                type="text"
                placeholder={language === 'ar' ? 'بحث في الجداول...' : 'Search tables...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: isDarkMode ? '#e8d5c4' : Colors.textDark,
                  width: '100%',
                }}
              />
            </div>

            {/* Add New Button */}
            <button
              onClick={() => setShowAddModal(true)}
              style={{
                background: `linear-gradient(135deg, ${Colors.primary}, ${Colors.primaryDark})`,
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem 1.25rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 600,
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(66,133,244,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <FiPlus />
              {language === 'ar' ? 'إضافة جديد' : 'Add new'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginTop: '1.5rem',
          borderBottom: `1px solid ${isDarkMode ? 'rgba(212,165,116,0.2)' : Colors.border}`,
        }}>
          {['tables', 'columns', 'slices', 'user_settings', 'options'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab ? `2px solid ${Colors.primary}` : 'none',
                padding: '0.75rem 1.25rem',
                color: activeTab === tab ?
                  Colors.primary :
                  (isDarkMode ? '#a89580' : Colors.textMuted),
                cursor: 'pointer',
                fontWeight: activeTab === tab ? 600 : 400,
                transition: 'all 0.3s',
                textTransform: 'capitalize',
              }}
            >
              {language === 'ar' ?
                {
                  tables: 'الجداول',
                  columns: 'الأعمدة',
                  slices: 'الشرائح',
                  user_settings: 'إعدادات المستخدم',
                  options: 'الخيارات'
                }[tab] :
                tab.replace('_', ' ')
              }
            </button>
          ))}
        </div>
      </div>

      {/* Tables List */}
      <div style={{
        background: isDarkMode ? '#221a15' : Colors.surface,
        borderRadius: '12px',
        padding: '1rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        border: `1px solid ${isDarkMode ? 'rgba(212,165,116,0.2)' : Colors.border}`,
      }}>
        {/* Add new tables button */}
        <div style={{
          padding: '1rem',
          borderBottom: `1px solid ${isDarkMode ? 'rgba(212,165,116,0.1)' : Colors.border}`,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: isDarkMode ? '#a89580' : Colors.textMuted,
          fontSize: '0.9rem',
        }}>
          <span>Add new tables and modify table properties in this pane.</span>
          <button style={{
            background: 'transparent',
            border: `1px solid ${Colors.primary}`,
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: Colors.primary,
            fontSize: '1.2rem',
          }}>
            +
          </button>
          <span style={{ marginLeft: '0.5rem' }}>New Table</span>
        </div>

        {/* Module Tables */}
        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          {modules.filter(module =>
            module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            module.nameAr.includes(searchQuery)
          ).map((module, index) => (
            <div
              key={module.id}
              style={{
                borderBottom: index < modules.length - 1 ?
                  `1px solid ${isDarkMode ? 'rgba(212,165,116,0.1)' : Colors.border}` :
                  'none',
                padding: '1rem',
                transition: 'all 0.3s',
                cursor: 'pointer',
                background: selectedModule === module.id ?
                  (isDarkMode ? 'rgba(212,165,116,0.1)' : 'rgba(66,133,244,0.05)') :
                  'transparent',
              }}
              onClick={() => setSelectedModule(module.id)}
              onMouseEnter={e => {
                if (selectedModule !== module.id) {
                  e.currentTarget.style.background = isDarkMode ?
                    'rgba(212,165,116,0.05)' :
                    'rgba(0,0,0,0.02)';
                }
              }}
              onMouseLeave={e => {
                if (selectedModule !== module.id) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
              }}>
                {/* Icon */}
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: `${module.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: module.color,
                  flexShrink: 0,
                }}>
                  <module.icon size={20} />
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.25rem',
                  }}>
                    <h3 style={{
                      margin: 0,
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: isDarkMode ? '#e8d5c4' : Colors.textDark,
                    }}>
                      {language === 'ar' ? module.nameAr : module.name}
                    </h3>
                    <span style={{
                      background: module.datasource === 'google' ? Colors.success : Colors.info,
                      color: '#fff',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                    }}>
                      {module.datasource}
                    </span>
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: isDarkMode ? '#a89580' : Colors.textMuted,
                  }}>
                    <span>Source: {module.source}</span>
                    <span style={{ margin: '0 0.5rem' }}>•</span>
                    <span>Qualifier: {module.qualifier}</span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{
                  display: 'flex',
                  gap: '0.25rem',
                  alignItems: 'center',
                }}>
                  {tableActions.map((action, idx) => (
                    <button
                      key={idx}
                      title={action.label}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        padding: '0.5rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        color: isDarkMode ? '#a89580' : Colors.textMuted,
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`${action.label} clicked for ${module.name}`);
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = `${action.color}15`;
                        e.currentTarget.style.color = action.color;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = isDarkMode ? '#a89580' : Colors.textMuted;
                      }}
                    >
                      <action.icon size={16} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Preview Section */}
      {currentData.length > 0 && (
        <div style={{
          marginTop: '1.5rem',
          background: isDarkMode ? '#221a15' : Colors.surface,
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
          border: `1px solid ${isDarkMode ? 'rgba(212,165,116,0.2)' : Colors.border}`,
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}>
            <h3 style={{
              margin: 0,
              fontSize: '1.25rem',
              fontWeight: 600,
              color: isDarkMode ? '#e8d5c4' : Colors.textDark,
            }}>
              {language === 'ar' ?
                `بيانات ${currentModule?.nameAr}` :
                `${currentModule?.name} Data`
              }
            </h3>
            <button
              style={{
                background: 'transparent',
                border: `1px solid ${Colors.primary}`,
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                color: Colors.primary,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 500,
              }}
            >
              <FiDownload size={16} />
              {language === 'ar' ? 'تصدير' : 'Export'}
            </button>
          </div>

          {/* Data Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
            }}>
              <thead>
                <tr style={{
                  borderBottom: `2px solid ${isDarkMode ? 'rgba(212,165,116,0.2)' : Colors.border}`,
                }}>
                  {Object.keys(currentData[0] || {}).map(key => (
                    <th
                      key={key}
                      style={{
                        padding: '0.75rem',
                        textAlign: isRTL ? 'right' : 'left',
                        fontWeight: 600,
                        color: isDarkMode ? '#e8d5c4' : Colors.textDark,
                        fontSize: '0.9rem',
                      }}
                    >
                      {key}
                    </th>
                  ))}
                  <th style={{ padding: '0.75rem', width: '100px' }}>
                    {language === 'ar' ? 'إجراءات' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.slice(0, 5).map((row, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: `1px solid ${isDarkMode ? 'rgba(212,165,116,0.1)' : Colors.border}`,
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = isDarkMode ?
                        'rgba(212,165,116,0.05)' :
                        'rgba(0,0,0,0.02)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    {Object.values(row).map((value, i) => (
                      <td
                        key={i}
                        style={{
                          padding: '0.75rem',
                          fontSize: '0.9rem',
                          color: isDarkMode ? '#a89580' : Colors.textMuted,
                        }}
                      >
                        {typeof value === 'string' && value.includes('@') ? (
                          <a href={`mailto:${value}`} style={{ color: Colors.primary }}>
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </td>
                    ))}
                    <td style={{ padding: '0.75rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: Colors.primary,
                            cursor: 'pointer',
                            padding: '0.25rem',
                          }}
                        >
                          <FiEdit size={16} />
                        </button>
                        <button
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: Colors.error,
                            cursor: 'pointer',
                            padding: '0.25rem',
                          }}
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {currentData.length > 5 && (
            <div style={{
              textAlign: 'center',
              marginTop: '1rem',
              color: Colors.primary,
              fontSize: '0.9rem',
              cursor: 'pointer',
            }}>
              {language === 'ar' ?
                `عرض كل السجلات (${currentData.length})` :
                `Show all records (${currentData.length})`
              }
            </div>
          )}
        </div>
      )}

      {/* Statistics Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginTop: '1.5rem',
      }}>
        {[
          {
            label: language === 'ar' ? 'إجمالي الموظفين' : 'Total Employees',
            value: '248',
            icon: FiUsers,
            color: Colors.primary,
            change: '+5%'
          },
          {
            label: language === 'ar' ? 'الحضور اليوم' : 'Present Today',
            value: '235',
            icon: FiUserCheck,
            color: Colors.success,
            change: '94.8%'
          },
          {
            label: language === 'ar' ? 'طلبات الإجازة' : 'Leave Requests',
            value: '12',
            icon: FiCalendar,
            color: Colors.warning,
            change: '3 pending'
          },
          {
            label: language === 'ar' ? 'المهام المعلقة' : 'Pending Tasks',
            value: '28',
            icon: FiAlertCircle,
            color: Colors.error,
            change: '7 urgent'
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            style={{
              background: isDarkMode ? '#221a15' : Colors.surface,
              borderRadius: '12px',
              padding: '1.25rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
              border: `1px solid ${isDarkMode ? 'rgba(212,165,116,0.2)' : Colors.border}`,
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <p style={{
                  margin: 0,
                  color: isDarkMode ? '#a89580' : Colors.textMuted,
                  fontSize: '0.85rem',
                  marginBottom: '0.5rem',
                }}>
                  {stat.label}
                </p>
                <h3 style={{
                  margin: 0,
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: isDarkMode ? '#e8d5c4' : Colors.textDark,
                }}>
                  {stat.value}
                </h3>
                <p style={{
                  margin: 0,
                  marginTop: '0.25rem',
                  fontSize: '0.8rem',
                  color: stat.color,
                }}>
                  {stat.change}
                </p>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: `${stat.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: stat.color,
              }}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HRDashboard;