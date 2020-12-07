import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Card, Tile } from 'react-native-elements';
import { MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import { AuthContext } from "../providers/AuthProvider";
import { getDataJSON, storeDataJSON } from "../functions/AsynchronousStorageFunctions";
import * as firebase from "firebase";
import Loading from '../components/Loading';
const SignInScreen = (props) => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <AuthContext.Consumer>
                {(auth) => (
                    <View style={styles.viewStyle}>
                        <Card containerStyle={styles.cardViewStyle}>
                            <Card.Title style={{ fontSize: 20, color: '#152a38' }}> Welcome to The Office!</Card.Title>
                            <Card.Divider />
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
                                icon={<AntDesign name="login" size={24} color="#d1d4c9" />}
                                title=' Sign In!'
                                titleStyle={{ color: '#d1d4c9' }}
                                type='solid'
                                onPress={() => {
                                    setIsLoading(true);
                                    firebase
                                        .auth()
                                        .signInWithEmailAndPassword(Email, Password)
                                        .then((userCreds) => {
                                            setIsLoading(false);
                                            auth.setIsLoggedIn(true);
                                            auth.setCurrentUser(userCreds.user);
                                        })
                                        .catch((error) => {
                                            setIsLoading(false);
                                            alert(error);
                                        });
                                }}
                            />

                            <Button
                                type="clear"
                                icon={<AntDesign name="user" size={24} color="#152a38" />}
                                title=" Don't have an account? "
                                titleStyle={{ color: '#152a38' }}
                                onPress={function () {
                                    props.navigation.navigate("SignUp");
                                }}


                            />
                        </Card>
                    </View>
                )}
            </AuthContext.Consumer>
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

export default SignInScreen;