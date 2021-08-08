import React from "react";
import { StyleSheet } from "react-native";
import { Button, Card, Title, Paragraph, Subheading } from "react-native-paper";
import { widthPercentageToDP } from "react-native-responsive-screen";
import _ from 'lodash';

export default function ModuleCard({ onPress, item }) {
	return (
		<Card style={styles.card} onPress={onPress}>
			<Card.Cover resizeMode="cover" source={{ uri: item.image }} />
			<Card.Content>
				<Title>{_.get(item, 'title', null)}</Title>
				<Subheading>Type: {item.type}</Subheading>
				{/* <Paragraph numberOfLines={1}>{item.description}</Paragraph> */}
			</Card.Content>
		</Card>
	);
}

const styles = StyleSheet.create({
	card: {
		margin: widthPercentageToDP("2.5%"),
		width: widthPercentageToDP("45%"),
	},
});
