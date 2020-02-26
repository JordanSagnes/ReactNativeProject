import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import AutoHeightImage from 'react-native-auto-height-image';
import {assets} from "../../definitions/assets";
import {connect} from "react-redux";
import {types} from "../../store/actions/recipe";

const Recipe = ({recipe, recipeStore, dispatch}) => {

  let toggleFav = () => {
    if(isFavRecipe()) {
      console.log("gg");
      dispatch({type: types.REMOVE_RECIPE_TO_FAV, value: recipe.id})
    } else {
      dispatch({type: types.ADD_RECIPE_TO_FAV, value: recipe})
    }
  };

  let isFavRecipe = () => {
    return recipeStore.recipes.filter(recipeTemp => recipeTemp.id === recipe.id).length > 0;
  };

  return (
    <View style={styles.mainView}>
      <AutoHeightImage source={{uri: `https://spoonacular.com/recipeImages/${recipe.id}-312x150.jpg`}} width={300} style={styles.image}/>
      <View style={styles.information}>
        <Text style={styles.name}>{recipe.name}</Text>
        <TouchableOpacity style={styles.icon} onPress={() => toggleFav()}>
          {
            isFavRecipe()
              ? <Image source={assets.star} style={[styles.imageIcon, styles.fav]}/>
              : <Image source={assets.star} style={[styles.imageIcon, styles.unfav]}/>
          }
        </TouchableOpacity>
      </View>
    </View>
  )
};

const mapStateToProps = state => {
  return {
    recipeStore: state.recipeState,
  };
};
export default connect(mapStateToProps)(Recipe);

const styles = StyleSheet.create({
  mainView: {
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 4,
    marginVertical: 20,
  },

  information: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10,
    // justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    alignSelf: 'center'
  },

  icon: {
    alignSelf: 'flex-end'
  },

  name: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 50
  },

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
  }
});
