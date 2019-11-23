import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RecipeList from "./src/components/RecipeList"
import { colors } from "./src/definitions/colors"

export default function App() {
  return (
    <View style={styles.container}>
      <RecipeList/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor
  },
});
