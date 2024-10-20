import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "./_components/Navbar";
import { Sidebar } from "./_components/Sidebar";
import { ConfettiProvider } from "@/provider/confettiProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <div className="h-[80p] md:pl-56 fixed inset-x-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:ml-56 pt-[80px] h-full">
        <ConfettiProvider />
        {children}
      </main>
      <Toaster />
    </div>
  );
}
