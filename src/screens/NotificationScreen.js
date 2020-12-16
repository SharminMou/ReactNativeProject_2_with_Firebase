import React, { useState, useEffect } from "react";
import { View, StyleSheet, AsyncStorage, FlatList } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import { storeDataJSON, getDataJSON, removeData } from "../functions/AsynchronousStorageFunctions";
import NotificationComponent from "../components/NotificationComponent";
import * as firebase from "firebase";
import "firebase/firestore";

const NotificationScreen = (props) => {
  //console.log(props);
  const [notificationList, setNotificationList] = useState([]);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState("");

const loadNotificationData = async () => {

  setIsLoading(true);
  firebase
      .firestore()
      .collection('users')
      .doc(email)
      .collection("notifications")
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

          setNotificationList(temp);
      })
      .catch((error) => {
          setIsLoading(false);
          alert(error);
      })
}



const getEmailData = async () => {
  await getDataJSON("mail").then((data) => {
    if (data == null) {
      setEmail("");
    } else setEmail(data);
  });
};

useEffect(() => {
    getEmailData();

}, [])

useEffect(() => {
  loadNotificationData();

}, [email])
 

  console.log(email);
  console.log(notificationList);

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

          <Card containerStyle={styles.cardStyle}>
            <FlatList
              data={notificationList}
              renderItem={notificationItem => (
                <View style={{ alignItems: "center" }}>
                  <NotificationComponent
                    name={notificationItem.item.data.name}
                    date={notificationItem.item.data.posting_date}
                    post={notificationItem.item.data.post}
                    postID={notificationItem.item.data.postID}
                    authorID={notificationItem.item.data.authorID}
                    notificationFrom={notificationItem.item.data.notification_from}
                    type={notificationItem.item.data.type}
                  />
                  <Card.Divider />
                </View>
              )}
            />
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
    backgroundColor: '#152a38',
  },
  cardStyle: {
    backgroundColor: '#d1d4c9',
    flex: 1,
    alignItems: "center"

  }
});

export default NotificationScreen;