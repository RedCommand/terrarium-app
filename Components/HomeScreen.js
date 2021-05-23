import React from 'react';
import { Button, Image, StyleSheet, Text, View, SafeAreaView, TouchableHighlight, ScrollView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


class HomeScreen extends React.Component {

    state = {
        devices: [],
        token: ''
    }


    componentDidMount = async () => {
        const { navigation } = this.props;
        try {
            const token = await AsyncStorage.getItem('user_token');
            console.log("data")
            if (token !== null) {
                console.log("data receved")
                console.log(token)
                this.setState({ token });
                this.get_devices(token)
                // We have data!!
            }
            else {
                console.log("empty data")
                navigation.navigate('Login')
            }
        } catch (error) {
            // Error retrieving data
            console.log("fail")
            navigation.navigate('NavigScreen')
        }
    };


    get_devices(user_token) {
        axios.get(`http://senard.freeboxos.fr:4000/client/${user_token}/list_devices`)
            .then(responce => {
                const devices = responce.data;
                this.setState({ devices });
            })
    }


    devicebox(props) {
        const navigation = useNavigation();
        let sourceimg = ''
        let color_container = ''
        let styleimg = ''
        if (props.type == "terra") {
            sourceimg = require('../assets/terrarium.png');
            color_container = '#CAA472'
            styleimg = styles.terra_image
        }
        else {
            sourceimg = require('../assets/error.png');
            color_container = '#C0C0C0'
            styleimg = styles.error_image
        }
        return (
            <TouchableHighlight onPress={() => navigation.navigate('DeviceScreen', { id_device: props.id })} underlayColor={null}>
                <View style={[styles.device_container, { backgroundColor: color_container }]}>
                    <Image style={styleimg} source={sourceimg} resizeMode="contain" />
                    <View style={styles.device_text_box}>
                        <Text style={styles.device_text}>{props.type} n°{props.id}</Text>
                    </View>
                </View>
            </TouchableHighlight >
        );
    }



    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={{ height: 30 }}></View>
                    {this.state.devices.map(device => <this.devicebox key={device.id} id={device.id} type={device.type} />)}
                    <View style={{ height: 30 }}></View>
                    <View style={styles.button}>
                        <Button
                            color="#ff5c5c"
                            title="Logout"
                            onPress={() => navigation.navigate('Login')}
                        />
                    </View>
                    <View style={{ height: 30 }}></View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //paddingTop: StatusBar.currentHeight,
        //marginHorizontal: 15,

    },
    scrollView: {

    },
    button: {
        alignItems: 'center',
        position: 'relative',
        justifyContent: 'center',
    },
    device_text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
    },
    device_text_box: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        borderRadius: 15,
        borderWidth: 7,
        borderColor: '#505050',
        backgroundColor: '#505050',
    },
    device_container: {
        height: 200,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    },
    terra_image: {
        height: '80%',
        right: '15%',
    },
    error_image: {
        height: '80%',
        right: '15%',
    }
});


export default HomeScreen