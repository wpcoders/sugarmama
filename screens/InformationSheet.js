import React, { useContext, useState } from "react";
import { View, StyleSheet, Linking } from "react-native";
import Modal from "react-native-modal";
import { primary } from "../constants/Colors";
import { Text, Button } from "react-native-paper";
import {
	heightPercentageToDP,
	widthPercentageToDP,
} from "react-native-responsive-screen";
import { InitDataContext } from "../providers/InitDataProvider";
import { ModulesContext } from "../providers/ModulesProvider";

export default function InformationSheet({ navigation }) {
	const { userProfile, consentLink, DESAnswers, GDMKQAnswers, createUserProfile, addToRecentlyViewed } = useContext(InitDataContext);
	const { modules } = useContext(ModulesContext);

	return (
		<View style={styles.container}>
			<View style={styles.modal}>
				<Text style={styles.text}>
					I have read the Information Sheet Provided and I Consent to these
					Terms.
				</Text>
				<Text
					onPress={() => {
						Linking.openURL(consentLink);
					}}
					style={[styles.text, styles.link]}
				>
					[Link to PDF]
				</Text>
				<Button
					onPress={() => {
						createUserProfile();
						if(userProfile){
							navigation.navigate("Main");
						}
						// console.log(modules);
						// navigation.navigate("Main");
					}}
					style={styles.btn}
				>
					<Text>I Consent</Text>
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
		paddingHorizontal: 20,
	},
	modal: {
		backgroundColor: primary,
		alignItems: "center",
		padding: 20,
		height: heightPercentageToDP("30%"),
		borderRadius: heightPercentageToDP("30%") / 32,
	},
	btn: {
		backgroundColor: "white",
		position: "absolute",
		bottom: 30,
	},
	text: {
		fontSize: 16,
		fontWeight: "500",
	},
	link: {
		marginTop: 40,
	},
});
