import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { InitDataContext } from "../providers/InitDataProvider";
import { ModulesContext } from "../providers/ModulesProvider";
import { OfflineDataContext } from "../providers/OfflineDataProvider";
import RNCalendarEvents from "react-native-calendar-events";

export default function Loader({ navigation }) {
	const initDataContext = useContext(InitDataContext);
	const offlineDataContext = useContext(OfflineDataContext);
	const modulesContext = useContext(ModulesContext);

	const { getModulesAsync, getSavedModules } = modulesContext;
	const isAuthorized = (permission) => permission === "authorized";

	const getCalendarPermission = async () => {
		try {
			const permission = await RNCalendarEvents.checkPermissions();
			if (!isAuthorized(permission))
				await RNCalendarEvents.requestPermissions();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getSavedModules();
		getModulesAsync();
		getCalendarPermission();
	}, []);

	const {
		userProfile,
		getUserProfileAsync,
		getDESQuestionsAsync,
		getGDMKQQuestionsAsync,
		getUserGoals,
		initialized,
		getQuickTipsAsync,
		getConsentLink,
	} = initDataContext;

	const { getNotes, getCreatedNotes } = offlineDataContext;

	useEffect(() => {
		getUserProfileAsync().then((userProfile) => {
			getQuickTipsAsync(userProfile.data());
		});
		const userGoalsObserver = getUserGoals();
		getNotes();
		getCreatedNotes();
		getConsentLink();

		return () => {
			userGoalsObserver();
		};
	}, []);

	useEffect(() => {
		// if (userProfile === undefined) {
		getDESQuestionsAsync();
		getGDMKQQuestionsAsync();
		// }
	}, []);

	useEffect(() => {
		if (initialized) {
			setTimeout(() => {
				navigation.replace("Demographic");
			}, 2000);
		}
	}, [initialized]);

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "white",
			}}
		>
			<ActivityIndicator></ActivityIndicator>
		</View>
	);
}
