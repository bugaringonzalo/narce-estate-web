import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/layout/FloatingButtons";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="pt-16 md:pt-20 min-h-[100dvh]">
        {children}
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
