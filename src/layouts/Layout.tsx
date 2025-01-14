import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NavBar from "@/components/Navbar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex container mx-auto flex-col min-h-screen ">
      <Header />
      <NavBar />
      <div className="container mx-auto py-10 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
