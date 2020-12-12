import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Card, Button, Text, Avatar, Input, Header } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Feather, AntDesign } from '@expo/vector-icons';
import * as firebase from "firebase";
import "firebase/firestore";
import Loading from '../components/Loading';

const NotificationComponent = (props) => {
    //console.log(props);
    const useStackNavigation = useNavigation();
    let notifyType = " ";

    if (props.type == "comment") {
        notifyType = props.notificationFrom.concat(" commented on your post");

    }
    else
        notifyType = props.notificationFrom.concat(" liked your post");


    return (

        <View style={{ alignItems: "center" }}>

            { (props.type == "comment") ?
                <Button buttonStyle={styles.buttonStyle}
                    type="clear"
                    icon={<FontAwesome name="comment" size={24} color='#152a38' />}
                    title={notifyType}
                    titleStyle={{ color: '#152a38' }}
                    onPress={function () {
                        useStackNavigation.navigate("IndividualPost",
                            {
                                post: props.post,
                                name: props.name,
                                date: props.date,
                                authorID: props.authorID,
                                postID: props.postID
                            });
                    }}

                /> :
                <Button buttonStyle={styles.buttonStyle}
                    type="clear"
                    icon={<AntDesign name="like1" size={24} color='#152a38' />}
                    title={notifyType}
                    titleStyle={{ color: '#152a38' }}
                    onPress={function () {
                        useStackNavigation.navigate("IndividualPost",
                            {
                                post: props.post,
                                name: props.name,
                                date: props.date,
                                authorID: props.authorID,
                                postID: props.postID
                            });
                    }}

                />
            }

        </View>


    )

};

const styles = StyleSheet.create({
    cardViewStyle: {
        fontSize: 30,
        backgroundColor: '#d1d4c9',
        width: '92%',
        alignSelf: "center",
    },
    textStyle: {
        fontSize: 13,

    },
    buttonStyle: {
        borderColor: '#d1d4c9',
        marginHorizontal: 10,
        borderBottomColor: '#152a38',
        borderWidth: 1,
    }
});
export default NotificationComponent;