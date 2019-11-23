import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RecipeDetails from "./src/components/RecipeDetails";

export default function App() {
  return (
    <View style={styles.container}>
      <RecipeDetails/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
