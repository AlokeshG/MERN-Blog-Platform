import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import Loader from "../components/Loader";

function ViewBlog() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await API.get(`/blogs/${id}`);
      setBlog(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!blog) {
    return <Loader />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{blog.title}</h1>

      <p>
        <strong>Category:</strong> {blog.category}
      </p>

      <p>
        <strong>Status:</strong> {blog.status}
      </p>

      <hr />

      <div
        dangerouslySetInnerHTML={{
          __html: blog.content,
        }}
      />
    </div>
  );
}

export default ViewBlog;