import React, { useState, useEffect, createContext, useContext } from "react";
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "./AuthProvider";
import AsyncStorage from "@react-native-community/async-storage";
import { showMessage } from "react-native-flash-message";

export const ModulesContext = createContext();

export function ModulesProvider(props) {
	const [modules, setModules] = useState({});
	const [currentModule, setCurrentModule] = useState(null);
	const [currentCount, setCurrentCount] = useState(200);
	const [savedModules, setSavedModules] = useState([]);

	const updateCurrentModule = (value) => {
		setCurrentModule(value);
	};

	const updateCount = (value) => {
		setCurrentCount(value);
	};

	const getModulesAsync = async (limit = 200) => {
		console.log("GETTING MODULES");
		const snapshot = await firestore()
			.collection("modules")
			.limit(limit)
			.orderBy("createdAt", "desc")
			.get();
		const modules = {};
		console.log(snapshot.size);
		snapshot.forEach((doc) => {
			let category = doc.data().category;
			if (modules[category])
				modules[category] = [
					...modules[category],
					{ id: doc.id, ...doc.data() },
				];
			else modules[category] = [{ id: doc.id, ...doc.data() }];
		});
		// console.log(modules);
		setModules({ ...modules });
	};

	const getSavedModules = async () => {
		console.log("GETTING SAVED MODULES");
		AsyncStorage.getItem("savedModules", (err, result) => {
			const modules = JSON.parse(result);
			if (modules !== null) setSavedModules([...new Set([modules])]);
		});
	};

	const saveModule = async () => {
		AsyncStorage.setItem(
			"savedModules",
			JSON.stringify([...new Set([...savedModules, currentModule])])
		);
		setSavedModules([...new Set([...savedModules, currentModule])]);
		showMessage({ message: "Module Saved", titleProps: "OK" });
	};

	return (
		<ModulesContext.Provider
			value={{
				currentCount,
				updateCount,
				modules,
				getModulesAsync,
				getSavedModules,
				saveModule,
				savedModules,
				currentModule,
				updateCurrentModule,
			}}
		>
			{props.children}
		</ModulesContext.Provider>
	);
}
