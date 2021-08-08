import React, {useEffect, useState} from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { Welcome as WelcomeImage } from "../assets";
import PushNotification from "react-native-push-notification";
import _ from "lodash";
import moment from "moment";

export default function Welcome({ navigation }) {
	const [text, setText] = useState(0);
	const setNotification = () => {
		PushNotification.getScheduledLocalNotifications((notifications) => {
			// console.log(notifications)
			const reminder = notifications.find(
				(notification) => notification.message === "Breakfast reminder"
			);
			if (reminder)
				PushNotification.cancelLocalNotifications({id: reminder.id});
		});
		PushNotification.localNotificationSchedule({
			channelId: "channel-id",
			/* Android Only Properties */
			ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)

			/* iOS and Android properties */
			id: _.uniqueId(),
			message: "Renew Profile", // (required)
			 // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
			date: moment().add(_.toInteger(text), 'months').toDate(),
		});
		PushNotification.getScheduledLocalNotifications((notifications) => {
			console.log(_.tail(notifications))
		})
	}
	return (
		<>
			<StatusBar style="dark" />
			<View style={styles.container}>
				<Text style={styles.header}>Welcome!</Text>
				<Text style={styles.text}>
					The Mum & Bub App is an educational app aimed to help you manage your
					gestational diabetes{"\n\n"}All you need is to dedicate 5 minutes a
					day and our cognitive behavioural strategies will help you control
					your condition successfully
				</Text>
				<Image source={WelcomeImage} style={styles.img}></Image>
				<View style={styles.btnContainer}>
					<Button
						style={styles.btn}
						onPress={() => {
							navigation.navigate("InformationSheet");
						}}
					>
						<Text style={styles.btnText}>Start</Text>
					</Button>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},
	header: {
		fontSize: 40,
		marginBottom: 24,
	},
	btn: {
		width: widthPercentageToDP("90%"),
		paddingVertical: 8,
		backgroundColor: "#a5d6cb",
	},
	btnText: {
		color: "white",
		textTransform: "uppercase",
		fontSize: 16,
		fontWeight: "bold",
	},
	btnContainer: {
		position: "absolute",
		bottom: 20,
		borderTopColor: "#eaeaea",
		borderTopWidth: 2,
		width: widthPercentageToDP("100%"),
		paddingVertical: 24,
		alignItems: "center",
	},
	text: {
		textAlign: "center",
		fontSize: 16,
		width: widthPercentageToDP("90%"),
		marginBottom: 32,
	},
	img: {
		width: widthPercentageToDP("90%"),
		height: 250,
		resizeMode: "contain",
	},
});
