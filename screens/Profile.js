import React, {useContext, useState, useRef, useEffect} from "react";
import {View, StyleSheet, Platform} from "react-native";
import {TextInput, Text, Menu, Button} from "react-native-paper";
import {format} from "date-fns";
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import {primary} from "../constants/Colors";
import {AuthContext} from "../providers/AuthProvider";
import {InitDataContext} from "../providers/InitDataProvider";
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import PushNotification from "react-native-push-notification";
import _ from "lodash";
import moment from 'moment';

export default function Profile() {
    const [currentSetting, setCurrentSetting] = useState(null);
    const [date, setDate] = useState(new Date());
    const [alarms, setAlarms] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [management, setManagement] = useState("Select...");
    const [visible, setVisible] = React.useState(false);
    const initialDataContext = useContext(InitDataContext);
    const {updateProfile, userProfile} = initialDataContext;
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const dateInputRef = useRef(null);

    useEffect(() => {
        PushNotification.checkPermissions((result) => {
            console.log(result);
            if (!result.alert)
                PushNotification.requestPermissions(["alert", "badge", "sound"]);
        });
    });

    useEffect(() => {
        if (Platform.OS === "android") {
            onSave();
        }
    }, [date])

    const openModal = () => {
        console.log("Opening modal", showDateTimePicker);
        console.log(Platform.OS);
        Platform.OS === "android"
            ? setShowDateTimePicker(true)
            : setModalVisible(true);
    };
    const closeModal = () => {
        console.log("Closing modal");
        Platform.OS === "android"
            ? setShowDateTimePicker(false)
            : setModalVisible(false);
    };

    const openMenu = () => {
        setVisible(true);
    };

    const closeMenu = () => {
        setVisible(false);
    };

    const _showModal = () => {
        setShowModal(true);
    };

    const _hideModal = () => {
        setShowModal(false);
    };

    const _renderAnchor = () => {
        return (
            <InitDataContext.Consumer>
                {({userProfile}) => (
                    <View style={styles.anchorContatiner}>
                        <TextInput
                            style={{flex: 1, backgroundColor: "white"}}
                            label="My current management is"
                            value={userProfile.management}
                            showSoftInputOnFocus={false}
                            disabled
                        />
                        <Button onPress={openMenu}>Select</Button>
                    </View>
                )}
            </InitDataContext.Consumer>
        );
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        console.log({event});
        if (event.type === 'set') setDate(moment(currentDate).startOf('minute').utc().toDate());
        else (closeModal())
    };

    const onSave = async () => {
        console.log("Saving...", Platform.OS);
        closeModal();

        switch (currentSetting) {
            case "breakfast":
                // console.log({userProfile})
                await updateProfile("alarms", {...userProfile.alarms, breakfast: date});
                PushNotification.getScheduledLocalNotifications((notifications) => {
                    // console.log(notifications)
                    const reminder = notifications.find(
                        (notification) => notification.message === "Breakfast reminder"
                    );
                    if (reminder)
                        PushNotification.cancelLocalNotifications({id: reminder.id});
                });
                console.log({date});
                PushNotification.localNotificationSchedule({
                    channelId: "channel-id",
                    /* Android Only Properties */
                    ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)

                    /* iOS and Android properties */
                    id: _.uniqueId(),
                    message: "Breakfast reminder", // (required)
                    repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
                    date: moment(date).local().toDate(),
                });
                PushNotification.getScheduledLocalNotifications((notifications) => {
                    console.log(_.tail(notifications))
                })
                break;
            case "lunch":
                await updateProfile("alarms", {...userProfile.alarms, lunch: date});
                PushNotification.getScheduledLocalNotifications((notifications) => {
                    const reminder = notifications.find(
                        (notification) => notification.message === "Lunch reminder"
                    );
                    if (reminder)
                        PushNotification.cancelLocalNotifications({id: reminder.id});
                });
                PushNotification.localNotificationSchedule({
                    channelId: "channel-id",
                    /* Android Only Properties */
                    ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)

                    /* iOS and Android properties */
                    message: "Lunch reminder", // (required)
                    repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
                    date: moment(date).toDate(),
                });
                break;
            case "dinner":
                await updateProfile("alarms", {...userProfile.alarms, dinner: date});
                PushNotification.getScheduledLocalNotifications((notifications) => {
                    const reminder = notifications.find(
                        (notification) => notification.message === "Dinner reminder"
                    );
                    if (reminder)
                        PushNotification.cancelLocalNotifications({id: reminder.id});
                });
                PushNotification.localNotificationSchedule({
                    channelId: "channel-id",
                    /* Android Only Properties */
                    ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)

                    /* iOS and Android properties */
                    message: "Dinner reminder", // (required)
                    repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
                    date: moment(date).toDate(),
                });
                break;
            default:
                break;
        }
    };

    return (
        <AuthContext.Consumer>
            {({signOut}) => (
                <InitDataContext.Consumer>
                    {({userProfile, updateProfile}) => {
                        // console.log(userProfile);
                        return (
                            <>
                                <ScrollView style={styles.container}>
                                    <View style={styles.personalInfo}>
                                        <Text style={styles.name}>{userProfile.name}</Text>
                                        <TextInput
                                            style={styles.input}
                                            label="I am due on"
                                            value={format(
                                                userProfile.date || new Date(),
                                                "EEEE, MMMM do, yyyy"
                                            )}
                                            showSoftInputOnFocus={false}
                                            ref={dateInputRef}
                                            onFocus={() => {
                                                dateInputRef.current.blur();
                                                _showModal();
                                            }}
                                        />
                                        <Menu
                                            visible={visible}
                                            onDismiss={closeMenu}
                                            anchor={_renderAnchor()}
                                        >
                                            <Menu.Item
                                                onPress={(e) => {
                                                    updateProfile("management", "Diet & excercise");
                                                    closeMenu();
                                                }}
                                                title="Diet & excercise"
                                            />
                                            <Menu.Item
                                                onPress={() => {
                                                    updateProfile("management", "Insulin");
                                                    closeMenu();
                                                }}
                                                title="Insulin"
                                            />
                                            <Menu.Item
                                                onPress={() => {
                                                    updateProfile("management", "Metformin");
                                                    closeMenu();
                                                }}
                                                title="Metformin"
                                            />
                                        </Menu>
                                    </View>
                                    <View>
                                        <Text style={styles.name}>Notifications</Text>
                                        <TouchableOpacity
                                            style={[styles.notificationSetting, styles.bottomBorder]}
                                            onPress={() => {
                                                openModal();
                                                setCurrentSetting("breakfast");
                                            }}
                                        >
                                            <Text style={styles.title}>
                                                {userProfile.alarms?.breakfast
                                                    ? String(userProfile.alarms?.breakfast)
                                                        .split(" ")[4]
                                                        .split(":")[0] +
                                                    ":" +
                                                    String(userProfile.alarms?.breakfast)
                                                        .split(" ")[4]
                                                        .split(":")[1]
                                                    : "Set reminder"}
                                            </Text>
                                            <Text style={styles.subtitle}>
                                                Notification Breakfast
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.notificationSetting, styles.bottomBorder]}
                                            onPress={() => {
                                                openModal();
                                                setCurrentSetting("lunch");
                                            }}
                                        >
                                            <Text style={styles.title}>
                                                {userProfile.alarms?.lunch
                                                    ? String(userProfile.alarms?.lunch)
                                                        .split(" ")[4]
                                                        .split(":")[0] +
                                                    ":" +
                                                    String(userProfile.alarms?.lunch)
                                                        .split(" ")[4]
                                                        .split(":")[1]
                                                    : "Set reminder"}
                                            </Text>
                                            <Text style={styles.subtitle}>Notification Lunch</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.notificationSetting}
                                            onPress={() => {
                                                openModal();
                                                setCurrentSetting("dinner");
                                            }}
                                        >
                                            <Text style={styles.title}>
                                                {userProfile.alarms?.dinner
                                                    ? String(userProfile.alarms?.dinner)
                                                        .split(" ")[4]
                                                        .split(":")[0] +
                                                    ":" +
                                                    String(userProfile.alarms?.dinner)
                                                        .split(" ")[4]
                                                        .split(":")[1]
                                                    : "Set reminder"}
                                            </Text>
                                            <Text style={styles.subtitle}>Notification Dinner</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Button
                                        onPress={() => {
                                            signOut();
                                        }}
                                        style={styles.logoutBtn}
                                    >
                                        <Text style={styles.btnText}>Logout</Text>
                                    </Button>
                                    {showDateTimePicker && (
                                        <DateTimePicker
                                            onChange={onChange}
                                            mode="time"
                                            value={date}
                                        />
                                    )}
                                </ScrollView>

                                <Modal
                                    onBackdropPress={closeModal}
                                    isVisible={modalVisible}
                                    style={styles.modal}
                                >
                                    <View style={styles.modalView}>
                                        <View style={styles.modalBtnContainer}>
                                            <TouchableOpacity onPress={closeModal}>
                                                <Text style={styles.modalBtn}>Cancel</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={onSave}>
                                                <Text style={styles.modalBtn}>Save</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <DateTimePicker
                                            onChange={onChange}
                                            mode="time"
                                            value={date}
                                        />
                                    </View>
                                </Modal>

                                <Modal
                                    onBackdropPress={_hideModal}
                                    onBackButtonPress={_hideModal}
                                    isVisible={showModal && Platform.OS === "ios"}
                                >
                                    <View style={styles.dueDateModal}>
                                        <DateTimePicker
                                            mode="date"
                                            testID="dateTimePicker"
                                            is24Hour={true}
                                            display="default"
                                            value={userProfile.date || new Date()}
                                            style={{width: "100%"}}
                                            onChange={(event, selectedDate) => {
                                                const currentDate = selectedDate || userProfile.date;
                                                updateProfile("date", currentDate);
                                            }}
                                            minimumDate={Date.now()}
                                        />
                                        <Button
                                            onPress={() => {
                                                _hideModal();
                                            }}
                                        >
                                            Submit
                                        </Button>
                                    </View>
                                </Modal>

                                {Platform.OS === "android" && showModal && (
                                    <DateTimePicker
                                        mode="date"
                                        testID="dateTimePicker"
                                        is24Hour={true}
                                        display="default"
                                        value={userProfile.date || new Date()}
                                        style={{width: "100%"}}
                                        onChange={(event, selectedDate) => {
                                            _hideModal();
                                            const currentDate = selectedDate || userProfile.date;
                                            updateProfile("date", currentDate);
                                        }}
                                        minimumDate={Date.now()}
                                    />
                                )}
                            </>
                        );
                    }}
                </InitDataContext.Consumer>
            )}
        </AuthContext.Consumer>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
    },
    input: {
        marginBottom: 28,
        backgroundColor: "white",
        borderColor: "#eaeaea",
        borderWidth: 2,
    },
    modalBtnContainer: {
        flexDirection: "row",
        paddingVertical: 20,
        paddingHorizontal: 10,
        justifyContent: "space-between",
    },
    modalBtn: {
        color: "steelblue",
        fontSize: 20,
    },
    name: {
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 32,
    },
    anchorContatiner: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#eaeaea",
        borderWidth: 2,
    },
    personalInfo: {
        paddingTop: 32,
        paddingHorizontal: 20,
        marginBottom: 32,
    },
    title: {
        fontSize: 16,
    },
    subtitle: {
        paddingVertical: 4,
        color: "grey",
    },
    notificationSetting: {
        paddingVertical: 16,
        marginLeft: 20,
    },
    bottomBorder: {
        borderBottomColor: "#eaeaea",
        borderBottomWidth: 2,
    },
    logoutBtn: {
        marginTop: 64,
        backgroundColor: primary,
        width: 250,
        alignSelf: "center",
        paddingVertical: 8,
        marginBottom: 20,
    },
    btnText: {
        color: "black",
        fontWeight: "bold",
    },
    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    modalView: {
        backgroundColor: "white",
        paddingBottom: 20,
    },
    dueDateModal: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 16,
    },
});
