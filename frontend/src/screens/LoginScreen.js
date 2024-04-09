import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import FormContainer from "../components/FormContainer.js";
import Loader from "../components/Loader.js";
import { useLoginMutation } from "../slices/usersApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  //const { userInfo } = useSelector((state) => state.auth);

  //const { search } = useLocation();
  //const searchParams = new URLSearchParams(search);
  //const redirect = searchParams.get("redirect") || "/";

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate(redirect);
  //   }
  // }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...response }));
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <FormContainer>
        <Form onSubmit={submitHandler} className="col-8 mx-auto">
          <h1>Sign In</h1>
          {/* Email */}
          <Form.Group controlId="email" className="my-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* Password */}
          <Form.Group controlId="password" className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
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
              Sign In
            </Button>
          </div>

          {isLoading && <Loader />}
        </Form>
        <div className="text-center mt-4">
          <p>
            Forgot password? <Link to={`/resetPassword`}>click here</Link>
          </p>
        </div>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
