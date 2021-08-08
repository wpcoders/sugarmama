import React, {useState, useRef} from "react";
import {StyleSheet, View, Platform} from "react-native";
import {Text, TextInput, Button, Menu} from "react-native-paper";
import {widthPercentageToDP} from "react-native-responsive-screen";
import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";
import {format} from "date-fns";
import CheckBox from "@react-native-community/checkbox";
import {
    ScrollView,
    TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import {InitDataContext} from "../providers/InitDataProvider";
import moment from "moment";
import _ from "lodash";
import PushNotification from "react-native-push-notification";

export default function Demographic({navigation}) {
    const [showModal, setValue] = useState(false);

    const dateInputRef = useRef();

    const [visible, setVisible] = React.useState(false);
    const [visible2, setVisible2] = React.useState(false);

    const openMenu = () => setVisible(true);
    const openManagementMenu = () => setVisible2(true);

    const closeMenu = () => setVisible(false);
    const closeManagementMenu = () => setVisible2(false);
    const setNotification = (demographic) => {
        console.log(moment(demographic.date).subtract(1, 'weeks'))
        moment(demographic.date).subtract(1, 'weeks')
        return PushNotification.localNotificationSchedule({
            channelId: "channel-id",
            /* Android Only Properties */
            ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)

            /* iOS and Android properties */
            id: _.uniqueId(),
            message: "Renew Profile", // (required)
            // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
            date: moment(demographic.date).subtract(1, 'weeks').toDate(),
        });
    }
    return (
        <InitDataContext.Consumer>
            {({demographic, _setValue}) => (
                <ScrollView contentContainerStyle={styles.container}>
                    <TextInput
                        onChangeText={(value) => {
                            _setValue("name", value);
                        }}
                        value={demographic.name}
                        style={styles.input}
                        label="Name"
                    ></TextInput>
                    <TextInput
                        style={styles.input}
                        keyboardType="number-pad"
                        label="Age"
                        value={demographic.age}
                        onChangeText={(value) => {
                            _setValue("age", value);
                        }}
                    ></TextInput>

                    <TextInput
                        style={styles.input}
                        label="Due Date"
                        value={format(demographic.date, "EEEE, MMMM do, yyyy")}
                        ref={dateInputRef}
                        onFocus={() => {
                            dateInputRef.current.blur();
                            setValue(true);
                        }}
                        showSoftInputOnFocus={false}
                    ></TextInput>

                    <TouchableWithoutFeedback
                        style={{
                            flexDirection: "row",
                            width: widthPercentageToDP("90%"),
                            alignItems: "center",
                            borderBottomColor: "grey",
                            borderBottomWidth: 0.5,
                            marginBottom: 10,
                            top: -10,
                        }}
                        onPress={openMenu}
                    >
                        <TextInput
                            style={{flex: 1, backgroundColor: "white"}}
                            label="Ethnicity"
                            disabled
                            value={demographic.ethnicity}
                        ></TextInput>
                        <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={
                                <Button onPress={openMenu}>
                                    Select{" "}
                                    <Ionicons
                                        name={
                                            Platform.OS === "ios" ? "ios-arrow-down" : "md-arrow-down"
                                        }
                                    ></Ionicons>
                                </Button>
                            }
                        >
                            <Menu.Item
                                onPress={(e) => {
                                    _setValue("ethnicity", "Brown");
                                    closeMenu();
                                }}
                                title="Brown"
                            />
                            <Menu.Item
                                onPress={() => {
                                    _setValue("ethnicity", "Caucasian");
                                    closeMenu();
                                }}
                                title="Caucasian"
                            />
                        </Menu>
                    </TouchableWithoutFeedback>
                    <TextInput
                        value={demographic.occupation}
                        onChangeText={(value) => {
                            _setValue("occupation", value);
                        }}
                        style={styles.input}
                        label="Occupation"
                    ></TextInput>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            disabled={false}
                            value={demographic.firstDiagnosis}
                            onValueChange={() =>
                                _setValue("firstDiagnosis", !demographic.firstDiagnosis)
                            }
                        />
                        <Text style={styles.checkBoxText}>
                            This is my first diagnosis of GDM
                        </Text>
                    </View>
                    <Text
                        style={{
                            width: widthPercentageToDP("90%"),
                            marginVertical: 20,
                            alignSelf: "center",
                            marginLeft: 15,
                        }}
                    >
                        How is your GDM currently managed? (diet & exercise, insulin,
                        metformin...)
                    </Text>
                    <TouchableWithoutFeedback
                        style={{
                            flexDirection: "row",
                            width: widthPercentageToDP("90%"),
                            alignItems: "center",
                            borderBottomColor: "grey",
                            borderBottomWidth: 0.5,
                            marginBottom: 10,
                            top: -10,
                        }}
                        onPress={openManagementMenu}
                    >
                        <TextInput
                            style={{flex: 1, backgroundColor: "white"}}
                            disabled
                            value={demographic.management}
                        ></TextInput>
                        <Menu
                            visible={visible2}
                            onDismiss={closeManagementMenu}
                            anchor={
                                <Button onPress={openManagementMenu}>
                                    <Text>
                                        Select{" "}
                                        <Ionicons
                                            name={
                                                Platform.OS === "ios"
                                                    ? "ios-arrow-down"
                                                    : "md-arrow-down"
                                            }
                                        ></Ionicons>
                                    </Text>
                                </Button>
                            }
                        >
                            <Menu.Item
                                onPress={(e) => {
                                    _setValue("management", "Diet & excercise");
                                    closeManagementMenu();
                                }}
                                title="Diet & excercise"
                            />
                            <Menu.Item
                                onPress={() => {
                                    _setValue("management", "Insulin");
                                    closeManagementMenu();
                                }}
                                title="Insulin"
                            />
                            <Menu.Item
                                onPress={() => {
                                    _setValue("management", "Metformin");
                                    closeManagementMenu();
                                }}
                                title="Metformin"
                            />
                        </Menu>
                    </TouchableWithoutFeedback>
                    <Button
                        style={styles.btn}
                        onPress={() => {
                            setNotification(demographic)
                            navigation.push("DES");
                        }}
                        disabled={
                            !demographic.name &&
                            !demographic.age &&
                            !demographic.dueDate &&
                            !demographic.ethinicity &&
                            !demographic.occupation &&
                            !demographic.management
                        }
                    >
                        <Text style={styles.btnText}>Submit</Text>
                    </Button>
                    <Modal isVisible={showModal}>
                        <View style={styles.modal}>
                            <DateTimePicker
                                mode="date"
                                testID="dateTimePicker"
                                is24Hour={true}
                                display="default"
                                value={demographic.date}
                                style={{width: "100%"}}
                                onChange={(event, selectedDate) => {
                                    const currentDate = selectedDate || demographic.date;
                                    _setValue("date", currentDate);
                                    if(event.type === 'set'){
                                        setValue(false)
                                    }
                                }}
                                minimumDate={Date.now()}
                            />
                            <Button
                                onPress={async () => {
                                    setValue(false);
                                }}
                            >
                                Submit
                            </Button>
                        </View>
                    </Modal>
                </ScrollView>
            )}
        </InitDataContext.Consumer>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingVertical: 20,
    },
    input: {
        width: widthPercentageToDP("90%"),
        marginBottom: 28,
        backgroundColor: "white",
    },
    modal: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 16,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: widthPercentageToDP("90%"),
        paddingStart: 8,
    },
    checkBoxText: {
        fontSize: 16,
        marginLeft: 8,
    },
    btn: {
        width: widthPercentageToDP("90%"),
        paddingVertical: 8,
        backgroundColor: "#fbcd31",
    },
    btnText: {
        color: "white",
        textTransform: "uppercase",
        fontSize: 16,
        fontWeight: "bold",
    },
});
