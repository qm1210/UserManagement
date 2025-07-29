import { Button, Container } from "react-bootstrap";
import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import ModalAddNew from "./components/ModalAddNew";
import { useRef, useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import type { TableUsersRef } from "./models/Users.model";

function App() {
  const [isShowModal, setShowModal] = useState(false);
  const tableRef = useRef<TableUsersRef>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!(localStorage.getItem("token") || sessionStorage.getItem("token"));
  });

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddNew = () => {
    if (tableRef.current) {
      tableRef.current.reloadAddNew();
    }
  };

  const handleUpdate = () => {
    if (tableRef.current) {
      tableRef.current.reloadEditUser();
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="app-container">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        {isLoggedIn ? (
          <>
            <Container>
              <div className="my-3 d-flex justify-content-between">
                <h4>Users List</h4>
                <Button variant="success" onClick={() => setShowModal(true)}>
                  Add new user
                </Button>
              </div>
              <TableUsers ref={tableRef} onUserUpdate={handleUpdate} />
            </Container>
            <ModalAddNew
              show={isShowModal}
              onHide={handleCloseModal}
              onUserAdded={handleAddNew}
            />
          </>
        ) : (
          <div className="text-center mt-5">
            <h5>Please log in to access the user list.</h5>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
