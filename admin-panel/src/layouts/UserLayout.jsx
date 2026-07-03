import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";

function UserLayout({ children }) {
  return (
    <>
      <UserNavbar />

      <main className="container mt-4">
        {children}
      </main>

      <Footer />
    </>
  );
}

export default UserLayout;