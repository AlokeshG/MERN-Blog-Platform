import UserLayout from "../layouts/UserLayout";

function About() {
  return (
    <UserLayout>
      <div className="container mt-5">

        <h1 className="text-center mb-4">
          About MERN Blog
        </h1>

        <div className="card shadow p-5">

          <h3>Our Mission</h3>

          <p>
            MERN Blog is a modern blogging platform where
            users can explore articles on Technology,
            Artificial Intelligence, Programming and
            Web Development.
          </p>

          <h3 className="mt-4">
            Technologies Used
          </h3>

          <ul>
            <li>MongoDB</li>
            <li>Express.js</li>
            <li>React.js</li>
            <li>Node.js</li>
            <li>Bootstrap 5</li>
            <li>JWT Authentication</li>
            <li>Cloudinary / Multer Image Upload</li>
          </ul>

          <h3 className="mt-4">
            Features
          </h3>

          <ul>
            <li>Blog Management</li>
            <li>User Authentication</li>
            <li>Image Upload</li>
            <li>Comments</li>
            <li>Search Blogs</li>
            <li>Category Filtering</li>
            <li>Responsive Design</li>
            <li>Dark Mode (Admin)</li>
          </ul>

        </div>

      </div>
    </UserLayout>
  );
}

export default About;