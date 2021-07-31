import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { SelectableText } from "@astrocoders/react-native-selectable-text";
import { yellow } from "../constants/Colors";
import { OfflineDataContext } from "../providers/OfflineDataProvider";
import HTML from "react-native-render-html";
import { widthPercentageToDP } from "react-native-responsive-screen";

export default function TextModule({ module }) {
	const renderer = (htmlAttribs, children, convertedCSSStyles, passProps) => (
		<OfflineDataContext.Consumer>
			{({ saveNote }) => (
				<SelectableText
					highlightColor="red"
					style={[styles.bodyText, convertedCSSStyles]}
					menuItems={["Save"]}
					value={children}
					onSelection={({
						eventType,
						content,
						selectionStart,
						selectionEnd,
					}) => {
						saveNote(content);
					}}
				></SelectableText>
			)}
		</OfflineDataContext.Consumer>
	);

	return (
		<View style={styles.body}>
			<ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollView}>
				<HTML
					renderers={{
						h1: renderer,
						h2: renderer,
						h3: renderer,
						h4: renderer,
						h5: renderer,
						h6: renderer,
						p: renderer,
					}}
					// customWrapper={(text) => (
					// 	<SelectableText
					// 		highlightColor="red"
					// 		style={styles.bodyText}
					// 		menuItems={["Save"]}
					// 		value={text}
					// 		onSelection={({
					// 			eventType,
					// 			content,
					// 			selectionStart,
					// 			selectionEnd,
					// 		}) => {
					// 			saveNote(content);
					// 		}}
					// 	></SelectableText>
					// )}
					// defaultTextProps={{ selectable: true }}
					source={{ html: module.description }}
					contentWidth={widthPercentageToDP(100)}
				></HTML>
				{/* <SelectableText
							highlightColor="red"
							style={styles.bodyText}
							menuItems={["Save"]}
							value={module.description}
							onSelection={({
								eventType,
								content,
								selectionStart,
								selectionEnd,
							}) => {
								saveNote(content);
							}}
						></SelectableText> */}
				{/* <Text style={styles.bodyText} selectable>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
					pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</Text> */}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		marginTop: 20,
		paddingHorizontal: 20,
	},
	label: {
		fontSize: 16,
		color: "silver",
	},

	bodyText: {
		fontSize: 20,
	},
	scrollView: {
		paddingVertical: 10,
	},
});
