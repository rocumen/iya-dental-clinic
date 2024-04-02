import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

import FormContainer from "../components/FormContainer.js";
import Loader from "../components/Loader.js";
import {
  useChangePasswordMutation,
  useGetUserByIdQuery,
} from "../slices/usersApiSlice.js";

import { toast } from "react-toastify";

const ChangePasswordScreen = () => {
  const navigate = useNavigate();
  const { id: userId } = useParams();

  const { data: user } = useGetUserByIdQuery(userId);

  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // Send both old and new passwords to the API
      const response = await changePassword({
        userId,
        oldPassword,
        newPassword: password,
      }).unwrap();
      toast.success("Password changed successfully");

      navigate("/"); // Redirect user to home page or any other appropriate page
    } catch (error) {
      toast.error("Failed to change password. Please try again.");
    }
  };
  return (
    <FormContainer>
      <Form onSubmit={submitHandler} className="col-8 mx-auto">
        <h3>Change Password</h3>

        {/* Old Password */}
        <Form.Group controlId="oldPassword" className="my-3">
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Current password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* New Password */}
        <Form.Group controlId="password" className="my-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            {isLoading ? "Changing Password..." : "Change Password"}
          </Button>
        </div>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default ChangePasswordScreen;
