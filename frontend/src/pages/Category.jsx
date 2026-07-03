import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import UserLayout from "../layouts/UserLayout";
import BlogCard from "../components/BlogCard";

function Category() {

  const { name } = useParams();

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, [name]);

  const fetchBlogs = async () => {

    try {

      const res = await API.get(`/blogs/category/${name}`);

      setBlogs(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <UserLayout>

      <div className="container mt-4">

        <h2 className="mb-4">
          📂 {name} Blogs
        </h2>

        {blogs.length === 0 ? (

          <div className="alert alert-warning">
            No blogs found in this category.
          </div>

        ) : (

          blogs.map((blog) => (

            <BlogCard
              key={blog._id}
              blog={blog}
            />

          ))

        )}

      </div>

    </UserLayout>

  );

}

export default Category;