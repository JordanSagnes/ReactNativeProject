import React, { useState, useEffect, useRef } from 'react'
import { View, Image, Text,Dimensions , StyleSheet } from 'react-native'
import { assets } from "../../definitions/assets";
import { getRecipeDetail } from "../../api/spoonacular";
import AutoHeightImage from 'react-native-auto-height-image';
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
        } finally {

        }
        setRecipe(detail);
        setRefreshingState(false);
        console.log("recipe : " + navigation.getParam('recipeId'));
        console.log(recipe);

    };

    return (
        <View style={styles.mainView}>
            {
                isRefreshing && <Loading />
            }

            {
                recipe !== null && !isRefreshing && (
                    <View>
                         <AutoHeightImage style={styles.image} source={{uri: `https://spoonacular.com/recipeImages/${recipe.id}-312x150.jpg`}} width={300} style={styles.image}/>

                        <Text style={[styles.bold, styles.detailTitle]}>{recipe.title} </Text>
                        <Text>TODO Favoris</Text>
                        {recipe.cuisines && recipe.cuisines.length !== 0 && <Text>{recipe.cuisines.map(cuisine =>
                            <Text>{recipe.cuisines[0] != cuisine && ', '} {cuisine} </Text>)} cuisine(s) </Text>}
                        {(!recipe.cuisines || recipe.cuisines.length === 0) && <Text>No cuisine(s)</Text>}


                        {recipe.diets &&  recipe.diets.length !== 0 &&<Text>{recipe.diets.map(diet =>
                            <Text key={diet}>{recipe.diets[0] != diet && ', '} {diet} </Text>)} diet(s) </Text>}

                        {(!recipe.diets || recipe.diets.length === 0) && <Text>No diet(s)</Text>}

                        <Text>Ready in {recipe.readyInMinutes}min, up to  {recipe.servings}people</Text>

                        <Text style={[styles.bold, styles.midTitle]}>Ingredients</Text>
                        <Text>Comment recup les ingredients qu'on a et ceux qu'on a pas ? </Text>

                        <Text style={[styles.bold, styles.midTitle]}>Instructions</Text>
                        {recipe.analyzedInstructions && recipe.analyzedInstructions !== 0 &&recipe.analyzedInstructions[0].steps && 
                        <View>{recipe.analyzedInstructions[0].steps.map(step =>
                            <View key={step.number}>
                                <Text>
                                    <Text style={styles.yellow}>{step.number}.</Text>
                                    <Text> {step.step}</Text>
                                </Text> 
                            
                            </View> )}  
                        </View>}

                        {(!recipe.analyzedInstructions || !recipe.analyzedInstructions === 0 ||!recipe.analyzedInstructions[0].steps) && <Text>No instructions.  </Text>}

                        <Text style={[styles.italic, styles.bold, styles.midTitle]}>Un peu de vin Monsieur ?</Text>
                        {recipe.winePairing && recipe.winePairing.pairedWines && <Text>{recipe.winePairing.pairedWines.map(pairedWine =>
                            <Text key={pairedWine}>{recipe.winePairing.pairedWines[0] != pairedWine && ', '} {pairedWine} </Text>)}  </Text>}

                        <Text> {recipe.winePairing && recipe.winePairing.pairingText && <Text style={styles.italic}>{recipe.winePairing.pairingText}</Text>}</Text>
                        <Text> {(!recipe.winePairing || !recipe.winePairing.pairingText) && <Text>No wine suggestions.</Text>}</Text>


                    </View>
                )
            }

        </View>
    );

};


export default RecipeDetails

const styles = StyleSheet.create({
    mainView: {
        flex: 1
    },
    detailTitle:{
        fontSize:18
    },
    midTitle:{
        fontSize:16
    },
    bold:{
        fontWeight: "bold"
    },
    italic:{
        fontStyle: "italic"
    },
    yellow:{
        color: '#F8AB1C'
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
    image:{
        width:Dimensions.get('window').width
    },
    ingredientsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});
