import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/logo/memora-logo.png";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await login(form.email, form.password);

      toast.success("✨ Login Successful");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.detail || "Login Failed");
      toast.error("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img
          src={Logo}
          className="login-logo"
          alt="Memora"
        />

        <h1>Welcome</h1>

        <p>
          Sign in to continue your AI Memory journey.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <div className="password-field">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

          {error && (
            <div className="error">
              {error}
            </div>
          )}

          <button disabled={loading}>
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        <span>
          Don't have an account?{" "}
          <Link to="/signup">
            Create Account
          </Link>
        </span>

      </div>
    </div>
  );
};

export default Login;