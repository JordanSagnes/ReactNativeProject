import React from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from "react-redux";
import {assets} from "../definitions/assets";
import {types as fridgeTypes} from "../store/actions/fridge";
import {types as listTypes} from "../store/actions/list";
import IngredientsList from "./IngredientsList";


const Fridge = ({dispatch, ingredients}) => {
  let _deleteIngredient = (ingredient) => {
    dispatch({type: fridgeTypes.REMOVE_INGREDIENT_TO_FRIDGE, value: ingredient.id});
  };

  let _addToList = (ingredient) => {
    dispatch({type: listTypes.ADD_INGREDIENT_TO_LIST, value: ingredient});
  };

  const actions = {
    'addToList': {'backgroundColor': '#16A0C9', 'action': _addToList, 'image': assets.list},
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
    ingredients: state.fridgeState.ingredients,
  };
};

export default connect(mapStateToProps)(Fridge);
const styles = StyleSheet.create({
  mainView: {
    flex: 1
  }
});
