import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, FlatList } from "react-native";
import { Card, Button, Text, Avatar, Input, Header } from "react-native-elements";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import PostComponent from "../components/PostComponent";
import { storeDataJSON, getDataJSON, removeData } from "../functions/AsynchronousStorageFunctions";
import moment from "moment";
import * as firebase from "firebase";
import "firebase/firestore";
import Loading from '../components/Loading';

const HomeScreen = (props) => {
  const [postText, setPostText] = useState("");
  const [postList, setPostList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // const getData = async () => {
  //   await getDataJSON("posts").then((data) => {
  //     if (data == null) {
  //       setPostList([]);
  //     } else setPostList(data);
  //   });
  // };

  // // const init = async () => {
  // //   await removeData("posts");
  // // };

  // useEffect(() => {
  //   getData();
  // }, [])

  //await removeData("posts");

  //getPosts();
  const loadPosts = async () => {
    setLoading(true);
    firebase
      .firestore()
      .collection("posts")
      .orderBy("created_at", "desc")
      .onSnapshot((querySnapshot) => {
        setLoading(false);
        let temp_posts = [];
        querySnapshot.forEach((doc) => {
          temp_posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPostList(temp_posts);
        
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
  };

  useEffect(() => {
    loadPosts();
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
            <Card containerStyle={{ backgroundColor: '#d1d4c9' }}>
              <Input
                placeholder="What's On Your Mind?"
                leftIcon={<Entypo name="pencil" size={24} color="#152a38" />}
                onChangeText={function (currentInput) {
                  setPostText(currentInput);
                }}
              />
              <Button buttonStyle={{ borderColor: '#29435c' }}
                title="Post"
                titleStyle={{ color: '#29435c' }}
                type="outline"
                onPress={function () {
                  setLoading(true);
                  firebase
                    .firestore()
                    .collection("posts")
                    .add({
                      userId: auth.CurrentUser.uid,
                      body: postText,
                      author: auth.CurrentUser.displayName,
                      created_at: firebase.firestore.Timestamp.now(),
                      likes: [],
                      comments: [],
                    })
                    .then(() => {
                      setLoading(false);
                      alert("Post created Successfully!");
                    })
                    .catch((error) => {
                      setLoading(false);
                      alert(error);
                    });
                }}

              />


            </Card>
            <FlatList
              data={postList}
              renderItem={({ item }) => {
                return (
                  <PostComponent
                    name={item.data.author}
                    email={item.id}
                    post={item.data.body}
                    date={item.data.created_at.toDate().toString()}
                  />
                );
              }}
            />
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

export default HomeScreen;