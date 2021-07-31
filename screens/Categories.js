import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, Button } from "react-native-paper";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { Welcome as WelcomeImage } from "../assets";
import { yellow, primary } from "../constants/Colors";
import { ModulesContext } from "../providers/ModulesProvider";
import analytics from "@react-native-firebase/analytics";

export default function Categories({ navigation }) {
	return (
		<ModulesContext.Consumer>
			{({ modules }) => (
				<View style={styles.container}>
					<Button
						style={styles.mb20}
						contentStyle={styles.btn}
						onPress={async () => {
							await analytics().logEvent("modules_self_care");
							navigation.navigate("Modules", { category: "Self-Care" });
						}}
					>
						<Text style={styles.btnText}>Self-Care</Text>
					</Button>
					<Button
						style={styles.mb20}
						contentStyle={styles.btn}
						onPress={async () => {
							await analytics().logEvent("modules_medical");
							navigation.navigate("Modules", { category: "Medical" });
						}}
					>
						<Text style={styles.btnText}>Medical</Text>
					</Button>
					<Button
						style={styles.mb20}
						contentStyle={styles.btn}
						onPress={async () => {
							await analytics().logEvent("modules_stress_and_anxiety");
							navigation.navigate("Modules", {
								category: "Stess & Anxiety",
							});
						}}
					>
						<Text style={styles.btnText}>Stress and Anxiety</Text>
					</Button>
					<Button
						style={styles.mb20}
						contentStyle={styles.btn}
						onPress={async () => {
							await analytics().logEvent("modules_support");
							navigation.navigate("Modules", { category: "Support" });
						}}
					>
						<Text style={styles.btnText}>Support</Text>
					</Button>
				</View>
			)}
		</ModulesContext.Consumer>
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
