function t(language, ar, en) {
  return language === "ar" ? ar : en;
}

export function buildHRDashboardData({ language = "ar", permissions = [] } = {}) {
  const canAccess = (permission) =>
    permissions.includes("*") || permissions.includes(permission);

  const quickActions = [
    {
      permission: "employees",
      iconKey: "users",
      title: t(language, "الموظفين", "Employees"),
      subtitle: t(language, "إضافة موظف", "Add Employee"),
      color: "#7d0a12",
    },
    {
      permission: "recruitment",
      iconKey: "userPlus",
      title: t(language, "التوظيف", "Recruitment"),
      subtitle: t(language, "إدارة التوظيف", "Manage Hiring"),
      color: "#7d0a12",
    },
    {
      permission: "performance",
      iconKey: "barChart",
      title: t(language, "الأداء", "Performance"),
      subtitle: t(language, "إدارة الأداء", "Performance Ops"),
      color: "#7d0a12",
    },
    {
      permission: "payroll",
      iconKey: "creditCard",
      title: t(language, "الرواتب", "Payroll"),
      subtitle: t(language, "إدارة الرواتب", "Manage Payroll"),
      color: "#7d0a12",
    },
  ].filter((action) => canAccess(action.permission));

  return {
    attendance: {
      present: 215,
      absent: 18,
      onLeave: 15,
    },
    stats: {
      totalEmployees: 248,
      newHires: 12,
      leaveDaysRemaining: 18,
      pendingLeaveRequests: 5,
    },
    recentEmployees: [
      {
        name: t(language, "أحمد الفارسي", "Ahmed Al-Farsi"),
        position: t(language, "مسؤول HR", "HR Officer"),
        department: t(language, "الموارد البشرية", "Human Resources"),
        date: "02/04/2023",
      },
      {
        name: t(language, "ريم الحربي", "Reem Al-Harbi"),
        position: t(language, "متخصصة توظيف", "Recruiter"),
        department: t(language, "التوظيف", "Recruitment"),
        date: "20/03/2023",
      },
      {
        name: t(language, "عمر آل سعود", "Omar Al-Saud"),
        position: t(language, "متخصص رواتب", "Payroll Specialist"),
        department: t(language, "المالية", "Finance"),
        date: "20/04/2023",
      },
    ],
    upcomingLeaves: [
      { name: t(language, "مها الزهراني", "Maha Al-Zahrani"), period: "23 - 26 Apr" },
      { name: t(language, "فيصل القحطاني", "Faisal Al-Qahtani"), period: "23 - 25 Apr" },
    ],
    quickActions,
    attendancePeriods: {
      current: t(language, "هذا الشهر", "This Month"),
      options: [
        t(language, "هذا الأسبوع", "This Week"),
        t(language, "هذا الشهر", "This Month"),
        t(language, "هذا الربع", "This Quarter"),
      ],
    },
  };
}
