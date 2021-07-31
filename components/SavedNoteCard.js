import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { SavedIcon } from "../assets";

export default function SavedNoteCard({ title, subtitle }) {
	return (
		<View style={styles.container}>
			<Image source={SavedIcon} style={styles.icon}></Image>
			<View style={{ maxWidth: widthPercentageToDP(80) }}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.subtitle}>{subtitle}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 16,
		flexDirection: "row",
		alignItems: "center",
	},
	title: {
		fontSize: 16,
	},
	subtitle: {
		paddingVertical: 4,
		color: "grey",
	},
	icon: {
		width: 25,
		height: 25,
		marginRight: 25,
	},
});
