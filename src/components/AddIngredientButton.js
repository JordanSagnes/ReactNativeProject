import React from 'react'
import {Button, StyleSheet, View} from 'react-native'

const AddIngredientButton = () => {
    return (
        <Button style={styles.button}
                title="Add new ingredient"
        />
    )
}

export default AddIngredientButton

const styles = StyleSheet.create({
    button: {
        flex: 1,
       margin: 100
    }
})
