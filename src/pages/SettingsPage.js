import React from "react";
import {Text, StyleSheet, View, Switch, Alert} from "react-native";
import {Button} from 'native-base';
import { colors } from "../definitions/colors";
import { connect } from "react-redux";
import { purgePersistor } from "../store/config";
import { modifySettingsAddIngredientToShoppingList, modifySettingsRemoveIngredientToShoppingList } from "../store/actions/settings"

const SettingsPage = ({navigation, settings, dispatch}) => {
    let _switchAddIngredient = () => {
        dispatch(modifySettingsAddIngredientToShoppingList(!settings.addIngredientToShoppingList));
    };

    let _switchRemoveShoppingList = () => {
        dispatch(modifySettingsRemoveIngredientToShoppingList(!settings.removeIngredientToShoppingList));
    };

    let _resetStore = () => {
        Alert.alert('Confirmation', 'Are you sur to delete all ?',
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'OK', onPress: () => purgePersistor()},
            ]
        )
    };

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Configutation</Text>
            <View style={styles.formline}>
                <Switch onChange={_switchAddIngredient} value={settings.addIngredientToShoppingList} style={styles.switch}></Switch>
                <Text style={styles.text}>Add ingredients removed from the fridge to the shopping list</Text>
            </View>

            <View style={styles.formline}>
                <Switch onChange={_switchRemoveShoppingList} value={settings.removeIngredientToShoppingList} style={styles.switch}></Switch>
                <Text style={styles.text}>When adding an ingredient to the fridge from the shopping list, remove it from
                    the shopping list</Text>
            </View>

            <View style={styles.apiSection}>
                <Text style={styles.title}>API</Text>
                <Text>TODO</Text>
                <Text>TODO</Text>
            </View>

            <Button style={styles.button} onPress={() => _resetStore()}>
                <Text style={styles.buttonText}>Clear all data</Text>
            </Button>
        </View>
    );
};

SettingsPage.navigationOptions = {
    title: "Settings",
};

const mapStateToProps = state => {
    return {
        settings: state.settingsState
    };
};

export default connect(mapStateToProps)(SettingsPage);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginVertical: 20,
        marginHorizontal: 20,
    },

    formline: {
        flexDirection: "row",
        marginBottom: 20
    },

    title: {
        color: colors.mainColor,
        fontSize: 23,
        marginBottom: 20
    },

    switch: {
        marginRight: 10
    },

    text: {
        flex: 1,
    },

    apiSection : {
        flex:1,
        marginTop: 40,
        justifyContent: "flex-start",
    },

    button: {
        flexDirection: 'row',
        backgroundColor: colors.mainColor,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonText: {
        alignSelf: 'center',
        color: 'white'
    }
});
