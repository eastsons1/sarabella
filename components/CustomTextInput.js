import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Easing, Animated } from 'react-native';

const CustomTextInput = ({ placeholder, value,editable, onChangeText, ...props }) => {
//     const initialValue = value && !editable ? 1 : 0;
//   const [isFocused, setIsFocused] = useState(initialValue === 1);
  const [isFocused, setIsFocused] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));

  const handleFocus = () => {
        setIsFocused(true);
        Animated.timing(animatedValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: false,
        }).start();
  };

  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  };

  const placeholderStyle = {
    position: 'absolute',
    left: 5,
    top: editable==true?animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [10, -8],
    }):-10,
    fontSize: editable==true?animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }):12,
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#888'],
    }),
    backgroundColor:'white'
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={placeholderStyle}>{placeholder}</Animated.Text>
      <TextInput
        {...props}
        value={value}
        editable={editable}
        onChangeText={onChangeText}
        keyboardType='phone-pad'
        style={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    paddingBottom: 10,
    position: 'relative',
    backgroundColor:'white',
    borderWidth:1,
    width:'30%',
    borderRadius:6
  },
  input: {
    // height: 40,
    borderColor: '#ddd',
    // borderBottomWidth: 1,
    paddingHorizontal: 5,
    fontSize: 16,
  },
});

export default CustomTextInput;
