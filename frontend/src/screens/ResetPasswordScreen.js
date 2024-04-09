import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

import FormContainer from "../components/FormContainer.js";
import Loader from "../components/Loader.js";
import { useResetPasswordMutation } from "../slices/usersApiSlice.js";

import { toast } from "react-toastify";

const ResetPasswordScreen = () => {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // Send both old and new passwords to the API
      const response = await resetPassword({
        email,
        newPassword,
      }).unwrap();
      toast.success("Password changed successfully");

      navigate("/login"); // Redirect user to home page or any other appropriate page
    } catch (error) {
      toast.error("Failed to change password. Please try again.");
    }
  };
  return (
    <FormContainer>
      <Form onSubmit={submitHandler} className="col-8 mx-auto">
        <h3>Reset Password</h3>

        {/* Old Password */}
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* New Password */}
        <Form.Group controlId="newPassword" className="my-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            type="submit"
            variant="primary"
            className="mt-2"
            disabled={isLoading}
          >
            {isLoading ? "Changing Password..." : "Reset Password"}
          </Button>
        </div>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default ResetPasswordScreen;
