import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity, ImageBackground, Linking} from "react-native";
import { Modal, Portal, Provider } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused} from '@react-navigation/native';

import Color from "../../../constant/Colors";
import ButtonComp from "../../../components/ButtonComp";
import EnvVariables from "../../../constant/EnvVariables";

const EstimateScheduleDetail = (props) => {

  const isFocused = useIsFocused();

  var order_id = props.route.params.order_request_id;
  var scheduleabc = props.route.params.scheduleabc;
  var loggedInUserId=props.route.params.loggedInUserId
  // console.log("ho jaaaa bhai=" + JSON.stringify(scheduleabc));
  console.log("order_id=" + order_id);

  const [selected, setSelected]=useState(undefined);

  const details=async()=>{
    if(scheduleabc.length!=0){
      setSelected(await scheduleabc.find((abc)=>abc.order_request_id==order_id))
    }
  }

  useEffect(()=>{
    details()
  },[selected, details])

  useEffect(()=>{
    props.navigation.addListener('blur', () => {console.log('unblurred');setSelected(undefined)})
  },[])

  console.log('selected in estimate='+JSON.stringify(selected))

  const estimateHandler = () => {
    if (selected.pdf_link.length != 0) {
      var url = selected.pdf_link;
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + url);
        }
      });
    } else {
      Alert.alert(
        "",
        "Report hasn't been generated yet. Assign schedule to agent or ask agent to fill estimate and submit",
        [{ text: "Ok", style: "cancel" }]
      );
    }
  }; 


  return (
    <Provider>
      <Portal>
      
        {isFocused && (
          <View style={{ flex: 1, backgroundColor: '#c9d1fb' }}>
            <ImageBackground
        source={require("./../../../assets/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
          
          <ScrollView>
            <View style={{ marginTop: 20, marginHorizontal: 10 }}>
              <View >
                {/* individual boxes of job list starts */}
                {scheduleabc.map((value) => {
                  if (value.order_request_id == order_id) {
                    return (
                      <View style={styles.individualBoxView}>
                        {/* <Text style={{fontSize:16, fontWeight:'bold', marginBottom:15}}>Assigned Job Details</Text> */}
                        <View style={styles.viewInfo}><Text style={styles.textInfo}>Service </Text><Text style={{fontWeight:'normal', textTransform:'capitalize'}}>: {value.order_request}</Text></View>
                        <View style={styles.viewInfo}><Text style={styles.textInfo}>Requested By </Text><Text style={{fontWeight:'normal'}}>: {value.Request_by_name}</Text></View>
                        <View style={styles.viewInfo}><Text style={styles.textInfo}>Contact No. </Text><Text style={{fontWeight:'normal'}}>: {value.contact_no}</Text></View>
                        <View style={styles.viewInfo}><Text style={styles.textInfo}>Delivery Address </Text><Text style={{fontWeight:'normal'}}>: {value.visit_address}</Text></View>
                        <View style={styles.viewInfo}><Text style={styles.textInfo}>Date of request </Text><Text style={{fontWeight:'normal'}}>: {value.created_date}</Text></View>
                        <View style={styles.viewInfo}><Text style={styles.textInfo}>Date of visit </Text><Text style={{fontWeight:'normal'}}>: {value.date_of_visit}</Text></View>
                        <View style={styles.viewInfo}><Text style={styles.textInfo}>Start Time of visit </Text><Text style={{fontWeight:'normal'}}>: {value.S_T_V}</Text></View>
                        <View style={styles.viewInfo}><Text style={styles.textInfo}>End Time of visit </Text><Text style={{fontWeight:'normal'}}>: {value.E_T_V}</Text></View>
                      </View>
                    );
                  }
                })}
              
                {/* individual boxes of job list ends */}
              </View>
              
              {/* view ends */}
            </View>
          </ScrollView>

          <View style={{width:'50%', alignSelf:'center', marginBottom:20}}><ButtonComp title={'View Report'} onPress={estimateHandler} /></View>
          </ImageBackground>
        {/* )} */}
      </View>
        )}
      </Portal>
    </Provider>
  );
};

const styles=StyleSheet.create({
  individualBoxView: {
    backgroundColor: 'white',
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    paddingTop: 10,
    //height:'100%',
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
    borderWidth:1,
    marginBottom:20
  },

  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  viewInfo:{justifyContent:'flex-start', flexDirection:'row', marginBottom:10},
  textInfo:{fontWeight:'bold', width:160},
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 1,
  },
})

export default EstimateScheduleDetail;
