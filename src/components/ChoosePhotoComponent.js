import React, { useState, useEffect } from 'react';
import { Image, View, Platform, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Entypo } from '@expo/vector-icons';

const ChoosePhotoComponent = () => {
    const [image, setImage] = useState(null);

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
            setImage(result.uri);
        }
    };

    return (
        <View>
            {image && <Image source={{ uri: image }} style={styles.photoStyle} />}
            <Button buttonStyle={{ backgroundColor: '#556e53', width: "90%",  }}
                type="solid"
                titleStyle={{ color: 'white' }}
                title="   Choose Photo"
                onPress={pickImage}
                icon={<Entypo name="camera" size={24} color="white" />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    photoStyle: {
        width: "90%", 
        height: 200, 
        borderWidth:5, 
        borderColor: '#556e53', 
        resizeMode:'contain'
    }
});

export default ChoosePhotoComponent;