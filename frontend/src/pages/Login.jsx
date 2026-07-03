import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import UserLayout from "../layouts/UserLayout";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!email || !password) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      if (res.data.user.role !== "user") {
        toast.error("Please use the Admin Panel to log in as an administrator.");
        return;
      }

      localStorage.setItem("userToken", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login Successful");

      navigate("/");

    } catch (error) {
      console.log(error);
      toast.error("Invalid Email or Password");
    }
  };

  return (
    <UserLayout>
      <div className="container mt-5" style={{ maxWidth: "450px" }}>
        <div className="card shadow p-4">

          <h2 className="text-center mb-4">
            User Login
          </h2>

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-4"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="btn btn-primary w-100"
            onClick={login}
          >
            Login
          </button>

          <p className="text-center mt-3">
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </p>

        </div>
      </div>
    </UserLayout>
  );
}

export default Login;