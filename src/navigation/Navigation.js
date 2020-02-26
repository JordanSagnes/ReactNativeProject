import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {Image, StyleSheet} from "react-native";
import React from "react";

import Homepage from "../components/pages/Homepage";
import SettingsPage from "../components/pages/SettingsPage";

import {colors} from "../definitions/colors";
import {assets} from "../definitions/assets";
import RecipeDetails from "../components/shared/RecipeDetails";
import Fridge from "../components/pages/Fridge";
import List from "../components/pages/List";
import SearchIngredients from "../components/pages/SearchIngredients";
import IngredientsList from "../components/pages/IngredientsList";
import SearchRecipes from "../components/pages/SearchRecipes";
import Recipes from "../components/pages/Recipes";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.mainColor,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const HomeNavigation = createStackNavigator(
  {
    Home: Homepage,
    RecipeDetails: RecipeDetails,
    Fridge: Fridge,
    List: List,
    SearchIngredients: SearchIngredients,
    IngredientsList: IngredientsList,
    Recipes: Recipes
  },
  {
    initialRouteName: "Home",
    headerLayoutPreset: 'center',
    defaultNavigationOptions: defaultNavigationOptions
  }
);

const SettingsNavigation = createStackNavigator(
  {
    Settings: SettingsPage,
  },
  {
    initialRouteName: "Settings",
    headerLayoutPreset: 'center',
    defaultNavigationOptions: defaultNavigationOptions
  }
);

const SearchNavigation = createStackNavigator(
  {
    SearchRecipes: SearchRecipes,
  },
  {
    initialRouteName: "SearchRecipes",
    headerLayoutPreset: 'center',
    defaultNavigationOptions: defaultNavigationOptions
  }
);

const TabNavigation = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigation,
      navigationOptions: {
        title: "Home",
        tabBarIcon: ({focused}) => {
          return (
            <Image
              style={focused ? styles.tabIconActive : styles.tabIcon}
              source={assets.homeIcon}
            />
          );
        }
      }
    },
    Search: {
      screen: SearchNavigation,
      navigationOptions: {
        title: "Recipes",
        tabBarIcon: ({focused}) => {
          return (
            <Image
              style={focused ? styles.tabIconActive : styles.tabIcon}
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
        tabBarIcon: ({focused}) => {
          return (
            <Image
              style={focused ? styles.tabIconActive : styles.tabIcon}
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
      activeTintColor: colors.mainColor,
    },
    initialRouteName: "Home"
  }
);

export default createAppContainer(TabNavigation);

const styles = StyleSheet.create({
  tabIcon: {
    width: 20,
    height: 20
  },

  tabIconActive: {
    width: 20,
    height: 20,
    tintColor: colors.mainColor
  }
});
