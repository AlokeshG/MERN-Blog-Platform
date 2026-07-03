import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";

function UserLayout({ children }) {
  return (
    <>
      <UserNavbar />

      <div className="container mt-4">
        {children}
      </div>

      <Footer />
    </>
  );
}

export default UserLayout;