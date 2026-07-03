import { useState } from "react";
import API from "../api/api";
import { toast } from "react-toastify";

function CommentForm() {
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const addComment = async () => {
        try {
            await API.post("/comments", {
                blog: "6a451d8e6cd53072eadc2ffc",
                name,
                comment,
            });

            toast.success("Comment Added Successfully");

            setName("");
            setComment("");

        } catch (error) {
            console.log(error);

            if (error.response) {
                console.log(error.response.data);
                alert(error.response.data.message || JSON.stringify(error.response.data));
            } else {
                alert(error.message);
            }
        }
    };

    return (
        <div className="card p-3 mb-4">
            <h4>Add Comment</h4>

            <input
                className="form-control mb-2"
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
            >
                Add Comment
            </button>
        </div>
    );
}

export default CommentForm;