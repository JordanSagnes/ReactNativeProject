import React from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from "react-redux";
import {assets} from "../../definitions/assets";
import {types as listTypes} from "../../store/models/list";
import {types as fridgeTypes} from "../../store/models/fridge";
import IngredientsList from "./IngredientsList";


const List = ({dispatch, ingredients, fridge, settings, navigation}) => {
  let _deleteIngredient = (ingredient) => {
    dispatch({type: listTypes.REMOVE_INGREDIENT_TO_LIST, value: ingredient.id});
  };

  let _addToFridge = (ingredient) => {
    dispatch({type: fridgeTypes.ADD_INGREDIENT_TO_FRIDGE, value: ingredient});
    if(settings.removeIngredientToShoppingList) {
      _deleteIngredient(ingredient);
    }
  };

  let _disabledAddToFridge = (ingredient) => {
    return fridge.filter((fridgeIngredient) => fridgeIngredient.id === ingredient.id).length > 0;
  };

  const actions = {
    'addToFridge': {'backgroundColor': '#95C25E', 'action': _addToFridge, 'image': assets.fridge, 'disabled': _disabledAddToFridge},
    'delete': {'backgroundColor': 'red', 'action': _deleteIngredient, 'image': assets.trash},
  };

  return (
    <View style={styles.mainView}>
      <IngredientsList actions={actions} ingredients={ingredients} navigation={navigation}/>
    </View>
  )
};

List.navigationOptions = {
  title: "My Shopping List"
};

const mapStateToProps = state => {
  return {
    ingredients: state.listState.ingredients,
    fridge: state.fridgeState.ingredients,
    settings: state.settingsState,
  };
};

export default connect(mapStateToProps)(List);
const styles = StyleSheet.create({
  mainView: {
    flex: 1
  }
});
