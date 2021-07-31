import React, { useState, useRef, useContext, useEffect } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Text, Button } from "react-native-paper";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";
import Slider from "@react-native-community/slider";
import { primary } from "../constants/Colors";
import { InitDataContext } from "../providers/InitDataProvider";

export default function DES({ navigation, route }) {
	const radio_props = [
		{ label: "Strongly Disagree", value: 0 },
		{ label: "Somewhat Disagree", value: 1 },
		// { label: "Neutral", value: 2 },
		{ label: "Somewhat Agree", value: 2 },
		{ label: "Strong Agree", value: 3 },
	];

	const initDataContext = useContext(InitDataContext);
	const { DESQuestions: questions, _setDESAnswers } = initDataContext;
	const [answers, setAnswers] = useState([]);

	useEffect(() => {
		const newAnswers = questions?.map(() => ({
			label: "Strong Agree",
			value: 3,
		}));
		setAnswers(newAnswers);
	}, []);

	const _renderOptions = (index) => {
		return (
			<>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						width: widthPercentageToDP("100%"),
					}}
				>
					<Text style={styles.sliderLabel}>Strongly Disagree</Text>
					<Text style={styles.sliderLabel}>Somewhat Disagree</Text>
					{/* <Text style={styles.sliderLabel}>Neutral</Text> */}
					<Text style={styles.sliderLabel}>Somewhat Agree</Text>
					<Text style={styles.sliderLabel}>Strongly Agree</Text>
				</View>
				<Slider
					style={styles.slider}
					minimumValue={0}
					maximumValue={3}
					step={1}
					minimumTrackTintColor={primary}
					// maximumTrackTintColor="#000000"
					thumbTintColor={primary}
					value={3}
					onSlidingComplete={(value) => {
						console.log(value);
						const newAnswers = answers;
						newAnswers[index] = radio_props[value];
						setAnswers(newAnswers);
					}}
				/>
			</>
		);
	};

	const _renderForm = () => {
		const elements = [];
		for (let index = 0; index < questions?.length; index++) {
			elements.push(
				<View style={styles.question} key={index}>
					<Text style={styles.questionStatement}>
						{questions[index].question}
					</Text>
					{_renderOptions(index)}
				</View>
			);
		}
		return elements;
	};

	return (
		<SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
			<ScrollView contentContainerStyle={styles.container}>
				<Text>
					Here are some statements about gestational diabetes (GDM). Each
					statement finishes the sentence “In general, I believe that…” The
					response categories are: Strongly Disagree, Somewhat Disagree,
					Neutral, Somewhat Agree, and Strongly Agree. It is important that you
					answer every statement as accurately as possible.
				</Text>
				<Text style={{ marginTop: 10 }}>In general, I believe that</Text>

				<View style={styles.formContainer}>{_renderForm()}</View>

				<Button
					style={styles.btn}
					onPress={() => {
						_setDESAnswers(answers);
						route.name === "DES-Revisited"
							? navigation.push("DKT-Revisited")
							: navigation.push("DKT");
					}}
				>
					<Text style={styles.btnText}>Submit</Text>
				</Button>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		justifyContent: "flex-start",
		paddingVertical: 20,
		paddingHorizontal: 20,
	},
	btn: {
		width: widthPercentageToDP("90%"),
		paddingVertical: 8,
		backgroundColor: "#fbcd31",
	},
	btnText: {
		color: "white",
		textTransform: "uppercase",
		fontSize: 16,
		fontWeight: "bold",
	},
	question: {
		marginBottom: 12,
	},
	formContainer: { paddingVertical: 12 },
	questionStatement: { marginBottom: 8, fontWeight: "500" },
	slider: {
		height: 50,
	},
	sliderLabel: {
		fontSize: 12,
		width: widthPercentageToDP("90%") / 5,
		flexWrap: "wrap",
	},
});
