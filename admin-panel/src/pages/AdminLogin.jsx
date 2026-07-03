import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { toast } from "react-toastify";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      toast.warning("Please enter Email and Password");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // Optional: only allow admins
      if (
        res.data.user.role !== "superadmin" &&
        res.data.user.role !== "admin"
      ) {
        toast.error("Access Denied. Admin Only.");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Admin Login Successful");

      navigate("/dashboard");

    } catch (error) {
      console.log(error);
      toast.error("Invalid Admin Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "400px" }}
      >
        <h2 className="text-center mb-4">
          👨‍💼 Admin Login
        </h2>

        <div className="mb-3">
          <label className="form-label">
            Email
          </label>

          <input
            type="email"
            className="form-control"
            placeholder="Enter Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">
            Password
          </label>

          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={login}
          disabled={loading}
        >
          {loading ? "Logging In..." : "Admin Login"}
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;