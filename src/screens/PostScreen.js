import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { Card, Button, Text, Avatar, Input, Header } from "react-native-elements";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import CommentComponent from "../components/CommentComponent";
import { storeDataJSON, getDataJSON, removeData } from "../functions/AsynchronousStorageFunctions";
import moment from "moment";
import Loading from '../components/Loading';
import * as firebase from "firebase";
import "firebase/firestore";

const PostScreen = (props) => {
    //console.log(props);
    const [commentText, setCommentText] = useState("");
    const [commentList, setCommentList] = useState([]);
    const [notificationList, setNotificationList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);




    const loadComments = async () => {

        setIsLoading(true);
        firebase
            .firestore()
            .collection('posts')
            .doc(props.route.params.postID)
            .collection("postComments")
            .onSnapshot((querySnapShot) => {
                setIsLoading(false);
                let temp = [];
                querySnapShot.forEach((doc) => {
                    temp.push(
                        {
                            id: doc.id,
                            data: doc.data(),
                        }
                    );

                });

                setCommentList(temp);
            })
            .catch((error) => {
                setIsLoading(false);
                alert(error);
            })
    }

    // const loadNotificationData = async () => {
    //     setIsLoading(true);
    //     firebase
    //         .firestore()
    //         .collection('users')
    //         .doc(props.route.params.authorID)
    //         .onSnapshot((querySnapShot) => {
    //             setIsLoading(false);
    //             setNotificationList(querySnapShot.data().notifications);
    //         })
    //         .catch((error) => {
    //             setIsLoading(false);
    //             alert(error);
    //         })
    // }

    useEffect(() => {
        loadComments();
        // loadNotificationData();
    }, []);



    if (isLoading) {
        return <Loading />;
    } else {
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
                                    onPress={function () {
                                        setIsLoading(true);
                                        firebase
                                            .firestore()
                                            .collection('posts')
                                            .doc(props.route.params.postID)
                                            .collection("postComments")
                                            .add(
                                                {
                                                    userId: auth.CurrentUser.uid,
                                                    comment: commentText,
                                                    commented_by: auth.CurrentUser.displayName,
                                                    commented_at: firebase.firestore.Timestamp.now().toString(),
                                                    commenting_date: moment().format("DD MMM, YYYY")

                                                },
                                            )
                                            .then(() => {
                                                setIsLoading(false);
                                            })
                                            .catch((error) => {
                                                setIsLoading(false);
                                                alert(error);
                                            })


                                        if (props.authorID != auth.CurrentUser.uid) {
                                            firebase
                                                .firestore()
                                                .collection('users')
                                                .doc(props.route.params.authorID)
                                                .collection("notifications")
                                                .add(
                                                    {
                                                        type: "comment",
                                                        notification_from: auth.CurrentUser.displayName,
                                                        notified_at: firebase.firestore.Timestamp.now().toString(),
                                                        notifying_date: moment().format("DD MMM, YYYY"),
                                                        posting_date: props.route.params.date,
                                                        postID: props.route.params.postID,
                                                        authorID: props.route.params.authorID,
                                                        post: props.route.params.post,
                                                        name: props.route.params.name,

                                                    },
                                                )
                                                .then(() => {
                                                    setIsLoading(false);
                                                })
                                                .catch((error) => {
                                                    setIsLoading(false);
                                                    alert(error);
                                                })
                                        }




                                    }
                                    }
                                />

                            </Card>

                        </View>


                        <FlatList
                            data={commentList}
                            renderItem={({ item }) => {
                                return (

                                    <TouchableOpacity
                                        onLongPress={() => {
                                            Alert.alert(
                                                "Delete The Comment?",
                                                "Press ok to Delete",
                                                [
                                                    {
                                                        text: "Cancel",
                                                        onPress: () => console.log("Cancel Pressed"),
                                                        style: "cancel"
                                                    },
                                                    {
                                                        text: "OK", onPress: () => {

                                                            if (auth.CurrentUser.uid == item.data.userId) {
                                                                //console.log(item.id);

                                                                firebase
                                                                    .firestore()
                                                                    .collection("posts")
                                                                    .doc(props.route.params.postID)
                                                                    .collection("postComments")
                                                                    .doc(item.id).delete()

                                                            }

                                                            else {
                                                                alert("You're not the author of this post")
                                                            }
                                                        }



                                                    }
                                                ],
                                                { cancelable: false }
                                            );
                                        }}
                                    >

                                        <CommentComponent
                                            name={item.data.commented_by}
                                            date={item.data.commenting_date}
                                            comment={item.data.comment}

                                        />
                                    </TouchableOpacity>
                                );

                            }}
                        />

                        <Card.Divider />

                    </View>
                )}
            </AuthContext.Consumer>
        );
    }
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