import React, { useContext, useState } from "react";
import {
	StyleSheet,
	View,
	Image,
	SectionList,
	SafeAreaView,
} from "react-native";
import { Text, Button } from "react-native-paper";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { NoteCard, SavedNoteCard, SavedPageCard } from "../components";
import { ScrollView } from "react-native-gesture-handler";
import { OfflineDataContext } from "../providers/OfflineDataProvider";

function Separator({ space }) {
	return <View style={{ height: space, backgroundColor: "#eaeaea" }}></View>;
}

export default function Saved() {
	const offlineDataContext = useContext(OfflineDataContext);
	const { notes } = offlineDataContext;
	// const [notes, setNotes] = useState([
	// 	{ title: "Note 1", subtitle: "Subtitle" },
	// 	{ title: "Note 2", subtitle: "Subtitle" },
	// 	{ title: "Note 3", subtitle: "Subtitle" },
	// ]);

	const _renderNotes = () => {
		const renderNotes = [];

		console.log("notes", notes.length);

		for (let index = 0; index < notes.length; index++) {
			const { title, note, createdAt } = notes[index];
			renderNotes.push(
				<>
					<SavedNoteCard
						title={title}
						subtitle={Date(createdAt)}
					></SavedNoteCard>
					<Separator space={2}></Separator>
					{/* {index < 2 && <Separator space={2}></Separator>} */}
				</>
			);
		}

		return (
			<View>
				<Text style={styles.headerText}>Notes</Text>
				{renderNotes}
				{notes?.length > 0 ? null : (
					// <Button style={styles.btn}>View all</Button>
					<Text style={styles.emptyListComponent}>
						Your saved notes will appear here
					</Text>
				)}
			</View>
		);
	};

	const [pages, setPages] = useState([
		{ title: "Page 1", subtitle: "Subtitle" },
		{ title: "Page 2", subtitle: "Subtitle" },
		{ title: "Page 3", subtitle: "Subtitle" },
	]);

	const _renderPages = () => {
		const renderPages = [];

		for (let index = 0; index < 3; index++) {
			const { title, subtitle } = pages[index];
			renderPages.push(
				<>
					<SavedPageCard title={title} subtitle={subtitle}></SavedPageCard>
					{index < 2 && <Separator space={2}></Separator>}
				</>
			);
		}

		return (
			<View>
				<Text style={styles.headerText}>Pages</Text>
				{renderPages}
				<Button style={styles.btn}>View all</Button>
			</View>
		);
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			<ScrollView contentContainerStyle={styles.container}>
				{_renderNotes()}
				{/* {_renderPages()} */}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		paddingLeft: 20,
	},
	btn: {
		width: widthPercentageToDP("30"),
		alignSelf: "flex-end",
	},
	headerText: {
		marginTop: 20,
		fontWeight: "bold",
		color: "grey",
	},
	emptyListComponent: {
		color: "grey",
		alignSelf: "center",
		paddingVertical: 10,
	},
});
