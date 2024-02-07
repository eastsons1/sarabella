import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity, ImageBackground, BackHandler} from "react-native";
import { Modal, Portal, Provider } from "react-native-paper";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused} from '@react-navigation/native';

import Color from "../../../constant/Colors";
import ButtonComp from "../../../components/ButtonComp";
import EnvVariables from "../../../constant/EnvVariables";

const CloseScheduleDetail = (props) => {

  const isFocused = useIsFocused();

  var order_id = props.route.params.order_request_id;
  var scheduleabc = props.route.params.scheduleabc;
  var loggedInUserId=props.route.params.loggedInUserId
  // console.log("ho jaaaa bhai=" + JSON.stringify(scheduleabc));
  console.log("order_id=" + order_id);

  const [selected, setSelected]=useState()

  // const backAction = async () => {
  //   props.navigation.navigate('CloseSchedule');
  //   return false
  // };


  useEffect(()=>{
    if(scheduleabc.length!=0){
      setSelected(scheduleabc.find((abc)=>abc.order_request_id==order_id))
    }

    // BackHandler.addEventListener("hardwareBackPress", backAction);

    // return () =>
    //   BackHandler.removeEventListener("hardwareBackPress", backAction);
  },[])

  console.log('selected='+JSON.stringify(selected))

  const closeHandler=()=>{
    if(selected.Order_status=='Completed'){
      let webApiUrl=EnvVariables.API_HOST +`APIs/FinalCloseSchedule/FinalCloseSchedule.php?order_request_id=${order_id}`
      axios.get(webApiUrl).then(async(response)=>{
        Alert.alert('',await response.data.Message,[{text:'Ok', style:'cancel', onPress:()=>props.navigation.navigate('Home')}])
      })
    }
    else {
      Alert.alert('','The order status is pending, Please contact Manufacturing Unit',[{text:'Ok', style:'cancel'}])
    }
  }

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
                        <View style={styles.viewInfo}><Text style={styles.textInfo}>Order Status </Text><Text style={{fontWeight:'normal'}}>: {value.Order_status!=null?value.Order_status:'Yet to start'}</Text></View>
                      </View>
                    );
                  }
                })}
              
                {/* individual boxes of job list ends */}
              </View>
              
              {/* view ends */}
            </View>
          </ScrollView>

          <View style={{width:'50%', alignSelf:'center', marginBottom:20}}><ButtonComp title={'Close Schedule'} onPress={closeHandler} /></View>
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

export default CloseScheduleDetail;
