import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import useAuth from "../../hooks/useAuth";
import { updateUserApi } from "../../api/user";
import { formStyle } from "../../styles";
import { RootSiblingParent } from "react-native-root-siblings";

export default function ChangePassword() {
	const [loading, setLoading] = useState(false);
	const { auth } = useAuth();
	const navigation = useNavigation();

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object(validationSchema()),
		onSubmit: async (formData) => {
			setLoading(true);

			try {
				const response = await updateUserApi(auth, formData);
				if (response.statusCode) throw "Falha ao alterar a senha";
				navigation.goBack();
			} catch (error) {
				Toast.show(error, {
					position: Toast.positions.CENTER,
				});
				setLoading(false);
			}
		},
	});

	return (
		<View style={styles.container}>
			<RootSiblingParent>
				<TextInput
					label="Nova senha"
					style={formStyle.input}
					onChangeText={(text) => formik.setFieldValue("password", text)}
					values={formik.values.password}
					error={formik.errors.password}
					secureTextEntry
				/>
				<TextInput
					label="Repita a nova senha"
					style={formStyle.input}
					onChangeText={(text) => formik.setFieldValue("repeatpassword", text)}
					values={formik.values.repeatpassword}
					error={formik.errors.repeatpassword}
					secureTextEntry
				/>
				<Button
					mode="contained"
					style={formStyle.btnSucces}
					onPress={formik.handleSubmit}
					loading={loading}
				>
					Mudar senha
				</Button>
			</RootSiblingParent>
		</View>
	);
}

function initialValues() {
	return {
		password: "",
		repeatpassword: "",
	};
}

function validationSchema() {
	return {
		password: Yup.string().min(4, true).required(true),
		repeatpassword: Yup.string()
			.min(4, true)
			.oneOf([Yup.ref("password")], true)
			.required(true),
	};
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
});
