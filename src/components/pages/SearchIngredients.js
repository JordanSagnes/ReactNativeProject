import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Keyboard} from 'react-native';
import { Container, Header, Content, Button, Item, Input, Icon } from 'native-base';
import {FlatList} from "react-native"
import {getResultsSearchIngredients} from "../../api/spoonacular";
import Ingredient from "../shared/Ingredient";
import {assets} from "../../definitions/assets";
import {types as fridgeType} from "../../store/actions/fridge";
import {types as listType} from "../../store/actions/list";
import {connect} from "react-redux";
import NoIngredient from "../shared/NoIngredient";

const SearchIngredients = ({dispatch, list, fridge, navigation}) => {
  const [ingredients, setIngredients] = useState( [] );
  const [searchTerm, setSearchTerm] = useState(navigation.getParam('searchTerm') || '');

  useEffect(() => {
    searchIngredient();
  }, []);

  let _addToFridge = (ingredient) => {
    dispatch({type: fridgeType.ADD_INGREDIENT_TO_FRIDGE, value: ingredient});
  };

  let _addToList = (ingredient) => {
    dispatch({type: listType.ADD_INGREDIENT_TO_LIST, value: ingredient});
  };

  const searchIngredient = async () => {
    try {
      if(searchTerm.length > 0)
        setIngredients(await getResultsSearchIngredients(searchTerm));
    } catch(error) {
      console.log(error); //TODO view error
    }
    Keyboard.dismiss();
  };

  let _disableAddToList = (ingredient) => {
    return list.filter((listIngredient) => listIngredient.id === ingredient.id).length > 0;
  };

  let _disableAddToFridge = (ingredient) => {
    return fridge.filter((fridgeIngredient) => fridgeIngredient.id === ingredient.id).length > 0;
  };

  const actions = {
    'addToFridge': {'backgroundColor': '#95C25E', 'action': _addToFridge, 'image': assets.fridge, 'disabled': _disableAddToFridge},
    'addToList': {'backgroundColor': '#16A0C9', 'action': _addToList, 'image': assets.list, 'disabled': _disableAddToList},
  };


  return (
    <Container>
      <Content>
        <Item>
          <Input placeholder="Search"
                 onChangeText={(text) => setSearchTerm(text)}
                 onSubmitEditing={() => searchIngredient()}
                 value={searchTerm}
          />
          <Button icon transparent onPress={() => searchIngredient()}>
            <Icon name="ios-search" />
          </Button>
        </Item>
        <FlatList
          data={ ingredients }
          keyExtractor={ (item) => item.id.toString() }
          renderItem={ ({item}) => <Ingredient key={item.id} ingredient={item} actions={actions}/>}
        />
        {
          ingredients.length === 0  &&
            <NoIngredient/>
        }
      </Content>
    </Container>
  )
};
SearchIngredients.navigationOptions = {
  title: 'Search ingredients'
};
const mapStateToProps = state => {
  return {
    list: state.listState.ingredients,
    fridge: state.fridgeState.ingredients
  };
};
export default connect(mapStateToProps)(SearchIngredients);

const styles = StyleSheet.create({
});
