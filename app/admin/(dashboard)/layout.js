import { redirect } from "next/navigation";
import { getSessionCustomer } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";

export default async function AdminDashboardLayout({ children }) {
  const customer = await getSessionCustomer();
  if (!customer) redirect("/login");
  if (customer.role !== "admin") redirect("/account");

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <AdminShell customer={customer}>{children}</AdminShell>
    </>
  );
}
