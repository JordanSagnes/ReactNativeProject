import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FoodList from "./src/components/FoodList"
import { colors } from "./src/definitions/colors"

export default function App() {
  return (
    <View style={styles.container}>
      <FoodList/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor
  },
});
