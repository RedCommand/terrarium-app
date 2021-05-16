import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';

function NavigScreen({ navigation }) {
    const [username, OnUsernameChange] = React.useState(null);
    const [password, OnPasswordChange] = React.useState(null);

    return (
        <View style={styles.main_container}>
            {/* <TextInput
                style={styles.input}
                onChangeText={OnUsernameChange}
                value={username}
                placeholder="email"
            />
            <TextInput
                style={styles.input}
                onChangeText={OnPasswordChange}
                value={password}
                placeholder="password"
            /> */}
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('HomeScreen')}
            />
            <Button
                title="Go to Test"
                onPress={() => navigation.navigate('Test')}
            />
            <Button
                title="Go to Test2"
                onPress={() => navigation.navigate('Test2')}
            />
            <Button
                title="Go to Film"
                onPress={() => navigation.navigate('Film')}
            />
            <Button
                title="Go to DeviceScreen"
                onPress={() => navigation.navigate('DeviceScreen')}
            />
        </View>
    );
}



const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        color: '#000000',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
});


export default NavigScreen