import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, StatusBar, Text, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getFocusedRouteNameFromRoute,
  useIsFocused,
  useFocusEffect,
} from "@react-navigation/native";

import Splash from "../components/Splash";

const SplashScreen = (props) => {
  const isFocused = useIsFocused();

  const [id, setId] = useState(undefined);
  const [loginStatuss, setLoginStatuss] = useState(undefined);

  const getDetails=async()=>{
    var loginStatus = await AsyncStorage.getItem("loginStatus");
    const user_id = await AsyncStorage.getItem("user_id");
    const user_type=  await AsyncStorage.getItem("user_type");
    const first_name=await AsyncStorage.getItem("first_name")
    const last_name=await AsyncStorage.getItem('last_name')
    const profile_image=await AsyncStorage.getItem('profile_image')
    // setId(await AsyncStorage.getItem('user_id'))
    //const user_type=  await AsyncStorage.getItem("user_type");
    setLoginStatuss(await AsyncStorage.getItem("loginStatus"));
    console.log("login status in splash=" + JSON.stringify(loginStatus));
    console.log("user id in splash=" + user_id);
    console.log('usertype in splash='+user_type)
    //console.log('user type in splash='+JSON.stringify(user_type));
    if (loginStatus == "true") {
      setTimeout(() => {
        props.navigation.navigate("Main");
      }, 2000);
    } else {
      setTimeout(() => {
        props.navigation.navigate("Login");
      }, 2000);
    }
  }

  useEffect( () => {
     getDetails()
  }, [getDetails]);

  // useEffect(()=>{
  //   setTimeout(()=>{props.navigation.navigate("Login")},2000);
  // })

  return (
    <View style={styles.layout}>
      {/* <Text>
        {isFocused
          ? loginStatuss == "true"
            ? setTimeout(() => {
                props.navigation.navigate("Main");
              }, 2000)
            : setTimeout(() => {
                props.navigation.navigate("Login");
              }, 2000)
          : null}
      </Text> */}
      {/* <Text>splash screen</Text> */}
      <ImageBackground source={require('../assets/SplashImg.png')} style={{width:'100%', height:'100%'}}>
      <Splash style={{alignItems:'center', justifyContent:'center', flex:1}}>
           <Image
            source={require("../assets/logo.png")}
            resizeMode="contain"
            resizeMethod="scale"
            style={{ width: 160, height: 160 }}
          />
        </Splash>
        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: "column",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default SplashScreen;
