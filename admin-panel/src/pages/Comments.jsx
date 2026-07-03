import AdminLayout from "../layouts/AdminLayout";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

function Comments() {
  return (
    <AdminLayout>
      <div className="container mt-4">
        <h1 className="mb-4">💬 Comments</h1>

        <CommentForm />

        <CommentList />
      </div>
    </AdminLayout>
  );
}

export default Comments;