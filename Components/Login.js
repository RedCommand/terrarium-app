import React from 'react';
import { TextInput, Image, StyleSheet, Text, View, SafeAreaView, TouchableHighlight, ScrollView, StatusBar, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode as atob, encode as btoa } from 'base-64'



class Login extends React.Component {

    state = {
        username: '',
        password: '',
    }


    handle_username = (text) => {
        this.setState({
            username: text
        })
    }


    handle_password = (text) => {
        this.setState({
            password: text
        })
    }


    setUserToken = async (user_token) => {
        const { navigation } = this.props;
        try {
            await AsyncStorage.setItem('user_token', user_token)
            navigation.navigate('HomeScreen')
        } catch (error) {
            console.log(error)
        }
        console.log('Done.')

    };


    register(user_token) {
        axios.get(`http://senard.freeboxos.fr:4000/client/${user_token}/register`)
            .then(responce => {
                const res = responce.data;
                if ((res == 'null') || (res == 'user already exist')) {
                    this.setUserToken(user_token)
                }
                else {
                    console.log(res)
                }
            });
    }


    convert_token = () => {
        let userpass = this.state.username + '::' + this.state.password
        let user_token = btoa(userpass)
        this.register(user_token)
    }



    render() {
        //const { navigation } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <TextInput style={styles.input}
                    keyboardType='default'
                    autoCompleteType='email'
                    autoCapitalize='none'
                    placeholder="Username"
                    onChangeText={(text) => { this.handle_username(text) }} />

                <TextInput style={styles.input}
                    keyboardType='default'
                    secureTextEntry={true}
                    autoCompleteType='password'
                    placeholder="Password"
                    onChangeText={(text) => this.handle_password(text)} />

                <Button
                    title="Login"
                    onPress={() => this.convert_token()}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
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
    input: {
        margin: 15,
        paddingLeft: 15,
        height: 40,
        borderColor: '#147EFB',
        borderWidth: 2,
        borderRadius: 7,
    },
    image: {
        width: '90%',
    }
});

export default Login