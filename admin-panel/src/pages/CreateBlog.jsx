import { useState } from "react";
import API from "../api/api";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateBlog() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [category, setCategory] = useState("Technology");
  const [tags, setTags] = useState("");

  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  const [status, setStatus] = useState("published");

  const [loading, setLoading] = useState(false);

  const createBlog = async () => {
    if (!title || !content) {
      toast.warning("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await API.post("/blogs", {
        title,
        content,

        author: "6a45135aa2fa0fdae09019f0",

        category,

        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),

        seoTitle,

        seoDescription,

        status,
      });

      toast.success("Blog Created Successfully");

      setTimeout(() => {
        navigate("/blogs");
      }, 1200);

    } catch (err) {
      console.log(err);
      toast.error("Error Creating Blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">

      <div className="d-flex align-items-center mb-4">

        <button
          className="btn btn-outline-secondary me-3"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h2 className="mb-0">
          📝 Create Blog
        </h2>

      </div>

      <div className="card shadow p-4">

        {/* Blog Title */}

        <div className="mb-3">

          <label className="form-label fw-bold">
            Blog Title
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Enter Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

        </div>

        {/* Category */}

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

        {/* Tags */}

        <div className="mb-3">

          <label className="form-label fw-bold">
            Tags
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="react,node,mongodb"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <small className="text-muted">
            Separate tags using commas.
          </small>

        </div>

        {/* Blog Content */}

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

        {/* SEO Title */}

        <div className="mb-3">

          <label className="form-label fw-bold">
            SEO Title
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Enter SEO Title"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
          />

        </div>

        {/* SEO Description */}

        <div className="mb-3">

          <label className="form-label fw-bold">
            SEO Description
          </label>

          <textarea
            rows="4"
            className="form-control"
            placeholder="Enter SEO Description"
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
          />

        </div>

        {/* Status */}

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

        <button
          className="btn btn-primary"
          onClick={createBlog}
          disabled={loading}
        >
          {loading ? "Creating..." : "🚀 Create Blog"}
        </button>

      </div>

    </div>
  );
}

export default CreateBlog;