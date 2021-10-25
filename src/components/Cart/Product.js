import React from "react";
import { StyleSheet, View, Text, Image, TextInput } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { API_URL } from "../../utils/constants";
import {
	deleteProductCartApi,
	decreaseProductCartApi,
	increaseProductCartApi,
} from "../../api/cart";
import colors from "../../styles/colors";

export default function Product(props) {
	const { product, setReloadCart } = props;
	//funcion para cualcular el precio
	const calcPrice = (price, discount) => {
		if (!discount) return price; //si discount es null retorna el precio normal
		//funcion para caulacular el descuento
		const discountAmount = (price * discount) / 100;
		//retorna el precio original menos el descuento con 2 decimales
		return (price - discountAmount).toFixed(2);
	};

	const deleteProductCart = async () => {
		const response = await deleteProductCartApi(product._id);
		if (response) setReloadCart(true);
	};
	//funcion para decrementar el numero de productos
	const decreaseProductCart = async () => {
		const response = await decreaseProductCartApi(product._id);
		if (response) setReloadCart(true);
	};
	//funcion para incrementar el numero de productos
	const increaseProductCart = async () => {
		const response = await increaseProductCartApi(product._id);
		if (response) setReloadCart(true);
	};

	return (
		<View key={product._id} style={styles.product}>
			<View style={styles.containerImage}>
				<Image
					style={styles.image}
					source={{
						uri: `${API_URL}${product.main_image.url}`,
					}}
				/>
			</View>
			<View style={styles.info}>
				<View>
					<Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">
						{product.title}
					</Text>
					<View style={styles.prices}>
						<Text style={styles.currentPrice}>
							R${calcPrice(product.price, product.discount)}
						</Text>
					</View>
					{product.discount && (
						<View style={styles.containerDiscount}>
							<Text style={styles.discountText}>Salvar:</Text>
							<Text style={styles.discountValue}>
								R${((product.price * product.discount) / 100).toFixed(2)} (
								{product.discount}%)
							</Text>
						</View>
					)}
				</View>
				<View style={styles.btnsContainer}>
					<View style={styles.selectQuantity}>
						<IconButton
							icon="plus"
							color="#fff"
							size={19}
							style={styles.btnQuantity}
							onPress={increaseProductCart}
						/>
						<TextInput
							value={product.quantity.toString()}
							style={styles.inputQuantity}
						/>
						<IconButton
							icon="minus"
							color="#fff"
							size={19}
							style={styles.btnQuantity}
							onPress={decreaseProductCart}
						/>
					</View>
					<Button color="#b12704" mode="contained" onPress={deleteProductCart}>
						Retirar
					</Button>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	product: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 15,
		borderRadius: 5,
		borderWidth: 0.5,
		borderColor: "#dadde1",
	},
	containerImage: {
		width: "40%",
		height: 170,
		backgroundColor: "#ebebeb",
		padding: 5,
	},
	image: {
		height: "100%",
		resizeMode: "contain",
	},
	info: {
		padding: 10,
		width: "60%",
		justifyContent: "space-between",
	},
	name: {
		fontSize: 16,
	},
	prices: {
		flexDirection: "row",
		marginTop: 5,
		alignItems: "flex-end",
	},
	currentPrice: {
		fontSize: 18,
		color: "#b12704",
	},
	btnsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		position: "relative",
		width: "100%",
	},
	selectQuantity: {
		flexDirection: "row",
		alignItems: "center",
	},
	btnQuantity: {
		backgroundColor: colors.primary,
		borderRadius: 5,
		margin: 0,
	},
	inputQuantity: {
		paddingHorizontal: 10,
		fontSize: 16,
	},
	containerDiscount: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 5,
	},
	discountText: {
		fontSize: 14,
		color: "#747474",
	},
	discountValue: {
		fontSize: 14,
		color: "#747474",
		paddingLeft: 5,
	},
});
