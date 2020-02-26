import React, {useState, useRef} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Button, Container, Content, Icon, Input, Item, Picker, Form} from 'native-base';
import {getResultsSearchRecipes} from "../../api/spoonacular";
import Ingredient from "../shared/Ingredient";
import Recipe from "../shared/Recipe";


const SearchRecipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  let enablePicker = useRef(false);

  const searchRecipes = async () => {
    try {
      setRecipes(await getResultsSearchRecipes(searchTerm));
    } catch(error) {
      console.log(error); //todo view
    }
  };

  return (
    <View style={styles.mainView}>

      <Form>
        <Item>
          <Input placeholder="Search Recipes"
                 onChangeText={(text) => setSearchTerm(text)}
                 onSubmitEditing={() => searchRecipes()}
                 value={searchTerm}
          />
          <Button icon transparent>
            <Icon name="ios-search" onPress={() => searchRecipes()}/>
          </Button>
        </Item>

        <View style={styles.pickers}>
          <View style={[styles.picker, {marginRight:30}]}>
            <Picker
              note
              mode="dropdown"
              placeholder="Diet ?"
              placeholderStyle={{ color: "#bfc6ea" }}
              style={{flex:1}}
              enabled={enablePicker.current}
              // selectedValue={}
              // onValueChange={}
            >
              {/*<Picker.Item label="Wallet" value="key0" />*/}
            </Picker>
          </View>


          <View style={[styles.picker, {marginLeft:30}]}>
            <Picker
              note
              mode="dropdown"
              placeholder="Cuisine ?"
              enabled={enablePicker.current}
              // selectedValue={}
              // onValueChange={}
            >
              {/*<Picker.Item label="Wallet" value="key0" />*/}
            </Picker>
          </View>
        </View>
      </Form>

      <View style={styles.recipes}>
        <FlatList
          data={ recipes }
          keyExtractor={ (item) => item.id.toString() }
          renderItem={ ({item}) => <Recipe key={item.id} recipe={item}/>}
          style={styles.content}
        />
      </View>

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
    flex:1,
  },

  pickers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20
  },

  picker: {
    flex:1,
    borderRadius: 7,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0,0,0,0.1)',
  },

  recipes: {
    flex:1,
  }
});
