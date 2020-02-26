import React from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from "react-redux";
import {assets} from "../../definitions/assets";
import {types as fridgeTypes} from "../../store/models/fridge";
import {types as listTypes} from "../../store/models/list";
import IngredientsList from "./IngredientsList";


const Fridge = ({dispatch, ingredients, list, settings, navigation}) => {
  let _deleteIngredient = (ingredient) => {
    dispatch({type: fridgeTypes.REMOVE_INGREDIENT_TO_FRIDGE, value: ingredient.id});
    if(settings.addIngredientToShoppingList) {
      dispatch({type: listTypes.ADD_INGREDIENT_TO_LIST, value: ingredient});
    }
  };

  let _addToList = (ingredient) => {
    dispatch({type: listTypes.ADD_INGREDIENT_TO_LIST, value: ingredient});
  };

  let _disableAddToList = (ingredient) => {
    return list.filter((listIngredient) => listIngredient.id === ingredient.id).length > 0;
  };

  const actions = {
    'addToList': {'backgroundColor': '#16A0C9', 'action': _addToList, 'image': assets.list, 'disabled': _disableAddToList},
    'delete': {'backgroundColor': 'red', 'action': _deleteIngredient, 'image': assets.trash},
  };

  return (
      <View style={styles.mainView}>
        <IngredientsList actions={actions} ingredients={ingredients} navigation={navigation}/>
      </View>
  )
};

Fridge.navigationOptions = {
  title: "My Fridge"
};

const mapStateToProps = state => {
  return {
    ingredients: state.fridgeState.ingredients,
    list: state.listState.ingredients,
    settings: state.settingsState
  };
};

export default connect(mapStateToProps)(Fridge);
const styles = StyleSheet.create({
  mainView: {
    flex: 1
  }
});
