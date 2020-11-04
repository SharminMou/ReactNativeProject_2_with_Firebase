import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, FlatList } from "react-native";
import { Card, Button, Text, Avatar, Input, Header } from "react-native-elements";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import PostComponent from "../components/PostComponent";
import { storeDataJSON, getDataJSON, removeData } from "../functions/AsynchronousStorageFunctions";
import moment from "moment";

const HomeScreen = (props) => {
  const [postText, setPostText] = useState("");
  const [postList, setPostList] = useState([]);

  const getData = async () => {
    await getDataJSON("posts").then((data) => {
      if (data == null) {
        setPostList([]);
      } else setPostList(data);
    });
  };

  // const init = async () => {
  //   await removeData("posts");
  // };

  useEffect(() => {
    getData();
  }, [])



  //await removeData("posts");

  //getPosts();
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
              onPress={async () => {
                let arr = [
                  ...postList,
                  {
                    name: auth.CurrentUser.name,
                    email: auth.CurrentUser.email,
                    date: moment().format("DD MMM, YYYY"),
                    post: postText,
                    key: postText,
                  },
                ];

                await storeDataJSON("posts", arr).then(() => {
                  setPostList(arr);
                });
                
                //alert("Post Successful!");
                //setPostText("");

              }} />


          </Card>
          <FlatList
            data={postList}
            renderItem={postItem => (
              <PostComponent
                name={postItem.item.name}
                date={postItem.item.date}
                post={postItem.item.post}

              />

            )}
          />
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

export default HomeScreen;