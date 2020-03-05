import React, { useState, useEffect } from 'react'
import {View, Image, Text, Dimensions, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import { assets } from "../../definitions/assets";
import {getRecipeDetail, getRecipeInstructions} from "../../api/spoonacular";
import Loading from "../shared/Loading";
import Error from "../shared/Error";
import {connect} from "react-redux";
import {colors} from "../../definitions/colors";
import {types} from "../../store/models/recipe";

const RecipeDetails = ({ navigation, fridge, recipeStore, dispatch }) => {
    const [recipe, setRecipe] = useState({});
    const [instructions, setInstructions] = useState([]);
    const [isRefreshing, setRefreshingState] = useState(false);
    const [isError, setError] = useState(false);

    useEffect(() => {
        searchRecipeDetail();
    }, []);

    // use effect
    const searchRecipeDetail = async () => {
        let detail = {};
        let instructions = {};
        setRefreshingState(true);
        setError(false);
        try {
            detail = await getRecipeDetail(navigation.getParam('recipeId'));
            instructions =  await getRecipeInstructions(navigation.getParam('recipeId'));
        } catch (error) {
            setError(true);
            console.log("Error getRecipeDetail " + error);
        }

        setRecipe(detail);
        setInstructions(instructions);
        setRefreshingState(false);
    };

    const sortIngredients = (inMyFridge) => {
        if(recipe !== null && recipe.extendedIngredients !== undefined) {
            let ingredients = [];
            return recipe.extendedIngredients.filter(ingredient => {
                let find = false;
                fridge.forEach(fridgeIngredient => {
                    if(ingredient.id === fridgeIngredient.id) {
                        find = true;
                    }
                });
                return (inMyFridge) ? find : !find;
            });
        }
        return [];
    };

    let toggleFav = () => {
        if(isFavRecipe()) {
            dispatch({type: types.REMOVE_RECIPE_TO_FAV, value: recipe.id})
        } else {
            dispatch({type: types.ADD_RECIPE_TO_FAV, value: recipe})
        }
    };

    const isFavRecipe = () => {
        return recipeStore.recipes.filter(recipeTemp => recipeTemp.id === navigation.getParam('recipeId')).length > 0;
    };


    return (
        <ScrollView style={styles.mainView}>
            {
                isError && <Error />
            }
            {
                isRefreshing && <Loading />
            }

            {
                recipe !== null && !isRefreshing && !isError && (
                    <View style={styles.recipe}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.topImage} source={{uri: `https://spoonacular.com/recipeImages/${recipe.id}-312x150.jpg`}}/>
                        </View>

                         <View style={styles.mainTitle}>
                             <Text style={styles.mainTitleText}>{recipe.title} </Text>
                             <TouchableOpacity style={styles.icon} onPress={() => toggleFav()}>
                                 {
                                     isFavRecipe()
                                       ? <Image source={assets.star} style={[styles.imageIcon, styles.fav]}/>
                                       : <Image source={assets.star} style={[styles.imageIcon, styles.unfav]}/>
                                 }
                             </TouchableOpacity>
                         </View>

                        {/*DIETS*/}
                        <View style={styles.content}>
                            <Text style={styles.titleContent}>Informations</Text>
                            {
                                recipe.diets && recipe.diets.length > 0
                                  ? (
                                    recipe.diets.map(diet => {
                                        return (
                                          <View key={diet} style={styles.diet}>
                                              <Image source={assets.dot} style={styles.dietImage}/>
                                              <Text>{diet}</Text>
                                          </View>
                                        )
                                    })
                                  )
                                  : (
                                    <Text>no diet specified</Text>
                                  )
                            }
                            <Text style={styles.informationsReady}>Ready in up {recipe.readyInMinutes} min</Text>
                        </View>

                        {/*INGREDIENT*/}
                        <View style={styles.content}>
                            <Text style={styles.titleContent}>Ingredients</Text>
                            <View style={styles.ingredientsGrid}>
                                <View style={styles.ingredientsSection}>
                                    <Text style={styles.ingredientsSectionText}>Missing</Text>
                                    {
                                        sortIngredients(false).map(ingredient => {
                                            return (
                                              <View key={ingredient.name} style={styles.ingredient}>
                                                  <Image style={styles.ingredientImage} source={{'uri' : `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}} />
                                                  <Text style={styles.textWrap}>{ingredient.name}</Text>
                                              </View>
                                            );
                                        })
                                    }
                                    {
                                        sortIngredients(false).length === 0 && <Text>No ingredient</Text>
                                    }
                                </View>
                                <View style={[styles.ingredientsSection, styles.ingredientBorderLeft]}>
                                    <Text style={styles.ingredientsSectionText}>In my fridge</Text>
                                    {
                                        sortIngredients(true).map(ingredient => {
                                            return (
                                              <View key={ingredient.name} style={styles.ingredient}>
                                                  <Image style={styles.ingredientImage} source={{'uri' : `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}} />
                                                  <Text style={styles.textWrap}>{ingredient.name}</Text>
                                              </View>
                                            );
                                        })
                                    }
                                    {
                                        sortIngredients(true).length === 0 && <Text>No ingredient</Text>
                                    }
                                </View>
                            </View>
                        </View>

                        {/*INSTRUCTIONS*/}
                        <View style={styles.content}>
                            <Text style={styles.titleContent}>Instructions</Text>
                            {
                                instructions.length > 0
                                ? (
                                  instructions.map(instruction => {
                                      return instruction.steps.map(step => {
                                          return (
                                            <View key={step.number} style={styles.instruction}>
                                                <Text style={styles.instructionNumber}>{step.number}</Text>
                                                <Text style={styles.instructionText}>{step.step}</Text>
                                            </View>
                                          );
                                      })
                                  })
                                ) : (
                                  <Text>No instructions</Text>
                                )
                            }
                        </View>

                        {/*WINE*/}
                        {
                            recipe.winePairing !== undefined && recipe.winePairing.pairedWines !== undefined && (
                                <View style={styles.content}>
                                    <Text style={styles.titleContent}>Good wine ?</Text>
                                    <View>
                                        <Text style={styles.wineName}>{recipe.winePairing.pairedWines.join(', ').replace(/,([^,]*)$/, ' or ' + '$1')}</Text>
                                        <Text style={styles.wineDescription}>{recipe.winePairing.pairingText}</Text>
                                    </View>
                                </View>
                              )
                        }
                    </View>
                )
            }

        </ScrollView>
    );

};

