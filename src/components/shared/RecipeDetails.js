import React, {useState, useEffect, useRef} from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'
import {assets} from "../../definitions/assets";
import {getRecipeDetail} from "../../api/spoonacular";
import {fakeRecipeDetails} from "../../helpers/fakeRecipeDetails";
import Loading from "../shared/Loading";

const RecipeDetails = ({navigation}) => {
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
        <View style={styles.mainView}>
            {
                isRefreshing && <Loading/>
            }

            {
                recipe !== null && !isRefreshing  && (
                    <View>
                        <Text> Recipe chargée </Text>
                        <Text> test </Text>
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
});
