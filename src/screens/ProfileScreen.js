import React from "react";
import {View, ScrollView, StyleSheet, Image} from "react-native";
import { Input, Button, Card, Tile, Text, Header, Avatar } from 'react-native-elements';
import { MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import { AuthContext } from "../providers/AuthProvider";

const ProfileScreen = (props)=>{
    console.log(props);
    return(
      <AuthContext.Consumer>
        {(auth) => (
          <View style={styles.rootViewStyle}>
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

              
            <View>
              <Image source={require('../../assets/profile-photo.jpg')} style={styles.logoStyle}/>
              <Text style={{fontSize: 30, color: '#152a38', marginBottom: 20}}>Sharmin Naj Mou</Text>
            </View>
          
            <View style={styles.textViewStyle}>
              <Text style={styles.textStyle}>Born on: 15th August</Text>
              <Text style={styles.textStyle}>Address: 03, Mothurdanga, Sopura, Boalia, Rajshahi.</Text>
              <Text style={styles.lastTextStyle}>Works at: Home</Text>
            </View>
            <Button buttonStyle = {{backgroundColor: '#152a38', marginTop:40, width:200, borderRadius: 10}}
                icon = {<MaterialIcons name="delete" size={24} color="#d1d4c9" />}
                title = ' Delete profile'
                titleStyle = {{color: '#d1d4c9'}}
                type = 'solid'
            />
          </View>
        )}
      </AuthContext.Consumer>
    );
};

const styles = StyleSheet.create({
    rootViewStyle:{
        flex: 1,
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: '#d1d4c9',
      },
      cardLogoStyle: {
        marginVertical: 20, 
        backgroundColor: '#556e53',
        height: 400, 
        width: 242,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop:10, 
        paddingHorizontal:10,
        borderRadius: 10,
    },
      logoStyle:{
        alignItems: "center",
        alignSelf: "center",
        height: 310,
        width: 200,
        //marginTop: 2,
        marginBottom: -20,
        resizeMode:"contain",
        borderRadius: 1000,
    },
    textStyle:{
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 15,
        color: 'white',
        borderBottomColor: "#d1d4c9",
        borderBottomWidth: 2,
        width: 300,
    },
    lastTextStyle:{
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
      paddingVertical: 10,
      fontSize: 15,
      color: 'white',
      width: 300,
  },
    textViewStyle:{
      alignItems: "center",
      justifyContent: "center",
      marginTop: 5,
      backgroundColor: "#556e53",
      borderRadius: 15,
    },

});

export default ProfileScreen;