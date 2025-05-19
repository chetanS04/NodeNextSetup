// app/dashboard/layout.tsx
import Sidebar from '@/app/components/Sidebar';
import { LoaderProvider } from "@/context/LoaderContext";
import GlobalLoader from "@/app/components/GlobarLoader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoaderProvider>
        <GlobalLoader />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-4">{children}</main>
        </div>
      </LoaderProvider>
    </>

  );
}