RecipeDetails.navigationOptions = {
    title: "Recipe details"
};

const mapStateToProps = state => {
    return {
        fridge: state.fridgeState.ingredients,
        recipeStore: state.recipeState,
    };
};

export default connect(mapStateToProps)(RecipeDetails);

const styles = StyleSheet.create({
    mainView: {
        flex: 1
    },

    textWrap: {
        flexWrap: 'wrap',
    },

    recipe: {
        flex: 1
    },

    imageContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width / (312 / 150),
    },

    topImage: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width / (312 / 150),
    },


    // fav recipes
    imageIcon: {
        width: 30,
        height: 30,
        marginRight: 20
    },

    fav: {
        tintColor: '#ffc400',
    },

    unfav: {
        tintColor: 'rgba(0,0,0,0.2)',
    },

    // mainTitle
    mainTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 30,
        backgroundColor: 'white',
        elevation: 2,
    },

    mainTitleText: {
        fontWeight: 'bold',
        fontSize: 20,
    },

    // content box
    content: {
        paddingHorizontal: 20,
        marginBottom: 50
    },

    titleContent: {
        textAlign: 'center',
        fontStyle: 'italic',
        fontSize: 20,
        paddingBottom: 10,
        marginBottom: 20,
        borderBottomColor: 'rgba(0,0,0,0.05)',
        borderBottomWidth: 1
    },

    //diets
    diet: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    dietImage: {
        width: 13,
        height: 13,
        marginRight: 10,
        tintColor: colors.mainColor
    },

    // informations
    informationsReady: {
        marginTop: 10,
        fontStyle: 'italic'
    },

    // ingredient
    ingredientsGrid: {
        flexDirection: (Dimensions.get('window').width < 600) ? 'column' : 'row',
        justifyContent: 'space-between'
    },

    ingredientsSection: {
        flex: 1
    },

    ingredientsSectionText: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        marginTop: (Dimensions.get('window').width < 600) ? 10 : 0
    },

    ingredient: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },

    ingredientBorderLeft: {
        paddingLeft: 20,
        borderLeftColor: 'rgba(0,0,0,0.05)',
        borderLeftWidth: (Dimensions.get('window').width < 600) ? 0 : 1
    },

    ingredientImage: {
        width: 70,
        height: 70,
        marginRight: 20
    },

    // instruction
    instruction: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },

    instructionNumber: {
        color: colors.mainColor,
        marginRight: 10,
        paddingRight: 10,
        borderRightColor: 'rgba(0,0,0,0.05)',
        borderRightWidth: 1,
        fontSize: 17
    },

    instructionText: {
        flex: 1
    },

    //wine
    wineName: {
        marginBottom: 10,
        fontWeight: 'bold'
    },

    wineDescription: {
        fontStyle: 'italic'
    }

});
