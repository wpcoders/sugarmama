import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import DiaryStack from "./DiaryStack";
import ProfileStack from "./ProfileStack";
import {
	HomeIcon,
	DiaryIcon,
	ProfileIcon,
	ProfileIconFocused,
	SavedIcon,
} from "../assets";
import { primary } from "../constants/Colors";
import SavedStack from "./SavedStack";

const Tab = createBottomTabNavigator();

const styles = {
	focused: { tintColor: primary, width: 25, height: 25 },
	blurred: { width: 25, height: 25 },
};

export default function MainTabs() {
	return (
		<Tab.Navigator
			tabBarOptions={{ showLabel: true, activeTintColor: primary }}
		>
			<Tab.Screen
				name="HomeStack"
				component={HomeStack}
				options={{
					title: "Home",
					tabBarIcon: ({ focused }) => (
						<Image
							source={HomeIcon}
							style={focused ? styles.focused : styles.blurred}
						></Image>
					),
				}}
			></Tab.Screen>
			<Tab.Screen
				name="DiaryStack"
				component={DiaryStack}
				options={{
					title: "Diary",
					tabBarIcon: ({ focused }) => (
						<Image
							source={DiaryIcon}
							style={focused ? styles.focused : styles.blurred}
						></Image>
					),
				}}
			></Tab.Screen>
			<Tab.Screen
				name="Saved"
				component={SavedStack}
				options={{
					tabBarIcon: ({ focused }) => (
						<Image
							source={SavedIcon}
							style={focused ? styles.focused : styles.blurred}
						></Image>
					),
				}}
			></Tab.Screen>
			<Tab.Screen
				name="Profile"
				component={ProfileStack}
				options={{
					tabBarIcon: ({ focused }) => (
						<Image
							source={focused ? ProfileIconFocused : ProfileIcon}
							style={styles.blurred}
						></Image>
					),
				}}
			></Tab.Screen>
		</Tab.Navigator>
	);
}
