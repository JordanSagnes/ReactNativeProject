import React from "react";
import {Text, StyleSheet, View, ImageBackground, Image, TouchableOpacity} from "react-native";
import {assets} from "../definitions/assets";

const Homepage = ({navigation}) => {
  return (
    <ImageBackground style={styles.mainContainer} source={assets.backgroundMobile} blurRadius={2}>
      <Image style={styles.logo} source={assets.logoFridge}/>
      <View style={styles.buttonsList}>
        {/*MY FRIDGE*/}
        <TouchableOpacity style={[styles.button, styles.buttonMarginBottom]} onPress={() => navigation.navigate('Fridge')}>
          <View style={styles.buttonView}>
            <Image source={assets.fridge} style={styles.buttonIcon}/>
            <Text style={styles.buttonText}>My fridge</Text>
          </View>
          <View style={styles.buttonView}>
            <Image source={assets.chevronRight} style={styles.buttonSmallIcon}/>
          </View>
        </TouchableOpacity>

        {/*MY LIST*/}
        <TouchableOpacity style={[styles.button, styles.buttonMarginBottom]} onPress={() => navigation.navigate('List')}>
          <View style={styles.buttonView}>
            <Image source={assets.list} style={styles.buttonIcon}/>
            <Text style={styles.buttonText}>My list</Text>
          </View>
          <View style={styles.buttonView}>
            <Image source={assets.chevronRight} style={styles.buttonSmallIcon}/>
          </View>
        </TouchableOpacity>

        {/*MY RECIPES*/}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RecipeDetails')}>
          <View style={styles.buttonView}>
            <Image source={assets.food} style={styles.buttonIcon}/>
            <Text style={styles.buttonText}>My recipes</Text>
          </View>
          <View style={styles.buttonView}>
            <Image source={assets.chevronRight} style={styles.buttonSmallIcon}/>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

Homepage.navigationOptions = {
  header: null
};


export default Homepage;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 50
  },

  buttonsList: {
    // flex: 1
  },

  button: {
    flex: 1,
    maxHeight: 60,
    minHeight: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: "center",
    borderRadius: 4,
  },

  buttonMarginBottom: {
    marginBottom: 50,
  },

  buttonIcon : {
    width: 30,
    resizeMode: 'contain',
    marginRight: 20
  },

  buttonSmallIcon : {
    width: 20,
    resizeMode: 'contain',
    tintColor: 'rgba(126, 63, 18,0.5)'
  },

  buttonText : {
    color: 'black',
    fontSize: 25
  },

  buttonView : {
    flexDirection: 'row',
    alignItems: 'center'
  },

  logo: {
    width: '100%',
    resizeMode: 'contain',
    marginBottom: 100,
  }
});
