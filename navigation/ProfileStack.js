import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Profile, Search } from "../screens";
import headerConfig from "./config";
import { InitDataContext } from "../providers/InitDataProvider";

const Stack = createStackNavigator();

export default function ProfileStack() {
	return (
		<InitDataContext.Consumer>
			{({ showQuickTip }) => (
				<Stack.Navigator
					screenOptions={({ navigation, route }) =>
						headerConfig(navigation, route)
					}
				>
					<Stack.Screen
						name="Profile"
						component={Profile}
						options={{ headerLeft: null }}
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
