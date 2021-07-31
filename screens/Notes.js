import React, { useContext, useEffect } from "react";
import {
	StyleSheet,
	View,
	Image,
	SectionList,
	SafeAreaView,
} from "react-native";
import { Text, Button, FAB } from "react-native-paper";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { NoteCard } from "../components";
import { OfflineDataContext } from "../providers/OfflineDataProvider";
import _ from "lodash";

const DATA = [
	{
		title: "Main dishes",
		data: [
			{ title: "Note 1", subtitle: "Subtitle" },
			{ title: "Note 2", subtitle: "Subtitle" },
			{ title: "Note 3", subtitle: "Subtitle" },
		],
	},
	{
		title: "Side dishes",
		data: [
			{ title: "Note 1", subtitle: "Subtitle" },
			{ title: "Note 2", subtitle: "Subtitle" },
			{ title: "Note 3", subtitle: "Subtitle" },
		],
	},
];

function Separator({ space }) {
	return <View style={{ height: space, backgroundColor: "#eaeaea" }}></View>;
}

export default function Notes({ navigation }) {
	const { syncStateWithStorage } = useContext(OfflineDataContext);

	useEffect(() => {
		const unsubscribe = navigation.addListener("blur", () => {
			syncStateWithStorage();
		});

		return unsubscribe;
	}, []);

	return (
		<OfflineDataContext.Consumer>
			{({ createdNotes }) => (
				<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
					<SectionList
						sections={createdNotes}
						renderSectionHeader={({ section: { title } }) => (
							<View style={styles.header}>
								<Text style={styles.headerText}>{title}</Text>
							</View>
						)}
						renderItem={({ item, index }) => {
							return (
								<NoteCard
									key={index}
									title={item.title}
									subtitle={item.body}
									onPress={() => {
										navigation.navigate("NewNote", {
											id: item.id,
											title: item.title,
											body: item.body,
											createdAt: item.createdAt,
											action: "update",
										});
									}}
								></NoteCard>
							);
						}}
						ItemSeparatorComponent={() => <Separator space={2}></Separator>}
						contentContainerStyle={styles.container}
					></SectionList>
					<FAB
						style={styles.fab}
						icon="plus"
						onPress={() => {
							navigation.navigate("NewNote", {
								id: _.uniqueId(Date.now()),
								action: "create",
							});
						}}
					/>
				</SafeAreaView>
			)}
		</OfflineDataContext.Consumer>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		paddingLeft: 20,
	},
	header: {
		width: widthPercentageToDP("100%"),
		paddingTop: 20,
		backgroundColor: "white",
	},
	headerText: {
		fontWeight: "bold",
		color: "grey",
	},
	fab: {
		position: "absolute",
		margin: 16,
		right: 0,
		bottom: 30,
	},
});
