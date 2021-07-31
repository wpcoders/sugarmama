import React, { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { AuthContext } from "../providers/AuthProvider";

export default function ForgotPassword({ navigation }) {
	const [email, setEmail] = useState("");

	return (
		<AuthContext.Consumer>
			{({ resetPassword, isLoading }) => (
				<KeyboardAvoidingView behavior="padding" style={styles.container}>
					<Text style={styles.header}>Reset Password</Text>
					<TextInput
						onChangeText={(value) => {
							setEmail(value);
						}}
						style={styles.input}
						label="Email"
						autoCapitalize="none"
						autoCompleteType="email"
					></TextInput>

					{!isLoading ? (
						<Button
							style={[styles.btn, { marginBottom: 20 }]}
							onPress={() => {
								if (email) resetPassword(email);
							}}
						>
							<Text style={styles.btnText}>Send Link</Text>
						</Button>
					) : (
						<View style={{ ...styles.btn, paddingVertical: 15 }}>
							<ActivityIndicator></ActivityIndicator>
						</View>
					)}

					<Button
						style={styles.signUp}
						onPress={() => {
							navigation.navigate("Login");
						}}
					>
						<Text style={styles.btnText}>Login</Text>
					</Button>
				</KeyboardAvoidingView>
			)}
		</AuthContext.Consumer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#a5d6cb",
		alignItems: "center",
		justifyContent: "center",
	},
	header: {
		color: "white",
		fontSize: 32,
		fontWeight: "bold",
		marginBottom: 32,
	},
	input: {
		width: widthPercentageToDP("90%"),
		marginBottom: 28,
		backgroundColor: "white",
	},
	btn: {
		width: widthPercentageToDP("90%"),
		paddingVertical: 8,
		backgroundColor: "#fbcd31",
	},
	btnText: {
		color: "white",
		textTransform: "uppercase",
		fontSize: 16,
		fontWeight: "bold",
	},
	signUp: {
		position: "absolute",
		bottom: 60,
	},
});
