import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import MainTabs from "./MainTabs";
import {
	Welcome,
	InformationSheet,
	Demographic,
	DES,
	DKT,
	Loader,
	SavedModules,
} from "../screens";
import { AuthContext } from "../providers/AuthProvider";
import { InitDataContext } from "../providers/InitDataProvider";
import headerConfig from "./config";

const Stack = createStackNavigator();

export default function RootStack() {
	return (
		<AuthContext.Consumer>
			{({ user }) => {
				return (
					<InitDataContext.Consumer>
						{({ userProfile }) => (
							<Stack.Navigator>
								{!user || !user?.emailVerified ? (
									<Stack.Screen
										name="Auth"
										component={AuthStack}
										options={{ headerShown: false }}
									></Stack.Screen>
								) : !userProfile ? (
									<>
										<Stack.Screen
											name="Loader"
											component={Loader}
											options={{ headerShown: false, gestureEnabled: false }}
										></Stack.Screen>
										<Stack.Screen
											name="Demographic"
											component={Demographic}
											options={{ headerLeft: null, gestureEnabled: false }}
										></Stack.Screen>
										<Stack.Screen
											name="DES"
											component={DES}
											options={{
												headerLeft: null,
												gestureEnabled: false,
												title: "Diabetes Empowerment Scale",
											}}
										></Stack.Screen>
										<Stack.Screen
											name="DKT"
											component={DKT}
											options={{
												headerLeft: null,
												gestureEnabled: false,
												title: "Diabetes Knowledge Test",
											}}
										></Stack.Screen>
										<Stack.Screen
											name="Welcome"
											component={Welcome}
											options={{ gestureEnabled: false, headerShown: false }}
										></Stack.Screen>
										<Stack.Screen
											name="InformationSheet"
											component={InformationSheet}
											options={{ gestureEnabled: false, headerShown: false }}
										></Stack.Screen>
									</>
								) : (
									<>
										<Stack.Screen
											name="Main"
											component={MainTabs}
											options={{ headerShown: false, gestureEnabled: false }}
										></Stack.Screen>
										<Stack.Screen
											name="Saved Modules"
											component={SavedModules}
											options={({ navigation, route }) =>
												headerConfig(navigation, route)
											}
										></Stack.Screen>
										<Stack.Screen
											name="DES-Revisited"
											component={DES}
											options={{
												headerLeft: null,
												gestureEnabled: false,
												title: "Diabetes Empowerment Scale",
											}}
										></Stack.Screen>
										<Stack.Screen
											name="DKT-Revisited"
											component={DKT}
											options={{
												headerLeft: null,
												gestureEnabled: false,
												title: "Diabetes Knowledge Test",
											}}
										></Stack.Screen>
									</>
								)}
							</Stack.Navigator>
						)}
					</InitDataContext.Consumer>
				);
			}}
		</AuthContext.Consumer>
	);
}
