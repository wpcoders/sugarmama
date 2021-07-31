import React from "react";
import { StyleSheet } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { widthPercentageToDP } from "react-native-responsive-screen";

export default function LessonCard({ onPress, item }) {
	return (
		<Card style={styles.card} onPress={onPress}>
			<Card.Cover style={{ height: 120 }} source={{ uri: item.image }} />
			<Card.Content>
				<Title numberOfLines={3}>{item.title}</Title>
			</Card.Content>
		</Card>
	);
}

const styles = StyleSheet.create({
	card: {
		width: widthPercentageToDP("30%"),
	},
});
