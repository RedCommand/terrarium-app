import React from 'react';
import { Image, StyleSheet, Text, View, SafeAreaView, TouchableHighlight, ScrollView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



class Test2 extends React.Component {

    setUserToken = async (user_token) => {
        const { navigation } = this.props;
        try {
            await AsyncStorage.setItem('user_token', user_token)
            navigation.navigate('NavigScreen')
        } catch (err) {
            // save error
        }
        console.log('Done.')
        console.log("test")
    };


    render() {
        //const { navigation } = this.props;
        let user_token = 'bmluaWU6Om5pbmllMTIxMiE='
        this.setUserToken(user_token)
        return (
            <SafeAreaView style={styles.container}>
                <Text>{user_token}</Text>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {

    },
    text: {
        fontSize: 42,
    },
    device_container: {
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    },
    image: {
        width: '90%',
    }
});

export default Test2