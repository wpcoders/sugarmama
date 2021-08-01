import React, {useContext, useEffect, useState} from "react";
import {StyleSheet, View, Image, SafeAreaView} from "react-native";
import {Text, Button, TextInput} from "react-native-paper";
import {
    widthPercentageToDP,
    heightPercentageToDP,
} from "react-native-responsive-screen";
import {format} from "date-fns";
import {FlatList} from "react-native-gesture-handler";
import {ModuleCard} from "../components";
import {ModulesContext} from "../providers/ModulesProvider";

export default function Modules({navigation, route}) {
    const {category} = route.params;

    const {getModulesAsync, currentCount, updateCount} =
        useContext(ModulesContext);

    return (
        <ModulesContext.Consumer>
            {({modules}) => (
                <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
                    <FlatList
                        numColumns={2}
                        data={modules[category]}
                        renderItem={({item, index}) => (
                            <ModuleCard
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
                            />
                        )}
                        style={{
                            width: widthPercentageToDP("100%"),
                        }}
                        contentContainerStyle={{
                            justifyContent: "space-around",
                        }}
                        onEndReached={() => {
                            console.log("END REACHED");
                            getModulesAsync(currentCount + 20);
                            updateCount(currentCount + 20);
                        }}
                    />
                </SafeAreaView>
            )}
        </ModulesContext.Consumer>
    );
}
