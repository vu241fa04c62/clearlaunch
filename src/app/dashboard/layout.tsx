import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { AiCoFounderWidget } from "@/components/AiCoFounderWidget";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-hidden">
      <Sidebar
        userName={session.user.name || "Founder"}
        userRole={(session.user as any).role || "USER"}
        userId={session.user.id}
        userImage={session.user.image || undefined}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Persistent post-login Personal AI Co-Founder floating drawer */}
      <AiCoFounderWidget />
    </div>
  );
}
