import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Public Pages
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import Search from "./pages/Search";
import Category from "./pages/Category";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Blog Details */}
        <Route path="/blog/:id" element={<BlogDetails />} />

        {/* Search */}
        <Route path="/search" element={<Search />} />

        {/* Category */}
        <Route path="/category/:name" element={<Category />} />

        {/* About */}
        <Route path="/about" element={<About />} />

        {/* Contact */}
        <Route path="/contact" element={<Contact />} />

        {/* User Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Favorites */}
        <Route path="/favorites" element={<Favorites />} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </>
  );
}

export default App;