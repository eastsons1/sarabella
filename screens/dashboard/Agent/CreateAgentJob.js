import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  RefreshControl,
  ImageBackground,
  Image,
  Alert,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonComp from "../../../components/ButtonComp";
import {
  StackActions,
  NavigationActions,
  CommonActions,
} from "@react-navigation/native";
import axios from "axios";
import Colors from "../../../constant/Colors";
import { Dropdown } from "react-native-element-dropdown";
import EnvVariables from "../../../constant/EnvVariables";
import Splash from "../../../components/Splash";

const CreateAgentJob = (props) => {
  const [id, setId] = useState(undefined);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [value, setValue] = useState(null);
  const [modelType, setModelType] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [modelsData, setModelsData] = useState([]);
  // const [apiLoader, setApiLoader] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [dataload, setDataLoaded] = useState(false);
  const [agentName, setAgentname] = useState(undefined);
  const [agentId, setAgentId] = useState(undefined);
  const [lname, setLname] = useState(undefined);
 

  const [fNameTouched, setFNameTouched] = useState(false);
  const [lNameTouched, setLNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [mobileTouched, setMobileTouched] = useState(false);
  const [addressTouched, setAddressTouched] = useState(false);
  const [modelTypeTouched, setModelTypeTouched] = useState(false);

  const [fNameError, setFNameError] = useState(false);
  const [lNameError, setLNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [modelTypeError, setModelTypeError] = useState(false);

  const Scheduledata = [
    { label: "New Enquiry", value: "1" },
    { label: "Installment", value: "2" },
  ];
  const modeldata = [];

  // function cleanUp () {
  //   setFName('')
  //   setLName('')
  //   setEmail('')
  //   setMobile('')
  //   setAddress('')
  //   setModelType('')
  //   // setDataLoaded(false)
  //   // setApiLoader(true)
  //   // setModelsData([])
  //   // setApiLoader(false)
  // }

  // useEffect(() => {
  //   return () => {
  //     console.log("cleaned up");
  //   };
  // }, []);


//   const setDetails=async()=>{
//     setUserType(await AsyncStorage.getItem("user_type"));
//     setId(await AsyncStorage.getItem("user_id"));
//     console.log('first this should print'+id)
//   }

  useEffect( () => {
   
     // setDetails()
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
          setAgentname(res.data.Users_details_View[0].first_name);
          setLname(res.data.Users_details_View[0].last_name);
          setAgentId(res.data.Users_details_View[0].user_id);
         
          setApiLoader(false);
        });
      }
  

  }, [id]);

  useEffect(()=>{
    props.navigation.addListener('blur', () => {console.log('unblurred');setApiLoader(true);})
  },[])


  const setDetails = async () => {
    console.log("Set Details called in create customer");
    console.log("data loadd==" + dataload);
    setId(await AsyncStorage.getItem("user_id"));
  };

  useEffect(() => {
    props.navigation.addListener("focus", () => {
      setDetails();
      if (dataload == false) {
        setApiLoader(true);
        let webApiUrl =
          EnvVariables.API_HOST + `APIs/ViewAllServices/ViewAllServices.php`;
        axios
          .get(webApiUrl)
          .then((res) => {
            console.log(
              "response in create schedule of create customer=" +
                JSON.stringify(res.data)
            );
            for (var i = 0; i < res.data.OutPut.length; i++) {
              modeldata.push({
                label: res.data.OutPut[i].service_title,
                value: i + 1,
              });
            }
            setModelsData(modeldata);

            //setAbc(res.data.OutPut);
          })
          .finally(() => {
            setApiLoader(false);
            setDataLoaded(true);
          });
      }
    });
  }, []);

  const checkValidation = async () => {
  

    if (
     
      modelType != ""
    ) {
      setApiLoader(true);
      // setApiLoader(true);
      const data = new FormData();
     
     // data.append("user_type", "Users");
      data.append("agent_id", id);
      data.append("customer_id", props.route.params.customerId);
    //   data.append("mobile", mobile);
    //   data.append("address", address);
    //   data.append("email", email);
    //   data.append("password", "01010101");
    //   data.append("schedulartype", "New Installment");
      data.append("order_request", modelType);
    //   data.append("agent_id", await AsyncStorage.getItem("user_id"));
  //  let webApiUrl = 'https://refuel.site/projects/tutorapp/APIs/CreateScheduleByAgent/CreateScheduleByAgent.php'

   
    let webApiUrl = 
        EnvVariables.API_HOST + `APIs/CreateScheduleByAgent/CreateScheduleByAgent.php`;

      let res = await fetch(webApiUrl, {
        method: "post",
        body: data,
      });

      let responseJson = await res.json();
      console.log("response json=>>>>>>>>>>>>>>>>>>>>>" + JSON.stringify(responseJson));

      setApiLoader(false);
      // setApiLoader(false);
      // cleanUp();
      if (responseJson.status == true) {
        let today = new Date().toISOString().slice(0, 10);
        console.log("today==" + today);
        AsyncStorage.setItem("screenBoolean", "false");
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: "AddMeasurnment",
                params: {
                  order_id: responseJson.order_request_id,
                  order_request: modelType,
                  date_of_visit: "",
                  S_T_V: "",
                //   Request_by_name:
                //     responseJson.Output[0].first_name +
                //     " " +
                //     responseJson.Output[0].last_name,
                //   contact_no: responseJson.Output[0].mobile,
                //   visit_address: responseJson.Output[0].address1,
                  created_date: today,
                  customerId: props.route.params.customerId,
                  boo: "CreateCustomer",
                },
              },
            ],
          })
        );
        // props.navigation.navigate('AddMeasurnment', {
        //     order_id:responseJson.Output[0].order_request_id,
        //     order_request:modelType,
        //     date_of_visit:'',
        //     S_T_V:'',
        //     Request_by_name:responseJson.Output[0].first_name+" "+responseJson.Output[0].last_name,
        //     contact_no:responseJson.Output[0].mobile,
        //     visit_address:responseJson.Output[0].address1,
        //     created_date:'',
        //     customerId:responseJson.Output[0].customer_id,
        //     boo:"CreateCustomer"
        //     // boo:true
        //   })
      } else {
        Alert.alert("", responseJson.message, [
          { text: "Ok", style: "cancel" },
        ]);
      }
    } else {
      Alert.alert("", "Please fill all the details", [
        { text: "Ok", style: "cancel" },
      ]);
    }
  };
  useEffect(() => {
    props.navigation.addListener("blur", () => {
      console.log("unblurred from home");
      setFName("");
      setLName("");
      setEmail("");
      setMobile("");
      setAddress("");
      setModelType("");
      setApiLoader(true);
      setDataLoaded(false);
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#c9d1fb" }}>
      <ImageBackground
        source={require("./../../../assets/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        {apiLoader ? (
          <Splash
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <Image
              source={require("../../../assets/logo.png")}
              resizeMode="contain"
              resizeMethod="scale"
              style={{ width: 160, height: 100 }}
            />
            <Text style={{ fontWeight: "bold" }}>Loading...</Text>
          </Splash>
        ) : (
          <View
            style={{
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            {/* <TextInput
                          mode="outlined"
                          label={"First Name"}
                          style={{ width: "100%", backgroundColor:'white',padding:10,borderRadius:9,marginTop:10 }}
                          value={fName}
                          placeholder='First Name'
                          onChangeText={(value) => setFName(value)}
                          activeOutlineColor={Colors.backgroundColor}
                        /> */}
          
            {/* <TextInput
                          style={{ width: "100%", backgroundColor:'white',padding:10,borderRadius:9,marginTop:10 }}
                          value={lName}
                          placeholder='Last Name'
                          onChangeText={(value) => setLName(value)}
                        /> */}
           

            {/* <TextInput
                          style={{ width: "100%", backgroundColor:'white',padding:10,borderRadius:9,marginTop:10 }}
                          value={email}
                          keyboardType={"email-address"}
                          placeholder='Email ID'
                          onChangeText={(value) => setEmail(value)}
                        /> */}

         
            {/* <TextInput
                          style={{ width: "100%", backgroundColor:'white',padding:10,borderRadius:9,marginTop:10 }}
                          value={mobile}
                          keyboardType={"phone-pad"}
                          placeholder='Mobile Number'
                          onChangeText={(value) => setMobile(value)}
                        /> */}

        

            {/* <TextInput
                          style={{ width: "100%", backgroundColor:'white',padding:10,borderRadius:9,marginTop:10 }}
                          value={address}
                          keyboardType={"default"}
                          placeholder='Address'
                          onChangeText={(value) => setAddress(value)}
                        /> */}
<Text 
style={{ 
    width: "100%", backgroundColor:'white',padding:10,borderRadius:9,marginTop:10 }}

>{agentName} {id}</Text>


     <Text
 style={{ width: "100%", backgroundColor:'white',padding:10,borderRadius:9,marginTop:10 }}
             
             > {props.route.params.customerName} {props.route.params.customerId}</Text>
            <Dropdown
              style={[
                styles.dropdown,
                { marginTop: 10 },
                isFocus && { borderColor: "black" },
              ]}
              containerStyle={{ top: Platform.OS == "android" && -30 }}
              placeholderStyle={{ fontSize: 16 }}
              selectedTextStyle={{ ...styles.selectedTextStyle, fontSize: 16 }}
              iconStyle={styles.iconStyle}
              data={modelsData}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select Service Type" : "..."}
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                //setValue(item.services_id);
                setModelType(item.label);
                setIsFocus(false);
              }}
            />

            <View style={{ width: "80%", alignSelf: "center", marginTop: 15 }}>
              <ButtonComp
                title={"Submit"}
                onPress={() => {
                  checkValidation();
                }}
              />
              {/* props.navigation.navigate('CreateCustomer') */}
            </View>

            <View style={{ width: "80%", alignSelf: "center", marginTop: 10 }}>
              <ButtonComp
                title={"Back"}
                onPress={() => {
                  props.navigation.goBack();
                }}
              />
            </View>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 1,
  },
  underline: {
    textDecorationLine: "underline",
    fontWeight: "bold",
    fontSize: 15,
    color: "black",
    width: "100%",
    marginVertical: 15,
  },
  dropdown: {
    borderColor: "gray",
    //borderWidth: 0.5,
    paddingHorizontal: 8,
    width: "100%",
    alignSelf: "center",
    marginBottom: 10,
    height: 57,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 9,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default CreateAgentJob;
