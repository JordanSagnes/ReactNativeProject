import React from 'react'
import {View, Text, FlatList, StyleSheet, Image, TouchableOpacity} from "react-native"



const Ingredient = ({ingredient, actions}) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.leftPart}>
        <Image source={{uri: 'https://spoonacular.com/cdn/ingredients_100x100/' + ingredient.image}} style={styles.image}/>
        <Text style={styles.bold}>{ingredient.name}</Text>
      </View>
      <View>
        <View style={styles.rightPart}>
          {
            Object.keys(actions).map(action => {
              return (
                <TouchableOpacity
                  key={action + ingredient.id.toString()}
                  style={{...styles.actionButton, backgroundColor: actions[action].backgroundColor}}
                  onPress={() => (actions[action].action)(ingredient)}
                >
                  <Image source={actions[action].image} style={styles.actionImage}/>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
    </View>
  )
};



export default Ingredient;

const styles = StyleSheet.create({
  mainView: {
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
  }
});
