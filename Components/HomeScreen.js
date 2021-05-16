import React from 'react';
import { Image, StyleSheet, Text, View, SafeAreaView, TouchableHighlight, ScrollView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


class HomeScreen extends React.Component {


    state = {
        devices: [],
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
                this.get_devices(token)
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
        if (props.type == "terra") {
            sourceimg = require('../assets/terrarium.png');
            color_container = '#713931'
        }
        else {
            sourceimg = require('../assets/error.png');
            color_container = '#262626'
        }
        return (
            <TouchableHighlight onPress={() => navigation.navigate('Test')} underlayColor="white">
                <View style={[styles.device_container, { backgroundColor: color_container }]}>
                    <Image style={styles.image} source={sourceimg} resizeMode="contain" />
                </View>
            </TouchableHighlight >
        );
    }


    render() {
        let user_token = ''
        const { route } = this.props;
        //const { token } = route.params;
        /* user_token = this.state.token
        this.get_devices(user_token) */
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    {this.state.devices.map(device => <this.devicebox key={device.id} type={device.type} />)}
                </ScrollView>
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
        height: 200,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    },
    image: {
        width: '90%',
    }
});


export default HomeScreen