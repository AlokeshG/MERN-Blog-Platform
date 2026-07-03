import { useEffect, useState } from "react";
import API from "../api/api";
import { toast } from "react-toastify";

function CommentSection({ blogId }) {
    const [comments, setComments] = useState([]);
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (blogId) {
            fetchComments();
        }
    }, [blogId]);

    const fetchComments = async () => {
        try {
            const res = await API.get(`/comments/${blogId}`);
            setComments(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const addComment = async () => {
        if (!name.trim() || !comment.trim()) {
            toast.warning("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            await API.post("/comments", {
                blog: blogId,
                name,
                comment,
            });

            toast.success("Comment Added Successfully");

            setName("");
            setComment("");

            fetchComments();
        } catch (error) {
            console.log(error);
            toast.error("Error Adding Comment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-5">
            <h3 className="mb-4">💬 Comments</h3>

            {comments.length === 0 ? (
                <p>No comments yet.</p>
            ) : (
                comments.map((item) => (
                    <div
                        className="card shadow-sm mb-3"
                        key={item._id}
                    >
                        <div className="card-body">
                            <h5>{item.name}</h5>
                            <p>{item.comment}</p>

                            {item.createdAt && (
                                <small className="text-muted">
                                    {new Date(item.createdAt).toLocaleString()}
                                </small>
                            )}
                        </div>
                    </div>
                ))
            )}

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <textarea
                className="form-control mb-3"
                rows="4"
                placeholder="Write your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />

            <button
                className="btn btn-primary"
                onClick={addComment}
                disabled={loading}
            >
                {loading ? "Posting..." : "Post Comment"}
            </button>
        </div>
    );
}

export default CommentSection;