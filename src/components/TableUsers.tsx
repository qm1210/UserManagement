import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import Table from "react-bootstrap/Table";
import { deleteUser, fetchAllUsers } from "../services/UserService";
import type { User } from "../models/Users.model";
import ReactPaginate from "react-paginate";
import { Button } from "react-bootstrap";
import ModalEditUser from "./ModalEditUser";
import { toast } from "react-toastify";

interface TableUsersProps {
  onUserUpdate: () => void;
}

interface TableUsersRef {
  reloadAddNew: () => void;
  reloadEditUser: () => void;
}

const TableUsers = forwardRef<TableUsersRef, TableUsersProps>((props, refs) => {
  const { onUserUpdate } = props;
  const [listUsers, setListUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getUsers(1);
  }, []);

  useImperativeHandle(refs, () => ({
    reloadAddNew: () => getUsers(1),
    reloadEditUser: () => getUsers(currentPage + 1),
  }));

  const getUsers = async (page: number) => {
    let res = await fetchAllUsers(page);
    if (res && res.data) {
      setListUsers(res.data);
      setTotalUsers(res.total);
      setTotalPages(res.total_pages);
      setCurrentPage(page - 1);
    }
  };

  const handlePageClick = (event: { selected: number }) => {
    getUsers(event.selected + 1);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsShowModal(true);
  };

  const handleDeleteUser = async (userId: number) => {
    let confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;
    try {
      await deleteUser(userId);

      // Nếu chỉ còn 1 user và xóa nó, thì giảm page (nếu không phải trang 1)
      if (listUsers.length === 1 && currentPage > 1) {
        getUsers(currentPage);
      } else {
        getUsers(currentPage + 1);
      }
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete user.");
    }
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((user) => (
              <tr key={`user-${user.id}`}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={handleDeleteUser.bind(null, user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={currentPage}
      />
      <ModalEditUser
        show={isShowModal}
        onHide={handleCloseModal}
        selectedUser={selectedUser}
        onUserUpdate={onUserUpdate}
      />
    </div>
  );
});

export default TableUsers;
export type { TableUsersRef };
