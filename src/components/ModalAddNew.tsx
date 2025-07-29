import { useState, useEffect, use } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { postNewUser } from "../services/UserService";
import { toast } from "react-toastify";

interface ModalAddNewProps {
  show: boolean;
  onHide: () => void;
  onUserAdded: () => void;
}

const ModalAddNew = (props: ModalAddNewProps) => {
  const { show, onHide, onUserAdded } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  useEffect(() => {
    if (!show) {
      // Reset form when modal is closed
      setName("");
      setJob("");
    }
  }, [show]);

  const handleSaveUser = async () => {
    let res = await postNewUser({ name, job });
    if (res && res.id) {
      setName("");
      setJob("");
      onHide();
      toast.success("User added successfully!");
      onUserAdded();
    } else {
      toast.error("Failed to add user.");
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Job</Form.Label>
                <Form.Control
                  type="text"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                />
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUser}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNew;
