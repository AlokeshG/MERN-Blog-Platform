import UserLayout from "../layouts/UserLayout";

function Favorites() {
  return (
    <UserLayout>
      <div className="container mt-5">
        <h2>❤️ Favorite Blogs</h2>
        <p>No favorite blogs yet.</p>
      </div>
    </UserLayout>
  );
}

export default Favorites;