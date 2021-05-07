import React from 'react';
import { Image, SafeAreaView, StyleSheet, View, Text, Button, TextInput } from 'react-native';
import axios from 'axios';

class Login extends React.Component {
    state = {
        user_token: 'bmluaWU6Om5pbmllMTIxMiE=',
        username: '',
        password: '',
        user: ''
    }

    user_exist() {
        axios.get(`http://senard.freeboxos.fr:4000/client/bmluaWU6Om5pbmllMTIxMiE=/user_exist`)
            .then(responce => {
                const user = responce.data;
                this.setState({ user });
            })
        const { user } = this.state
        return user
    }

    render() {
        return (
            <View>
                <this.user_exist />
                <Text>{this.user}</Text>
            </View>
        )
    }
}



export default Login
