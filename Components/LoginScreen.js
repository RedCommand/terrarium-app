import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button, TextInput } from 'react-native';


function LoginScreen({ navigation }) {
    const [username, OnUsernameChange] = React.useState(null);
    const [password, OnPasswordChange] = React.useState(null);

    const getDevices = () => {
        try {
            let response = fetch(
                'http://senard.freeboxos.fr:4000/client/bmluaWU6Om5pbmllMTIxMiE=/list_devices'
            );

            <View>
                <Text>test = {response}</Text>
            </View>

        } catch (error) {
            console.error(error);
        }
    };

    const [value, setValue] = React.useState(null);
    const incrementValue = () => setValue(getDevices);

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
                title="Login"
                onPress={getDevices}
            />
            <Text>{value}</Text>
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