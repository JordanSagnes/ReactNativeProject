import React from 'react'
import {View, TextInput, StyleSheet, Text} from 'react-native'

const Search = () => {
    return (
        <View>
            <TextInput placeholder="Ingredient's name" name style={styles.textInput}/>
            <View style={styles.radioButtonContainer}>
                <Text>Sort by :</Text>
            </View>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 7.5
    },
    radioButton: {
        marginLeft: 7.5
    },
    textInput: {
        marginTop: 35,
        marginLeft: 7.5,
        marginRight: 7.5,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    }
})
