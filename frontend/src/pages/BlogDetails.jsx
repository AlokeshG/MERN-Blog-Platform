import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import API from "../api/api";
import UserLayout from "../layouts/UserLayout";
import CommentSection from "../components/CommentSection";

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await API.get(`/blogs/${id}`);
      setBlog(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!blog) {
    return (
      <UserLayout>
        <h3 className="text-center mt-5">
          Loading...
        </h3>
      </UserLayout>
    );
  }

  // Cloudinary Image URL
  const imageUrl = blog.image || "";

  const canonical =
    blog.canonicalUrl ||
    `${window.location.origin}/blog/${blog.slug || blog._id}`;

  return (
    <UserLayout>
      <Helmet>
        <title>
          {blog.seoTitle || blog.title}
        </title>

        <meta
          name="description"
          content={
            blog.seoDescription ||
            "Read this blog on MERN Blog."
          }
        />

        <link
          rel="canonical"
          href={canonical}
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content={
            blog.ogTitle ||
            blog.seoTitle ||
            blog.title
          }
        />

        <meta
          property="og:description"
          content={
            blog.ogDescription ||
            blog.seoDescription
          }
        />

        <meta
          property="og:image"
          content={
            blog.ogImage || imageUrl
          }
        />

        <meta
          property="og:type"
          content="article"
        />

        {/* Twitter */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content={
            blog.twitterTitle ||
            blog.seoTitle ||
            blog.title
          }
        />

        <meta
          name="twitter:description"
          content={
            blog.twitterDescription ||
            blog.seoDescription
          }
        />

        <meta
          name="twitter:image"
          content={
            blog.twitterImage || imageUrl
          }
        />
      </Helmet>

      <div className="container mt-5">
        <button
          className="btn btn-secondary mb-4"
          onClick={() => navigate("/")}
        >
          ← Back
        </button>

        {blog.image && (
          <img
            src={imageUrl}
            className="img-fluid rounded shadow mb-4"
            alt={blog.title}
            style={{
              width: "100%",
              maxHeight: "600px",
              objectFit: "contain",
            }}
          />
        )}

        <h1>{blog.title}</h1>

        <div className="mb-3">
          <span className="badge bg-primary me-2">
            {blog.category}
          </span>

          <span className="badge bg-success">
            {blog.status}
          </span>
        </div>

        <p className="text-muted">
          📅 {new Date(blog.createdAt).toLocaleDateString()}
        </p>

        <hr />

        <div
          dangerouslySetInnerHTML={{
            __html: blog.content,
          }}
        />

        <CommentSection
          blogId={blog._id}
        />
      </div>
    </UserLayout>
  );
}

export default BlogDetails;