import React from "react";
import { Text, StyleSheet, View } from "react-native";
import NavigationButton from "./NavigationButton";

const Homepage = ({navigation}) => {
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
    header: null
};


export default Homepage;

const styles = StyleSheet.create({
    mainContainer : {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 50,
        backgroundColor: "#436C93"
    },

    button : {
        marginBottom: 40
    }
});