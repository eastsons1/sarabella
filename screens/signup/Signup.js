import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TextInput,
  Button,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import Constants from "expo-constants";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import EnvVariables from "../../constant/EnvVariables";
import Splash from "../../components/Splash";
import ButtonComp from "../../components/ButtonComp";

const data = [
  // { label: "Users", value: "1" },
  { label: "Customer", value: "1" },
  { label: "Agents", value: "2" },
  { label: "Manufacturing Units", value: "3" },
];

const Signup = (props) => {
  const [value, setValue] = useState(null);
  const [label, setLabel] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [apiLoader, setApiLoader] = useState(false);

  useEffect(()=>{
    props.navigation.addListener('blur', () => {console.log('unblurred');setFname('');setLname("");setMobile('');setAddress('');setEmail('');setPassword('');setConfPassword('')})
  },[])

  const signupHandler = async () => {
    if (
      label != "" &&
      fname != "" &&
      lname != "" &&
      mobile != "" &&
      address != "" &&
      email != "" &&
      password != ""
    ) {
      if (password != confPassword) {
        Alert.alert("", "Password does not match", [
          { text: "Ok", style: "cancel" },
        ]);
      } else {
        setApiLoader(true);
        const data = new FormData();
        data.append("user_type", label=="Customer"?"Users":label);
        data.append("fname", fname);
        data.append("lname", lname);
        data.append("mobile", mobile);
        data.append("address", address);
        data.append("email", email);
        data.append("password", password);

        let webApiUrl =
          EnvVariables.API_HOST + "APIs/UserRegistration/UserRegistration.php";

        let res = await fetch(webApiUrl, {
          method: "post",
          body: data,
        });

        let responseJson = await res.json();
        console.log("response=" + JSON.stringify(responseJson));
        if (responseJson.status == true) {
          setApiLoader(false);
          Alert.alert('','Registration Successful',[{text:'Ok',style:'cancel',onPress:async()=>{
            await AsyncStorage.setItem("user_id", responseJson.User_Registration_data[0].user_id);
            await AsyncStorage.setItem("loginStatus", "true");
            await AsyncStorage.setItem("first_name", responseJson.User_Registration_data[0].first_name);
            await AsyncStorage.setItem("last_name", responseJson.User_Registration_data[0].last_name);
            await AsyncStorage.setItem("profile_image", responseJson.User_Registration_data[0].profile_image);
            await AsyncStorage.setItem("user_type", label=='Customer'?'Users':label);

            props.navigation.navigate("Main",{userType:label=='Customer'?'Users':label});
            // props.navigation.navigate("Login")
          }}]) 
        } else {
          setApiLoader(false);
          Alert.alert(
            "",
            "This Email Id Already Exists. Please Try Another Email Id.",
            [{ text: "Ok", style: "cancel" }]
          );
        }
        setTimeout(() => {
          setApiLoader(false);
        }, 5000);
      }
    } else {
      Alert.alert("", "Kindly fill empty fields", [
        { text: "Ok", style: "cancel" },
      ]);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex:1}}>
    <View
      style={{
        flex: 1,
        //paddingTop: Constants.statusBarHeight,
        // backgroundColor: Constants.statusBarHeight ? "#102799" : null,
      }}
    >
      {apiLoader ? (
        <Splash style={{alignItems:'center', justifyContent:'center', flex:1}}>
        <Image
         source={require("../../assets/logo.png")}
         resizeMode="contain"
         resizeMethod="scale"
         style={{ width: 160, height: 160 }}
       />
       <Text style={{fontWeight:'bold', marginTop:10}}>Loading...</Text>
     </Splash>
      ) : (
        <View style={{ flex: 1 }}>
          <ImageBackground
            source={require("../../assets/curtain3.jpg")}
            style={{ width: "100%", height: "100%", flex: 1 }}
            resizeMode="cover"
          >
            <View
              style={{
                marginHorizontal: 10,
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <ImageBackground
                source={require("../../assets/frame1.png")}
                style={{
                  width: "100%",
                  alignSelf: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  overflow: "hidden",
                  paddingBottom: 10,
                  paddingTop: 20,
                }}
                resizeMode="cover"
              >
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: "black" }]}
                  containerStyle={{top:Platform.OS=='android'&& -30}}
                  placeholderStyle={{ fontSize: 16 }}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "Select User Type" : "..."}
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setValue(item.value);
                    setLabel(item.label);
                    setIsFocus(false);
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 20,
                  }}
                >
                  <TextInput
                    style={{ ...styles.dropdown, width: "48%" }}
                    placeholder="First Name"
                    value={fname}
                    onChangeText={(value) => setFname(value)}
                  />
                  <TextInput
                    style={{ ...styles.dropdown, width: "48%" }}
                    placeholder="Last Name"
                    value={lname}
                    onChangeText={(value) => setLname(value)}
                  />
                </View>
                <TextInput
                  style={styles.dropdown}
                  placeholder="Phone No."
                  value={mobile}
                  onChangeText={(value) => setMobile(value)}
                />
                <TextInput
                  style={styles.dropdown}
                  placeholder="Your Email Address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                />

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 20,
                  }}
                >
                  <TextInput
                    style={{ ...styles.dropdown, width: "48%" }}
                    placeholder="Password"
                    autoCapitalize="none"
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                  />
                  <TextInput
                    style={{ ...styles.dropdown, width: "48%" }}
                    placeholder="Confirm Password"
                    autoCapitalize="none"
                    value={confPassword}
                    onChangeText={(value) => setConfPassword(value)}
                  />
                </View>

                <TextInput
                  style={{ ...styles.dropdown, height: 100 }}
                  placeholder="Address"
                  value={address}
                  onChangeText={(value) => setAddress(value)}
                />
                {/* <Button
                  title="SIGN IN"
                  color={"#102799"}
                  onPress={signupHandler} 
                /> */}
                <View style={{ marginTop: 20, marginHorizontal:'20%' }}>
                  <ButtonComp title={'SIGN IN'} onPress={signupHandler} />
                </View>
                <Text style={{ textAlign: "center", marginTop: 20 }}>
                  I HAVE AN ACCOUNT{" "}
                  <Text
                    onPress={() => props.navigation.navigate("Login")}
                    style={{
                      textDecorationLine: "underline",
                      color: "#102799",
                    }}
                  >
                    LOGIN NOW
                  </Text>
                </Text>
              </ImageBackground>
            </View>
          </ImageBackground>
        </View>
      )}
    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderColor: "gray",
    //borderWidth: 0.5,
    paddingHorizontal: 8,
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
    height: 40,
    backgroundColor: "white",
  },

  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default Signup;
