import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs"; 
import { createDrawerNavigator } from "@react-navigation/drawer";

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";


import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PostScreen from './src/screens/PostScreen';

import {AuthContext, AuthProvider} from './src/providers/AuthProvider';
const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();
const HomeTab = createMaterialBottomTabNavigator();
const AppDrawer = createDrawerNavigator();
const CommentOnPostStack = createStackNavigator();

const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator drawerStyle = {{backgroundColor:'#29435c'}}>
      <AppDrawer.Screen name="Home" component={HomeTabScreen} />
      <AppDrawer.Screen name="Profile" component={ProfileScreen} />
    </AppDrawer.Navigator>
  );
};

const HomePostStackScreen = () => {
  return(
    <HomeStack.Navigator initialRouteName = 'Home'>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      <HomeStack.Screen name="IndividualPost" component={PostScreen} options={{headerShown: false}} />
    </HomeStack.Navigator>

  );

};

const HomeTabScreen = () => {
  return (
    <HomeTab.Navigator initialRouteName="Home" barStyle = {{backgroundColor:'#29435c'}}>
      <HomeTab.Screen 
        name="Home"
        component={HomePostStackScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons name="home" size={26} color="white" />
            ) : (
              <MaterialCommunityIcons name="home-outline" size={26} color="white" />
            ),
        }}
      />
      <HomeTab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons name="notifications" size={24} color="white" />
            ) : (
              <MaterialIcons name="notifications-none" size={24} color="white" />
            ),
        }}
      />
      
    </HomeTab.Navigator>
  );
};

const AuthStackScreen = () => {
  return(
    <AuthStack.Navigator initialRouteName = 'SignIn'>
      <AuthStack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}} />
    </AuthStack.Navigator>
  );

};

function App(){
  return(
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer>
            { auth.IsLoggedIn ? <AppDrawerScreen/> : <AuthStackScreen/>}
          </NavigationContainer>)}
      </AuthContext.Consumer>
    </AuthProvider>
  );
};

export default App;