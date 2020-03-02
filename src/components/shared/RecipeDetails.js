import React from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'
import {assets} from "../../definitions/assets";
import {fakeRecipeDetails} from "../../helpers/fakeRecipeDetails";

const RecipeDetails = ({recipeDetail}) => {
    return (
        <View style={styles.mainView}>
            <View style={styles.recipeIconContainer}>
                <Image style={styles.recipeIcon} source={assets.foodIcon} />
            </View>
            <View style={styles.nameAndActionContainer}>
                <Text>
                {recipeDetail.title}
                </Text>
                <Image source={assets.deleteIcon}/>
            </View>
            <Text>
            {recipeDetail.cuisines} cuisine(s)
            {recipeDetail.diets} diet(s)
            </Text>
            <Text>
    Ready in{recipeDetail.readyInMinutes }min, up to {recipeDetail.servings} peoples
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
            {recipeDetail.instructions}
            {recipeDetail.analyzedInstructions}
            <Text>
                Un peu de vin monsieur ?
            </Text>
            <Text>
            
            {recipeDetail.pairedWines}
            {recipeDetail.pairingText}
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
