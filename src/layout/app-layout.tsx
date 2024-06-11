import { Header } from "@/components/core";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main
        style={{
          padding: "3rem 2.5rem 3rem",
        }}
      >
        {children}
      </main>
    </div>
  );
}
