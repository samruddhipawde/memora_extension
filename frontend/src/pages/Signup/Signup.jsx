import "./Signup.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Logo from "../../assets/logo/memora-logo.png";
import { registerUser } from "../../services/authService";

const Signup = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });

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

      await registerUser(form);

      toast.success("🎉 Account Created Successfully");

      navigate("/login");

    }

    catch (err) {

      setError(

        err.response?.data?.detail ||

        "Registration Failed"

      );

      toast.error("Registration Failed");

    }

    finally {

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

        <h1>Create Account</h1>

        <p>
          Create your Memora account.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {error &&

            <div className="error">

              {error}

            </div>

          }

          <button disabled={loading}>

            {

              loading

              ?

              "Creating Account..."

              :

              "Create Account"

            }

          </button>

        </form>

        <span>

          Already have an account?

          <Link to="/login">

            Login

          </Link>

        </span>

      </div>

    </div>

  );

};

export default Signup;