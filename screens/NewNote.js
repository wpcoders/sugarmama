import React, { createRef, useContext, useEffect, useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Keyboard } from "react-native";
import { FAB, TextInput } from "react-native-paper";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { OfflineDataContext } from "../providers/OfflineDataProvider";

export default function NewNote({ navigation, route }) {
	const { addNote, updateNote } = useContext(OfflineDataContext);
	const { id, title, body, action, createdAt } = route.params;
	const [note, setNote] = useState({
		id: id,
		title: title || "",
		body: body || "",
		createdAt: createdAt || new Date(),
	});

	const handleOnChange = (value, name) => {
		setNote({ ...note, [name]: value });
	};

	const [position, setPosition] = useState(10);

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			"keyboardDidShow",
			moveFAB
		);
		const keyboardDidHideListener = Keyboard.addListener(
			"keyboardDidHide",
			resetFAB
		);
		return () => {
			keyboardDidShowListener.remove();
			keyboardDidHideListener.remove();
		};
	}, []);

	const moveFAB = () => {
		console.log("MovingFAB");
		setPosition(heightPercentageToDP(30));
	};

	const resetFAB = () => {
		console.log("Resetting FAB");
		setPosition(10);
	};

	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<TextInput
				onChangeText={(value) => {
					handleOnChange(value, "title");
				}}
				placeholder="Title"
				style={styles.input}
				value={note.title}
			></TextInput>
			<TextInput
				onChangeText={(value) => {
					handleOnChange(value, "body");
				}}
				value={note.body}
				placeholder="Start typing"
				multiline
				style={[styles.input, styles.multiline]}
				underlineColor="transparent"
			></TextInput>
			<FAB
				disabled={!note.title}
				style={styles.fab(position)}
				icon="check"
				onPress={() => {
					console.log(action);
					if (action === "create") addNote(note);
					if (action === "update") updateNote(note);
					navigation.pop();
				}}
			/>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		paddingTop: 20,
		paddingHorizontal: 20,
	},
	input: {
		backgroundColor: "white",
		marginBottom: 30,
	},
	multiline: {
		minHeight: heightPercentageToDP("65%"),
		maxHeight: heightPercentageToDP("65%"),
		backgroundColor: "#eaeaea",
	},
	fab: (position) => ({
		position: "absolute",
		margin: 16,
		right: 0,
		bottom: position,
	}),
});
