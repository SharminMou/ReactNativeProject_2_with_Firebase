import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Card, Button, Text, Avatar, Input, Header } from "react-native-elements";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigation } from "@react-navigation/native";

const CommentComponent = (props) => {
    return (

        <View>
            <Card containerStyle={styles.cardViewStyle}>
                
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            containerStyle={{ backgroundColor: "#9ad3bc", }}
                            rounded
                            icon={{ name: "user", type: "font-awesome", color: "black" }}
                            activeOpacity={1}
                        />

                        <Text style={styles.textStyle} > {props.name} </Text>
                    </View>
                    <Text style={{ fontStyle: "italic" }}> {props.date} </Text>

                </View>
                <Text
                    style={{
                        paddingVertical: 10,
                    }}
                >
                    {props.comment}
                </Text>

            </Card>

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
        fontSize: 15,
        fontWeight: 'bold',

    }
});
export default CommentComponent;