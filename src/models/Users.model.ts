interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface PagesResponse {
  data: User[];
  total: number;
  total_pages: number;
  page: number;
  per_page: number;
}

interface UserData {
  name: string;
  job: string;
}

interface UserResponse extends UserData {
  id: number;
  createdAt: string;
}

interface UpdateUser extends UserData {
  updatedAt: string;
}

interface TableUsersRef {
  reloadAddNew: () => void;
  reloadEditUser: () => void;
}

export type { User, PagesResponse, UserResponse, UserData, TableUsersRef, UpdateUser };