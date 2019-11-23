import React from 'react'
import {fakeRecipe} from '../helpers/fakeRecipe'
import {FlatList, View, Text, Image, StyleSheet} from 'react-native'
import {assets} from '../definitions/assets'

const RecipeList = () => {
    return (
        <FlatList
            data={fakeRecipe}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) =>
                <View style={styles.itemView}>
                    <View style={styles.recipecontainer}>
                        <Image style={styles.recipeIcon} source={assets.foodIcon}/>
                    </View>
                    <View style={styles.titleAndActionView}>
                        <Text style={styles.title}>
                            {item.title}
                        </Text>
                        <View style={styles.actionContainer}>
                            <Image style={styles.action} source={assets.deleteIcon}/>
                        </View>
                    </View>
                </View>
            }
        />
    )
}

export default RecipeList

const styles = StyleSheet.create({
    itemView: {
        flex: 1,
        margin: 7.5,
        backgroundColor: 'white',
        elevation: 2,
        borderRadius: 4
    },
    recipecontainer: {
      flex: 1,
      flexDirection: 'row'
    },
    recipeIcon: {
        flex: 1
    },
    titleAndActionView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        flex:1,
        textAlign: 'center',
        fontSize: 15
    },
    actionContainer: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    action: {

    }
})