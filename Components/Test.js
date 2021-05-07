import React from 'react';
import { Image, SafeAreaView, StyleSheet, View, Text, Button, TextInput } from 'react-native';
import axios from 'axios';

class Test extends React.Component {
    state = {
        devices: []
    }

    componentDidMount() {
        axios.get(`http://senard.freeboxos.fr:4000/client/bmluaWU6Om5pbmllMTIxMiE=/list_devices`)
            .then(responce => {
                const devices = responce.data;
                this.setState({ devices });
            })
    }

    Greeting = (props) => {
        if (props.name == "flo") {
            return (
                <View>
                    <Text>Hello friend!</Text>
                </View>
            );
        }
        else {
            return (
                <View>
                    <Text>Hello {props.name}!</Text>
                </View>
            );
        }
    }

    devicebox = (props) => {
        let sourceimg = ''
        if (props.type == "terra") {
            sourceimg = require('../assets/terrarium.png');
        }
        else {
            sourceimg = require('../assets/error.png');
        }
        return (
            <Image source={sourceimg} />
        );
    }

    render() {
        return (
            <View>
                {this.state.devices.map(device => <Text>{device.id}</Text>)}
                {this.state.devices.map(device => <Text>{device.type}</Text>)}
                <this.Greeting name="flo" />
                <this.Greeting name="max" />
                {this.state.devices.map(device => <this.devicebox type={device.type} />)}

            </View>
        )
    }
}



export default Test
