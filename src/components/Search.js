import React from 'react'
import {View, TextInput, StyleSheet, Text} from 'react-native'
import RadioForm from 'react-native-simple-radio-button'

const Search = () => {
    return (
        <View style={styles.mainView}>
            <TextInput placeholder="Ingredient's name" name style={styles.textInput}/>
            <View style={styles.radioButtonContainer}>
                <Text>
                    Sort by :
                </Text>
                <RadioForm radio_props={[{label: 'Name', value: 0}, {label: 'Aisle', value: 1}]}
                           formHorizontal={true}
                           buttonColor={'black'}
                           initial={0}
                           onPress={() => {}}
                />
            </View>
        </View>
        )
}

export default Search

const styles = StyleSheet.create({
    mainView: {
        flex: 1
    },
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
