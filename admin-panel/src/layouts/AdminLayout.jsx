import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function AdminLayout({ children }) {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`d-flex ${
        darkMode
          ? "bg-dark text-white"
          : "bg-light text-dark"
      }`}
      style={{
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <Sidebar />

      <div
        className="flex-grow-1"
        style={{
          backgroundColor: darkMode ? "#212529" : "#f8f9fa",
          color: darkMode ? "#ffffff" : "#000000",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Navbar />

        <div
          className="container-fluid py-3 px-3 px-md-4"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;