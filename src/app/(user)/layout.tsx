import Header from "@/components/user/header";

const LayoutUser = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="bg-neutral-50 flex-1 z-0 overflow-hidden">{children}</div>
    </div>
  );
};

export default LayoutUser;
