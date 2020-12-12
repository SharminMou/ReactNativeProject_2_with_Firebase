import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import { storage, storeData, storeDataJSON } from "../functions/AsynchronousStorageFunctions";
import * as firebase from "firebase";
import "firebase/firestore";
import Loading from '../components/Loading';

const SignUpScreen = (props) => {

    const [Name, setName] = useState("");
    const [SID, setSID] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <View style={styles.viewStyle}>
                <Card containerStyle={styles.cardViewStyle}>
                    <Card.Title> Welcome to AuthApp!</Card.Title>
                    <Card.Divider />
                    <Input
                        leftIcon={<MaterialIcons name="person" size={24} color="#152a38" />}
                        placeholder='Name'
                        onChangeText={function (currentInput) {
                            setName(currentInput);
                        }}
                    />
                    <Input
                        leftIcon={<MaterialIcons name="school" size={24} color="#152a38" />}
                        placeholder='Student ID'
                        onChangeText={function (currentInput) {
                            setSID(currentInput);
                        }}
                    />
                    <Input
                        leftIcon={<MaterialIcons name="email" size={24} color="#152a38" />}
                        placeholder='Email Address'
                        onChangeText={function (currentInput) {
                            setEmail(currentInput);
                        }}
                    />

                    <Input
                        leftIcon={<Feather name="key" size={24} color="#152a38" />}
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={function (currentInput) {
                            setPassword(currentInput);
                        }}
                    />

                    <Button buttonStyle={{ backgroundColor: '#152a38' }}
                        icon={<AntDesign name="user" size={24} color="#d1d4c9" />}
                        title=' Sign Up!'
                        titleStyle={{ color: '#d1d4c9' }}
                        type='solid'
                        onPress={() => {
                            if (Name && SID && Email && Password) {
                                setIsLoading(true);
                                firebase
                                    .auth()
                                    .createUserWithEmailAndPassword(Email, Password)
                                    .then((userCreds) => {
                                        userCreds.user.updateProfile({ displayName: Name });
                                        firebase
                                            .firestore()
                                            .collection('users')
                                            .doc(userCreds.user.uid)
                                            .set({
                                                name: Name,
                                                sid: SID,
                                                email: Email,
                                                notifications: [],
                                            })
                                            .then(() => {
                                                setIsLoading(false);
                                                let giveAlert = "Account created successfully with ID: ";
                                                alert(giveAlert.concat(userCreds.user.uid));
                                                props.navigation.navigate("SignIn");

                                            })

                                            .catch((error) => {
                                                setIsLoading(false);
                                                alert(error);
                                            });
                                    })
                                    .catch((error) => {
                                        setIsLoading(false);
                                        alert(error);
                                    });
                            } else {
                                alert("Fields can not be empty!");
                            }
                        }}
                    />

                    <Button
                        icon={<AntDesign name="login" size={24} color="#152a38" />}
                        title=" Already have an account? "
                        titleStyle={{ color: '#152a38' }}
                        type="clear"
                        onPress={function () {
                            props.navigation.navigate("SignIn");
                        }}
                    />
                </Card>
            </View>
        );
    }
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