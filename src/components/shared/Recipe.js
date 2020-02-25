import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import AutoHeightImage from 'react-native-auto-height-image';

const Recipe = ({recipe}) => {

  return (
    <View style={styles.mainView}>
      <View style={styles.imageContainer}>
        {/*<AutoHeightImage source={{uri: `https://spoonacular.com/recipeImages/${recipe.id}-636x393.jpg`}} width={500}/>*/}
        <Image source={{uri: `https://spoonacular.com/recipeImages/${recipe.id}-636x393.jpg`}} style={{width:500, height: 100}}/>
      </View>
      <View style={styles.information}>
        <Text style={styles.name}>{recipe.name}</Text>
        <TouchableOpacity style={styles.icon}>
          <Text>todo</Text>
          {/*<Image>*/}
        </TouchableOpacity>
      </View>
    </View>
  )
};



export default Recipe;

const styles = StyleSheet.create({
  mainView: {
    flex:1,
    backgroundColor: 'blue'
  },

  imageContainer: {
    flexDirection: 'row',
    backgroundColor: 'red',
    flex:1
  },

  image: {
    flex: 1,
    width: 636,
    height: 393
  },

  information: {
    flexDirection: 'row',
    flex:1,
    justifyContent: 'center'
  },

  icon: {
    alignSelf: 'flex-end'
  },

  name: {
    fontWeight: 'bold'
  }
});
