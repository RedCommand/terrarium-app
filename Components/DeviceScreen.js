import React from 'react';
import { Image, StyleSheet, Text, View, SafeAreaView, TouchableHighlight, ScrollView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

class DeviceScreen extends React.Component {


    state = {
        device_data: []
    }

    get_devices(user_token, iddevice) {
        axios.get(`http://senard.freeboxos.fr:4000/client/${user_token}/get_data?id_device=${iddevice}`)
            .then(responce => {
                const device_data = responce.data;
                this.setState({ device_data });
            })
    }

    devicebox(props) {
        let data = JSON.stringify(props)
        return (
            <View style={[styles.device_container, { backgroundColor: color_container }]}>
                <Text>{data}</Text>
            </View>
        );
    }


    render() {
        let user_token = 'bmluaWU6Om5pbmllMTIxMiE='
        let iddevice = '1'
        const { route } = this.props;
        const { token, id_device } = route.params;
        user_token = JSON.stringify(token)
        iddevice = JSON.stringify(id_device)
        this.get_devices(user_token, iddevice)
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    {this.state.device_data.map(device => <this.devicebox key={device.id} data={device} />)}
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


export default DeviceScreen