import React, { useState, useEffect, useRef } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { assets } from "../../definitions/assets";
import { getRecipeDetail } from "../../api/spoonacular";
import { fakeRecipeDetails } from "../../helpers/fakeRecipeDetails";
import Loading from "../shared/Loading";

const RecipeDetails = ({ navigation }) => {
    const [recipe, setRecipe] = useState({});
    const [isRefreshing, setRefreshingState] = useState(false);

    useEffect(() => {
        searchRecipeDetail()
    }, []);

    // use effect
    const searchRecipeDetail = async () => {
        let response;
        let detail = {};
        try {
            setRefreshingState(true);
            response = await getRecipeDetail(navigation.getParam('recipeId'));
            console.log(response);
            detail = response;
        } catch (error) {
            console.log("Error getRecipeDetail " + error);
            setErrorState(true);
        } finally {

        }
        setRecipe(detail);
        setRefreshingState(false);
        console.log(recipe);

    };
    return (
        { 
            isRefreshing && <Loading /> 
        }

{
recipe != null &&

    (<View style={styles.mainView}>


        <Text>
            Titre : {recipe.title}
        </Text>


        <Text>
            {recipe.cuisines} cuisine(s)
            {recipe.diets} diet(s)
            </Text>
        <Text>
            Ready in{recipe.readyInMinutes}min, up to {recipe.servings} peoples
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
        {recipe.instructions}
        {recipe.analyzedInstructions}
        <Text>
            Un peu de vin monsieur ?
            </Text>
        <Text>

            {recipe.pairedWines}
            {recipe.pairingText}
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
