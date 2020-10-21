import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import {
  Card,
  Button,
  Text,
  Avatar,
  Input,
  Header,
} from "react-native-elements";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";

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
          <Card>
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
          <Card>
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
                Jim Halpert
              </Text>
            </View>
            <Text style={{ fontStyle: "italic" }}> Posted on 10 Aug, 2020</Text>
            <Text
              style={{
                paddingVertical: 10,
              }}
            >
              {post}
            </Text>
            <Card.Divider />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Button 
                type="outline"
                title="  Like (21)"
                icon={<AntDesign name="like2" size={24} color='#556e53'/>}
              />
              <Button buttonStyle = {{backgroundColor: '#556e53'}}
                type="solid" title="Comment (7)" titleStyle = {{color: '#d1d4c9'}} />
            </View>
          </Card>
          <Card>
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
                Dwight Schrute
              </Text>
            </View>
            <Text style={{ fontStyle: "italic" }}> Posted on 10 Aug, 2020</Text>
            <Text
              style={{
                paddingVertical: 10,
              }}
            >
              {post}
            </Text>
            <Card.Divider />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Button
                type="outline"
                title="  Like (17)"
                icon={<AntDesign name="like2" size={24} color="dodgerblue" />}
              />
              <Button type="solid" title="Comment (10)" />
            </View>
          </Card>
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
  },
});

export default HomeScreen;