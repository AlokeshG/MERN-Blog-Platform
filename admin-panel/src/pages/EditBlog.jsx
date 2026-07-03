import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Technology");
  const [tags, setTags] = useState("");

  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  const [status, setStatus] = useState("published");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/blogs/${id}`);

      setTitle(res.data.title);
      setContent(res.data.content);
      setCurrentImage(res.data.image);
      setCategory(res.data.category || "Technology");

      setTags(
        res.data.tags
          ? res.data.tags.join(", ")
          : ""
      );

      setSeoTitle(res.data.seoTitle || "");

      setSeoDescription(
        res.data.seoDescription || ""
      );

      setStatus(
        res.data.status || "published"
      );

      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error Loading Blog");
      setLoading(false);
    }
  };

  const updateBlog = async () => {
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);

      formData.append(
        "tags",
        JSON.stringify(
          tags
            .split(",")
            .map(tag => tag.trim())
            .filter(tag => tag !== "")
        )
      );

      formData.append("seoTitle", seoTitle);

      formData.append(
        "seoDescription",
        seoDescription
      );

      formData.append("status", status);

      if (image) {
        formData.append("image", image);
      }

      await API.put(`/blogs/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Blog Updated Successfully");

      navigate("/blogs");
      // If your All Blogs page is "/allblogs",
      // replace "/" with "/allblogs"

    } catch (error) {
      console.log(error);
      toast.error("Error Updating Blog");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="d-flex align-items-center mb-4">

        <button
          className="btn btn-outline-secondary me-3"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h2 className="mb-0">✏ Edit Blog</h2>

      </div>

      <div className="card shadow p-4">

        {/* Title */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            Blog Title
          </label>

          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">

          <label className="form-label fw-bold">
            Category
          </label>

          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >

            <option>Technology</option>

            <option>Programming</option>

            <option>AI</option>

            <option>Web Development</option>

          </select>

        </div>

        <div className="mb-3">

          <label className="form-label fw-bold">
            Tags
          </label>

          <input
            className="form-control"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="react,node,mongodb"
          />

        </div>

        {/* Current Image */}
        {currentImage && (
          <div className="mb-3">

            <label className="form-label fw-bold">
              Current Image
            </label>

            <br />

            <img
              src={`http://localhost:5000/uploads/${currentImage}`}
              alt="Blog"
              className="img-thumbnail"
              style={{
                maxWidth: "350px",
                maxHeight: "250px",
                objectFit: "contain",
              }}
            />

          </div>
        )}

        {/* Upload New Image */}
        <div className="mb-4">

          <label className="form-label fw-bold">
            Change Image
          </label>

          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

        </div>

        {/* CKEditor */}
        <div className="mb-4">

          <label className="form-label fw-bold">
            Blog Content
          </label>

          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={(event, editor) => {
              setContent(editor.getData());
            }}
          />

        </div>

        <hr />

        <h4 className="mb-3">
          🔍 SEO Settings
        </h4>

        <div className="mb-3">

          <label className="form-label fw-bold">
            SEO Title
          </label>

          <input
            className="form-control"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
          />

        </div>

        <div className="mb-3">

          <label className="form-label fw-bold">
            SEO Description
          </label>

          <textarea
            rows="4"
            className="form-control"
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
          ></textarea>

        </div>

        <div className="mb-4">

          <label className="form-label fw-bold">
            Status
          </label>

          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >

            <option value="published">
              Published
            </option>

            <option value="draft">
              Draft
            </option>

          </select>

        </div>

        {/* Button */}
        <button
          className="btn btn-primary"
          onClick={updateBlog}
        >
          💾 Update Blog
        </button>

      </div>

    </div>
  );
}

export default EditBlog;