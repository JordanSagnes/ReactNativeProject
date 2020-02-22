import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Image, StyleSheet } from "react-native";
import React from "react";

import Homepage from "../components/Homepage";
import SettingsPage from "../components/SettingsPage";

import { colors } from "../definitions/colors";
import { assets } from "../definitions/assets";
import RecipeDetails from "../components/RecipeDetails";
import Fridge from "../components/Fridge";
import SearchIngredients from "../components/SearchIngredients";

const HomeNavigation = createStackNavigator(
    {
        Home: Homepage,
        RecipeDetails: RecipeDetails,
        Fridge: Fridge
    },
    {
        initialRouteName: "Home"
    }
);

const SettingsNavigation = createStackNavigator(
    {
        Settings: SettingsPage,
    },
    {
        initialRouteName: "Settings"
    }
);

const SearchNavigation = createStackNavigator(
  {
      SearchIngredients: SearchIngredients,
  },
  {
      initialRouteName: "SearchIngredients"
  }
);

const TabNavigation = createBottomTabNavigator(
    {
        Home: {
            screen: HomeNavigation,
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
        Search: {
            screen: SearchNavigation,
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
        Settings: {
            screen: SettingsNavigation,
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
            activeBackgroundColor: 'rgba(0,0,0,0.2)',
            activeTintColor: "black",
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
