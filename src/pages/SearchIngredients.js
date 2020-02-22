import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Item, Input, Icon } from 'native-base';
import {getResultsSearchIngredients} from "../api/spoonacular";
import Homepage from "./Homepage";
import Ingredient from "../components/Ingredient";

const SearchIngredients = () => {
  const [ingredients, setIngredients] = useState( [] );
  let searchTerm = '';

  const searchIngredient = async () => {
    try {
      setIngredients(await getResultsSearchIngredients(searchTerm));
    } catch(error) {
      console.log(error); //TODO view error
    }
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
        {
          ingredients.map(ingredient => {
            return <Ingredient key={ingredient.id} ingredient={ingredient}/>
          })
        }
      </Content>
    </Container>
  )
};
SearchIngredients.navigationOptions = {
  header: null
};
export default SearchIngredients

const styles = StyleSheet.create({
});
