import { useState } from "react";
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

    },1000);

  }

  catch(err){

    setError(

      err.response?.data?.detail ||

      "Login Failed"

    );

    toast.error("Invalid Email or Password");

  }

  finally{

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
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

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

          Don't have an account?

          <Link to="/signup">
            Create Account
          </Link>

        </span>

      </div>

    </div>
  );
};

export default Login;