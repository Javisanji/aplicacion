import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { map } from "lodash";
import ScreenLoading from "../ScreenLoading";
import Product from "./Product";
import { getProductApi } from "../../api/product";

export default function ProductList(props) {
	const { cart, products, setProducts, setReloadCart, setTotalPayment } = props;

	useEffect(() => {
		setProducts(null);
		(async () => {
			const productTemp = [];
			let totalPaymentTemp = 0;
			for await (const product of cart) {
				const response = await getProductApi(product.idProduct);
				response.quantity = product.quantity;
				productTemp.push(response);
				const price = calcPrice(response.price, response.discount);

				totalPaymentTemp += price * response.quantity;
				// (response.price - response.price * (response.discount / 100)) *
				// response.quantity;
			}
			setProducts(productTemp);
			setTotalPayment(totalPaymentTemp.toFixed(2));
			setReloadCart(false);
		})();
	}, [cart]);

	return (
		<View>
			<Text style={styles.title}>Produtos:</Text>
			{!products ? (
				<ScreenLoading text="Carregando o carrinho" />
			) : (
				map(products, (product) => (
					<Product
						key={product._id}
						product={product}
						setReloadCart={setReloadCart}
					/>
				))
			)}
		</View>
	);
}
function calcPrice(price, discount) {
	if (!discount) return price; //si discount es null retorna el precio normal
	//funcion para caulacular el descuento
	const discountAmount = (price * discount) / 100;
	//retorna el precio original menos el descuento con 2 decimales
	return (price - discountAmount).toFixed(2);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 18,
		fontWeight: "bold",
	},
});
