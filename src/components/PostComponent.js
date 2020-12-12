import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Card, Button, Text, Avatar, Input, Header } from "react-native-elements";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { storeDataJSON, getDataJSON, removeData } from "../functions/AsynchronousStorageFunctions";
import moment from "moment";
import * as firebase from "firebase";
import "firebase/firestore";
import Loading from '../components/Loading';
import { TouchableOpacity } from "react-native-gesture-handler";

const PostComponent = (props) => {
    const useStackNavigation = useNavigation();
    const [commentList, setCommentList] = useState([]);
    const [notificationList, setNotificationList] = useState([]);
    const [likersList, setLikersList] = useState([]);
    const [likeStatus, setLikeStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const loadComments = async () => {
        setIsLoading(true);
        firebase
            .firestore()
            .collection('posts')
            .doc(props.postID)
            .onSnapshot((querySnapShot) => {
                setIsLoading(false);
                setCommentList(querySnapShot.data().comments);
                setLikersList(querySnapShot.data().likers);
                setLikeStatus(querySnapShot.data().likers.includes(props.userID));
            })
            .catch((error) => {
                setIsLoading(false);
                alert(error);
            })
    }



    const loadNotificationData = async () => {
        setIsLoading(true);
        firebase
            .firestore()
            .collection('users')
            .doc(props.authorID)
            .onSnapshot((querySnapShot) => {
                setIsLoading(false);
                setNotificationList(querySnapShot.data().notifications);
            })
            .catch((error) => {
                setIsLoading(false);
                alert(error);
            })
    }

    useEffect(() => {
        loadComments();
        loadNotificationData();
    }, [])


    let numberOfComments = " ";
    numberOfComments = "Comment(".concat(commentList.length.toString()).concat(")");
    let likeButton = " ";
    likeButton = "Like(".concat(likersList.length.toString()).concat(")");

    const deletePost = () => {
        firebase
            .firestore()
            .collection('posts')
            .doc(props.postID)
            .delete()
            .then(()=>{
                alert("Post Deleted!")
            })
            .catch((error) => {
                alert(error);
            })
    }

    return (
        <AuthContext.Consumer>
            {(auth) => (
                <View>
                    <TouchableOpacity onLongPress = {deletePost}>
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

                                {likeStatus ? <Button
                                    buttonStyle={{ borderColor: '#556e53', borderWidth: 1 }}
                                    type="outline"
                                    title={likeButton}
                                    titleStyle={{ color: '#556e53' }}
                                    icon={<AntDesign name="like1" size={24} color='#556e53' />}
                                    onPress={function () {
                                        let indexOfCurrentUserId = likersList.indexOf(auth.CurrentUser.uid);
                                        likersList.splice(indexOfCurrentUserId, 1);
                                        firebase
                                            .firestore()
                                            .collection('posts')
                                            .doc(props.postID)
                                            .set(
                                                {
                                                    likers: likersList
                                                },
                                                { merge: true }
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
                                />
                                    : <Button
                                        buttonStyle={{ borderColor: '#556e53', borderWidth: 1 }}
                                        type="outline"
                                        title={likeButton}
                                        titleStyle={{ color: '#556e53' }}
                                        icon={<AntDesign name="like2" size={24} color='#556e53' />}
                                        onPress={
                                            function () {
                                                firebase
                                                    .firestore()
                                                    .collection('posts')
                                                    .doc(props.postID)
                                                    .set(
                                                        {
                                                            likers: [...likersList, auth.CurrentUser.uid]
                                                        },
                                                        { merge: true }
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
                                                        .doc(props.authorID)
                                                        .set(
                                                            {
                                                                notifications: [
                                                                    ...notificationList,
                                                                    {
                                                                        type: "like",
                                                                        notification_from: auth.CurrentUser.displayName,
                                                                        notified_at: firebase.firestore.Timestamp.now().toString(),
                                                                        notifying_date: moment().format("DD MMM, YYYY"),
                                                                        posting_date: props.date,
                                                                        postID: props.postID,
                                                                        authorID: props.authorID,
                                                                        post: props.post,
                                                                        name: props.name,
                                                                    }]
                                                            },
                                                            { merge: true }
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
                                }
                                <Button buttonStyle={{ backgroundColor: '#556e53' }}
                                    type="solid"
                                    title={numberOfComments}
                                    titleStyle={{ color: '#d1d4c9' }}
                                    onPress={
                                        function () {
                                            useStackNavigation.navigate("IndividualPost", { name: props.name, post: props.post, date: props.date, authorID: props.authorID, postID: props.postID });
                                        }}
                                />
                            </View>
                        </Card>
                    </TouchableOpacity>
                </View>
            )}
        </AuthContext.Consumer>
    )

}
export default PostComponent;

