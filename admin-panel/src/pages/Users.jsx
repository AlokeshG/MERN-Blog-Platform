import { useEffect, useState } from "react";
import API from "../api/api";
import AdminLayout from "../layouts/AdminLayout";
import { toast } from "react-toastify";

function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {

    try {

      const res = await API.get("/auth/users");

      setUsers(res.data);

    } catch (error) {

      console.log(error);

      toast.error("Error Loading Users");

    }

  };

  const deleteUser = async (id) => {

    if (!window.confirm("Delete this user?")) return;

    try {

      await API.delete(`/auth/${id}`);

      toast.success("User Deleted Successfully");

      fetchUsers();

    } catch (error) {

      console.log(error);

      toast.error("Error Deleting User");

    }

  };

  return (

    <AdminLayout>

      <div className="container mt-4">

        <h2 className="mb-4">
          👥 Users
        </h2>

        <table className="table table-bordered table-hover">

          <thead className="table-dark">

            <tr>

              <th>Name</th>

              <th>Email</th>

              <th>Role</th>

              <th>Status</th>

              <th>Created</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr key={user._id}>

                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>{user.role}</td>

                <td>{user.status}</td>

                <td>
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </AdminLayout>

  );

}

export default Users;