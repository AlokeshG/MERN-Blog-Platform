import { useState } from "react";
import API from "../api/api";
import BlogCard from "../components/BlogCard";

function Search() {
  const [keyword, setKeyword] = useState("");
  const [blogs, setBlogs] = useState([]);

  const searchBlogs = async () => {
    try {
      const res = await API.get(`/blogs/search?title=${keyword}`);
      setBlogs(res.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🔍 Search Blogs</h2>

      <div className="row mb-4">
        <div className="col-md-10">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <button
            className="btn btn-primary w-100"
            onClick={searchBlogs}
          >
            Search
          </button>
        </div>
      </div>

      {blogs.length === 0 ? (
        <h5>No blogs found.</h5>
      ) : (
        blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
          />
        ))
      )}
    </div>
  );
}

export default Search;