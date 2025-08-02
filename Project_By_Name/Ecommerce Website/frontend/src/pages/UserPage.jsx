import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import i1 from "../assets/Images/signin/L1.jpg";

function UserPage() {
  const navigate = useNavigate(); // ✅ Move inside component
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/signin", {
        email,
        password,
      });

      if (res.data?.success) {
        console.log("Login success:", res.data);

        // ✅ Store user data in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: res.data.email,
            role: res.data.role,
            token: res.data.token, // If you have JWT
          })
        );

        // Redirect based on role
        if (res.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        console.error("Login failed:", res.data?.message || "Unknown error");
        alert(res.data?.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed, please try again");
    }
  };

  return (
    <div className="container px-5" style={{ height: "100vh" }}>
      <div className="row pt-3 align-items-center">
        {/* Left Image */}
        <div className="col-md-6 text-center">
          <img
            src={i1}
            className="img-fluid"
            style={{ maxHeight: "40rem", maxWidth: "100%" }}
            alt="Login"
          />
        </div>

        {/* Right Form */}
        <div className="col-md-6">
          <form className="pt-5 px-4" onSubmit={handleUser}>
            <h2 className="mb-4 ps-2 fw-bold">Login</h2>
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1, width: "100%" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="email"
                label="Email Address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                id="password"
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="mt-4 ps-2">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    borderRadius: "50px",
                    px: 5,
                    backgroundColor: "#084bc8ff",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#063b9b",
                    },
                  }}
                >
                  Login
                </Button>
              </div>
            </Box>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
