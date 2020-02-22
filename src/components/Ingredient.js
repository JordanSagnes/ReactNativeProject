import React from 'react'
import {assets} from "../definitions/assets"
import {View, Text, FlatList, StyleSheet, Image, TouchableOpacity} from "react-native"
import {addIngredientToFridge, types} from "../store/actions/fridge";
import { connect } from "react-redux";


const Ingredient = ({ingredient, fridgeState, dispatch}) => {
  _addToFridge = () => {
    dispatch({type: 'ADD_INGREDIENT_TO_FRIGE', value: ingredient});
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.leftPart}>
        <Image source={{uri: 'https://spoonacular.com/cdn/ingredients_100x100/' + ingredient.image}} style={styles.image}/>
        <Text style={styles.bold}>{ingredient.name}</Text>
      </View>
      <View>
        <View style={styles.rightPart}>
          <TouchableOpacity style={[styles.actionButton, styles.backgroundColorGreen]} onPress={() => _addToFridge()}>
            <Image source={assets.fridge} style={styles.actionImage}/>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.backgroundColorBlue]}>
            <Image source={assets.list} style={styles.actionImage}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
};

const mapStateToProps = state => {
  return {
    fridgeState: state.fridgeState
  };
};

export default connect(mapStateToProps)(Ingredient);

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 4,
    marginVertical: 20,
  },

  leftPart: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20
  },

  rightPart: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  bold: {
    fontWeight: 'bold'
  },

  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 40
  },

  actionButton: {
    backgroundColor: 'red',
    paddingVertical: 20,
    paddingHorizontal: 30,
    height: 120,
    justifyContent: 'center'
  },

  actionImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: 'white'
  },

  backgroundColorGreen: {
    backgroundColor: '#95C25E'
  },

  backgroundColorBlue: {
    backgroundColor: '#16A0C9'
  },
});
