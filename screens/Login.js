import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import {
	heightPercentageToDP,
	widthPercentageToDP,
} from "react-native-responsive-screen";
import { AuthContext } from "../providers/AuthProvider";
import analytics from "@react-native-firebase/analytics";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

export default function Login({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<AuthContext.Consumer>
			{({ signIn, isLoading }) => (
				<KeyboardAwareScrollView
					enableOnAndroid
					onKeyboardWillHide={() => {}}
					contentContainerStyle={styles.container}
				>
					<Text style={styles.header}>Login</Text>
					<View>
						<TextInput
							onChangeText={(value) => {
								setEmail(value);
							}}
							style={styles.input}
							label="Email"
							autoCapitalize="none"
							autoCompleteType="email"
						></TextInput>
					</View>
					<View>
						<TextInput
							onChangeText={(value) => {
								setPassword(value);
							}}
							style={styles.input}
							label="Password"
							autoCapitalize="none"
							autoCompleteType="password"
							secureTextEntry
						></TextInput>
					</View>
					<Button
						style={[styles.btn, { marginBottom: 20 }]}
						onPress={async () => {
							await analytics().logSignUp({ method: "email" });
							if (email && password) signIn(email.trim(), password.trim());
						}}
						loading={isLoading}
					>
						{!isLoading && <Text style={styles.btnText}>Login</Text>}
					</Button>
					<Button
						onPress={() => {
							navigation.push("Forgot");
						}}
					>
						<Text style={styles.btnText}>Forgot Password ?</Text>
					</Button>
					<Button
						style={styles.signUp}
						onPress={() => {
							navigation.push("SignUp");
						}}
					>
						<Text style={styles.btnText}>SignUp</Text>
					</Button>
				</KeyboardAwareScrollView>
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
		minHeight: heightPercentageToDP("70%"),
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
		marginTop: 40,
	},
});
