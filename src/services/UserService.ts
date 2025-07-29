import axios from "./axios";
import type { PagesResponse, UserData, UserResponse, UpdateUser } from "../models/Users.model";

const fetchAllUsers = (page: number): Promise<PagesResponse> => {
    return axios.get(`/api/users?page=${page}`);
}

const postNewUser = (userData: UserData): Promise<UserResponse> => {
    return axios.post('/api/users', userData);
}

const putUpdateUser = (id: number, userData: UserData): Promise<UpdateUser> => {
    return axios.put(`/api/users/${id}`, userData);
}

const deleteUser = (id: number): Promise<void> => {
    return axios.delete(`/api/users/${id}`);
}

const registerUser = (userData: { email: string; password: string }): Promise<{ id: number; token: string }> => {
    return axios.post('/api/register', userData);
}

const loginUser = (userData: { email: string; password: string }): Promise<{ token: string }> => {
    return axios.post('/api/login', userData);
}

export { fetchAllUsers, postNewUser, putUpdateUser, deleteUser, registerUser, loginUser };