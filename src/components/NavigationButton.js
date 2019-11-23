import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { colors } from "../definitions/colors"

const NavigationButton = ({buttonText}) => {
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity style={styles.navigationButton}>
                <Text style={styles.text}>{ buttonText }</Text>
            </TouchableOpacity>
        </View>
    );
};


export default NavigationButton;

const styles = StyleSheet.create({
    mainContainer : {
        flexDirection: "row",
    },

    navigationButton: {
        flex: 1,
        backgroundColor: colors.mainColor,
        color: "white",
        height: 50,
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
    },

    text: {
        color: "white",
    },
});