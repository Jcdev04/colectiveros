import Header from "@/components/user/header";

const LayoutUser = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="bg-neutral-50 flex-1 container m-auto z-0">
        {children}
      </main>
    </div>
  );
};

export default LayoutUser;
