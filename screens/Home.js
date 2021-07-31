import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Image, SafeAreaView } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import {
	widthPercentageToDP,
	heightPercentageToDP,
} from "react-native-responsive-screen";
import { format } from "date-fns";
import { FlatList } from "react-native-gesture-handler";
import { LessonCard } from "../components";
import { primary } from "../constants/Colors";
import { showMessage } from "react-native-flash-message";
import { InitDataContext } from "../providers/InitDataProvider";
import { ModulesContext } from "../providers/ModulesProvider";

function ListHeader() {
	return (
		<InitDataContext.Consumer>
			{({ userProfile }) => {
				// console.log(userProfile);
				return (
					<View style={styles.listHeaderView}>
						<TextInput
							style={styles.input}
							label="I am due on"
							value={format(
								userProfile?.date || new Date(),
								"EEEE, MMMM do, yyyy"
							)}
							showSoftInputOnFocus={false}
							disabled
						></TextInput>
						<Text style={[styles.text, styles.centerAlign]}>
							You can successfuly control your gestational diabetes{"\n\n"}Learn
							more about GDM, track your pregnancy and schedule your health
							appointments.
						</Text>
					</View>
				);
			}}
		</InitDataContext.Consumer>
	);
}

function ListFooter({ navigation }) {
	return (
		<View style={styles.listFooterView}>
			<Button
				onPress={() => {
					navigation.push("Categories");
				}}
				style={styles.btn}
			>
				<Text style={styles.btnText}>View All Modules</Text>
			</Button>
		</View>
	);
}

function ListEmptyComponent() {
	return (
		<View style={styles.listFooterView}>
			<Text style={[styles.text, styles.centerAlign, styles.muted]}>
				Your recently viewed modules will appear here
			</Text>
		</View>
	);
}

export default function Home({ navigation }) {
	const { updateQuestionnaireResponse } = useContext(InitDataContext);

	useEffect(() => {
		updateQuestionnaireResponse();
	}, []);

	return (
		<InitDataContext.Consumer>
			{({ recentlyViewed }) => {
				// console.log("recentlyViewed", recentlyViewed);
				return (
					<ModulesContext.Consumer>
						{({ modules }) => (
							<View style={styles.container}>
								<FlatList
									ListEmptyComponent={<ListEmptyComponent></ListEmptyComponent>}
									ListHeaderComponent={<ListHeader></ListHeader>}
									showsHorizontalScrollIndicator={false}
									showsVerticalScrollIndicator={false}
									numColumns={3}
									data={recentlyViewed}
									renderItem={({ item, index }) => (
										<LessonCard
											item={item}
											onPress={() => {
												navigation.navigate("Module", {
													item: item,
													index,
													modules: [
														...modules["Self-Care"],
														...modules["Medical"],
														...modules["Stess & Anxiety"],
														...modules["Support"],
													],
												});
											}}
										></LessonCard>
									)}
									columnWrapperStyle={{ justifyContent: "space-evenly" }}
									ItemSeparatorComponent={() => (
										<View style={{ height: 12 }}></View>
									)}
									ListFooterComponent={
										<ListFooter navigation={navigation}></ListFooter>
									}
								></FlatList>
							</View>
						)}
					</ModulesContext.Consumer>
				);
			}}
		</InitDataContext.Consumer>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		flex: 1,
	},
	listHeaderView: {
		paddingTop: 20,
		paddingHorizontal: 20,
	},
	input: {
		marginBottom: 28,
		backgroundColor: "white",
		borderColor: "#eaeaea",
		borderWidth: 2,
	},
	text: {
		fontSize: 16,
		width: widthPercentageToDP("90%"),
		marginBottom: 32,
	},
	centerAlign: {
		textAlign: "center",
	},
	listFooterView: {
		paddingVertical: 30,
		paddingHorizontal: 20,
	},
	btn: {
		backgroundColor: primary,
	},
	btnText: {
		color: "white",
		fontWeight: "bold",
	},
	muted: {
		color: "grey",
	},
});
