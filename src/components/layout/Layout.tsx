import { Header } from "./Header";
import { Footer } from "./Footer";
import { GuruAIWidget } from "@/components/guru-ai/GuruAIWidget";

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export function Layout({ children, showFooter = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
      <GuruAIWidget />
    </div>
  );
}
