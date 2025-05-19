import Navbar from "../components/Navbar";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <main className="flex-grow pt-[70px]">{children}</main>
    </div>
  );
}
