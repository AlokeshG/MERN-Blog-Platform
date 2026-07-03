import { useEffect, useState } from "react";
import API from "../api/api";
import AdminLayout from "../layouts/AdminLayout";
import { FaBlog, FaUsers, FaComments } from "react-icons/fa";
import Loader from "../components/Loader";

function Dashboard() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const res = await API.get("/blogs/dashboard");
            setData(res.data);
        } catch (error) {
            console.log(error.response?.data);
            console.log(error.response?.status);
            console.log(error.message);
        }
    };
    if (!data) {
        return <Loader />;
    }
    return (
        <AdminLayout>
            <div style={{ padding: "20px" }}>
                <h1>📊 Dashboard</h1>

                <div className="row mb-4">

                    <div className="col-md-4">
                        <div className="card shadow bg-primary text-white">
                            <div className="card-body">
                                <FaBlog size={40} />
                                <h3 className="mt-3">Total Blogs</h3>
                                <h1>{data.totalBlogs}</h1>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow bg-success text-white">
                            <div className="card-body">
                                <FaUsers size={40} />
                                <h3 className="mt-3">Total Users</h3>
                                <h1>{data.totalUsers}</h1>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow bg-warning text-dark">
                            <div className="card-body">
                                <FaComments size={40} />
                                <h3 className="mt-3">Comments</h3>
                                <h1>{data.totalComments}</h1>
                            </div>
                        </div>
                    </div>

                </div>
                <h2 className="mb-4">Recent Blogs</h2>

                {data.recentBlogs.map((blog) => (
                    <div className="card shadow mb-3" key={blog._id}>
                        <div className="card-body">
                            <h4>{blog.title}</h4>
                            <p>{blog.category}</p>
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}

export default Dashboard;