import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Image, StyleSheet } from "react-native";
import React from "react";

import Homepage from "../components/Homepage";

import { colors } from "../definitions/colors";
import { assets } from "../definitions/assets";

const Navigation = createStackNavigator(
    {
        Homepage: Homepage,
    },
    {
        initialRouteName: "Homepage"
    }
);

const TabNavigation = createBottomTabNavigator(
    {
        Search: {
            screen: Navigation,
            navigationOptions: {
                title: "Search",
                tabBarIcon: () => {
                    return (
                        <Image
                            style={styles.tabIcon}
                            source={assets.searchIcon}
                        />
                    );
                }
            }
        },
        Home: {
            screen: Navigation,
            navigationOptions: {
                title: "Home",
                tabBarIcon: () => {
                    return (
                        <Image
                            style={styles.tabIcon}
                            source={assets.homeIcon}
                        />
                    );
                }
            }
        },

        Settings: {
            screen: Navigation,
            navigationOptions: {
                title: "Settings",
                tabBarIcon: () => {
                    return (
                        <Image
                            style={styles.tabIcon}
                            source={assets.settingsIcon}
                        />
                    );
                }
            }
        }
    },
    {
        tabBarOptions: {
            activeBackgroundColor: colors.mainColor,
            activeTintColor: "white"
        },
        initialRouteName: "Home"
    }
);

export default createAppContainer(TabNavigation);

const styles = StyleSheet.create({
    tabIcon: {
        width: 20,
        height: 20
    }
});
