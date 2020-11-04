import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, FlatList } from "react-native";
import { Card, Button, Text, Avatar, Input, Header } from "react-native-elements";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import CommentComponent from "../components/CommentComponent";
import { storeDataJSON, getDataJSON, removeData } from "../functions/AsynchronousStorageFunctions";
import moment from "moment";

const PostScreen = (props) => {
    //console.log(props);
    const [commentText, setCommentText] = useState("");
    const [commentList, setCommentList] = useState([]);
    const [notificationList, setNotificationList] = useState([]);
    let notifyUser = props.route.params.email.concat("notify");
    const getCommentData = async () => {
        await getDataJSON(props.route.params.post).then((data) => {
            if (data == null) {
                setCommentList([]);
            } else setCommentList(data);
        });
    };

    const getNotificationData = async () => {
        await getDataJSON(notifyUser).then((data) => {
            if (data == null) {
                setNotificationList([]);
            } else setNotificationList(data);
        });
    };

    useEffect(() => {
        getCommentData();
    }, [])
    useEffect(() => {
        getNotificationData();
    }, [notificationList])

    return (
        <AuthContext.Consumer>
            {(auth) => (
                <View style={styles.viewStyle}>
                    <Header
                        backgroundColor='#29435c'
                        leftComponent={{
                            icon: "menu",
                            color: "#fff",
                            onPress: function () {
                                props.navigation.toggleDrawer();
                            },
                        }}
                        centerComponent={{ text: "The Office", style: { color: "#fff" } }}
                        rightComponent={{
                            icon: "lock-outline",
                            color: "#fff",
                            onPress: function () {
                                auth.setIsLoggedIn(false);
                                auth.setCurrentUser({});
                            },
                        }}

                    />
                    <View style={{ alignItems: 'center' }}>
                        <Card containerStyle={{ backgroundColor: '#d1d4c9', width: "92%" }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Avatar
                                    containerStyle={{ backgroundColor: "#92817a" }}
                                    size='medium'
                                    rounded
                                    icon={{ name: "user", type: "font-awesome", color: "black" }}
                                    activeOpacity={1}
                                />
                                <Text h4Style={{ padding: 10 }} h4>
                                    {props.route.params.name}
                                </Text>
                            </View>
                            <Text style={{ fontStyle: "italic" }}> Posted on {props.route.params.date} </Text>
                            <Text
                                style={{
                                    paddingVertical: 10,
                                }}
                            >
                                {props.route.params.post}
                            </Text>


                            <Input style={{ fontSize: 15 }}
                                placeholder="Write Something!"
                                leftIcon={<Entypo name="pencil" size={20} color="#152a38" />}
                                onChangeText={function (currentInput) {
                                    setCommentText(currentInput);
                                }}
                            />
                            <Button buttonStyle={{ borderColor: '#29435c' }}
                                title="Comment"
                                titleStyle={{ color: '#29435c' }}
                                type="outline"
                                onPress={async () => {
                                    let arr = [
                                        ...commentList,
                                        {
                                            name: auth.CurrentUser.name,
                                            email: auth.CurrentUser.email,
                                            date: moment().format("DD MMM, YYYY"),
                                            comment: commentText,
                                            key: commentText,
                                        },
                                    ];

                                    await storeDataJSON(props.route.params.post, arr).then(() => {
                                        setCommentList(arr);
                                    });

                                    if (auth.CurrentUser.email != props.route.params.email) {
                                        let arr2 = [
                                            ...notificationList,
                                            {
                                                name: props.route.params.name,
                                                email: props.route.params.email,
                                                date: moment().format("DD MMM, YYYY"),
                                                post: props.route.params.post,
                                                notification: auth.CurrentUser.name.concat(" commented on your post"),
                                                key: commentText,
                                                type: "comment",
                                            },
                                        ];


                                        await storeDataJSON(notifyUser, arr2).then(() => {
                                            setNotificationList(arr2);
                                        });
                                    }


                                }} />

                        </Card>

                    </View>


                    <FlatList
                        data={commentList}
                        renderItem={commentItem => (
                            <CommentComponent
                                name={commentItem.item.name}
                                date={commentItem.item.date}
                                comment={commentItem.item.comment}

                            />

                        )}
                    />

                    <Card.Divider />

                </View>
            )}
        </AuthContext.Consumer>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 30,
        color: "blue",
    },
    viewStyle: {
        flex: 1,
        backgroundColor: '#152a38'
    },
});


export default PostScreen;