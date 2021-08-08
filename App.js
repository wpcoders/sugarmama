import "react-native-gesture-handler";
import {StatusBar} from "expo-status-bar";
import React, {useEffect} from "react";
import {DefaultTheme, Provider as PaperProvider} from "react-native-paper";
import {Notes} from "./screens";
import {NavigationContainer} from "@react-navigation/native";
import RootStack from "./navigation/RootStack";
import FlashMessage from "react-native-flash-message";
import {QuickTip} from "./components";
import {AuthProvider} from "./providers/AuthProvider";
import {InitDataProvider} from "./providers/InitDataProvider";
import {ModulesProvider} from "./providers/ModulesProvider";
import {OfflineDataProvider} from "./providers/OfflineDataProvider";
import AsyncStorage from "@react-native-community/async-storage";

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: "#7ea39c",
        accent: "#fbcd31",
    },
};

export default function App() {
    // Reset saved modules in development environment
    //
    // useEffect(() => {
    // 	AsyncStorage.removeItem("savedModules");
    // }, []);

    return (
        <NavigationContainer>
            <AuthProvider>
                <InitDataProvider>
                    <OfflineDataProvider>
                        <ModulesProvider>
                            <PaperProvider theme={theme}>
                                <StatusBar style="light"/>
                                <RootStack></RootStack>
                                <FlashMessage
                                    position="center"
                                    MessageComponent={(options) => (
                                        <QuickTip options={options}></QuickTip>
                                    )}
                                    hideOnPress={true}
                                />
                            </PaperProvider>
                        </ModulesProvider>
                    </OfflineDataProvider>
                </InitDataProvider>
            </AuthProvider>
        </NavigationContainer>
    );
}
