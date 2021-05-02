import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


function MyData(fonction, key, value = null) {
    const StoreData = async (value, key) => {
        let mykey = '@'
        mykey += key
        try {
            await AsyncStorage.setItem(mykey, value)
        } catch (e) {
            // saving error
        }
    }

    const JStoreData = async (value, key) => {
        console.log('test')
        let mykey = '@'
        mykey += key
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(mykey, jsonValue)
        } catch (e) {
            // saving error
        }
    }


    const GetData = async (key) => {
        let mykey = '@'
        mykey += key
        try {
            const value = await AsyncStorage.getItem('@storage_Key')
            if (value !== null) {
                // value previously stored
            }
        } catch (e) {
            // error reading value
        }
    }

    const JGetData = async (key) => {
        let mykey = '@'
        mykey += key
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }
    if (fonction == 'StoreData') {
        StoreData(value, key)
    }
    else if (fonction == 'JStoreData') {
        JStoreData(value, key)
    }
    else if (fonction == 'GetData') {
        GetData(key)
    }
    else if (fonction == 'JGetData') {
        JGetData(key)
    }
}



export default MyData