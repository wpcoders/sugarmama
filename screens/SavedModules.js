import * as React from "react";
import { View, Text } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { ModulesContext } from "../providers/ModulesProvider";

export default function SavedModules({ navigation }) {
	return (
		<ModulesContext.Consumer>
			{({ savedModules }) => {
				console.log(savedModules);
				if (savedModules.length > 0) {
					console.log("rendering");
					return (
						<FlatList
							data={savedModules}
							renderItem={({ item, index }) => (
								<TouchableOpacity
									onPress={() => {
										navigation.navigate("Module", {
											item: item,
											index,
											modules: savedModules,
										});
									}}
								>
									<View
										style={{
											padding: 10,
											paddingVertical: 20,
											marginVertical: 5,

											backgroundColor: "white",

											shadowColor: "#000",
											shadowOffset: {
												width: 0,
												height: 1,
											},
											shadowOpacity: 0.2,
											shadowRadius: 1.41,

											elevation: 2,
										}}
									>
										<Text
											style={{
												fontSize: 15,
												color: "black",
												fontWeight: "bold",
											}}
										>
											{item.title}
										</Text>
									</View>
								</TouchableOpacity>
							)}
						></FlatList>
					);
				}
			}}
		</ModulesContext.Consumer>
	);
}
