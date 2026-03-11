// Translations for the app
export const translations = {
  ar: {
    // Navigation
    overview: "الرئيسية",
    employees: "الموظفون",
    residence: "الإقامات",
    payroll: "الرواتب",
    workplaces: "الفروع",

    // Dashboard
    hrSystem: "نظام الموارد البشرية",
    eatemadButchery: "الإعتماد للملاحم",
    activeEmployees: "موظف نشط",
    branches: "فروع",
    totalSalaries: "إجمالي الرواتب",
    perMonth: "درهم / شهر",

    // Stats
    allEmployees: "الموظفون",
    active: "النشطون",
    residenceExpiring: "إقامات تنتهي",
    residenceExpired: "إقامات منتهية",

    // Actions
    add: "إضافة",
    edit: "تعديل",
    delete: "حذف",
    save: "حفظ",
    cancel: "إلغاء",
    search: "بحث",
    filter: "تصفية",
    all: "الكل",
    logout: "تسجيل الخروج",

    // Employee Form
    newEmployee: "موظف جديد",
    personalInfo: "البيانات",
    workInfo: "العمل",
    salary: "الراتب",
    documents: "الوثائق",
    fullName: "الاسم الكامل",
    nationality: "الجنسية",
    phone: "الهاتف",
    notes: "ملاحظات",
    position: "المهنة",
    workplace: "الفرع",
    status: "الحالة",
    joinDate: "تاريخ الانضمام",
    basicSalary: "الراتب الأساسي",
    allowances: "البدلات",
    total: "إجمالي",
    residenceExpiry: "انتهاء الإقامة",
    passportExpiry: "انتهاء جواز السفر",

    // Status
    statusActive: "نشط",
    statusTemporary: "نشط/ مؤقت",
    statusLoan: "نشط/اعارة",
    statusExternal: "خارجي",
    statusProcedure: "قيد الاجراء",
    statusAbsconded: "بلاغ هروب",

    // Messages
    addedSuccessfully: "✅ تمت الإضافة",
    savedSuccessfully: "✅ تم الحفظ",
    deletedSuccessfully: "🗑 تم الحذف",
    enterName: "أدخل الاسم",
    confirmDelete: "تأكيد الحذف",

    // Reports
    branchDistribution: "توزيع الفروع",
    statusesReport: "الحالات",
    residenceReport: "تقرير الإقامات",
    payrollReport: "كشف الرواتب",
    nationalities: "الجنسيات",
    expiringRes: "إقامات تنتهي قريباً",

    // Misc
    employee: "موظف",
    registered: "مسجل",
    monthlyTotal: "الإجمالي الشهري",
    aed: "درهم",
    valid: "سارية",
    expires90Days: "تنتهي 90 يوم",
    expired: "منتهية",
    procedure: "إجراء",
    avgSalary: "المتوسط",
    highestSalary: "أعلى راتب",
    lowestSalary: "أدنى راتب",
  },

  en: {
    // Navigation
    overview: "Overview",
    employees: "Employees",
    residence: "Residence",
    payroll: "Payroll",
    workplaces: "Branches",

    // Dashboard
    hrSystem: "HR Management System",
    eatemadButchery: "Al Eatemad Butchery",
    activeEmployees: "Active Employees",
    branches: "Branches",
    totalSalaries: "Total Salaries",
    perMonth: "AED / Month",

    // Stats
    allEmployees: "All Employees",
    active: "Active",
    residenceExpiring: "Expiring Soon",
    residenceExpired: "Expired",

    // Actions
    add: "Add",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    search: "Search",
    filter: "Filter",
    all: "All",
    logout: "Logout",

    // Employee Form
    newEmployee: "New Employee",
    personalInfo: "Personal Info",
    workInfo: "Work Info",
    salary: "Salary",
    documents: "Documents",
    fullName: "Full Name",
    nationality: "Nationality",
    phone: "Phone",
    notes: "Notes",
    position: "Position",
    workplace: "Workplace",
    status: "Status",
    joinDate: "Join Date",
    basicSalary: "Basic Salary",
    allowances: "Allowances",
    total: "Total",
    residenceExpiry: "Residence Expiry",
    passportExpiry: "Passport Expiry",

    // Status
    statusActive: "Active",
    statusTemporary: "Temporary",
    statusLoan: "On Loan",
    statusExternal: "External",
    statusProcedure: "Under Procedure",
    statusAbsconded: "Absconded",

    // Messages
    addedSuccessfully: "✅ Added Successfully",
    savedSuccessfully: "✅ Saved Successfully",
    deletedSuccessfully: "🗑 Deleted Successfully",
    enterName: "Enter Name",
    confirmDelete: "Confirm Deletion",

    // Reports
    branchDistribution: "Branch Distribution",
    statusesReport: "Status Report",
    residenceReport: "Residence Report",
    payrollReport: "Payroll Report",
    nationalities: "Nationalities",
    expiringRes: "Expiring Soon",

    // Misc
    employee: "Employee",
    registered: "Registered",
    monthlyTotal: "Monthly Total",
    aed: "AED",
    valid: "Valid",
    expires90Days: "Expires in 90 Days",
    expired: "Expired",
    procedure: "Procedure",
    avgSalary: "Average",
    highestSalary: "Highest",
    lowestSalary: "Lowest",
  }
};

// Theme colors
export const getThemeColors = (theme) => {
  const baseColors = {
    bronze: "#995d26",
    bronzeDark: "#7a4a1e",
    bronzeLight: "#b37840",
    beige: "#ead395",
    beigeDark: "#d4b876",
    beigeLight: "#f7edd2",
    darkRed: "#7d0a12",
    red: "#9b0d16",
    redLight: "#b91a23",
    success: "#22c55e",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  };

  if (theme === 'dark') {
    return {
      ...baseColors,
      // Dark theme
      bg: "#0a0806",
      bgSecondary: "#1a1b1d",
      bgCard: "#2d2e31",
      bgCardHover: "#3d3e42",
      text: "#ffffff",
      textMuted: "#a0a0a0",
      textSecondary: "#6b6c70",
      border: "rgba(153,93,38,0.2)",
      borderLight: "rgba(234,211,149,0.15)",
      sidebarBg: "linear-gradient(to bottom, #2d2e31, #1a1b1d)",
      headerBg: `linear-gradient(135deg, #995d26, #7a4a1e)`,
      overlay: "rgba(10,8,6,0.85)",
    };
  } else {
    return {
      ...baseColors,
      // Light theme
      bg: "#ffffff",
      bgSecondary: "#f9fafb",
      bgCard: "#ffffff",
      bgCardHover: "#f7edd2",
      text: "#1a1a1c",
      textMuted: "#6b6c70",
      textSecondary: "#9ca3af",
      border: "rgba(153,93,38,0.2)",
      borderLight: "rgba(153,93,38,0.1)",
      sidebarBg: "linear-gradient(to bottom, #f7edd2, #ead395)",
      headerBg: `linear-gradient(135deg, #995d26, #b37840)`,
      overlay: "rgba(255,255,255,0.95)",
    };
  }
};
