import React from 'react'
import Search from "./Search"
import FoodList from "./FoodList"
import AddIngredientButton from "./AddIngredientButton"
import {StyleSheet, View, ScrollView} from 'react-native'

const Fridge = () => {
    return (
        <View style={styles.mainView}>
            <Search/>
            <ScrollView>
                <FoodList/>
            </ScrollView>
            <AddIngredientButton/>
        </View>
    )
}

export default Fridge

const styles = StyleSheet.create({
    mainView: {
        flex: 1
    }
})
