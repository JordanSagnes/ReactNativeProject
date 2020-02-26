import React from 'react'
import {View, Text, Image, StyleSheet, Animated, Easing} from "react-native"
import {assets} from "../../definitions/assets";

const Loading = ({text}) => {
  let spinValue = new Animated.Value(0);

  Animated.timing(
    spinValue,
    {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear
    }
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.mainView}>
      <Animated.Image style={{...styles.image, transform: [{rotate: spin}] }} source={assets.pizza} />
    </View>
  )
};



export default Loading;

const styles = StyleSheet.create({
  mainView: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },

  image: {
    tintColor: 'rgba(0,0,0,0.2)',
    width: 200,
    height: 200,
    marginBottom: 20
  }
});
