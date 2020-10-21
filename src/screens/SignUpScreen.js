import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { MaterialIcons, Feather, AntDesign} from '@expo/vector-icons';

import {storage, storeData, storeDataJSON}  from "../functions/AsynchronousStorageFunctions";

const SignUpScreen = (props) => {

    const [Name, setName] = useState("");
    const [SID, setSID] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    return(
        <View style = {styles.viewStyle}>
            <Card containerStyle = {styles.cardViewStyle}>
                <Card.Title> Welcome to AuthApp!</Card.Title>
                <Card.Divider/>
                <Input 
                    leftIcon = {<MaterialIcons name="person" size={24} color="#152a38" />}
                    placeholder='Name'
                    onChangeText = {function(currentInput){
                        setName(currentInput);
                    }}
                />
                <Input 
                    leftIcon = {<MaterialIcons name="school" size={24} color="#152a38" />}
                    placeholder='Student ID'
                    onChangeText = {function(currentInput){
                        setSID(currentInput);
                    }}
                />
                <Input 
                    leftIcon = {<MaterialIcons name="email" size={24} color="#152a38" />}
                    placeholder='Email Address'
                    onChangeText = {function(currentInput){
                        setEmail(currentInput);
                    }}
                />

                <Input
                    leftIcon = {<Feather name="key" size={24} color="#152a38" />}
                    placeholder = 'Password'
                    secureTextEntry = {true}
                    onChangeText = {function(currentInput){
                        setPassword(currentInput);
                    }}
                />

                <Button buttonStyle = {{backgroundColor: '#152a38'}}
                    icon = {<AntDesign name="user" size={24} color="#d1d4c9" />}
                    title = ' Sign Up!'
                    titleStyle = {{color: '#d1d4c9'}}
                    type = 'solid'
                    onPress = {function(){
                        let currentUser ={
                            name: Name,
                            sid: SID,
                            email: Email,
                            password: Password,
                        };
                        storeDataJSON(Email, currentUser);
                        props.navigation.navigate("SignIn");

                    }}
                />

                <Button
                    icon = {<AntDesign name="login" size={24} color="#152a38" />}
                    title = " Already have an account? "
                    titleStyle = {{color: '#152a38'}}
                    type = "clear"
                    onPress = {function() {
                        props.navigation.navigate("SignIn");
                    }}
                />
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#556e53'

    },
    cardViewStyle: {
        // justifyContent: 'center',
         backgroundColor: '#d1d4c9',
         borderRadius: 10,
 
     },
});

export default SignUpScreen;