/* eslint-disable no-unsafe-optional-chaining */
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.config";
import Loading from "../../components/shared/Loading";
import { toast } from "react-toastify";
import { useRegUserDataMutation } from "../../feature/userApi";
import { useDispatch } from "react-redux";
import { setToken } from "../../feature/rootSlice";

function Register() {
  const [displayName, setDisplayName] = useState(null);
  const [
    userDataRegister,
    { isLoading, isSuccess, data, error: updateError, isError },
  ] = useRegUserDataMutation();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passError, setPassError] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    if (password !== confirmPassword) {
      setPassError(true);
    } else {
      setPassError(false);
      createUserWithEmailAndPassword(email, password);
    }
  };
  useEffect(() => {
    if (user) {
      console.log(user);
      const { email } = user?.user;
      userDataRegister({ name: displayName, email });
    }
    if (error) {
      toast.error(error?.message);
      console.log(error);
    }
  }, [user, error, displayName, navigate, userDataRegister]);
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      localStorage.setItem("authToken", data?.authToken);
      dispatch(setToken(data?.authToken));
      navigate("/dashboard", { replace: true });
    }
    if (isError) {
      console.log(updateError);
    }
  }, [isSuccess, data, isError, updateError, dispatch, navigate]);
  if (loading || isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Name"
            name="name"
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            name="email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          {passError && (
            <p className="text-danger">
              Password and Confirm Password Not Matched!
            </p>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password Again"
            name="confirmPassword"
            required
          />
          {passError && (
            <p className="text-danger">
              Password and Confirm Password Not Matched!
            </p>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <p>
        Already Have Account? <Link to="/login">Login Here</Link>
      </p>
    </div>
  );
}

export default Register;
