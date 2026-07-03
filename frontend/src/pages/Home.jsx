import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import UserLayout from "../layouts/UserLayout";
import BlogCard from "../components/BlogCard";

function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs");
      setBlogs(res.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserLayout>

      {/* Hero Section */}
      <div
        className="text-center text-white p-5 rounded mb-5"
        style={{
          background:
            "linear-gradient(135deg,#0d6efd,#6610f2)",
        }}
      >
        <h1 className="display-4 fw-bold">
          🚀 Welcome to MERN Blog
        </h1>

        <p className="lead mt-3">
          Read the latest blogs on Technology,
          AI, Programming and Web Development.
        </p>

        <Link
          to="/search"
          className="btn btn-light btn-lg mt-3"
        >
          Explore Blogs
        </Link>
      </div>

      {/* Latest Blogs */}
      <section className="mb-5">

        <h2 className="mb-4">
          📰 Latest Blogs
        </h2>

        {blogs.length === 0 ? (
          <h5>No Blogs Available</h5>
        ) : (
          blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
            />
          ))
        )}

      </section>

      {/* Popular Categories */}
      <section className="mb-5">

        <h2 className="mb-4">
          📂 Popular Categories
        </h2>

        <div className="row">

          <div className="col-md-3 mb-3">
            <Link
              to="/category/Technology"
              className="text-decoration-none"
            >
              <div className="card shadow text-center p-4">
                <h4>💻</h4>
                <h5>Technology</h5>
              </div>
            </Link>
          </div>

          <div className="col-md-3 mb-3">
            <Link
              to="/category/AI"
              className="text-decoration-none"
            >
              <div className="card shadow text-center p-4">
                <h4>🤖</h4>
                <h5>AI</h5>
              </div>
            </Link>
          </div>

          <div className="col-md-3 mb-3">
            <Link
              to="/category/Programming"
              className="text-decoration-none"
            >
              <div className="card shadow text-center p-4">
                <h4>📚</h4>
                <h5>Programming</h5>
              </div>
            </Link>
          </div>

          <div className="col-md-3 mb-3">
            <Link
              to="/category/Web Development"
              className="text-decoration-none"
            >
              <div className="card shadow text-center p-4">
                <h4>🌐</h4>
                <h5>Web Development</h5>
              </div>
            </Link>
          </div>

        </div>

      </section>

      {/* About */}
      <section
        className="bg-light rounded p-5 mb-5"
      >
        <h2>
          ℹ About MERN Blog
        </h2>

        <p className="mt-3">
          MERN Blog is a modern blogging platform
          built using MongoDB, Express.js,
          React.js and Node.js.
        </p>

        <p>
          Users can read blogs, search by title,
          browse categories, register accounts,
          comment on blogs and explore the latest
          articles from different topics.
        </p>
      </section>

    </UserLayout>
  );
}

export default Home;