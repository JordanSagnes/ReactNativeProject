import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {connect} from "react-redux";
import Recipe from "../shared/Recipe";
import NoIngredient from "../shared/NoIngredient";


const Recipes = ({recipes,navigation}) => {
    return (
        <View style={styles.mainView}>
            {
                recipes.length === 0
                  ? <NoIngredient text="No recipe saved" />
                  : (
                    <FlatList
                        data={recipes}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => <Recipe key={item.id} recipe={item}  navigation={navigation}/>}
                    />
                  )
            }   
        </View>
    )
};

Recipes.navigationOptions = {
    title: "My recipes"
};

const mapStateToProps = state => {
    return {
        recipes: state.recipeState.recipes,
    };
};
export default connect(mapStateToProps)(Recipes);
const styles = StyleSheet.create({
    mainView: {
        flex: 1
    }
});
