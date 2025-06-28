import Navbar from "./navbar";
import Footer from "./footer";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default BaseLayout;