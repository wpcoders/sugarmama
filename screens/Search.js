import React, { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Searchbar } from "react-native-paper";
import { ModuleCard } from "../components";
import { ModulesContext } from "../providers/ModulesProvider";

const ListHeaderComponent = ({ onChangeText, value }) => {
	return (
		<Searchbar
			placeholder="Search"
			onChangeText={onChangeText}
			value={value}
			style={{ marginBottom: 20 }}
		></Searchbar>
	);
};

const Search = ({ navigation }) => {
	const { modules } = useContext(ModulesContext);
	const [searchQuery, setSearchQuery] = useState("");
	const [stateModules, setStateModules] = useState([]);
	const [allModules, setAllModules] = useState([]);

	useEffect(() => {
		setAllModules(
			modules["Self-Care"].concat(
				modules["Medical"],
				modules["Stess & Anxiety"],
				modules["Anxiety"]
			)
		);
	}, []);

	const onChangeText = (value) => {
		setSearchQuery(value);
		setStateModules(
			allModules.filter((module) => {
				const itemData = module?.title.toUpperCase();
				const textData = value.toUpperCase();
				return itemData?.indexOf(textData) > -1;
			})
		);
	};

	return (
		<FlatList
			numColumns={2}
			contentContainerStyle={{ padding: 10 }}
			ListHeaderComponent={
				<ListHeaderComponent
					onChangeText={onChangeText}
					value={searchQuery}
				></ListHeaderComponent>
			}
			data={stateModules}
			keyExtractor={(item) => {
				return item.title;
			}}
			renderItem={({ item, index }) => (
				<ModuleCard
					item={item}
					onPress={() => {
						navigation.navigate("Module", { item: item, index, modules });
					}}
				></ModuleCard>
			)}
		></FlatList>
	);
};

export default Search;
