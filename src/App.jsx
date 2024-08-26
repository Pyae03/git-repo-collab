import { useCallback, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDebouncedCallback } from "use-debounce";
import Spreadsheet from "react-spreadsheet";
import { getProductByBarCode } from "./api/products";
import {
	HotkeysProvider,
	useHotkeys,
	useHotkeysContext,
} from "react-hotkeys-hook";
import FocusTrap from "focus-trap-react";

const columnLabels = [
	"Barcode",
	"Column 1",
	"Column 2",
	"Column 3",
	"Column 4",
];
const rowLabels = ["Row 1", "Row 2"]; // Adjust according to your data

const App = () => {
	const [data, setData] = useState([]);

	const myInputRef = useRef(null);

	// Define the hotkey handler
	const handleMyHotkey = () => {
		if (myInputRef.current) {
			myInputRef.current.focus();
		}
	};

	const handleEnter = () => {
		console.log("enter");
	};
	useHotkeys("alt + n", handleMyHotkey);
	useHotkeys("enter", handleEnter);

	const debounce = useDebouncedCallback(async (value) => {
		async function getProduct() {
			const fetchedProduct = await getProductByBarCode(value);
			console.log({ fetchedProduct });
			return fetchedProduct;
		}
		const product = await getProduct(value);
		console.log({ product });
		if (product) {
			const isExist = data.find((p) => product.productId == p.productId);
			console.log({ isExist });
			if (!isExist) setData((prev) => [...prev, product]);
			myInputRef.current.value = "";
		}
		console.log("debounced", value);
	}, 1000);

	// useEffect(() => {
	// 	console.log(data);
	// }, [data]);
	console.log({ data });
	return (
		<FocusTrap>
			<div>
				<input
					ref={myInputRef}
					type="text"
					onChange={(event) => {
						event.preventDefault();
						debounce(event.target.value);
					}}
					// onFocus={() =>
					// 	setTimeout(() => {
					// 		myInputRef.current.blur();
					// 	}, 1000)
					// }
				/>
				<button>X</button>

				{data?.map((product) => (
					<Product
						key={product.productId}
						product={product}
					/>
				))}
			</div>
		</FocusTrap>
	);
};

function Product({ product }) {
	const btnRef = useRef(null);
	const inputNumberRef = useRef(null);
	//const { toggleScope } = useHotkeysContext();

	const handleHotkey = () => {
		if (btnRef.current) {
			btnRef.current.focus();
			console.log(btnRef.current);
		}
	};
	const checkFocus = (ref) => {
		if (ref.current === document.activeElement) {
			return true;
			console.log("Element is currently focused");
		} else {
			return false;
			console.log("Element is not focused");
		}
	};
	const handleInputNumberHotKey = () => {
		if (inputNumberRef.current) {
			if (checkFocus) inputNumberRef.current.blur();
			inputNumberRef.current.focus();

			console.log(inputNumberRef.current);
		}
	};
	useHotkeys("alt + z", handleHotkey);
	useHotkeys("alt + x", handleInputNumberHotKey);

	return (
		<div style={{ display: "flex" }}>
			<h4>{product.productName}</h4>
			<h4>{product.price}</h4>

			{/* <h4>{product.productName}</h4> */}
			<input
				type="number"
				ref={inputNumberRef}
			/>
			<button ref={btnRef}>X</button>
		</div>
	);
}
export default App;
