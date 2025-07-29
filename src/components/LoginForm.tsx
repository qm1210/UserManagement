import { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import { loginUser } from "../services/UserService";

interface LoginFormProps {
  show: boolean;
  onClose: () => void;
  onLoginSuccess: () => void; // Callback khi đăng nhập thành công
}

const LoginForm = ({ show, onClose, onLoginSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberChecked, setRememberChecked] = useState(false);

  useEffect(() => {
    if (!show) {
      // Khi modal đóng, reset form
      setEmail("");
      setPassword("");
      setRememberChecked(false);
    }
  }, [show]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }
    try {
      const res = await loginUser({ email, password }); // ✅ FIXED
      if (res && res.token) {
        if (rememberChecked) {
          localStorage.setItem("token", res.token);
        } else {
          sessionStorage.setItem("token", res.token);
        }
        setEmail("");
        setPassword("");
        setRememberChecked(false);
        toast.success("Login successful!");
        onClose();
        onLoginSuccess(); // Gọi callback nếu có
      }
    } catch (error: any) {
      if (error.response?.data?.error) {
        toast.error(error.response.data.error); // ví dụ: "user not found"
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Remember me"
              checked={rememberChecked}
              onChange={(e) => setRememberChecked(e.target.checked)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleLogin}>
            Login
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default LoginForm;
