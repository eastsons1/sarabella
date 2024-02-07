import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const OneScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>One screen</Text>
      <TouchableOpacity onPress={()=>props.navigation.navigate('Home')}><Text>Go to home screen</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OneScreen;
