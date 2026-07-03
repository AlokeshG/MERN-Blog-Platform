import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav
      className="navbar px-4 d-flex justify-content-between"
      style={{
        backgroundColor: darkMode ? "#1b1f23" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000",
        borderBottom: darkMode
          ? "1px solid #444"
          : "1px solid #ddd",
      }}
    >
      <h2
        style={{
          color: darkMode ? "#4da3ff" : "#0d6efd",
          fontWeight: "bold",
        }}
      >
        MERN Blog
      </h2>

      <div className="d-flex align-items-center">

        <span
          className="me-3 fw-bold"
          style={{
            color: darkMode ? "#ffffff" : "#000000",
          }}
        >
          👤 Alokesh
        </span>

        <button
          className="btn btn-outline-warning me-2"
          onClick={toggleTheme}
        >
          {darkMode ? "🌞 Light" : "🌙 Dark"}
        </button>

        <button className="btn btn-danger">
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;