import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, Button } from "react-native-paper";
import {
	widthPercentageToDP,
	heightPercentageToDP,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { WelcomeBackground } from "../assets";
import { ScrollView } from "react-native-gesture-handler";
import CheckBox from "@react-native-community/checkbox";
import { TextModule, VideoModule } from "../components";
import { InitDataContext } from "../providers/InitDataProvider";
import FastImage from "react-native-fast-image";
import { ModulesContext } from "../providers/ModulesProvider";

export default function Module({ route }) {
	const { updateCurrentModule } = useContext(ModulesContext);
	const { item, index, modules } = route.params;
	const initDataContext = useContext(InitDataContext);
	const { goals, addToRecentlyViewed, addGoalToProfile, completeGoal } =
		initDataContext;
	const [viewed, setViewed] = useState([item]);
	const [module, setModule] = useState(item);
	const [goal, setGoal] = useState(() => {
		return (
			goals.find((entry) => entry.goal === item.goal && entry.completed)
				?.completed || false
		);
	});
	const [goalId, setGoalId] = useState(() => {
		return goals.find((entry) => entry.goal === item.goal)?.id;
	});

	useEffect(() => {
		updateCurrentModule(module);
		addToRecentlyViewed(module);
		addGoalToProfile(module?.id, module?.goal);
	}, []);

	useEffect(() => {
		addGoalToProfile(module?.id, module?.goal);
	}, [module]);

	const goToNextModule = () => {
		const index = modules?.findIndex((newModule) => {
			if (!viewed.includes(newModule))
				return newModule.tags.some((tag) => {
					return (
						module.tags.findIndex((currentModuleTag) => {
							return (
								currentModuleTag.text === tag.text && newModule.id !== module.id
							);
						}) >= 0
					);
				});
		});

		if (modules[index]?.goal) {
			setGoal(
				goals.find(
					(entry) => entry.goal === modules[index].goal && entry.completed
				)?.completed || false
			);
			setGoalId(goals.find((entry) => entry.goal === modules[index].goal)?.id);
		}
		setViewed([...viewed, modules[index]]);
		setModule(modules[index]);
		addToRecentlyViewed(modules[index]);
		updateCurrentModule(modules[index]);
	};

	console.log("Id", goalId);

	return (
		<View style={styles.container}>
			<FastImage source={{ uri: module?.image }} style={styles.img}></FastImage>
			{module?.type === "Text" ? (
				<TextModule module={module}></TextModule>
			) : (
				<VideoModule module={module}></VideoModule>
			)}
			<View style={styles.btnContainer}>
				{module?.goal !== "" && (
					<View style={styles.checkBoxContainer}>
						<Text style={styles.checkBoxText}>{module?.goal}</Text>
						<CheckBox
							value={goal}
							onValueChange={(newValue) => {
								setGoal(newValue);
								completeGoal(goalId);
							}}
							style={styles.checkBox}
							onAnimationType="fill"
							offAnimationType="fill"
						></CheckBox>
					</View>
				)}
				{/* {currentIndex + 1 < modules?.length && ( */}
				<Button onPress={goToNextModule} style={styles.btn}>
					<Text>Next Module</Text>
				</Button>
				{/* )} */}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	img: {
		width: widthPercentageToDP("100%"),
		height: heightPercentageToDP("30%"),
		resizeMode: "cover",
	},
	btnContainer: {
		alignItems: "center",
		paddingVertical: 20,
	},
	btn: {
		backgroundColor: "#a5d6cb",
		width: widthPercentageToDP("70%"),
		paddingVertical: 8,
	},
	checkBoxContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
		backgroundColor: "lightgrey",
		width: widthPercentageToDP("90%"),
		justifyContent: "center",
		paddingVertical: 16,
	},
	checkBoxText: {
		fontSize: widthPercentageToDP(4),
		fontWeight: "bold",
		color: "rgba(0,0,0,0.7)",
		maxWidth: "80%",
	},
	checkBox: {
		position: "absolute",
		right: 12,
	},
});
