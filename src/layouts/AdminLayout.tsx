import Header from "@/components/admin/Header";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="flex container mx-auto flex-col ">
        <div className="container mx-auto py-10 flex-1">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
