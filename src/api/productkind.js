import useFetch from "../hooks/useFetch";
import axiosInstance from "./base-axios";

export async function getAllProductKinds() {
	const { data } = await axiosInstance.get("/productkinds");

	return data;
}

export function deleteproductKind(id) {
	const productKind = axiosInstance.delete(`/productkinds/${id}`);
	if (productKind) return true;
}

// array
export async function deleteMultipleProductKinds(productKindIds) {
	const productKinds = await axiosInstance.post(
		`/productkinds/delete-multiple`,
		productKindIds
	);
	if (productKinds) return true;
}
