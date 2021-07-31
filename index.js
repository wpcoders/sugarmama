import { registerRootComponent } from "expo";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
var PushNotification = require("react-native-push-notification");

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
	// (optional) Called when Token is generated (iOS and Android)
	onRegister: function (token) {
		console.log("TOKEN:", token);
	},

	// (required) Called when a remote is received or opened, or local notification is opened
	onNotification: function (notification) {
		console.log("NOTIFICATION:", notification);

		// process the notification

		// (required) Called when a remote is received or opened, or local notification is opened
		notification.finish(PushNotificationIOS.FetchResult.NoData);
	},

	// (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
	onAction: function (notification) {
		console.log("ACTION:", notification.action);
		console.log("NOTIFICATION:", notification);

		// process the action
	},

	// IOS ONLY (optional): default: all - Permissions to register.
	permissions: {
		alert: true,
		badge: true,
		sound: true,
	},

	// Should the initial notification be popped automatically
	// default: true
	popInitialNotification: true,

	/**
	 * (optional) default: true
	 * - Specified if permissions (ios) and token (android and ios) will requested or not,
	 * - if not, you must call PushNotificationsHandler.requestPermissions() later
	 * - if you are not using remote notification or do not have Firebase installed, use this:
	 *     requestPermissions: Platform.OS === 'ios'
	 */
	requestPermissions: false,
});

import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
