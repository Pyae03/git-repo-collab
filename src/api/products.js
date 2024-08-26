import axiosInstance from "./base-axios";

export async function getAllProducts() {
	const { data } = await axiosInstance.get("/products");

	return data;
}

export function deleteUser(id) {
	const user = axiosInstance.delete(`/products/${id}`);
	if (user) return true;
}

// array
export async function deleteMultipleProducts(userIds) {
	const products = await axiosInstance.post(
		`/products/delete-multiple`,
		userIds
	);
	if (products) return true;
}

export async function getProductByBarCode(barCode) {
	try {
		console.log({ barCode });
		const response = await axiosInstance.get(`/products/barcode/${barCode}`);
		return response.data; // Assuming response.data contains the product details
	} catch (error) {
		console.error("Error fetching product:", error);
		return null;
	}
}
