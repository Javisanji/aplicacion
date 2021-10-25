import React from "react";
import { Alert } from "react-native";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";

export default function Menu() {
	const navigation = useNavigation();
	const { logout } = useAuth();

	const logoutAccount = () => {
		Alert.alert(
			"Fechar Sessão",
			"Tem certeza que deseja sair?",
			[
				{
					text: "NÃO",
				},
				{
					text: "SIM",
					onPress: logout,
				},
			],
			{ cancelable: false }
		);
	};
	return (
		<>
			<List.Section>
				<List.Subheader>Minha conta</List.Subheader>
				<List.Item
					title="Mudar de nome"
					description="Altere o nome da sua conta"
					left={(props) => <List.Icon {...props} icon="face" />}
					onPress={() => navigation.navigate("change-name")}
				/>
				<List.Item
					title="Mude o e-mail"
					description="Altere o e-mail da sua conta"
					left={(props) => <List.Icon {...props} icon="at" />}
					onPress={() => navigation.navigate("change-email")}
				/>
				<List.Item
					title="Mudar nome de usuário"
					description="Altere o nome de usuário da sua conta"
					left={(props) => <List.Icon {...props} icon="sim" />}
					onPress={() => navigation.navigate("change-username")}
				/>
				<List.Item
					title="Mudar senha"
					description="Altere a senha da sua conta"
					left={(props) => <List.Icon {...props} icon="key" />}
					onPress={() => navigation.navigate("change-password")}
				/>
				<List.Item
					title="Meus endereços"
					description="Gerenciar seus endereços de entrega"
					left={(props) => <List.Icon {...props} icon="map" />}
					onPress={() => navigation.navigate("addresses")}
				/>
			</List.Section>
			<List.Section>
				<List.Subheader>App</List.Subheader>
				<List.Item
					title="Minhas ordens de compra ou meus pedidos"
					description="Lista de todos os pedidos"
					left={(props) => <List.Icon {...props} icon="clipboard-list" />}
					onPress={() => navigation.navigate("orders")}
				/>
				<List.Item
					title="Lista de desejos"
					description="Lista de todos os produtos que deseja comprar"
					left={(props) => <List.Icon {...props} icon="heart" />}
					onPress={() => navigation.navigate("favorites")}
				/>
				<List.Item
					title="Fechar Sessão"
					description="Fechar esta sessão"
					left={(props) => <List.Icon {...props} icon="logout" />}
					onPress={logoutAccount}
				/>
			</List.Section>
		</>
	);
}
