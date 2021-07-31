import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Onboarding, Login, SignUp, ForgotPassword } from "../screens";
import { primary } from "../constants/Colors";
import { default as defaultConfig } from "./config";

const Stack = createStackNavigator();

const headerConfig = {
	...defaultConfig(),
	headerTitle: null,
	headerRight: null,
};

export default function AuthStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Onboarding"
				component={Onboarding}
				options={{
					headerShown: false,
				}}
			></Stack.Screen>
			<Stack.Screen
				name="Login"
				component={Login}
				options={headerConfig}
			></Stack.Screen>
			<Stack.Screen
				name="SignUp"
				component={SignUp}
				options={headerConfig}
			></Stack.Screen>
			<Stack.Screen
				name="Forgot"
				component={ForgotPassword}
				options={headerConfig}
			></Stack.Screen>
		</Stack.Navigator>
	);
}
