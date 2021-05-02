function MyData(fonction, key, value = null) {
    const StoreData = async (value, key) => {
        let mykey = '@'
        mykey += key
        console.log(mykey)

    }
    if (fonction == 'qqch') {
        StoreData(value, key)

    }
}


const StoreData = async (value, key) => {
    let mykey = '@'
    mykey += key
    console.log(mykey)
}
StoreData('test', 'test')


MyData('qqch', 'test1')