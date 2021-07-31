import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import RNCalendarEvents from "react-native-calendar-events";
import { format, add, differenceInMilliseconds, parseISO } from "date-fns";
import Modal from "react-native-modal";
// import { TouchableOpacity } from "react-native-gesture-handler";

const DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.sssz";

export default function Appointments() {
	const [showModal, setShowModal] = useState(false);
	const [day, setDay] = useState(null);
	const [title, setTitle] = useState("");
	const isAuthorized = (permission) => permission === "authorized";

	const getCalendarPermission = async () => {
		console.log("Calendar permissions");
		try {
			const permission = await RNCalendarEvents.checkPermissions();
			if (!isAuthorized(permission))
				await RNCalendarEvents.requestPermissions();
			console.log(permission);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getCalendarPermission();
	}, []);

	const [events, setEvents] = useState([]);
	const [upcomingEvent, setUpcomingEvent] = useState(undefined);

	const getAllEvents = async () => {
		const fetchedEvents = await RNCalendarEvents.fetchAllEvents(
			format(new Date(), DATE_FORMAT),
			format(add(new Date(), { years: 1 }), DATE_FORMAT)
		);
		console.log("events", fetchedEvents);
		setEvents(fetchedEvents);
	};

	useEffect(() => {
		getAllEvents();
	}, []);

	const getUpcomingEvents = () => {
		const filteredEvents = events.filter(
			(event) =>
				differenceInMilliseconds(parseISO(event.startDate), new Date()) > 0
		);
		console.log("Upcoming", filteredEvents);
		console.log(filteredEvents[0]);
		setUpcomingEvent(filteredEvents[0]);
	};

	useEffect(() => {
		getUpcomingEvents();
	}, [events]);

	const displayAppointmentModal = (day) => {
		setDay(day);
		setShowModal(true);
	};

	const hideAppointmentModal = () => {
		setShowModal(false);
	};

	const saveAppointment = () => {
		RNCalendarEvents.saveEvent(title, {
			startDate: new Date(day.dateString).toISOString(),
			endDate: new Date(day.dateString).toISOString(),
			allDay: true,
		}).then(() => {
			setTitle("");
			getAllEvents();
			hideAppointmentModal();
		});
	};

	return (
		<View style={styles.container}>
			<Calendar onDayPress={displayAppointmentModal}></Calendar>
			<View style={styles.upcomingEventsContainer}>
				<Text style={styles.header}>Upcoming</Text>
				{upcomingEvent && (
					<View style={styles.upcomingEvent}>
						<Text style={styles.title}>{upcomingEvent.title}</Text>
						<Text style={styles.date}>
							{format(parseISO(upcomingEvent.startDate), "MMMM do yyyy")}
						</Text>
					</View>
				)}
			</View>
			<Modal
				isVisible={showModal}
				onBackButtonPress={hideAppointmentModal}
				onBackdropPress={hideAppointmentModal}
				style={{ margin: 0, justifyContent: "flex-end" }}
			>
				<View style={styles.modalView}>
					<View style={styles.actionBtnContainer}>
						<TouchableOpacity onPress={hideAppointmentModal}>
							<Text style={styles.actionBtn}>Cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={saveAppointment}>
							<Text style={styles.actionBtn}>Save</Text>
						</TouchableOpacity>
					</View>
					<TextInput
						onChangeText={(value) => {
							setTitle(value);
						}}
						value={title}
						placeholder="Title for the appointment"
					></TextInput>
					<Text style={styles.date}>
						Date:{" "}
						{format(
							new Date(day ? day?.dateString : Date.now()),
							"MMMM do yyyy"
						)}
					</Text>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		flex: 1,
	},
	upcomingEventsContainer: {
		paddingHorizontal: 20,
		marginTop: 20,
	},
	upcomingEvent: {
		padding: 20,
	},
	header: {
		fontSize: 16,
		color: "grey",
	},
	title: {
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 4,
	},
	date: {
		color: "grey",
		fontWeight: "200",
	},
	modalView: {
		backgroundColor: "white",
		paddingBottom: 60,
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	actionBtnContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	actionBtn: {
		color: "steelblue",
		fontSize: 16,
	},
	date: {
		fontSize: 16,
		marginTop: 10,
		padding: 10,
	},
});
