import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button, TextInput } from 'react-native';
import axios from 'axios';

function LoginScreen({ navigation }) {
    const [username, OnUsernameChange] = React.useState(null);
    const [password, OnPasswordChange] = React.useState(null);

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <TextInput
                style={styles.input}
                onChangeText={OnUsernameChange}
                value={username}
                placeholder="Username"
            />
            <TextInput
                style={styles.input}
                onChangeText={OnPasswordChange}
                value={password}
                placeholder="password"
            />
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')}
            />
            <Button
                title="Go to Test"
                onPress={() => navigation.navigate('Test')}
            />
            <Button
                title="Go to Login"
                onPress={() => navigation.navigate('LoginScreen')}
            />
        </View>
    );
}



const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginTop: 30,
        color: '#000000',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
});


export default LoginScreen