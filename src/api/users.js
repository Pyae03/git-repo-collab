import useFetch from "../hooks/useFetch";
import axiosInstance from "./base-axios";

export async function getAllUsers() {
	const { data } = await axiosInstance.get("/users");

	return data;
}

// export async function userLogin(userData) {
// 	const { data } = await axiosInstance.post(`/users/login`, userData);
// 	console.log("user-login: ", data);
// 	return data;
// }

export function deleteUser(id) {
	const user = axiosInstance.delete(`/users/${id}`);
	if (user) return true;
}

// array
export async function deleteMultipleUsers(userIds) {
	const users = await axiosInstance.post(`/users/delete-multiple`, userIds);
	if (users) return true;
}
