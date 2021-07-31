import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

export default function NoteCard({ title, subtitle, onPress }) {
	return (
		<TouchableOpacity onPress={onPress} style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<Text numberOfLines={1} style={styles.subtitle}>
				{subtitle}
			</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 16,
	},
	title: {
		fontWeight: "bold",
		fontSize: 16,
	},
	subtitle: {
		paddingVertical: 4,
		color: "grey",
	},
});
