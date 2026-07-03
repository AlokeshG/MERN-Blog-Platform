import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import UserLayout from "../layouts/UserLayout";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.warning("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        role: "viewer",
      });

      toast.success("Registration Successful");

      navigate("/login");

    } catch (error) {
      console.log(error);
      toast.error("Registration Failed");
    }
  };

  return (
    <UserLayout>
      <div className="container mt-5" style={{ maxWidth: "500px" }}>
        <div className="card shadow p-4">

          <h2 className="text-center mb-4">
            Create Account
          </h2>

          <input
            className="form-control mb-3"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-4"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            className="btn btn-success w-100"
            onClick={register}
          >
            Register
          </button>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>

        </div>
      </div>
    </UserLayout>
  );
}

export default Register;