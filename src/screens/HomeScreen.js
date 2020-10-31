import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import {Card,Button,Text,Avatar,Input,Header} from "react-native-elements";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import PostComponent from "../components/PostComponent";

const HomeScreen = (props) => {
  const post =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <Header
            backgroundColor = '#29435c'
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
          <Card containerStyle = {{backgroundColor: '#d1d4c9' }}>
            <Input
              placeholder="What's On Your Mind?"
              leftIcon={<Entypo name="pencil" size={24} color="#152a38" />}
            />
            <Button buttonStyle = {{borderColor: '#29435c'}}
            title="Post" 
            titleStyle = {{color: '#29435c'}}
            type="outline" 
            onPress={function () {}} />
          </Card>
          <ScrollView>
          <PostComponent name = 'Mou' date = '31 Oct, 2020' post = 'Test Post'/>
          </ScrollView>
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