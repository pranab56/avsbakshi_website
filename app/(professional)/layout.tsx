import DashboardLayout from "@/components/dashboard/dashboard-layout";

export default function ProfessionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout role="professional">{children}</DashboardLayout>;
}
