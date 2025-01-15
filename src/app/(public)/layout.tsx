import Topbar from "@/components/shared/Topbar";

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div>
      <Topbar />
      <main className="container mx-auto mt-14 p-2">{children}</main>
    </div>
  );
};

export default PublicLayout;
