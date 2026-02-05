import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100vh] flex flex-col items-center">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
