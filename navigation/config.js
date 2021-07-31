import React from "react";
import { View, StyleSheet } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { primary } from "../constants/Colors";
import { ModulesContext } from "../providers/ModulesProvider";

const headerConfig = (navigation, route) => ({
	headerStyle: { backgroundColor: primary },
	headerBackTitleVisible: false,
	headerTintColor: "white",
	headerLeftContainerStyle: { marginLeft: 8 },
	headerRight: () => (
		<ModulesContext.Consumer>
			{({ saveModule }) =>
				route.name !== "Saved Modules" && (
					<View style={styles.headerRight}>
						<Ionicons
							style={{ marginRight: 20 }}
							onPress={() => {
								console.log("route", route);
								if (route?.name === "Module") {
									// Save module
									saveModule();
								} else {
									navigation.navigate("Saved Modules");
									// View saved modules
								}
							}}
							name="ios-heart-empty"
							size={24}
							color="white"
						></Ionicons>
						<Ionicons
							onPress={() => {
								navigation.navigate("Search");
							}}
							name="ios-search"
							size={24}
							color="white"
						></Ionicons>
					</View>
				)
			}
		</ModulesContext.Consumer>
	),
});

export default headerConfig;

const styles = StyleSheet.create({
	headerRight: {
		flexDirection: "row",
		marginRight: 10,
		// justifyContent: "space-between",
		// minWidth: widthPercentageToDP("25"),
	},
});
