import { Link } from "react-router-dom";

function BlogCard({ blog }) {
    return (
        <div className="card shadow-sm mb-4">

            {blog.image && (
                <img
                    src={`https://mern-blog-platform-6rmd.onrender.com/uploads/${blog.image}`}
                    className="card-img-top img-fluid"
                    alt={blog.title}
                    style={{
                        width: "100%",
                        maxHeight: "500px",
                        objectFit: "contain",
                        background: "#f8f9fa",
                    }}
                />
            )}

            <div className="card-body">

                <h3>{blog.title}</h3>

                <div
                    dangerouslySetInnerHTML={{
                        __html:
                            blog.content.length > 150
                                ? blog.content.substring(0, 150) + "..."
                                : blog.content,
                    }}
                />

                <Link
                    to={`/blog/${blog._id}`}
                    className="btn btn-primary mt-3"
                >
                    Read More
                </Link>

            </div>

        </div>
    );
}

export default BlogCard;