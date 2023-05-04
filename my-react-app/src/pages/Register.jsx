import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { DEV_API_AUTH } from "../consts-data";

const Register = () => {
  const [errorInvalid, setErrorInvalid] = useState("");
  const [errorExists, setErrorExists] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    profile_image: "",
    description: "",
    discord_link: "",
  });
  const [buttonActive, setButtonActive] = useState(false);

  const onChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setButtonActive(true);
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password.length < 7 || formData.username.length < 3) {
        setErrorInvalid("Invalid input please try again");
        setTimeout(() => {
          setErrorInvalid("");
        }, 3000);
      } else {
        const res = await axios.post(`${DEV_API_AUTH}/register/`, formData);
        console.log(res);
        setFormData(formData);
        navigate("/login");
      }
    } catch (err) {
      console.log(err.response.data);
      const errorMessages = [];
      if (err.response.data.email) {
        errorMessages.push(err.response.data.email.join(", "));
      }
      if (err.response.data.username) {
        errorMessages.push(err.response.data.username.join(", "));
      }
      const errorMessage = errorMessages.join("\n");
      setErrorExists(errorMessage);
      setTimeout(() => {
        setErrorExists("");
      }, 3000);
    }
  };

  return (
    <div className="main-form-register">
      <form className="form-body-register" onSubmit={onSubmit}>
        <h2 className="registertitle">Register</h2>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            onChange={onChange}
            value={formData.username}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="password"
            onChange={onChange}
            placeholder="Password"
            name="password"
            value={formData.password}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="password_confirmation"
            onChange={onChange}
            value={formData.password_confirmation}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="text"
            name="profile_image"
            placeholder="Add an image URL (optional)"
            value={formData.profile_image}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="text"
            placeholder="Description (optional)"
            name="description"
            onChange={onChange}
            value={formData.description}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="text"
            placeholder="Discord link (optional)"
            name="discord_link"
            onChange={onChange}
            value={formData.discord_link}
          />
        </Form.Group>
        <div className="btncontainer">
          <div className="registerbtn">
            {!formData.username &&
            !formData.email &&
            !formData.password &&
            !formData.password_confirmation &&
            !formData.profile_image &&
            !formData.description &&
            !formData.discord_link ? (
              <Button
                className="form-btn"
                variant="secondary"
                type="submit"
                size="lg"
                disabled
              >
                Register
              </Button>
            ) : (
              <Button
                className="form-btn"
                variant="primary"
                type="submit"
                size="lg"
                active
              >
                Register
              </Button>
            )}
          </div>
        </div>
        {errorInvalid && <h5 className="error-register1">{errorInvalid}</h5>}
        {errorExists && <h5 className="error-register2">{errorExists}</h5>}
      </form>
    </div>
  );
};

export default Register;
