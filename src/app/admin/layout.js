import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { storeMode } from "@/lib/store";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin",
  robots: { index: false },
};

export default async function AdminLayout({ children }) {
  const user = await requireAdmin();
  if (!user) redirect("/login?next=/admin");

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <AdminSidebar user={user} mode={storeMode()} />
      <div className="flex-1 lg:pl-64">
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
