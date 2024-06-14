import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.config";
import Loading from "../../components/shared/Loading";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../feature/userApi";
import { useDispatch } from "react-redux";
import { setToken } from "../../feature/rootSlice";

function Login() {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  let from = location.state?.from?.pathname || "/";
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [
    userLogin,
    { isLoading, isSuccess, isError, data, error: loginError },
  ] = useLoginMutation();  
  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    signInWithEmailAndPassword(email, password);
  };
  useEffect(() => {
    if (user) {
      userLogin({ email: user?.user?.email });
    }
    if (error) {
      toast.error(error?.message);
    }
  }, [error, user, token, navigate, from, userLogin]);
  useEffect(() => {
    if (isSuccess) {
      console.log(data?.message)
      toast.success(data?.message);
      if (!token) {
        localStorage.setItem("authToken", data?.authToken);
        dispatch(setToken(data?.authToken));
      }
      navigate(from, { replace: true });
    }
    if (isError) {
      console.log(loginError);
      toast.error(loginError?.message)
    }
  }, [isSuccess, isError, data, loginError, from, navigate, dispatch, token]);
  if (loading || isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
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
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Not Have Any Account? <Link to="/register">Register Here</Link>
      </p>
    </div>
  );
}

export default Login;
