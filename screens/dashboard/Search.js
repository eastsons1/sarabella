import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";


const Search = (props) => {
  return (
    <View>
         
      <Text onPress={()=>{props.navigation.openDrawer()}}>Search Page</Text>
    </View>
  );
};

export default Search;
