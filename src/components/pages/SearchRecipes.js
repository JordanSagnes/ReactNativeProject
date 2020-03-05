import React, {useState, useEffect, useRef} from 'react';
import {FlatList, StyleSheet, View, Text, Keyboard} from 'react-native';
import {Button, Icon, Input, Item, Picker} from 'native-base';
import {getResultsFridgeRecipes, getResultsSearchRecipes} from "../../api/spoonacular";
import {cuisines} from "../../store/models/cuisine";
import {diets} from "../../store/models/diet";
import Recipe from "../shared/Recipe";
import NoIngredient from "../shared/NoIngredient";
import Loading from "../shared/Loading";
import Error from "../shared/Error";
import {colors} from "../../definitions/colors";


const SearchRecipes = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDiet, setSearchDiet] = useState('null');
  const [searchCuisine, setSearchCuisine] = useState('null');
  const [isRefreshing, setRefreshingState] = useState( false );
  const [isError, setErrorState] = useState( false );
  const [recipes, setRecipes] = useState([]);
  let numberOfRecipes = useRef(0);
  let totalResults = useRef(1);
  let reloading = useRef(false);

  useEffect(() => {
    if(recipes.length === 0 && reloading.current) {
      console.log('refresh');
      reloading.current = false;
      searchRecipes();
    }
  }, [recipes]);

  useEffect(() => {
    refresh();
  }, [searchDiet, searchCuisine]);

  const enabledPicker = () => searchTerm.length > 0;

  const searchRecipes = async () => {
    Keyboard.dismiss();
    setRefreshingState(true);
    let term = searchTerm.length > 0 ? searchTerm : null;
    let diet = searchDiet !== 'null' ? searchDiet : null;
    let cuisine = searchCuisine !== 'null' ? searchCuisine : null;
    let newRecipes = [];
    setErrorState(false);

    if((cuisine !== null || diet !== null || term !== null) && totalResults.current > 0) {
      try {
        let response = await getResultsSearchRecipes(term, cuisine, diet, numberOfRecipes.current);
        totalResults.current = response.totalResults;
        numberOfRecipes.current += response.number;
        newRecipes = response.results;
      } catch (error) {
        setErrorState(true);
      } finally {
        setRefreshingState(false);
      }
    }

    setRecipes([...recipes, ...newRecipes]);
    setRefreshingState(false);
  };

  const getFridgeRecipes = async () => {
    Keyboard.dismiss();
    setRefreshingState(true);
    setErrorState(false);
    let response = [];
    try {
      response = await getResultsFridgeRecipes();
    } catch(error) {
      setErrorState(true);
    } finally {
      setRefreshingState(false);
    }
    setRecipes(response);
    setRefreshingState(false);
  };

  const listRefresh = () => {
    if(totalResults.current > 0) {
      searchRecipes();
    }
  };

  const refresh = () => {
    console.log('refresh function');
    numberOfRecipes.current = 0;
    totalResults.current = 1;
    reloading.current = true;
    setRecipes([]); //refresh thanks useEffect
  };

  return (
    <View style={styles.mainView}>
      <Item>
        <Input placeholder="Search Recipes"
               onChangeText={(text) => setSearchTerm(text)}
               onSubmitEditing={() => refresh()}
               value={searchTerm}
        />
        <View style={styles.buttonSearch}>
          <Button icon transparent>
            <Icon name="ios-search" onPress={() => refresh()}/>
          </Button>
        </View>
      </Item>

      <View style={styles.pickers}>
        <View style={[styles.picker, {marginRight: 30}, (enabledPicker()) ? styles.enabledPicker : styles.disabledPicker]}>
          <Picker
            note
            mode="dropdown"
            enabled={enabledPicker()}
            selectedValue={searchDiet}
            onValueChange={(value) => setSearchDiet(value)}
          >
            <Picker.Item label="Select diet" value="null" />
            {
              diets.map(diet => <Picker.Item key={diet} label={diet} value={diet} />)
            }
          </Picker>
        </View>


        <View style={[styles.picker, {marginLeft: 30}, (enabledPicker()) ? styles.enabledPicker : styles.disabledPicker]}>
          <Picker
            note
            mode="dropdown"
            enabled={enabledPicker()}
            selectedValue={searchCuisine}
            onValueChange={(value) => setSearchCuisine(value)}
          >
            <Picker.Item label="Select cuisine" value="null"/>
            {
              cuisines.map(cuisine => <Picker.Item key={cuisine} label={cuisine} value={cuisine} />)
            }
          </Picker>
        </View>
      </View>
      <Button style={styles.button} onPress={() => getFridgeRecipes()}>
        <Text style={styles.buttonText}>What can I cook today ?</Text>
      </Button>

      {
        isError && <Error />
      }

      {
        isRefreshing && numberOfRecipes.current === 0
        ? <Loading/>
        : (
            <View style={styles.recipes}>
              {
                recipes.length === 0
                  ? <NoIngredient text="No recipe, start research"/>
                  : (
                    <FlatList
                      data={recipes}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({item}) => <Recipe key={item.id} recipe={item}  navigation={navigation}/>}
                      style={styles.content}
                      onRefresh={ () => refresh() }
                      refreshing={ isRefreshing }
                      onEndReached={ () => listRefresh() }
                      onEndReachedThreshold={ 0.5 }
                    />
                  )
              }
            </View>
        )
      }
    </View>
  )
};

SearchRecipes.navigationOptions = {
  title: "Search Recipes"
};

export default SearchRecipes;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },

  content: {
    flex: 1,
  },

  buttonSearch: {
    borderRadius: 7,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0,0,0,0.1)'
  },

  pickers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20
  },

  picker: {
    flex: 1,
    borderRadius: 7,
    borderWidth: 1,
    borderStyle: 'solid',
  },

  enabledPicker: {

    borderColor: 'rgba(0,0,0,0.4)'
  },

  disabledPicker: {
    borderColor: 'rgba(0,0,0,0.1)'
  },

  recipes: {
    flex: 1,
    justifyContent: 'flex-start'
  },

  button: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: colors.mainColor,
    justifyContent: 'center'
  },

  buttonText: {
    color: 'white'
  }
});
