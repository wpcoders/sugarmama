import React from "react";
import {StyleSheet, View} from "react-native";
import {Button, Card, Title, Paragraph} from "react-native-paper";
import {widthPercentageToDP} from "react-native-responsive-screen";

export default function LessonCard({onPress, item}) {
    return (
        <Card style={styles.card} onPress={onPress}>
            <Card.Cover style={{height: 120}} source={{uri: item.image}}/>
            <Card.Actions style={{backgroundColor: 'rgba(0, 0, 0, 0.8)', height: 40, marginTop: -40}}>
                <Card.Title
                    titleStyle={{color: 'white', fontSize: 12, marginLeft: -7}}
                    numberOfLines={1}
                    title={item.title}
                />
            </Card.Actions>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        marginTop: 20,
        width: widthPercentageToDP("30%"),
    },
});
