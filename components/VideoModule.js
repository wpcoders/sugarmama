import React, { useState } from "react";
import { StyleSheet, View, Platform } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { Text, ActivityIndicator } from "react-native-paper";
import YouTube from "react-native-youtube";
import { ScrollView } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import { widthPercentageToDP } from "react-native-responsive-screen";

export default function VideoModule({ module }) {
	const [activeSections, setActiveSections] = useState([]);
	const [ready, isReady] = useState({});

	console.log(module.links, "link");

	const _renderHeader = (section, index, isActive) => {
		return (
			<View style={styles.sectionHeader}>
				<Text style={styles.sectionHeaderText}>
					{module.title} - Part {index + 1}
				</Text>
				<Ionicons
					name={
						Platform.OS === "ios"
							? !isActive
								? "ios-arrow-down"
								: "ios-arrow-up"
							: !isActive
							? "md-arrow-down"
							: "md-arrow-up"
					}
					size={20}
				></Ionicons>
			</View>
		);
	};

	const _renderContent = (section, index) => {
		console.log(section);
		return (
			<View style={styles.sectionContent}>
				<YouTube
					apiKey="AIzaSyCSwd0QJJEFkTHAArbn5o7p7Q0pfxvGKJ4"
					videoId={section.split("=")[1]} // The YouTube video ID
					onReady={() => {
						isReady({ [index]: true, ...ready });
					}}
					onChangeState={(e) => {
						console.log(e);
					}}
					style={{ alignSelf: "stretch", height: 300 }}
				/>
				{!ready[index] && (
					<ActivityIndicator
						style={{ position: "relative", bottom: "50%" }}
					></ActivityIndicator>
				)}
			</View>
		);
	};

	const _updateSections = (activeSections) => {
		setActiveSections(activeSections);
	};

	return (
		<ScrollView style={styles.body}>
			<Accordion
				underlayColor="#eaeaea"
				activeSections={activeSections}
				sections={module.links}
				renderHeader={_renderHeader}
				renderContent={_renderContent}
				onChange={_updateSections}
			/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		paddingTop: 20,
	},
	sectionHeader: {
		paddingVertical: 16,
		paddingHorizontal: 16,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	sectionHeaderText: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#a5d6cb",
	},
	sectionContent: {
		paddingHorizontal: 12,
	},
	sectionLoading: {
		alignSelf: "center",
	},
});
