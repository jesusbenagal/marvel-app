export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>Header</div>
      <main
        style={{
          padding: "2rem 1rem 1rem 6rem",
        }}
      >
        {children}
      </main>
    </div>
  );
}
