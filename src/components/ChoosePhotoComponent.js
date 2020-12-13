import React, { useState, useEffect } from 'react';
import { Image, View, Platform, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Entypo } from '@expo/vector-icons';
import * as firebase from "firebase";
import "firebase/firestore";
import Loading from '../components/Loading';

const ChoosePhotoComponent = (props) => {
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const loadPhoto = async () => {
        setIsLoading(true);
        firebase
            .firestore()
            .collection('users')
            .doc(props.userID)
            .onSnapshot((querySnapShot) => {
                setIsLoading(false);
                if (querySnapShot.data().photoURI != "N/A") {
                    setImage(querySnapShot.data().photoURI);
                }
            })
            .catch((error) => {
                setIsLoading(false);
                alert(error);
            })
    }

    useEffect(() => {
        loadPhoto();
    }, [])

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);

        if (!result.cancelled) {
            setIsLoading(true);
            firebase
                .firestore()
                .collection('users')
                .doc(props.userID)
                .set(
                    {photoURI: result.uri}, 
                    {merge: true},
                )
                
                .then(() => {
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                    alert(error);
                })
            setImage(result.uri);
        }
    };


    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <View>
                {image && <Image source={{ uri: image }} style={styles.photoStyle} />}
                <Button buttonStyle={{ backgroundColor: '#556e53', width: "90%", }}
                    type="solid"
                    titleStyle={{ color: 'white' }}
                    title="   Choose Photo"
                    icon={<Entypo name="camera" size={24} color="white" />}
                    onPress={pickImage}
                />
            </View>
        );

    }
};

const styles = StyleSheet.create({
    photoStyle: {
        width: "90%",
        height: 200,
        borderWidth: 5,
        borderColor: '#556e53',
        resizeMode: 'contain'
    }
});

export default ChoosePhotoComponent;