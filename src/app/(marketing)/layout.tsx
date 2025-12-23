import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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
    </>
  );
}
