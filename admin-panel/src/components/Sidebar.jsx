import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Sidebar.css";

import {
  FaTachometerAlt,
  FaBlog,
  FaPlusCircle,
  FaComments,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/admin"); // Go to admin login after logout
  };

  const menuStyle = (path) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 15px",
    marginBottom: "10px",
    textDecoration: "none",
    borderRadius: "10px",
    color: "#fff",
    backgroundColor:
      location.pathname === path ? "#0d6efd" : "transparent",
    transition: "0.3s",
    fontWeight: "500",
  });

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="btn btn-dark menu-btn"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${showSidebar ? "show" : ""}`}>

        <h2>Blog Admin</h2>

        <Link
          to="/dashboard"
          style={menuStyle("/dashboard")}
          onClick={() => setShowSidebar(false)}
        >
          <FaTachometerAlt />
          Dashboard
        </Link>

        <Link
          to="/profile"
          style={menuStyle("/profile")}
          onClick={() => setShowSidebar(false)}
        >
          <FaUser />
          Profile
        </Link>

        {/* FIXED */}
        <Link
          to="/blogs"
          style={menuStyle("/blogs")}
          onClick={() => setShowSidebar(false)}
        >
          <FaBlog />
          All Blogs
        </Link>

        <Link
          to="/create"
          style={menuStyle("/create")}
          onClick={() => setShowSidebar(false)}
        >
          <FaPlusCircle />
          Create Blog
        </Link>

        <Link
          to="/comments"
          style={menuStyle("/comments")}
          onClick={() => setShowSidebar(false)}
        >
          <FaComments />
          Comments
        </Link>

        <Link
          to="/contact-messages"
          style={menuStyle("/contact-messages")}
          onClick={() => setShowSidebar(false)}
        >
          <FaEnvelope />
          Contact Messages
        </Link>

        <Link
          to="/users"
          style={menuStyle("/users")}
          onClick={() => setShowSidebar(false)}
        >
          <FaUsers />
          Users
        </Link>

        <Link
          to="/settings"
          style={menuStyle("/settings")}
          onClick={() => setShowSidebar(false)}
        >
          <FaCog />
          Settings
        </Link>

        <button
          className="btn btn-danger w-100 mt-4"
          onClick={logout}
        >
          <FaSignOutAlt className="me-2" />
          Logout
        </button>

      </div>
    </>
  );
}

export default Sidebar;