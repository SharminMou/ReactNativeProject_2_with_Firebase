import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Card, Button, Text, Avatar, Input, Header } from "react-native-elements";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { storeDataJSON, getDataJSON, removeData } from "../functions/AsynchronousStorageFunctions";
import moment from "moment";

const PostComponent = (props) => {
    const useStackNavigation = useNavigation();
    const [commentList, setCommentList] = useState([]);
    const [notificationList, setNotificationList] = useState([]);
    const [like, setLike] = useState(0);
    let notifyUser = props.email.concat("notify");



    const getLikeData = async () => {
        await getDataJSON(props.post.concat("likes")).then((data) => {
            if (data == null) {
                setLike(0);
            } else setLike(data);
        });
    };
    useEffect(() => {
        getLikeData();
    }, [])
    const getCommentData = async () => {
        await getDataJSON(props.post).then((data) => {
            if (data == null) {
                setCommentList([]);
            } else setCommentList(data);
        });
    };

    getCommentData();

    const getNotificationData = async () => {
        await getDataJSON(notifyUser).then((data) => {
            if (data == null) {
                setNotificationList([]);
            } else setNotificationList(data);
        });
    };


    useEffect(() => {
        getNotificationData();
    }, [])

    let numberOfComments = "";
    numberOfComments = "Comment(".concat(commentList.length.toString()).concat(")");
    let likeButton = "";
    likeButton = "Like(".concat(like.toString()).concat(")");

    return (
        <AuthContext.Consumer>
            {(auth) => (
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
                                title={likeButton}
                                titleStyle={{ color: '#556e53' }}
                                icon={<AntDesign name="like2" size={24} color='#556e53' />}
                                onPress={async () => {
                                    let numberOfLikes = like + 1;
                                    await storeDataJSON(props.post.concat("likes"), numberOfLikes).then(() => {
                                        setLike(numberOfLikes);
                                    });

                                    if (auth.CurrentUser.email != props.email) {
                                    let arr2 = [
                                        ...notificationList,
                                        {
                                            name: props.name,
                                            email: props.email,
                                            date: moment().format("DD MMM, YYYY"),
                                            post: props.post,
                                            notification: auth.CurrentUser.name.concat(" liked your post"),
                                            key: like,
                                            type: "like",
                                        },
                                    ];


                                    await storeDataJSON(notifyUser, arr2).then(() => {
                                        setNotificationList(arr2);
                                    });

                                     }



                                }}
                            />
                            <Button buttonStyle={{ backgroundColor: '#556e53' }}
                                type="solid"
                                title={numberOfComments}
                                titleStyle={{ color: '#d1d4c9' }}
                                onPress={function () {
                                    useStackNavigation.navigate("IndividualPost", { post: props.post, name: props.name, date: props.date, email: props.email });
                                }}


                            />
                        </View>
                    </Card>

                </View>
            )}
        </AuthContext.Consumer>
    )

}
export default PostComponent;

