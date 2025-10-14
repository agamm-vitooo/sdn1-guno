"use client";

import VisitorsChartsSection from "../../../components/admin/dashboard/chart";
import ContactSection from "../../../components/admin/dashboard/contact/page";
import SchoolStatsForm from "../../../components/school-stats.form";

export default function DashboardPage() {
  return (
    <main className="p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* Chart di atas */}
      <VisitorsChartsSection />

      {/* Contact di bawah */}
      <ContactSection />

      {/* Form Statistik Sekolah */}
      <SchoolStatsForm />
    </main>
  );
}
