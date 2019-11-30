import React from 'react'
import {fakeFood} from "../helpers/fakeFood"
import {assets} from "../definitions/assets"
import {View, Text, FlatList, StyleSheet, Image} from "react-native"


const FoodList = () => {
    return (
        <View style={styles.mainView}>
            <FlatList
                data={fakeFood}
                keyExtractor={(item) => item.name}
                renderItem={({item}) =>
                    <View style={styles.itemView}>
                        <Image style={styles.foodIcon} source={assets.foodIcon}/>
                        <Text style={styles.foodText}>
                            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                        </Text>
                        <View style={styles.actionContainer}>
                            <Image style={styles.actionIcon} source={assets.addToListIcon}/>
                            <Image style={styles.actionIcon} source={assets.deleteIcon}/>
                        </View>
                    </View>
                }
            />
        </View>
    )
}

export default FoodList

const styles = StyleSheet.create({
    mainView: {
    },
    itemView: {
        flex: 1,
        flexDirection: 'row',
        margin: 7.5,
        backgroundColor: 'white',
        elevation: 2,
        borderRadius: 4
    },
    foodIcon: {
        height: 75,
        width: 75,
        borderRadius: 4
    },
    actionContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    actionIcon: {
        height: 40,
        width: 40,
        alignSelf: 'center',
        margin: 5
    },
    foodText: {
        flex: 1,
        alignSelf: 'center',
        marginLeft: 20,
        fontSize: 15
    }
})
