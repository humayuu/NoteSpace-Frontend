import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import api from "./utils/api";
import { setToken } from "./utils/auth";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ color: "", text: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ color: "", text: "" });
    try {
      const { data } = await api.post("/login", form);
      if (data.token) setToken(data.token);
      setAlert({ color: "success", text: "Logged in successfully!" });
      setTimeout(() => navigate("/notes"), 1200);
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      setAlert({ color: "danger", text: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center px-3"
      style={{ minHeight: "100vh" }}
    >
      <MDBCard
        className="shadow-3 rounded-4 w-100"
        style={{ maxWidth: "420px" }}
      >
        <MDBCardBody className="p-4 p-md-5">
          <div className="text-center mb-4">
            <MDBIcon
              fas
              icon="book-open"
              size="2x"
              className="text-primary mb-3"
            />
            <h3 className="fw-bold mb-1">Welcome back</h3>
            <p className="text-muted mb-0">Sign in to your NoteSpace account</p>
          </div>

          {alert.text && (
            <div className={`alert alert-${alert.color} py-2`} role="alert">
              {alert.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <MDBInput
              className="mb-4"
              type="email"
              name="email"
              id="loginEmail"
              label="Email address"
              value={form.email}
              onChange={handleChange}
              required
            />
            <MDBInput
              className="mb-4"
              type="password"
              name="password"
              id="loginPassword"
              label="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <MDBBtn type="submit" color="primary" block disabled={loading}>
              {loading ? (
                <>
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </MDBBtn>
          </form>

          <p className="text-center text-muted mt-4 mb-0">
            Don&apos;t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Login;
