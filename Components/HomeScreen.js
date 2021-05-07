import React from 'react';
import { Button, FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import films from '../Data/Data';


const filmItem = (item) => (
    <View style={styles.films_container}>

        <Image style={styles.image_container} source={{ uri: item.poster_uri }} />

        <View style={styles.films_header_container}>
            <View style={styles.films_title}>
                <Text style={{ flex: 6, paddingRight: 5 }}>{item.title}</Text>
                <Text style={{ flex: 1, textAlign: 'right' }}>{item.vote_average}</Text>
            </View>
            <Text style={styles.films_description} numberOfLines={5}>{item.overview}</Text>
            <Text style={styles.films_date}>{item.release_date}</Text>
        </View>
    </View >
);

function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.main_container}>
            <FlatList
                data={films}
                renderItem={({ item }) => filmItem(item)}
                keyExtractor={(item) => item.id.toString()}

            />
        </SafeAreaView >
    );
}



const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginTop: 30,
        color: '#000000',
    },

    films_container: {
        height: 180,
        margin: 10,
        flex: 1,
        flexDirection: 'row',
        //backgroundColor: 'yellow'
    },

    image_container: {
        width: 120,
        height: 180,
        //backgroundColor: 'blue'
    },

    films_header_container: {
        margin: 5,
        flex: 1,
        //backgroundColor: 'gray',
    },

    films_title: {
        flex: 1,
        flexDirection: 'row',
        //backgroundColor: 'purple',
    },

    films_description: {
        flex: 3,
    },

    films_date: {
        flex: 1,
        textAlign: 'right',
        //backgroundColor: 'red',
    },
});





export default HomeScreen