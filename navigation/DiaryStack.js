import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Diary, Notes, Goals, Appointments, NewNote, Search } from "../screens";
import headerConfig from "./config";
import { InitDataContext } from "../providers/InitDataProvider";

const Stack = createStackNavigator();

export default function DiaryStack() {
	return (
		<InitDataContext.Consumer>
			{({ showQuickTip }) => (
				<Stack.Navigator
					screenOptions={({ navigation, route }) =>
						headerConfig(navigation, route)
					}
				>
					<Stack.Screen
						name="Diary"
						component={Diary}
						options={{ headerLeft: null }}
					></Stack.Screen>
					<Stack.Screen
						name="Notes"
						component={Notes}
						listeners={{
							focus: (e) => {
								showQuickTip("Notes");
							},
						}}
					></Stack.Screen>
					<Stack.Screen
						name="NewNote"
						component={NewNote}
						options={{ title: "New Note" }}
					></Stack.Screen>
					<Stack.Screen
						name="Goals"
						component={Goals}
						listeners={{
							focus: (e) => {
								showQuickTip("Goals");
							},
						}}
					></Stack.Screen>
					<Stack.Screen
						name="Appointments"
						component={Appointments}
						options={{ title: "Calendar" }}
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
