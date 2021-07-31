import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Saved, Search } from "../screens";
import headerConfig from "./config";
import { InitDataContext } from "../providers/InitDataProvider";

const Stack = createStackNavigator();

export default function SavedStack() {
	return (
		<InitDataContext.Consumer>
			{({ showQuickTip }) => (
				<Stack.Navigator
					screenOptions={({ navigation, route }) =>
						headerConfig(navigation, route)
					}
				>
					<Stack.Screen
						name="Saved"
						component={Saved}
						options={{ headerLeft: null }}
						listeners={{
							focus: (e) => {
								showQuickTip("Saved");
							},
						}}
					></Stack.Screen>
					<Stack.Screen
						name="Search"
						component={Search}
						listeners={{
							focus: (e) => {
								showQuickTip("Search");
							},
						}}
					></Stack.Screen>
				</Stack.Navigator>
			)}
		</InitDataContext.Consumer>
	);
}
