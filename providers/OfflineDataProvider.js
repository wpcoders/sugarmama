import React, { useState, useEffect, createContext, useContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import _ from "lodash";
import { format } from "date-fns";

export const OfflineDataContext = createContext();

export function OfflineDataProvider(props) {
	const [notes, setNotes] = useState([]);
	const [createdNotes, setCreatedNotes] = useState([]);

	const getNotes = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem("notes");
			// console.log("jsonValue", jsonValue);
			setNotes(() => (jsonValue != null ? JSON.parse(jsonValue) : []));
		} catch (e) {
			console.log(e.message);
		}
	};

	const saveNote = async (note) => {
		try {
			setNotes([...notes, { title: note, createdAt: Date.now(), note }]);
			const jsonValue = JSON.stringify([
				...notes,
				{ title: note, createdAt: Date.now(), note },
			]);
			await AsyncStorage.setItem("notes", jsonValue);
		} catch (e) {
			console.log(e.message);
		}
	};

	const getCreatedNotes = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem("createdNotes");
			// console.log("createdNotes", jsonValue);
			setCreatedNotes(() => (jsonValue != null ? JSON.parse(jsonValue) : []));
		} catch (e) {
			console.log(e.message);
		}
	};

	const addNote = (note) => {
		const date = new Date();
		const section = createdNotes.find(
			(section) => section.title === format(date, "EEEE, MMMM do, yyyy")
		) || { title: format(date, "EEEE, MMMM do, yyyy"), data: [] };
		section.data.push(note);

		const updatedNotes = createdNotes.filter(
			(section) => section.title !== format(date, "EEEE, MMMM do, yyyy")
		);

		setCreatedNotes([...updatedNotes, section]);
	};

	const updateNote = (note) => {
		try {
			const section = createdNotes.find(
				(section) =>
					section.title ===
					format(new Date(note.createdAt), "EEEE, MMMM do, yyyy")
			);
			console.log(
				"section",
				section,
				format(new Date(note.createdAt), "EEEE, MMMM do, yyyy")
			);
			const updatedSectionData = section.data.filter(
				(existingNote) => existingNote.id !== note.id
			);
			section.data = updatedSectionData;
			const date = new Date();
			const newSection = createdNotes.find(
				(section) => section.title === format(date, "EEEE, MMMM do, yyyy")
			) || { title: format(date, "EEEE, MMMM do, yyyy"), data: [] };
			newSection.data.push(note);
			let updatedNotes = createdNotes.filter(
				(section) => section.title !== format(date, "EEEE, MMMM do, yyyy")
			);
			updatedNotes = updatedNotes.filter(
				(existingSection) => existingSection.title !== section.title
			);

			if (section.title !== newSection.title)
				setCreatedNotes([...updatedNotes, section, newSection]);
			else setCreatedNotes([...updatedNotes, newSection]);
		} catch (error) {
			alert("Something went wrong. Report this to the developer");
		}
	};

	const syncStateWithStorage = () => {
		const jsonValue = JSON.stringify(createdNotes);
		AsyncStorage.setItem("createdNotes", jsonValue);
	};

	return (
		<OfflineDataContext.Provider
			value={{
				notes,
				getNotes,
				saveNote,
				createdNotes,
				getCreatedNotes,
				addNote,
				updateNote,
				syncStateWithStorage,
			}}
		>
			{props.children}
		</OfflineDataContext.Provider>
	);
}
