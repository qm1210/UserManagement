import { Modal, Button, Form } from "react-bootstrap";
import type { User } from "../models/Users.model";
import { putUpdateUser } from "../services/UserService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ModalEditUserProps {
  show: boolean;
  onHide: () => void;
  selectedUser: User | null;
  onUserUpdate: () => void;
}

const ModalEditUser = (props: ModalEditUserProps) => {
  const { show, onHide, selectedUser, onUserUpdate } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  useEffect(() => {
    if (show && selectedUser) {
      setName(selectedUser.first_name);
      setJob(selectedUser.last_name);
    }
    if (!show) {
      setName("");
      setJob("");
    }
  }, [show, selectedUser]);

  const handleConfirm = async () => {
    let res = await putUpdateUser(selectedUser?.id || 0, {
      name,
      job,
    });
    if (res && res.updatedAt) {
      setName("");
      setJob("");
      onHide();
      toast.success("User updated successfully!");
      onUserUpdate();
    } else {
      toast.error("Failed to update user.");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicJob">
            <Form.Label>Job</Form.Label>
            <Form.Control
              type="text"
              value={job}
              onChange={(e) => setJob(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditUser;
