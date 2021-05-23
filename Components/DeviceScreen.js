import React from 'react';
import { Button, TextInput, Image, StyleSheet, Text, View, SafeAreaView, TouchableHighlight, ScrollView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



class DeviceScreen extends React.Component {

    state = {
        token: '',
        id_device: '',
        device_data: {},
    }


    handle_item = (item, text) => {
        this.setState({
            device_data: {
                ...this.state.device_data,
                [item]: text
            }
        })
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

        console.log(this.state.token)
        const { route } = this.props;
        try {
            const { id_device } = route.params;
            console.log(id_device)
            this.setState({ id_device });
        } catch (error) {
            console.log("fail, no params called")
            const id_device = 1
            this.setState({ id_device });
        }

        this.get_device_data(this.state.token, this.state.id_device)
    };


    get_device_data(user_token, id_device) {
        axios.get(`http://senard.freeboxos.fr:4000/client/${user_token}/get_data?id_device=${id_device}`)
            .then(responce => {
                const device_data = responce.data;
                this.setState({ device_data });
            })
    }


    post_device_data = () => {
        var data = new FormData();
        data.append('id_device', this.state.device_data.id);
        data.append('temp_zone_chaude', this.state.device_data.temp_zone_chaude);
        data.append('temp_zone_froide', this.state.device_data.temp_zone_froide);
        data.append('angle_trappe', this.state.device_data.angle_trappe);
        data.append('humidity', this.state.device_data.humidity)

        var config = {
            method: 'post',
            url: 'http://senard.freeboxos.fr:4000/client/bmluaWU6Om5pbmllMTIxMiE=/update_data',
            data: data
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
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
            <TouchableHighlight onPress={() => navigation.navigate('HomeScreen')} underlayColor={null}>
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
        let angle_trappe = ''
        if (this.state.device_data.angle_trappe == 91) {
            angle_trappe = 'auto mode'
        } else {
            if (this.state.device_data.angle_trappe > 91) {
                this.state.device_data.angle_trappe = 90
            }
            angle_trappe = (this.state.device_data.angle_trappe + '°')
        }

        return (
            <SafeAreaView style={styles.container} >

                <ScrollView>
                    <View style={{ height: 30 }}></View>

                    <this.devicebox key={this.state.device_data.id} id={this.state.device_data.id} type={this.state.device_data.type} />


                    <View style={[styles.text_container, { backgroundColor: '#FF6961' }]}>
                        <Text style={styles.text}>Hot zone : {this.state.device_data.temp_zone_chaude}°C</Text>
                        <Text style={styles.text}>Current temperature : {this.state.device_data.current_temp_zone_chaude}°C</Text>
                        <Text style={styles.emoji_text}>🌡️</Text>
                    </View>
                    <TextInput style={styles.input}
                        keyboardType='numeric'
                        placeholder="Temperature"
                        onChangeText={(text) => this.handle_item('temp_zone_chaude', text)} />


                    <View style={[styles.text_container, { backgroundColor: '#77B5FE' }]}>
                        <Text style={styles.text}>Cold zone : {this.state.device_data.temp_zone_froide}°C</Text>
                        <Text style={styles.text}>Current temperature : {this.state.device_data.current_temp_zone_froide}°C</Text>
                        <Text style={styles.emoji_text}>🌡️</Text>
                    </View>
                    <TextInput style={styles.input}
                        keyboardType='numeric'
                        placeholder="Temperature"
                        onChangeText={(text) => this.handle_item('temp_zone_froide', text)} />


                    <View style={[styles.text_container, { backgroundColor: '#F9EAC3' }]}>
                        <Text style={styles.text}>Angle of the hatch : {angle_trappe}</Text>
                        <Text style={[styles.text, { top: -5, fontSize: 14, color: '#808080' }]}>Enter '91' to put hatch in auto mode</Text>
                        <Text style={styles.emoji_text}>📐</Text>
                    </View>
                    <TextInput style={styles.input}
                        keyboardType='numeric'
                        placeholder="Angle"
                        onChangeText={(text) => this.handle_item('angle_trappe', text)} />


                    <View style={[styles.text_container, { backgroundColor: '#ADD8E6' }]}>
                        <Text style={styles.text}>Humidity : {this.state.device_data.humidity}%</Text>
                        <Text style={styles.text}>Current humidity : {this.state.device_data.current_humidity}%</Text>
                        <Text style={styles.emoji_text}>💧</Text>
                    </View>
                    <TextInput style={styles.input}
                        keyboardType='numeric'
                        placeholder="Humidity"
                        onChangeText={(text) => this.handle_item('humidity', text)} />


                    <View style={styles.button}>
                        <Button
                            title="Apply change"
                            onPress={this.post_device_data}
                        />
                    </View>
                    <Text style={styles.warningText}>⚠  Les changements peuvent mettre jusqu'à 10 minutes pour s'actualiser.</Text>

                    <View style={{ height: 30 }}></View>
                </ScrollView>

            </SafeAreaView >

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 15,
    },
    scrollView: {

    },
    button: {
        alignItems: 'center',
        position: 'relative',
        justifyContent: 'center',
    },
    input: {
        margin: 15,
        paddingLeft: 15,
        height: 40,
        borderColor: '#147EFB',
        borderWidth: 2,
        borderRadius: 7,
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
    warningText: {
        fontSize: 14,
        marginTop: 0,
        alignItems: 'center',
        textAlign: 'center',
        color: '#808080',
    },
    device_container: {
        height: 200,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    terra_image: {
        height: '80%',
        right: '15%',
    },
    error_image: {
        height: '80%',
        right: '15%',
    },
    text_container: {
        borderRadius: 10,
        marginTop: 30,
    },
    text: {
        position: 'relative',
        left: 10,
        fontSize: 16,
        marginBottom: 10,
        top: 5,
    },
    emoji_text: {
        position: 'absolute',
        right: 10,
        top: 7,
        fontSize: 35,
    },
});

export default DeviceScreen