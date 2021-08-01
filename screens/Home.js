import React, {useState, useEffect, useContext} from "react";
import {StyleSheet, View, Image, SafeAreaView, Dimensions} from "react-native";
import {Text, Button, TextInput} from "react-native-paper";
import {
    widthPercentageToDP,
    heightPercentageToDP,
} from "react-native-responsive-screen";
import {format} from "date-fns";
import {FlatList} from "react-native-gesture-handler";
import {LessonCard} from "../components";
import {primary} from "../constants/Colors";
import {showMessage} from "react-native-flash-message";
import {InitDataContext} from "../providers/InitDataProvider";
import {ModulesContext} from "../providers/ModulesProvider";
import _ from 'lodash';

function ListHeader() {
    return (
        <InitDataContext.Consumer>
            {({userProfile}) => {
                // console.log(userProfile);
                return (
                    <View style={styles.listHeaderView}>
                        <View style={{marginBottom: 20}}>
                            <Text style={{fontSize: 20}}>
                                I'm due on:
                            </Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            label="I am due on"
                            value={format(
                                userProfile?.date || new Date(),
                                "EEEE, MMMM do, yyyy"
                            )}
                            showSoftInputOnFocus={false}
                            disabled
                        />
                        <Text style={[styles.text, styles.centerAlign]}>
                            You can successfuly control your gestational diabetes{"\n\n"}Learn
                            more about GDM, track your pregnancy and schedule your health
                            appointments.
                        </Text>
                    </View>
                );
            }}
        </InitDataContext.Consumer>
    );
}

function ListFooter({navigation}) {
    return (
        <View style={styles.listFooterView}>
            <Button
                labelStyle={{color: '#fff'}}
                icon = "plus"
                onPress={() => {
                    navigation.push("Categories");
                }}
                mode="contained"
                style={styles.btn}
            >
                <Text style={styles.btnText}>VIEW ALL</Text>
            </Button>
        </View>
    );
}

function ListEmptyComponent() {
    return (
        <View style={styles.listFooterView}>
            <Text style={[styles.text, styles.centerAlign, styles.muted]}>
                Your recently viewed modules will appear here
            </Text>
        </View>
    );
}

export default function Home({navigation}) {
    const {height, width} = Dimensions.get('window')
    const {updateQuestionnaireResponse, recentlyViewed} = useContext(InitDataContext);
    const {modules} = useContext(ModulesContext);

    useEffect(() => {
        console.log(_.size(modules))
        console.log('101', _.findIndex(recentlyViewed, {title: 'Self-care 101'}) !== -1)
        console.log('GDM', _.findIndex(recentlyViewed, {title: 'What is Gestational Diabetes (GDM)?'}) !== -1);
        console.log('blood glucose', _.findIndex(recentlyViewed, {title: 'How stress affects your blood glucose levels'}) !== -1)
    })

    function defaultModules() {
        return _.compact([
            _.find(_.get(modules, 'Self-Care', null), {title: 'Self-care 101'}),
            _.find(_.get(modules, 'Medical', null), {title: 'What is Gestational Diabetes (GDM)?'}),
            _.find(_.get(modules, 'Stess & Anxiety', null), {title: 'How stress affects your blood glucose levels'}),
        ])
    }

    function displayModules() {
        if (_.findIndex(recentlyViewed, {title: 'Self-care 101'}) !== -1 &&
            _.findIndex(recentlyViewed, {title: 'What is Gestational Diabetes (GDM)?'}) !== -1 &&
            _.findIndex(recentlyViewed, {title: 'How stress affects your blood glucose levels'}) !== -1
        ) {
            return _.takeRight(recentlyViewed, 3)
        } else {
            return defaultModules()
        }
    }

    useEffect(() => {
        updateQuestionnaireResponse();
    }, []);

    return (
        <View style={styles.container}>
            {
                _.size(modules) > 0 &&
                <FlatList
                    ListEmptyComponent={<ListEmptyComponent/>}
                    ListHeaderComponent={<ListHeader/>}
                    ListFooterComponentStyle={{width: width*0.5, marginLeft: width*0.25}}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    numColumns={3}
                    data={displayModules()}
                    renderItem={({item, index}) => (
                        <LessonCard
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
                    columnWrapperStyle={{justifyContent: "space-evenly"}}
                    ItemSeparatorComponent={() => (
                        <View style={{height: 12}}/>
                    )}
                    ListFooterComponent={
                        <ListFooter navigation={navigation}/>
                    }
                />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
    },
    listHeaderView: {
        paddingTop: 30,
        paddingHorizontal: 20,
        flexDirection: 'column',
        flex: 1
    },
    input: {
        marginBottom: 28,
        backgroundColor: "white",
        borderColor: "#eaeaea",
        borderWidth: 2,
    },
    text: {
        fontSize: 16,
        width: widthPercentageToDP("90%"),
        marginBottom: 32,
    },
    centerAlign: {
        textAlign: "left",
    },
    listFooterView: {
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    btn: {
        backgroundColor: primary,
        color: 'white'
    },
    btnText: {
        color: "white",
        fontWeight: "bold",
    },
    muted: {
        color: "grey",
    },
});
