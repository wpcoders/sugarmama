import React, { useState, useRef, useContext, useEffect } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Text, Button } from "react-native-paper";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";
import RadioForm, {
	RadioButton,
	RadioButtonInput,
	RadioButtonLabel,
} from "react-native-simple-radio-button";
import { primary } from "../constants/Colors";
import { InitDataContext } from "../providers/InitDataProvider";

export default function DKT({ navigation, route }) {
	const initDataContext = useContext(InitDataContext);

	const { GDMKQQuestions: questions, _setGDMKQAnswers } = initDataContext;

	const [answers, setAnswers] = useState([]);

	useEffect(() => {
		const newAnswers = questions?.map(() => {
			return "I dont know";
		});
		setAnswers(newAnswers);
	}, []);

	const _renderOptions = (index) => {
		return (
			<RadioForm
				buttonColor={primary}
				radio_props={questions[index].options}
				initial={0}
				onPress={(value) => {
					const newAnswers = answers;
					newAnswers[index] = value;
					setAnswers(newAnswers);
				}}
			/>
		);
	};

	const _renderForm = () => {
		const elements = [];
		for (let index = 0; index < questions.length; index++) {
			elements.push(
				<View style={styles.question} key={index}>
					<Text style={styles.questionStatement}>
						{questions[index].statement}
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
					Below are some statements about Gestational Diabetes Mellitus. After
					reading the statements please choose the correct answer based on your
					knowledge.
				</Text>

				<View style={styles.formContainer}>{_renderForm()}</View>

				<Button
					style={styles.btn}
					onPress={() => {
						_setGDMKQAnswers(answers);
						route.name === "DKT-Revisited"
							? navigation.push("Main")
							: navigation.push("Welcome");
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
	questionStatement: { marginBottom: 8 },
});
