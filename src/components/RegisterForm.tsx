import { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { registerUser } from "../services/UserService";
import { toast } from "react-toastify";
import validator from "validator";

interface RegisterFormProps {
  show: boolean;
  onClose: () => void;
}

const RegisterForm = ({ show, onClose }: RegisterFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    if (!show) {
      setEmail("");
      setPassword("");
      setTermsAccepted(false);
    }
  }, [show]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }
    if (!termsAccepted) {
      setWarning(true);
      return;
    }
    if (!validator.isEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!validator.isEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      const res = await registerUser({ email, password });
      if (res && res.token) {
        setEmail("");
        setPassword("");
        setTermsAccepted(false);
        toast.success("Registration successful!");
      } else {
        toast.error("Registration failed.");
      }
    } catch (err) {
      toast.error("Something went wrong during registration.");
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Register Form</Modal.Title>
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
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
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
              label="I agree to the terms and conditions"
              onChange={(e) => {
                setTermsAccepted(e.target.checked);
                if (e.target.checked) {
                  setWarning(false);
                }
              }}
            />
          </Form.Group>
          {warning && (
            <Alert variant="warning">
              You must accept the terms and conditions to register.
            </Alert>
          )}
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Register
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default RegisterForm;
