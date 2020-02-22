import React from 'react'
import {StyleSheet, View, ScrollView, Text} from 'react-native'
import {connect} from "react-redux";
import Ingredient from "./Ingredient";

const Fridge = ({ingredients}) => {
  console.log(ingredients);
    return (
        <View style={styles.mainView}>
          {
            ingredients.map(ingredient => {
              return <Ingredient key={ingredient.id} ingredient={ingredient}/>
            })
          }
        </View>
    )
};

const mapStateToProps = state => {
  return {
    ingredients: state.fridgeState.ingredients
  };
};

export default connect(mapStateToProps)(Fridge);
const styles = StyleSheet.create({
    mainView: {
        flex: 1
    }
});
