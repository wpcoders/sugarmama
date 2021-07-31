import React, { useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { Goal } from "../components";
import { FlatList } from "react-native-gesture-handler";
import { primary } from "../constants/Colors";
import { InitDataContext } from "../providers/InitDataProvider";

function Spacer({ space }) {
	return <View style={{ height: space }}></View>;
}

export default function Goals() {
	return (
		<InitDataContext.Consumer>
			{({ goals }) => (
				<View style={{ flex: 1, backgroundColor: primary }}>
					<FlatList
						keyExtractor={(item) => item.goal}
						data={goals}
						ListHeaderComponent={<Spacer space={20}></Spacer>}
						ListFooterComponent={<Spacer space={12}></Spacer>}
						renderItem={({ item, index }) => (
							<Goal
								key={index}
								id={item.id}
								goal={item.goal}
								completed={item.completed}
							></Goal>
						)}
						ItemSeparatorComponent={() => <Spacer space={16}></Spacer>}
						contentContainerStyle={styles.container}
					></FlatList>
				</View>
			)}
		</InitDataContext.Consumer>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: primary,
		alignItems: "center",
	},
	btn: {
		width: widthPercentageToDP("90%"),
		paddingVertical: 24,
		backgroundColor: "lightgrey",
		marginBottom: 20,
	},
	btnText: {
		color: "grey",
		textTransform: "uppercase",
		fontSize: 16,
		fontWeight: "bold",
	},
});
