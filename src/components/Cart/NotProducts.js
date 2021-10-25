import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function NotProducts() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				Você não tem itens no seu carrinho de compras
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	text: {
		fontSize: 16,
	},
});
