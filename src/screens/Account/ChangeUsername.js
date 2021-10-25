import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { formStyle } from "../../styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import useAuth from "../../hooks/useAuth";
import { getMeApi, updateUserApi } from "../../api/user";
import { RootSiblingParent } from "react-native-root-siblings";

export default function ChangeUsername() {
	const { auth } = useAuth();
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();

	useFocusEffect(
		useCallback(() => {
			(async () => {
				const response = await getMeApi(auth.token);
				await formik.setFieldValue("username", response.username);
			})();
		}, [])
	);

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object(validationSchema()),
		onSubmit: async (formData) => {
			setLoading(true);

			try {
				const response = await updateUserApi(auth, formData);
				if (response.statusCode) throw "Nome de usuário já existe";
				navigation.goBack();
			} catch (error) {
				Toast.show(error, {
					position: Toast.positions.CENTER,
				});
				formik.setFieldError("username", true);
				setLoading(false);
			}
		},
	});

	return (
		<View style={styles.content}>
			<RootSiblingParent>
				<TextInput
					label="Nome de usuário"
					style={formStyle.input}
					onChangeText={(text) => formik.setFieldValue("username", text)}
					value={formik.values.username}
					error={formik.errors.username}
				/>
				<Button
					mode="contained"
					style={formStyle.btnSucces}
					onPress={formik.handleSubmit}
					loading={loading}
				>
					Mudar nome de usuário
				</Button>
			</RootSiblingParent>
		</View>
	);
}

function initialValues() {
	return {
		username: "",
	};
}

function validationSchema() {
	return {
		username: Yup.string().min(4, true).required(true),
	};
}

const styles = StyleSheet.create({
	content: {
		padding: 20,
	},
});
