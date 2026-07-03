import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import AdminLayout from "../layouts/AdminLayout";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        `/blogs/search?title=${search}&category=${category}&page=${page}&limit=5`
      );

      setBlogs(res.data.blogs || []);
      setTotalPages(res.data.totalPages || 1);

    } catch (error) {
      console.log(error);
      toast.error("Error Loading Blogs");
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/blogs/${id}`);

      toast.success("Blog Deleted Successfully");

      fetchBlogs();

    } catch (error) {
      console.log(error);
      toast.error("Error Deleting Blog");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, search, category]);

  if (loading) {
    return (
      <AdminLayout>
        <Loader />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mt-4">

        <h1 className="mb-4">📚 All Blogs</h1>

        {/* Search */}
        <div className="row mb-4">

          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Categories</option>
              <option value="Technology">Technology</option>
              <option value="Programming">Programming</option>
              <option value="AI">AI</option>
              <option value="Web Development">
                Web Development
              </option>
            </select>
          </div>

          <div className="col-md-2">
            <button
              className="btn btn-danger w-100"
              onClick={() => {
                setSearch("");
                setCategory("");
                setPage(1);
              }}
            >
              Clear
            </button>
          </div>

        </div>

        {/* Blogs */}
        {blogs.length === 0 ? (
          <div className="alert alert-info">
            No blogs found.
          </div>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="card shadow-lg border-0 mb-4"
              style={{ borderRadius: "15px" }}
            >
              {blog.image && (
                <img
                  src={`http://localhost:5000/uploads/${blog.image}`}
                  className="card-img-top"
                  alt={blog.title}
                  style={{
                    width: "100%",
                    maxHeight: "400px",
                    objectFit: "contain",
                    backgroundColor: "#f8f9fa",
                  }}
                />
              )}

              <div className="card-body">

                <h3>{blog.title}</h3>

                <div className="mb-3">

                  <span className="badge bg-primary me-2">
                    {blog.category}
                  </span>

                  <span
                    className={
                      blog.status === "published"
                        ? "badge bg-success"
                        : "badge bg-warning text-dark"
                    }
                  >
                    {blog.status}
                  </span>

                </div>

                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      blog.content.length > 200
                        ? blog.content.substring(0, 200) + "..."
                        : blog.content,
                  }}
                />

                <p className="text-muted mt-3">
                  Created:{" "}
                  {blog.createdAt
                    ? new Date(
                        blog.createdAt
                      ).toLocaleDateString()
                    : "N/A"}
                </p>

                <div className="mt-3">

                  <Link to={`/blog/${blog._id}`}>
                    <button className="btn btn-primary me-2">
                      👁 View
                    </button>
                  </Link>

                  <Link to={`/edit/${blog._id}`}>
                    <button className="btn btn-warning me-2">
                      ✏ Edit
                    </button>
                  </Link>

                  <button
                    className="btn btn-danger"
                    onClick={() => deleteBlog(blog._id)}
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>
            </div>
          ))
        )}

        {/* Pagination */}
        <div className="d-flex justify-content-center align-items-center mt-4">

          <button
            className="btn btn-secondary"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <span className="mx-3 fw-bold">
            Page {page} of {totalPages}
          </span>

          <button
            className="btn btn-secondary"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>

        </div>

      </div>
    </AdminLayout>
  );
}

export default AllBlogs;