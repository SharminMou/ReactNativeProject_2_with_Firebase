import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Card, Button, Text, Avatar, Input, Header } from "react-native-elements";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { getDataJSON } from "../functions/AsynchronousStorageFunctions";

const PostComponent = (props) => {
    const useStackNavigation = useNavigation();
    const [commentList, setCommentList] = useState([]);


    const getCommentData = async () => {
        await getDataJSON(props.post).then((data) => {
            if (data == null) {
                setCommentList([]);
            } else setCommentList(data);
        });
    };
    getCommentData();

    let numberOfComments = "";
    numberOfComments = "Comment(".concat(commentList.length.toString()).concat(")");

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
                        size='medium'
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
                        type="solid" title={numberOfComments} titleStyle={{ color: '#d1d4c9' }}
                        onPress={function () {
                            useStackNavigation.navigate("IndividualPost", { post: props.post, name: props.name, date: props.date });
                        }}


                    />
                </View>
            </Card>

        </View>
    )

}
export default PostComponent;

