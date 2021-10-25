import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function UserInfo(props) {
	const { user } = props;

	return (
		<View style={styles.constainer}>
			<Text style={styles.title}>Bem-vindo</Text>
			<Text style={styles.titleName}>
				{user.name && user.lastname
					? `${user.name} ${user.lastname}`
					: user.email}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	constainer: {
		height: 100,
		justifyContent: "center",
		padding: 20,
	},
	title: {
		fontSize: 20,
	},
	titleName: {
		fontSize: 20,
		fontWeight: "bold",
	},
});
