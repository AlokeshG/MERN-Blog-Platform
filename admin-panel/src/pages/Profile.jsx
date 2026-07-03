import { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import API from "../api/api";
import { toast } from "react-toastify";

function Profile() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }

    try {
      await API.put("/auth/update-password", {
        email: "admin@gmail.com", // Replace with logged-in user's email later
        currentPassword,
        newPassword,
      });

      toast.success("Password Updated Successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <AdminLayout>
      <div className="container mt-4">

        <h2 className="mb-4">👤 My Profile</h2>

        <div className="card shadow p-4">

          <div className="text-center mb-4">
            <img
              src="https://ui-avatars.com/api/?name=Admin"
              alt="Avatar"
              className="rounded-circle"
              width="120"
            />
          </div>

          <table className="table">
            <tbody>

              <tr>
                <th>Name</th>
                <td>Admin</td>
              </tr>

              <tr>
                <th>Email</th>
                <td>admin@gmail.com</td>
              </tr>

              <tr>
                <th>Role</th>
                <td>Super Admin</td>
              </tr>

            </tbody>
          </table>

        </div>

        <div className="card shadow mt-4 p-4">

          <h3>🔒 Update Password</h3>

          <input
            type="password"
            className="form-control mt-3"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <input
            type="password"
            className="form-control mt-3"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <input
            type="password"
            className="form-control mt-3"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            className="btn btn-primary mt-3"
            onClick={updatePassword}
          >
            Update Password
          </button>

        </div>

      </div>
    </AdminLayout>
  );
}

export default Profile;