import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        height: "100vh",
        background: "#0F172A",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <h1
        style={{
          fontSize: "80px",
          marginBottom: "10px",
        }}
      >
        404
      </h1>

      <h2>Page Not Found</h2>

      <Link
        to="/"
        style={{
          marginTop: "20px",
          background: "#8B5CF6",
          color: "white",
          padding: "12px 20px",
          borderRadius: "10px",
          textDecoration: "none",
        }}
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;