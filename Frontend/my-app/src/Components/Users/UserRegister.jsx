import React, { useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import axios from "axios";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";

const UserRegister = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setPicMessage(null);

    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("pic", pic);

      const { data } = await axios.post(
        "https://book-review-platform-server-cfuk.onrender.com/api/users/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, 
        }
      );

      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setMessage(
        error.response?.data?.message || "Registration failed, try again"
      );
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Col xs={12} sm={10} md={8} lg={6} xl={5}>
        <div className="p-4 shadow rounded bg-white">
          {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
          {loading && <Loading />}

          <h3 className="text-center mb-4">Register Form</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                placeholder="Enter name"
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                autoComplete="off"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  autoComplete="off"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size="20" /> : <EyeSlash size="20" />}
                </Button>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="confirmPassword" className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="off"
                  value={confirmpassword}
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? (
                    <Eye size="20" />
                  ) : (
                    <EyeSlash size="20" />
                  )}
                </Button>
              </InputGroup>
            </Form.Group>

            {picMessage && (
              <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
            )}

            <Form.Group controlId="pic" className="mb-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setPic(e.target.files[0])}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Register
            </Button>

            <div className="text-center">
              <small>
                Already have an account? <Link to="/login">Login</Link>
              </small>
            </div>
          </Form>
        </div>
      </Col>
    </Container>
  );
};

export default UserRegister;
