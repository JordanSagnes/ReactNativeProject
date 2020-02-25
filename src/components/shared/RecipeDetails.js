import React from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'
import {assets} from "../../definitions/assets";
import {fakeRecipeDetails} from "../../helpers/fakeRecipeDetails";

const RecipeDetails = () => {
    return (
        <View style={styles.mainView}>
            <View style={styles.recipeIconContainer}>
                <Image style={styles.recipeIcon} source={assets.foodIcon} />
            </View>
            <View style={styles.nameAndActionContainer}>
                <Text>
                    NOM DU RESTAURANT
                </Text>
                <Image source={assets.deleteIcon}/>
            </View>
            <Text>
                Cuisine
            </Text>
            <Text>
                Ready in 50 min, up to 3 peoples
            </Text>
            <Text>
                Ingredients
            </Text>
            <View style={styles.ingredientsContainer}>
                <View>
                    <Text>
                        In my fridge
                    </Text>
                    <Text>
                        IG1
                    </Text>
                </View>
                <View>
                    <Text>
                        Missing
                    </Text>
                    <Text>
                        IG1
                    </Text>
                </View>
            </View>
            <Text>
                Instructions
            </Text>
            <Text>
                Un peu de vin monsieur ?
            </Text>
            <Text>
                Malbec BLABLABLA
                DESCRIPTION
            </Text>
        </View>
    )
}

export default RecipeDetails

const styles = StyleSheet.create({
    mainView: {
        flex: 1
    },
    recipeIconContainer: {
      flexDirection: 'row'
    },
    recipeIcon: {
        flex: 1
    },
    nameAndActionContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    ingredientsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})
