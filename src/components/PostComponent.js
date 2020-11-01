import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Card, Button, Text, Avatar, Input, Header } from "react-native-elements";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";

const PostComponent = (props) => {
    
    return (

        <View>
            <Card containerStyle={{ backgroundColor: '#d1d4c9' }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Avatar
                        containerStyle={{ backgroundColor: "#ffab91" }}
                        rounded
                        icon={{ name: "user", type: "font-awesome", color: "black" }}
                        activeOpacity={1}
                    />
                    <Text h4Style={{ padding: 10 }} h4>
                        {props.name}
                    </Text>
                </View>
                <Text style={{ fontStyle: "italic" }}> Posted on {props.date}</Text>
                <Text
                    style={{
                        paddingVertical: 10,
                    }}
                >
                    {props.post}
                </Text>
                <Card.Divider />
                <View
                    style={{ flexDirection: "row", justifyContent: "space-between" }}
                >
                    <Button buttonStyle={{ borderColor: '#556e53', borderWidth: 1 }}
                        type="outline"
                        title="  Like (21)"
                        titleStyle={{ color: '#556e53' }}
                        icon={<AntDesign name="like2" size={24} color='#556e53' />}
                    />
                    <Button buttonStyle={{ backgroundColor: '#556e53' }}
                        type="solid" title="Comment (7)" titleStyle={{ color: '#d1d4c9' }} />
                </View>
            </Card>

        </View>
    )

}
export default PostComponent;

