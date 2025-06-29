import Navbar from "./navbar";
import Footer from "./footer";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-4 md:px-0">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default BaseLayout;