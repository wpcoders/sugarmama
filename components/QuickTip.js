import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { primary } from "../constants/Colors";
import {
	heightPercentageToDP,
	widthPercentageToDP,
} from "react-native-responsive-screen";
import { hideMessage } from "react-native-flash-message";
import { InitDataContext } from "../providers/InitDataProvider";

export default function QuickTip({ options }) {
	const { recordTipResponse } = useContext(InitDataContext);

	const dismissTip = (action) => {
		hideMessage();
		recordTipResponse({
			message: options.message.message,
			description: options.message.description,
			action,
		});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.text}>{options.message.message}</Text>
			<Text style={styles.description}>{options.message.description}</Text>
			{options.titleProps === "OK" ? (
				<Button
					onPress={() => {
						dismissTip("OK");
					}}
					style={styles.btn}
				>
					<Text>OK</Text>
				</Button>
			) : (
				<>
					<Button
						onPress={() => {
							dismissTip("Yes");
						}}
						style={styles.btnTwo}
					>
						<Text>Yes</Text>
					</Button>
					<Button
						onPress={() => {
							dismissTip("No");
						}}
						style={styles.btn}
					>
						<Text>No</Text>
					</Button>
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: primary,
		height: heightPercentageToDP("30%"),
		width: widthPercentageToDP("80%"),
		borderRadius: heightPercentageToDP("30%") / 32,
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 40,
	},
	btn: {
		position: "absolute",
		bottom: 20,
		right: 20,
		backgroundColor: "white",
	},
	btnTwo: {
		position: "absolute",
		bottom: 20,
		right: 90,
		backgroundColor: "white",
	},
	text: {
		fontWeight: "500",
	},
	description: {
		fontWeight: "normal",
		marginTop: 10,
	},
});
