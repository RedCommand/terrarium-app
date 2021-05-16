import React from 'react';
import { Image, StyleSheet, Text, View, SafeAreaView, TouchableHighlight, ScrollView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



class Test extends React.Component {

    state = {
        token: ''
    }


    componentDidMount = async () => {
        //const navigation = useNavigation();
        const { navigation } = this.props;
        console.log("test")
        try {
            const token = await AsyncStorage.getItem('user_token');
            console.log("data")
            if (token !== null) {
                console.log("data receved")
                console.log(token)
                this.setState({ token });
                // We have data!!
            }
            else {
                console.log("empty data")
                navigation.navigate('NavigScreen')
            }
        } catch (error) {
            // Error retrieving data
            console.log("fail")
            navigation.navigate('NavigScreen')
        }
    };


    render() {
        //const { navigation } = this.props;
        let user_token = ''
        user_token = this.state.token
        console.log(user_token)
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

export default Test