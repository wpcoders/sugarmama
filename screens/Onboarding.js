import React from "react";
import {
	StyleSheet,
	View,
	Image,
	ImageBackground,
	ScrollView,
} from "react-native";
import { Text, Button } from "react-native-paper";
import {
	heightPercentageToDP,
	widthPercentageToDP,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { Logo, WelcomeBackground } from "../assets";

export default function Onboarding({ navigation }) {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.content}>
				<Image source={Logo} style={styles.img}></Image>
				<Text
					style={[
						styles.header,
						styles.primary,
						styles.uppercase,
						styles.bold,
						styles.white,
					]}
				>
					Welcome
				</Text>
				<Text style={[styles.primary, styles.text, styles.white]}>
					Congrats! You're on your way to taking control of your gestational
					diabetes!
				</Text>
			</View>
			<Button
				style={[styles.btn]}
				onPress={() => {
					navigation.navigate("SignUp");
				}}
			>
				<Text
					style={[styles.btnText, styles.yellow, styles.uppercase, styles.bold]}
				>
					SignUp
				</Text>
			</Button>
			<Button
				style={styles.secondaryBtn}
				onPress={() => {
					navigation.navigate("Login");
				}}
			>
				<Text
					style={[
						styles.btnText,
						styles.uppercase,
						styles.bold,
						styles.white,
						styles.secondaryBtn,
					]}
				>
					Already have an account?
				</Text>
			</Button>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#a5d6cb",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 40,
		// padding: 100,
	},
	content: {
		width: widthPercentageToDP("90%"),
		paddingHorizontal: 40,
		// alignItems: "center",
	},
	header: {
		fontSize: widthPercentageToDP(13),
		marginTop: 24,
	},
	btn: {
		width: widthPercentageToDP("90%"),
		paddingVertical: 8,
		marginTop: 40,
		backgroundColor: "white",
	},
	secondaryBtn: {
		width: widthPercentageToDP("90%"),
		paddingVertical: 8,
		marginTop: 40,
		backgroundColor: "#fbcd31",
	},
	btnText: {
		fontSize: widthPercentageToDP(4),
	},
	text: {
		fontSize: widthPercentageToDP(5),
		marginTop: 20,
	},
	img: {
		height: heightPercentageToDP(30),
		resizeMode: "contain",
		position: "relative",
		// left: -75,
	},
	white: {
		color: "white",
	},
	yellow: {
		color: "#fbcd31",
	},
	primary: {
		color: "#a5d6cb",
	},
	primaryBackground: {
		backgroundColor: "#a5d6cb",
	},
	uppercase: {
		textTransform: "uppercase",
	},
	bold: {
		fontWeight: "500",
	},
});
