import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { map } from "lodash";
import useAuth from "../../hooks/useAuth";
import { deleteAddressApi } from "../../api/address";
import colors from "../../styles/colors";

export default function AddressList(props) {
	const { addresses, setReloadAddress } = props;
	const navigation = useNavigation();
	const { auth } = useAuth();

	//funcion para ir al formulario de direcciones
	const goToUpdateAddress = (idAddress) => {
		navigation.navigate("add-address", { idAddress });
	};

	const deleteAddressAlert = (address) => {
		Alert.alert(
			"Apagar endereço",
			`Tem certeza de que deseja excluir o endereço ${address.title}?`,
			[
				{
					text: "NÃO",
				},
				{ text: "SIM", onPress: () => deleteAddress(address._id) },
			],
			{ cancelable: false }
		);
	};

	const deleteAddress = async (idAddress) => {
		try {
			await deleteAddressApi(auth, idAddress);
			setReloadAddress(true);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.container}>
			{map(addresses, (address) => (
				<View key={address._id} style={styles.address}>
					<Text style={styles.title}>{address.title}</Text>
					<Text>{address.name_lastname}</Text>
					<Text>{address.address}</Text>
					<View style={styles.blockLine}>
						<Text>{address.state}, </Text>
						<Text>{address.city}, </Text>
						<Text>{address.postal_code}</Text>
					</View>
					<Text>{address.country}</Text>
					<Text>Número de telefone: {address.phone}</Text>
					<View style={styles.actions}>
						<Button
							mode="contained"
							color={colors.primary}
							onPress={() => goToUpdateAddress(address._id)}
						>
							Editar
						</Button>
						<Button
							mode="contained"
							color={colors.primary}
							onPress={() => deleteAddressAlert(address)}
						>
							Retirar
						</Button>
					</View>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
	},
	address: {
		borderWidth: 0.9,
		borderRadius: 5,
		borderColor: "#ddd",
		paddingHorizontal: 15,
		paddingVertical: 15,
		marginBottom: 15,
	},
	title: {
		//stilos del titulo en este caso lo pone en letras negras
		fontWeight: "bold",
		paddingBottom: 5,
	},
	blockLine: {
		//lista todo en una sola fila
		flexDirection: "row",
	},
	actions: {
		//posicion de los botones en este caso uno a la izquierda y otro a la derecha
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 30,
	},
});
