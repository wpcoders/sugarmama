import React, {useState} from "react";
import {KeyboardAvoidingView, StyleSheet, View} from "react-native";
import {Text, TextInput, Button, ActivityIndicator} from "react-native-paper";
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from "react-native-responsive-screen";
import {AuthContext} from "../providers/AuthProvider";
import analytics from "@react-native-firebase/analytics";
import {ScrollView} from "react-native-gesture-handler";

export default function SignUp({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <AuthContext.Consumer>
            {({signUp, isLoading}) => (
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <Text style={styles.header}>Sign Up</Text>
                    <TextInput
                        onChangeText={(value) => {
                            setEmail(value);
                        }}
                        style={styles.input}
                        label="Email"
                        autoCompleteType="email"
                        autoCapitalize="none"
                    />
                    <TextInput
                        onChangeText={(value) => {
                            setPassword(value);
                        }}
                        secureTextEntry
                        style={styles.input}
                        label="Password"
                        autoCompleteType="password"
                        autoCapitalize="none"
                    />
                    <Button
                        loading={isLoading}
                        onPress={async () => {
                            try {
                                await analytics().logSignUp({method: "email"});
                                if (email && password) signUp(email.trim(), password.trim());
                            } catch {
                                e => {
                                    console.log(e)
                                }
                            }
                        }}
                        style={[styles.btn, {marginBottom: 20}]}
                    >
                        {!isLoading && <Text style={styles.btnText}>SignUp</Text>}
                    </Button>
                    <Button
                        style={styles.signUp}
                        onPress={() => {
                            navigation.navigate("Login");
                        }}
                    >
                        <Text style={styles.btnText}>Already have an account?</Text>
                    </Button>
                </KeyboardAvoidingView>
            )}
        </AuthContext.Consumer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#a5d6cb",
        alignItems: "center",
        justifyContent: "center",
        minHeight: heightPercentageToDP("70%"),
    },
    header: {
        color: "white",
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 32,
    },
    input: {
        width: widthPercentageToDP("90%"),
        marginBottom: 28,
        backgroundColor: "white",
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
    signUp: {
        position: "absolute",
        bottom: 60,
    },
});
