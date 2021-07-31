import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, Button } from "react-native-paper";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { Welcome as WelcomeImage } from "../assets";
import { yellow, primary } from "../constants/Colors";

export default function Diary({ navigation }) {
	return (
		<View style={styles.container}>
			<Button
				style={styles.mb20}
				contentStyle={styles.btn}
				onPress={() => {
					navigation.push("Goals");
				}}
			>
				<Text style={styles.btnText}>Goals</Text>
			</Button>
			<Button
				style={styles.mb20}
				contentStyle={styles.btn}
				onPress={() => {
					navigation.push("Notes");
				}}
			>
				<Text style={styles.btnText}>Notes</Text>
			</Button>
			<Button
				style={styles.mb20}
				contentStyle={styles.btn}
				onPress={() => {
					navigation.push("Appointments");
				}}
			>
				<Text style={styles.btnText}>Appointments</Text>
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: primary,
		alignItems: "center",
		justifyContent: "center",
	},
	btn: {
		width: widthPercentageToDP("90%"),
		height: 100,
		backgroundColor: yellow,
	},
	btnText: {
		color: "white",
		textTransform: "uppercase",
		fontSize: 16,
		fontWeight: "bold",
	},
	mb20: {
		marginBottom: 20,
	},
});
