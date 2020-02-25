import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Keyboard} from 'react-native';
import Ingredient from "../shared/Ingredient";
import { Container, Content, Footer, Item, Input, Icon, Button } from 'native-base';
import { CheckBox } from 'react-native-elements';
import {colors} from "../../definitions/colors";
import NoIngredient from "../shared/NoIngredient";


const IngredientsList = ({ingredients, navigation, actions}) => {
  let searchTerm = useRef('');
  const [sortBy, setSortBy] = useState( 'name' );
  const [ingredientsFilter, setIngredientsFilter] = useState([]);

  useEffect(() => {
    _getIngredients();
  }, [ingredients]);

  let _getIngredients = (sortBy = 'name') =>  {
    let ingredientsTemp = ingredients;
    if(searchTerm.current.length > 0) {
      ingredientsTemp = ingredientsTemp.filter((ingredient) => ingredient.name.trim().toLowerCase().includes(searchTerm.current.trim().toLowerCase()));
    }
    ingredientsTemp = sortIngredients(ingredientsTemp, sortBy);
    setIngredientsFilter(ingredientsTemp);
    Keyboard.dismiss();
  };

  let sortIngredients = (ingredients, filter) => {
    return ingredients.sort((a, b) => {
      if(filter === 'aisle') {
        return a.aisle.toLowerCase().localeCompare(b.aisle.toLowerCase());
      }
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });
  };

  let changeFilter = (newSort) => {
    _getIngredients(newSort);
    setSortBy(newSort);
  };

  return (
    <Container>
      <Content>
        <View style={styles.form}>
          <Item>
            <Input placeholder="Search"
                   onChangeText={(text) => searchTerm.current = text}
                   onSubmitEditing={() => _getIngredients(sortBy)}
            />
            <Button icon transparent onPress={() => _getIngredients(sortBy)}>
              <Icon name="ios-search" />
            </Button>
          </Item>

          <View style={styles.checkboxes}>
            <Text style={styles.label}>Sort by :</Text>
            <CheckBox checkedIcon='dot-circle-o'
                      uncheckedIcon='circle-o'
                      checked={sortBy === 'name'}
                      title="name"
                      onPress={() => changeFilter('name')}
            />
            <CheckBox checkedIcon='dot-circle-o'
                      uncheckedIcon='circle-o'
                      checked={sortBy === 'aisle'}
                      title="aisle"
                      onPress={() => changeFilter('aisle')}
            />
          </View>
        </View>
        {
          (ingredientsFilter.length > 0) ? (
            ingredientsFilter.map(ingredient => {
              return <Ingredient key={ingredient.id} ingredient={ingredient} actions={actions} />
            })
          ) : (
            <NoIngredient/>
          )

        }
      </Content>
      <Footer style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SearchIngredients', {'searchTerm': searchTerm.current})}>
          <Icon name="ios-add" style={styles.buttonIcon}/>
          <Text style={styles.buttonText}>add new ingredients</Text>
        </TouchableOpacity>
      </Footer>
    </Container>
  )
};

export default IngredientsList;
const styles = StyleSheet.create({
  form: {
    paddingHorizontal: 20
  },

  checkboxes: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  label: {
    fontWeight: 'bold'
  },

  addNew: {
    position: 'absolute',
    bottom: 20
  },

  footer: {
    backgroundColor: 'white',
    paddingVertical: 10
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.mainColor,
    paddingHorizontal: 20,
    borderRadius: 7,
    height: 38,
  },

  buttonIcon: {
    color:'white',
    marginRight: 20,
  },

  buttonText: {
    color: 'white'
  }
});
