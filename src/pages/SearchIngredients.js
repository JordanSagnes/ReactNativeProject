import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { Container, Header, Content, Button, Item, Input, Icon } from 'native-base';
import {FlatList} from "react-native"
import {getResultsSearchIngredients} from "../api/spoonacular";
import Ingredient from "../components/Ingredient";
import {assets} from "../definitions/assets";
import {types as fridgeType} from "../store/actions/fridge";
import {types as listType} from "../store/actions/list";
import {connect} from "react-redux";
import NoIngredient from "../components/NoIngredient";

const SearchIngredients = ({dispatch}) => {
  const [ingredients, setIngredients] = useState( [] );
  let searchTerm = '';

  let _addToFridge = (ingredient) => {
    dispatch({type: fridgeType.ADD_INGREDIENT_TO_FRIDGE, value: ingredient});
  };

  let _addToList = (ingredient) => {
    dispatch({type: listType.ADD_INGREDIENT_TO_LIST, value: ingredient});
  };

  const searchIngredient = async () => {
    try {
      setIngredients(await getResultsSearchIngredients(searchTerm));
    } catch(error) {
      console.log(error); //TODO view error
    }
  };

  const actions = {
    'addToFridge': {'backgroundColor': '#95C25E', 'action': _addToFridge, 'image': assets.fridge},
    'addToList': {'backgroundColor': '#16A0C9', 'action': _addToList, 'image': assets.list},
  };


  return (
    <Container>
      <Header searchBar>

      </Header>
      <Content>
        <Item>
          <Input placeholder="Search"
                 onChangeText={(text) => searchTerm = text}
                 onSubmitEditing={() => searchIngredient()}
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
  header: null
};

export default connect(null)(SearchIngredients);

const styles = StyleSheet.create({
});
