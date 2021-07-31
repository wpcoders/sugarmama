import React from "react";
import { StyleSheet, Platform } from "react-native";
import { Button, Card, Title, Paragraph, Subheading } from "react-native-paper";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Ionicon from "react-native-vector-icons/Ionicons";
import { InitDataContext } from "../providers/InitDataProvider";

export default function ModuleCard({ id, goal, completed }) {
	return (
		<InitDataContext.Consumer>
			{({ completeGoal }) => (
				<Card
					style={[
						styles.card,
						{ backgroundColor: completed ? "rgba(255,255,255,0.8)" : "white" },
					]}
				>
					<Card.Content>
						<Title>{goal}</Title>
					</Card.Content>

					<Card.Actions style={styles.actions}>
						{!completed && (
							<>
								<Button
									onPress={() => {
										completeGoal(id);
									}}
								>
									<Ionicon
										name={
											Platform.OS === "android"
												? "md-checkmark"
												: "ios-checkmark"
										}
										size={40}
									></Ionicon>
								</Button>
								<Button>
									<Ionicon
										name={Platform.OS === "android" ? "md-close" : "ios-close"}
										size={40}
									></Ionicon>
								</Button>
							</>
						)}
					</Card.Actions>
				</Card>
			)}
		</InitDataContext.Consumer>
	);
}

const styles = StyleSheet.create({
	card: {
		width: widthPercentageToDP("95%"),
	},
	actions: {
		alignSelf: "flex-end",
		width: widthPercentageToDP("40%"),
		justifyContent: "space-evenly",
	},
});
