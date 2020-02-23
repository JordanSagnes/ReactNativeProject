import React from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from "react-redux";
import {assets} from "../definitions/assets";
import {types} from "../store/actions/list";
import IngredientsList from "./IngredientsList";


const Fridge = ({dispatch, ingredients}) => {
  let _deleteIngredient = (ingredient) => {
    dispatch({type: types.REMOVE_INGREDIENT_TO_LIST, value: ingredient.id});
  };

  const actions = {
    'delete': {'backgroundColor': 'red', 'action': _deleteIngredient, 'image': assets.trash},
  };

  return (
    <View style={styles.mainView}>
      <IngredientsList actions={actions} ingredients={ingredients}/>
    </View>
  )
};

const mapStateToProps = state => {
  return {
    ingredients: state.listState.ingredients,
  };
};

export default connect(mapStateToProps)(Fridge);
const styles = StyleSheet.create({
  mainView: {
    flex: 1
  }
});
