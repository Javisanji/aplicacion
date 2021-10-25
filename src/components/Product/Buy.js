import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import Toast from "react-native-root-toast";
import { addProductCartApi, getProductCartApi } from "../../api/cart";
import { RootSiblingParent } from "react-native-root-siblings";

export default function Actions(props) {
	const { product, quantity } = props;

	useEffect(() => {
		(async () => {
			console.log(await getProductCartApi());
		})();
	}, []);

	const addProductCart = async () => {
		const response = await addProductCartApi(product._id, quantity);
		if (response) {
			Toast.show("Produto adicionado ao carrinho", {
				position: Toast.positions.CENTER,
			});
		} else {
			Toast.show("ERRO ao adicionar o produto ao carrinho", {
				position: Toast.positions.CENTER,
			});
		}
	};

	return (
		<View style={{ zIndex: 1 }}>
			<RootSiblingParent>
				<Button
					mode="contained"
					contentStyle={styles.btnBuyContent}
					labelStyle={styles.btnLabel}
					style={styles.btn}
					onPress={addProductCart}
				>
					Adicionar ao carrinho
				</Button>
			</RootSiblingParent>
		</View>
	);
}

const styles = StyleSheet.create({
	btnLabel: {
		fontSize: 18,
	},
	btn: {
		marginTop: 20,
		// width: 230,
		// left: 110,
	},
	btnBuyContent: {
		backgroundColor: "#008fe9",
		paddingVertical: 5,
	},
});
