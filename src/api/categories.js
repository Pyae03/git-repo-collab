import useFetch from "../hooks/useFetch";
import axiosInstance from "./base-axios";

export async function getAllCategories() {
	const { data } = await axiosInstance.get("/categories");

	return data;
}

export function deleteCategory(id) {
	const category = axiosInstance.delete(`/categories/${id}`);
	if (category) return true;
}

// array
export async function deleteMultipleCategories(categoryIds) {
	const categories = await axiosInstance.post(
		`/categories/delete-multiple`,
		categoryIds
	);
	if (categories) return true;
}
