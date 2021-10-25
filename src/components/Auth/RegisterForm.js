import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import { registerApi } from "../../api/user";
import { formStyle } from "../../styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function RegisterForm(props) {
	const { changeForm } = props;
	const [loading, setLoading] = useState(false);

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object(validationSchema()),
		onSubmit: async (formData) => {
			setLoading(true);
			try {
				await registerApi(formData);
				changeForm();
			} catch (error) {
				setLoading(false);
				Toast.show("Falha ao registrar o usuário", {
					position: Toast.positions.CENTER,
				});
			}
		},
	});

	return (
		<KeyboardAwareScrollView extraScrollHeight={25}>
			<View>
				<TextInput
					label="Email"
					style={formStyle.input}
					onChangeText={(text) => formik.setFieldValue("email", text)}
					value={formik.values.email}
					error={formik.errors.email}
				/>
				<TextInput
					label="Nome de usuário"
					style={formStyle.input}
					onChangeText={(text) => formik.setFieldValue("username", text)}
					value={formik.values.username}
					error={formik.errors.username}
				/>
				<TextInput
					label="Senha"
					style={formStyle.input}
					secureTextEntry
					onChangeText={(text) => formik.setFieldValue("password", text)}
					value={formik.values.password}
					error={formik.errors.password}
				/>
				<TextInput
					label="Repetir a senha"
					style={formStyle.input}
					secureTextEntry
					onChangeText={(text) => formik.setFieldValue("repeatpassword", text)}
					value={formik.values.repeatpassword}
					error={formik.errors.repeatpassword}
				/>
				<Button
					mode="contained"
					style={formStyle.btnSucces}
					onPress={formik.handleSubmit}
					loading={loading}
				>
					Check-in/Login
				</Button>
				<Button
					mode="text"
					style={formStyle.btnText}
					labelStyle={formStyle.btnTextLabel}
					onPress={changeForm}
				>
					Iniciar sessão
				</Button>
			</View>
		</KeyboardAwareScrollView>
	);
}

function initialValues() {
	return {
		email: "",
		username: "",
		password: "",
		repeatpassword: "",
	};
}

function validationSchema() {
	return {
		email: Yup.string().email(true).required(true),
		username: Yup.string().required(true),
		password: Yup.string().required(true),
		repeatpassword: Yup.string()
			.required(true)
			.oneOf([Yup.ref("password")], true),
	};
}
