import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert, ImageBackground, Image, Platform
} from "react-native";
import axios from "axios";
import { Modal, Portal, Provider } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { Dropdown } from "react-native-element-dropdown";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Color from "../../../constant/Colors";
import ButtonComp from "../../../components/ButtonComp";
import EnvVariables from "../../../constant/EnvVariables";
import Splash from "../../../components/Splash";

const IndividualOrder = (props) => {
  var quote_id = props.route.params.quote_id;
  var orderList = props.route.params.orderList;
  console.log("quote id in individual order=" + quote_id);
  console.log("order list individual lsit=" + JSON.stringify(orderList));

  const [valuess, setValue] = useState(null);
  const [label, setLabel] = useState(null);
  const [manufacturingEmail, setManufacturingEmail] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [manufacturingUnits, setManufacturingUnits] = useState(undefined);
  const [apiLoader, setApiLoader]=useState(true)
  const [dataload, setDataLoaded]=useState(false)
  const [showButton, setShowButton]=useState(true)

  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    if(dataload==false){
      setApiLoader(true)
      let webApiUrl =
        EnvVariables.API_HOST +
        `APIs/ViewAllUsersList/ViewAllUsersList.php?user_type=Manufacturing Units`;
      axios.get(webApiUrl).then((response) => {
        setManufacturingUnits(response.data.Users_List);
        console.log(
          "response of all manufacturing units=" +
            JSON.stringify(response.data.Users_List)
        );
        setDataLoaded(true)
        setApiLoader(false)
      }).catch((err)=>{
        setDataLoaded(true)
        setApiLoader(false)
      })
    }
  }, []);

  // pick image starts
  // const pickImage = async () => {
  //   setApiLoader(true)
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     quality: 0.5,
  //     //base64: true,
  //   });

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //     // setImage((value) => [result.uri]);
  //     // AssignManufacturingUnit({ uri: result.uri });
  //     console.log('result urii===='+result.assets[0].uri)
  //     setApiLoader(false)
  //   }
  //   // setTimeout(() => {
  //   //   setApiLoader(false);
  //   // }, 5000);
  // };
  // pick image ends 

  // const AssignManufacturingUnit = async (imageUri) => {
    const AssignManufacturingUnit = async () => {
    // console.log('image uri='+JSON.stringify(imageUri))
    // console.log('image in assigning======'+image)
    if (
      valuess != null &&
      quote_id != undefined &&
      manufacturingEmail != null 
      // && image.length!=0
      // imageUri != undefined &&
      // imageUri != null 
    ) {
      setApiLoader(true);
      let webApiUrl =
        EnvVariables.API_HOST +
        `APIs/AssignOrderToManufacturingUnit/AssignOrderToManufacturingUnit.php`;
      console.log("webapiurl=" + webApiUrl);
      const data = new FormData();
      data.append("quote_id", quote_id);
      data.append("manufacturing_user_id", valuess);
      data.append("manufacturing_email", manufacturingEmail);
      // data.append("my_file", {
      //   // uri: imageUri.uri,
      //   uri:image,
      //   name: "image.jpg",
      //   type: "image/jpg",
      // });
      console.log(" form data=" + JSON.stringify(data));

      let res = await fetch(webApiUrl, {
        method: "post",
        body: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      let responseJson = await res.json();
      console.log("response json=" + JSON.stringify(responseJson));
      if (responseJson.status == true) {
        setShowButton(false);
        Alert.alert("", "Success", [
          { text: "Ok", style: "cancel", onPress: () => hideModal() },
        ]);
        setApiLoader(false);
      } else {
        // console.log(responseJson);
      }
    } else {
      Alert.alert("", "Please select a Manufacturing Unit", [
        { text: "Ok", style: "cancel" },
      ]);
    }
  };

  useEffect(()=>{
    props.navigation.addListener("blur",()=>{
      setShowButton(true)
    })
  },[])

  // useEffect(()=>{
  //   props.navigation.addListener("blur",()=>{
  //     // setImage("")
  //     setValue(null)
  //     quote_id=''
  //     orderList=''
  //     setManufacturingUnits(undefined)
  //     setManufacturingEmail(null)
  //     setDataLoaded(false)
  //     setApiLoader(true)
  //   })
  // },[])

  return (
    <Provider>
      <Portal>
        <View style={{ flex: 1, backgroundColor: '#c9d1fb' }}>
        <ImageBackground
        source={require("./../../../assets/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        {apiLoader?(<Splash style={{alignItems:'center', justifyContent:'center', flex:1}}>
           <Image
            source={require("../../../assets/logo.png")}
            resizeMode="contain"
            resizeMethod="scale"
            style={{ width: 160, height: 100 }}
          />
          <Text style={{fontWeight:'bold'}}>Loading...</Text>
        </Splash>):(
          <ScrollView
          style={{ marginTop: 20, marginHorizontal: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {orderList.map((value) => {
            return (
              <View>
                {value.Order_details.map((values) => {
                  if (values.quote_id == quote_id) {
                    return (
                      <View style={styles.individualBoxView}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            marginBottom: 15,
                            textAlign: "center",
                          }}
                        >
                          Assigned Job Details:
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                          }}
                        >
                          <Text style={styles.textInfo}>Service</Text>
                          <Text style={{ textTransform: "capitalize" }}>
                            : {value.Services_details[0].order_request}
                          </Text>
                        </View>
                        <View style={styles.assignedJobView}>
                          <Text style={styles.textInfo}>Quotation No.</Text>
                          <Text>: {values.quotation_no}</Text>
                        </View>
                        <View style={styles.assignedJobView}>
                          <Text style={styles.textInfo}>Contact No.</Text>
                          <Text>: {value.Services_details[0].contact_no}</Text>
                        </View>
                        <View
                          style={{
                            ...styles.assignedJobView,
                            // marginBottom: 10,
                          }}
                        >
                          <Text style={styles.textInfo}>Visit Address</Text>
                          <Text>
                            : {value.Services_details[0].visit_address}
                          </Text>
                        </View>
                        <View style={{...styles.assignedJobView, marginBottom:10}}>
                          <Text style={styles.textInfo}>Assigned to</Text>
                          <Text>: {values.Assigned_Manufacturer_name}</Text>
                        </View>

                        {/* {showButton == true && ( */}
                        {values.Assigned_Manufacturer_name==" " && showButton==true && (
                          <View
                            style={{
                              marginHorizontal: "20%",
                              justifyContent: "flex-end",
                              marginVertical: 30,
                            }}
                          >
                            <ButtonComp
                              title={"Assign Order To"}
                              onPress={showModal}
                            />
                          </View>
                        )}
                        {/* )} */}
                        <Modal
                          visible={visible}
                          onDismiss={hideModal}
                          style={{ justifyContent: "flex-end" }}
                          contentContainerStyle={{
                            backgroundColor: "white",
                            paddingHorizontal: 10,
                            paddingTop: 10,
                            borderWidth: 1,
                            borderRadius: 10,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text>Assign Order To Manufacturing Units</Text>
                            <TouchableOpacity onPress={hideModal}>
                              <Icon name="close-circle-outline" size={18} />
                            </TouchableOpacity>
                          </View>
                          <Dropdown
                            style={[
                              styles.dropdown,
                              isFocus && { borderColor: "black" },
                            ]}
                            search
                            containerStyle={{
                              height: 250,
                              top: Platform.OS == "android" && -30,
                            }}
                            data={manufacturingUnits}
                            labelField="first_name"
                            valueField="user_id"
                            placeholder={
                              !isFocus ? "Select Manufacturing Unit" : "..."
                            }
                            value={valuess}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item) => {
                              setValue(item.user_id);
                              setLabel(item.first_name + " " + item.last_name);
                              setManufacturingEmail(item.email);
                              setIsFocus(false);
                            }}
                          />
                          {/* <View style={{marginHorizontal:'20%', marginBottom:10}}>
                          <ButtonComp
                            title={'Image Upload'}
                            onPress={pickImage}
                          />
                          </View> */}
                          {/* <TouchableOpacity
                            style={{ alignItems: "center", marginBottom: 15 }}
                            onPress={pickImage}
                          >
                            <Text style={{ fontWeight: "bold" }}>
                              Image Upload
                            </Text>
                          </TouchableOpacity> */}
                          {console.log("label=" + manufacturingEmail)}
                          {showButton == true && (
                            <View
                              style={{
                                marginHorizontal: "20%",
                                paddingBottom: 20,
                              }}
                            >
                              <ButtonComp
                                title={"Assign Order"}
                                onPress={AssignManufacturingUnit}
                              />
                            </View>
                          )}
                        </Modal>
                      </View>
                    );
                  }
                })}
              </View>
            );
          })}

          {orderList.map((value) => {
            return (
              <View>
                {value.Measurement_details.map((values) => {
                  if (values.quote_id == quote_id) {
                    return (
                      <View style={styles.individualBoxView}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "bold",textAlign:'center'
                            //marginBottom: 15,
                          }}
                        >
                          Added Measurement Details:
                        </Text>

                        <View style={styles.assignedJobView}><Text style={styles.textInfo}>Measurement Type </Text><Text style={{fontWeight:'normal'}}>: {values.measurement_type}</Text></View>
                        <View style={styles.assignedJobView}><Text style={styles.textInfo}>Product Name </Text><Text style={{fontWeight:'normal'}}>: {values.product}</Text></View>
                        
                        <View style={styles.assignedJobView}><Text style={styles.textInfo}>Location </Text><Text style={{fontWeight:'normal'}}>: {values.location}</Text></View>
                        <View style={styles.assignedJobView}><Text style={styles.textInfo}>Quantity </Text><Text style={{fontWeight:'normal'}}>: {values.quantity}</Text></View>
                        <View style={styles.assignedJobView}><Text style={styles.textInfo}>Width </Text><Text style={{fontWeight:'normal'}}>: {values.width}+{values.width2}</Text></View>
                        <View style={styles.assignedJobView}><Text style={styles.textInfo}>Height </Text><Text style={{fontWeight:'normal'}}>: {values.height}+{values.height2}</Text></View>

                        <View style={styles.assignedJobView}><Text style={styles.textInfo}>Cord Details </Text><Text style={{fontWeight:'normal'}}>: {values.cord_details}</Text></View>
                        {/* <View style={styles.assignedJobView}><Text style={styles.textInfo}>Lifting System </Text><Text style={{fontWeight:'normal'}}>: {values.lifting_systems}</Text></View>
                        <View style={styles.assignedJobView}><Text style={styles.textInfo}>Frame Color </Text><Text style={{fontWeight:'normal'}}>: {values.frame_color}</Text></View>
                        <View style={styles.assignedJobView}><Text style={styles.textInfo}>Control </Text><Text style={{fontWeight:'normal'}}>: {values.control_left}</Text></View>

                        <View style={styles.assignedJobView}><Text style={styles.textInfo}>Style </Text><Text style={{fontWeight:'normal'}}>: {values.style}</Text></View>
                        <View style={styles.assignedJobView}><Text style={styles.textInfo}>Color </Text><Text style={{fontWeight:'normal'}}>: {values.color}</Text></View>
                        <View style={styles.assignedJobView}><Text style={styles.textInfo}>Mounting </Text><Text style={{fontWeight:'normal'}}>: {values.mounting}</Text></View>
                        <View style={styles.assignedJobView}><Text style={styles.textInfo}>Baseboards </Text><Text style={{fontWeight:'normal'}}>: {values.baseboards}</Text></View>
                        <View style={styles.assignedJobView}><Text style={styles.textInfo}>Side Channel </Text><Text style={{fontWeight:'normal'}}>: {values.side_channel}</Text></View>
                        <View style={styles.assignedJobView}><Text style={styles.textInfo}>Side Channel Color </Text><Text style={{fontWeight:'normal'}}>: {values.side_channel_color}</Text></View>
                        <View style={styles.assignedJobView}><Text style={styles.textInfo}>Bottom Channel </Text><Text style={{fontWeight:'normal'}}>: {values.bottom_channel}</Text></View>
                        <View style={styles.assignedJobView}><Text style={styles.textInfo}>Bottom Channel Color </Text><Text style={{fontWeight:'normal'}}>: {values.bottom_channel_color}</Text></View>
                        <View style={styles.assignedJobView}><Text style={styles.textInfo}>Bottom Rail </Text><Text style={{fontWeight:'normal'}}>: {values.bottom_rail}</Text></View>
                        <View style={styles.assignedJobView}><Text style={styles.textInfo}>Bottom Rail Color </Text><Text style={{fontWeight:'normal'}}>: {values.bottom_rail_color}</Text></View>
                        <View style={styles.assignedJobView}><Text style={styles.textInfo}>Valance </Text><Text style={{fontWeight:'normal'}}>: {values.valance}</Text></View>
                        <View style={styles.assignedJobView}><Text style={styles.textInfo}>Valance Color </Text><Text style={{fontWeight:'normal'}}>: {values.valance_color}</Text></View> */}
                        <View style={styles.assignedJobView}><Text style={styles.textInfo}>Work Extra </Text><Text style={{fontWeight:'normal'}}>: {values.work_extra}</Text></View>
                        <View style={{...styles.assignedJobView, marginBottom:20}}><Text style={styles.textInfo}>Remarks </Text><Text style={{fontWeight:'normal'}}>: {values.remarks}</Text></View>
                      </View>
                    );
                  }
                })}
              </View>
            );
          })}
        </ScrollView>
        )}
          
          </ImageBackground>
        </View>
      </Portal>
    </Provider>
  );
};
const styles = StyleSheet.create({
  individualBoxView: {
    backgroundColor: 'white',
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    paddingTop: 10,
    shadowOffset:{height:6, width:6}, shadowOpacity:0.2, shadowRadius:4, shadowColor:'black'
  },
  dropdown: {
    borderColor: "gray",
    //borderWidth: 0.5,
    paddingHorizontal: 8,
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    height: 40,
    backgroundColor: "white",
    borderWidth: 1,
    marginBottom: 20,
  },
  assignedJobView: {
    justifyContent: "flex-start",
    flexDirection: "row",
    marginTop:10
  },
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 1,
  },
  textInfo:{fontWeight:'bold', width:160}
});

export default IndividualOrder;
