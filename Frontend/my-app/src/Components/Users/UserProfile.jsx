import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Image } from "react-bootstrap";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import axios from "axios";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("https://book-review-platform-server-cfuk.onrender.com/api/users/profile", {
          withCredentials: true,
        });
        setName(data.name);
        setEmail(data.email);
        setPic(data.pic);
        setLoading(false);
      } catch (err) {
        setError("Failed to load profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const postDetails = (pics) => {
    setPicMessage("");
    if (pics && (pics.type === "image/jpeg" || pics.type === "image/png")) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "ElectZone");
      data.append("cloud_name", "dy6n0qbpd");

      fetch("https://api.cloudinary.com/v1_1/dy6n0qbpd/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch(() => {
          setPicMessage("Failed to upload image. Please try again.");
        });
    } else {
      setPicMessage("Please select a valid image (JPEG or PNG).");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    try {
      setLoading(true);
      const response = await axios.put(
        "https://book-review-platform-server-cfuk.onrender.com/api/users/updateProfile",
        {
          name,
          email,
          password: password ? password : undefined,
          pic,
        },
        {
          withCredentials: true,
        }
      );
      setPassword("");
      setConfirmPassword("");
      setSuccess("Profile Updated Successfully");
      setLoading(false);
    } catch (err) {
      setError("Failed to update profile");
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="align-items-center g-lg-4">
        <Col md={12} lg={6} className="d-flex justify-content-center">
          <Image
            src={
              pic || "https://www.w3schools.com/howto/img_avatar.png"
            }
            alt={name || "Profile Picture"}
            className="profilePic"
            fluid
            width={300}
            height={300}
          />
        </Col>
        <Col md={12} lg={6} className="d-flex justify-content-center">
          <div className="profile-container p-4 p-md-5">
            {loading && <Loading />}
            {success && <ErrorMessage variant="success">{success}</ErrorMessage>}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {picMessage && <ErrorMessage variant="danger">{picMessage}</ErrorMessage>}
            <Form className="w-100" onSubmit={handleSubmit}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="confirmPassword" className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="pic" className="mb-3">
                <Form.Label>Change Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100">
                Update
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
