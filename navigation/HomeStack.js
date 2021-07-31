import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, Modules, Module, Categories, Search } from "../screens";
import headerConfig from "./config";
import { InitDataContext } from "../providers/InitDataProvider";

const Stack = createStackNavigator();

export default function HomeStack() {
	return (
		<InitDataContext.Consumer>
			{({ showQuickTip }) => (
				<Stack.Navigator
					screenOptions={({ navigation, route }) => {
						return headerConfig(navigation, route);
					}}
				>
					<Stack.Screen
						name="Home"
						component={Home}
						options={{ headerLeft: null }}
						listeners={{
							focus: (e) => {
								showQuickTip("Home");
							},
						}}
					></Stack.Screen>
					<Stack.Screen
						name="Modules"
						component={Modules}
						listeners={{
							focus: (e) => {
								showQuickTip("Modules");
							},
						}}
					></Stack.Screen>
					<Stack.Screen
						name="Module"
						component={Module}
						options={{
							headerRightContainerStyle: { marginRight: 10 },
							// headerRight: () => (
							// 	<FontAwesome name="heart-o" size={32} color="#ff4d5d"></FontAwesome>
							// ),
						}}
						listeners={{
							focus: (e) => {
								showQuickTip("Module");
							},
						}}
					></Stack.Screen>
					<Stack.Screen
						name="Categories"
						component={Categories}
						listeners={{
							focus: (e) => {
								showQuickTip("Categories");
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
