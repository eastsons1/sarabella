import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  ImageBackground, KeyboardAvoidingView, Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { useIsFocused, useFocusEffect, CommonActions } from '@react-navigation/native';

import Colors from "../../constant/Colors";
import EnvVariables from "../../constant/EnvVariables";
import ButtonComp from "../../components/ButtonComp";
import Splash from "../../components/Splash";

const Profile = (props) => {
  const [id, setId] = useState(undefined);
  const [dataload, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [fname, setFname] = useState(undefined);
  const [lname, setLname] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [mobile, setMobile] = useState(undefined);
  const [address, setAddress] = useState(undefined);
  const [profileImage, setProfileImage] = useState(undefined);
  const [image, setImage] = useState("");
  const [userType, setUserType]=useState("")

  const pickImage = async () => {
    //setApiLoader(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      //base64: true,
    });

    if (!result.cancelled) {
      setImage((value) => [result.uri]);
      //AsyncStorage.setItem("image", JSON.stringify(image));
      updateProfile({ uri: result.uri });
      //setApiLoader(false);
    }
    // setTimeout(() => {
    //   setApiLoader(false);
    // }, 5000);
  };

  const apiCall=async()=>{
    if (dataload == false) {
      console.log("inside if of profile");
      console.log('id='+id)
      setId(await AsyncStorage.getItem("user_id"));
      setApiLoader(true);
      // if(id!=undefined){
        let webApiUrl =
        EnvVariables.API_HOST +
        `APIs/ViewUserDetails/ViewUserDetails.php?id=${id}`;
        console.log('webapiurl in profile='+webApiUrl)
        axios.get(webApiUrl).then((res) => {
          console.log("response in profile without=" + JSON.stringify(res.data));
          setFname(res.data.Users_details_View[0].first_name);
          setLname(res.data.Users_details_View[0].last_name);
          setEmail(res.data.Users_details_View[0].email);
          setMobile(res.data.Users_details_View[0].mobile);
          setAddress(res.data.Users_details_View[0].address1);
          setProfileImage(res.data.Users_details_View[0].profile_image);
          setDataLoaded(true);
          setApiLoader(false);
        });
      // }
    }
  }

  const setDetails=async()=>{
    setUserType(await AsyncStorage.getItem("user_type"));
    setId(await AsyncStorage.getItem("user_id"));
    console.log('first this should print'+id)
  }

  useEffect( () => {
    if(isFocused){
      setDetails()
    console.log("inside use effect of profile="+id);
      console.log("inside if of profile");
      console.log('id='+id)
      if(apiLoader==true){
      setApiLoader(true);
        let webApiUrl =
        EnvVariables.API_HOST +
        `APIs/ViewUserDetails/ViewUserDetails.php?id=${id}`;
        console.log('webapiurl in profile='+webApiUrl)
        axios.get(webApiUrl).then((res) => {
          console.log("response in profile without=" + JSON.stringify(res.data));
          setFname(res.data.Users_details_View[0].first_name);
          setLname(res.data.Users_details_View[0].last_name);
          setEmail(res.data.Users_details_View[0].email);
          setMobile(res.data.Users_details_View[0].mobile);
          setAddress(res.data.Users_details_View[0].address1);
          setProfileImage(res.data.Users_details_View[0].profile_image);
          setApiLoader(false);
        });
      }
  }

  }, [id,setDetails]);

  useEffect(()=>{
    props.navigation.addListener('blur', () => {console.log('unblurred');setApiLoader(true);})
  },[])

  const updateProfile = async (imageUri) => {
    setApiLoader(true);
    const data = new FormData();
    if (
      imageUri.uri == "" ||
      imageUri.uri == null ||
      imageUri.uri == undefined
    ) {
      data.append("id", id);
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("address", address);
    } else {
      data.append("id", id);
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("address", address);
      data.append("uploadfile_logo", {
        uri: imageUri.uri,
        name: "image.jpg",
        type: "image/jpg",
      });
    }

    console.log("data=" + JSON.stringify(data));

    let webApiUrl =
      EnvVariables.API_HOST + `APIs/UpdateProfile/UpdateProfile.php`;

    let res = await fetch(webApiUrl, {
      method: "post",
      body: data,
    });

    let responseJson = await res.json();
    console.log("response json=" + JSON.stringify(responseJson));
    if (responseJson.status == true) {
      let webApiUrlInfo = `${EnvVariables.API_HOST}APIs/ViewUserDetails/ViewUserDetails.php?id=${id}`;
      axios.get(webApiUrlInfo).then((res) => {
        setFname(res.data.Users_details_View[0].first_name);
        setLname(res.data.Users_details_View[0].last_name);
        setEmail(res.data.Users_details_View[0].email);
        setMobile(res.data.Users_details_View[0].mobile);
        setAddress(res.data.Users_details_View[0].address1);
        setProfileImage(res.data.Users_details_View[0].profile_image);
      });
      setApiLoader(false);
      Alert.alert("", responseJson.Message, [{ text: "Ok", style: "cancel" }]);
    } else {
      setApiLoader(false);
      Alert.alert("", "Some problem occured, Retry", [
        { text: "Ok", style: "cancel" },
      ]);
    }
    setTimeout(() => {
      setApiLoader(false);
    }, 5000);
  };

  const isFocused = useIsFocused();

  const deleteAccount=async()=>{
    let data = new FormData();
    data.append('user_id', id);
  
    let config = {
      method: 'post',
      url: `${EnvVariables.API_HOST}APIs/DeleteUserAccount/DeleteUserAccount.php`,
      data : data
    };
  
    axios.request(config)
    .then(async(response) => {
      console.log(JSON.stringify(response.data));
      let arr=[];
            arr=await AsyncStorage.getAllKeys();
            const keys =await AsyncStorage.getAllKeys();
            
            Alert.alert("", "Do you want to delete your profile/data?", [
              {
                text: "Yes",
                style: "cancel",
                onPress: async () => {
                  const result=await AsyncStorage.multiRemove(keys)
                  console.log('result in logout='+result)
                  await AsyncStorage.removeItem('loginStatus')
                  await AsyncStorage.removeItem('user_id')
                  await AsyncStorage.removeItem('first_name')
                  await AsyncStorage.removeItem('last_name')
                  await AsyncStorage.removeItem('profile_image')
                  await AsyncStorage.removeItem('user_type')
                  props.navigation.dispatch(CommonActions.reset({routes:[{name:'Login'}]}))
                  // props.navigation.navigate("Login");
                },
              },
              { text: "No", style: "cancel" },
            ]);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS=='ios' && 'padding'} style={{flex:1}}>
      {isFocused && (
        <View style={{ flex: 1, backgroundColor: "#c9d1fb" }}>
          <ImageBackground
            source={require("../../assets/background.png")}
            resizeMode="cover"
            style={styles.rootScreen}
            imageStyle={styles.backgroundImage}
          >
            {apiLoader ? (
              <Splash style={{alignItems:'center', justifyContent:'center', flex:1}}>
              <Image
               source={require("../../assets/logo.png")}
               resizeMode="contain"
               resizeMethod="scale"
               style={{ width: 160, height: 100 }}
             />
             <Text style={{fontWeight:'bold'}}>Loading...</Text>
           </Splash>
            ) : (<View style={{flex:1}}>
              <View style={styles.containerCenter}>
                <View style={styles.container}>
                  {/* profile image */}
                  <View style={{ position: "absolute", top: -70 }}>
                    {console.log("image=" + profileImage)}
                    {profileImage.length==0 ? (
                      <TouchableOpacity onPress={pickImage}>
                        {/* <Icon name="person-circle" size={120} /> */}
                        <Image source={require('../../assets/DefaultProfile.png')} style={{width:120, height:120}} />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={pickImage}>
                        <Image
                          source={{
                            uri:
                              `https://refuel.site/projects/sarabella/UPLOAD_file/` +
                              profileImage,
                          }}
                          style={{
                            width: 120,
                            height: 120,
                            borderRadius: 60,
                            overflow: "hidden",
                          }}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  {/* profile image ends */}
                  {/* profile info starts */}
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",marginTop:70
                        }}
                      >
                        <TextInput
                          mode="outlined"
                          label={"First Name"}
                          style={{ width: "48%", backgroundColor:'white' }}
                          value={fname}
                          onChangeText={(value) => setFname(value)}
                          activeOutlineColor={Colors.mainColor}
                        />
                        <TextInput
                          mode="outlined"
                          label={"Last Name"}
                          value={lname}
                          onChangeText={(value) => setLname(value)}
                          style={{ width: "48%", backgroundColor:'white' }}
                          activeOutlineColor={Colors.mainColor}
                        />
                      </View>
                      <View>
                        <TextInput
                          style={{ marginTop: 10, backgroundColor:'white' }}
                          mode="outlined"
                          value={email} editable={false}
                          onChangeText={(value) => setEmail(value)}
                          label={"Enter EmailId"}
                          activeOutlineColor={Colors.mainColor}
                        />
                        <TextInput
                          style={{ marginTop: 10, backgroundColor:'white' }}
                          mode="outlined"
                          label={"Mobile No."}
                          value={mobile}
                          onChangeText={(value) => setMobile(value)}
                          keyboardType="phone-pad"
                          activeOutlineColor={Colors.mainColor}
                        />
                        <TextInput
                          style={{ marginTop: 10, backgroundColor:'white'}}
                          mode="outlined"
                          label={"Address"}
                          value={address}
                          onChangeText={(value) => setAddress(value)}
                          activeOutlineColor={Colors.mainColor}
                        />
                      </View>
                    </View>
                  {/* profile info ends */}
                </View>
              </View>
              { userType!='Admin' ?
                <View style={{  marginBottom: 20, flexDirection:'row', justifyContent:'space-between', marginHorizontal:16 }}>
                  <ButtonComp title={"UPDATE PROFILE"} onPress={updateProfile} mainStyle={{width:'45%'}} />
                  <ButtonComp title={"DELETE PROFILE"} onPress={deleteAccount} mainStyle={{width:'45%'}} />
                </View>
                :
                (
                  <View style={{  marginBottom: 20, marginHorizontal:70 }}>
                    <ButtonComp title={"UPDATE PROFILE"} onPress={updateProfile} />
                  </View>
                )
              }
            </View>
            )}
          </ImageBackground>
        </View>
      )}
    
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 1,
  },
  containerCenter: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 10,
    // borderTopEndRadius:200,
  },
  container: {
    backgroundColor: "white",
    height:380 ,
    width: "100%",
    alignItems: "center",
    marginBottom:20,
    // justifyContent: "center",
    borderRadius: 14,
    // borderBottomStartRadius : 200,
    // borderBottomEndRadius : 200, overflow:'visible'
  },
  parent: {
    height: "80%",
    width: "100%",
    transform: [{ scaleX: 2 }],
    borderBottomStartRadius: 200,
    borderBottomEndRadius: 200,
    overflow: "hidden",
    // marginHorizontal:50
  },
  child: {
    flex: 1,
    transform: [{ scaleX: 0.5 }],
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Profile;
