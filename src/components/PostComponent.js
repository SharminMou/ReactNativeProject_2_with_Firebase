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
    const [numberOfComments, setNumberOfComments] = useState(0);
    const [notificationList, setNotificationList] = useState([]);
    const [like, setLike] = useState(0);
    const [likers, setLikersList] = useState([]);
    const [likeStatus, setLikeStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const loadComments = async () => {

        setIsLoading(true);
        firebase
            .firestore()
            .collection('posts')
            .doc(props.postID)
            .collection("postComments")
            .onSnapshot((querySnapShot) => {
                setIsLoading(false);
                let temp = [];
                console.log(querySnapShot.size);

                querySnapShot.forEach((doc) => {
                    temp.push(
                        {
                            id: doc.id,
                            data: doc.data(),
                        }
                    );

                });

                setCommentList(temp);
                setNumberOfComments(querySnapShot.size);
            })
            .catch((error) => {
                setIsLoading(false);
                alert(error);
            })
    }

    const loadLikes = async () => {
        setIsLoading(true);
        firebase
            .firestore()
            .collection('posts')
            .doc(props.postID)
            .collection("postLikes")
            .onSnapshot((querySnapshot) => {
                setLike(querySnapshot.size)
            })
            .catch((error) => {
                setIsLoading(false);
                alert(error);
            })
    }




    useEffect(() => {
        loadComments();
        loadLikes();
        // loadNotificationData();
    }, [])


    let likeButton = " ";
    likeButton = "Like(".concat(like.toString()).concat(")");


    return (
        <AuthContext.Consumer>
            {(auth) => (
                <View>
                    {/* <TouchableOpacity onLongPress = {deletePost}> */}
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
                                    setLikeStatus(false);

                                    firebase
                                        .firestore().collection("posts")
                                        .doc(props.postID)
                                        .collection("postLikes")
                                        .doc(auth.CurrentUser.uid)
                                        .delete()
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
                                            setLikeStatus(true);
                                            firebase
                                                .firestore().collection("posts")
                                                .doc(props.postID)
                                                .collection("postLikes")
                                                .doc(auth.CurrentUser.uid)
                                                .set({
                                                    like: 1
                                                })

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
                                                    .collection("notifications")
                                                    .add(
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
                            }

                            <Button buttonStyle={{ backgroundColor: '#556e53' }}
                                type="solid"
                                title={"Comment(".concat(numberOfComments.toString()).concat(")")}
                                titleStyle={{ color: '#d1d4c9' }}
                                onPress={
                                    function () {
                                        useStackNavigation.navigate("IndividualPost",
                                            {
                                                name: props.name,
                                                post: props.post,
                                                date: props.date,
                                                authorID: props.authorID,
                                                postID: props.postID
                                            });
                                    }}
                            />
                        </View>
                    </Card>
                    {/* </TouchableOpacity> */}
                </View>
            )}
        </AuthContext.Consumer>
    )

}
export default PostComponent;

