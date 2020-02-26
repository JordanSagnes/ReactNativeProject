import React from 'react'
import {View, Text, Image, StyleSheet} from "react-native"
import {assets} from "../../definitions/assets";

const Error = ({text}) => {
  return (
    <View style={styles.mainView}>
      <Image source={assets.error} style={styles.image}/>
      <Text style={styles.text}>An error has occurred</Text>
    </View>
  )
};



export default Error;

const styles = StyleSheet.create({
  mainView: {
    marginVertical: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },

  image: {
    width: 200,
    height: 200,
    marginBottom: 20
  },

  text: {
    color: 'rgba(0,0,0,0.2)',
    fontSize: 25
  }
});
