import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { colors } from "../definitions/colors"
import NavigationButton from "./NavigationButton";

const Homepage = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.buttons}>
                <View style={styles.button}><NavigationButton buttonText="My Fridge"/></View>
                <View style={styles.button}><NavigationButton buttonText="My List"/></View>
                <NavigationButton buttonText="My Recipes"/>
            </View>
        </View>
    );
};

Homepage.navigationOptions = {
    title: "Home"
};


export default Homepage;

const styles = StyleSheet.create({
    mainContainer : {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 50,
    },

    button : {
        marginBottom: 40
    }
});