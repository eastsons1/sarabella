import React, {useEffect, useRef} from 'react';
import {Animated, View} from 'react-native'

const Splash=(props)=>{

const Spin = useRef(new Animated.Value(0)).current;
  const SpinValue = Spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  useEffect(() => {
    Animated.timing(Spin, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [Spin]);

//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   const fadeIn = () => {
//     // Will change fadeAnim value to 1 in 5 seconds
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 5000
//     }).start();
//   };


  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        transform:[{rotate:SpinValue}],         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}

export default Splash;