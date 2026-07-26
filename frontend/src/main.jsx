import React from "react";
import ReactDOM from "react-dom/client";

import { Toaster } from "react-hot-toast";

import App from "./App";

import "./styles/global.css";

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <AuthProvider>

      <App />

      <Toaster

        position="top-right"

        reverseOrder={false}

        toastOptions={{

          duration: 2500,

          style: {

            background: "#1B1D29",

            color: "#fff",

            border: "1px solid #8B5CF6",

            borderRadius: "14px",

            padding: "14px",

          },

          success: {

            iconTheme: {

              primary: "#10B981",

              secondary: "#fff",

            },

          },

          error: {

            iconTheme: {

              primary: "#EF4444",

              secondary: "#fff",

            },

          },

        }}

      />

    </AuthProvider>

  </React.StrictMode>
);