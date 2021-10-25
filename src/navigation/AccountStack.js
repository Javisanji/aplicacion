import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screens/Account/Account";
import ChangeName from "../screens/Account/ChangeName";
import ChangeEmail from "../screens/Account/ChangeEmail";
import ChangeUsername from "../screens/Account/ChangeUsername";
import ChangePassword from "../screens/Account/ChangePassword";
import Addresses from "../screens/Account/Addresses";
import AddAddress from "../screens/Account/AddAddress";
import Orders from "../screens/Account/Orders";
import colors from "../styles/colors";

const Stack = createStackNavigator();

export default function AccountStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerTintColor: colors.fontlight,
				headerStyle: { backgroundColor: colors.bgDark },
				cardStyle: {
					backgroundColor: colors.bglight,
				},
			}}
		>
			<Stack.Screen
				name="account"
				component={Account}
				options={{ title: "Conta", headerShown: false }}
			/>
			<Stack.Screen
				name="change-name"
				component={ChangeName}
				options={{
					title: "Alterar nome e sobrenome",
				}}
			/>
			<Stack.Screen
				name="change-email"
				component={ChangeEmail}
				options={{
					title: "Mude o e-mail",
				}}
			/>
			<Stack.Screen
				name="change-username"
				component={ChangeUsername}
				options={{
					title: "Mudar nome de usuário",
				}}
			/>
			<Stack.Screen
				name="change-password"
				component={ChangePassword}
				options={{
					title: "Alterar senhas",
				}}
			/>
			<Stack.Screen
				name="addresses"
				component={Addresses}
				options={{
					title: "Meus endereços",
				}}
			/>
			<Stack.Screen
				name="add-address"
				component={AddAddress}
				options={{
					title: "Nova direção",
				}}
			/>
			<Stack.Screen
				name="orders"
				component={Orders}
				options={{
					title: "Meus pedidos",
				}}
			/>
		</Stack.Navigator>
	);
}
