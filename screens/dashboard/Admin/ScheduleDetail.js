import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity, ImageBackground, BackHandler, Platform} from "react-native";
import { Modal, Portal, Provider } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused} from '@react-navigation/native';

import Color from "../../../constant/Colors";
import ButtonComp from "../../../components/ButtonComp";
import EnvVariables from "../../../constant/EnvVariables";

const ScheduleDetail = (props) => {

  const isFocused = useIsFocused();

  const [values, setValue] = useState(null);
  const [label, setLabel] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [agents, setAgents]=useState(undefined);
  const [showButton, setShowButton]=useState(true)

  var order_id = props.route.params.order_request_id;
  var scheduleabc = props.route.params.scheduleabc;
  var loggedInUserId=props.route.params.loggedInUserId
  console.log("ho jaaaa bhai=" + JSON.stringify(scheduleabc));
  console.log("order_id=" + order_id);

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // const backAction = async () => {
  //   props.navigation.navigate('ViewAllSchedule');
  //   return false
  // };


  useEffect(()=>{
    let webApiUrl=EnvVariables.API_HOST+`APIs/ViewAllUsersList/ViewAllUsersList.php?user_type=Agents`;
    axios.get(webApiUrl).then((res)=>{
      setAgents(res.data.Users_List)
      console.log('response of all agents='+JSON.stringify(res.data.Users_List))
    })
    // BackHandler.addEventListener("hardwareBackPress", backAction);

    // return () =>
    //   BackHandler.removeEventListener("hardwareBackPress", backAction)
  },[])

  const AssignAgent=async()=>{
   if(values!=null){
    let webApiUrl=EnvVariables.API_HOST+`APIs/AssignTaskToAgent/AssignTaskToAgent.php`;
    const data=new FormData();
    data.append("Agents",values)
    data.append("id",order_id)
    data.append("loggedIn_user_id",loggedInUserId)

    let res=await fetch(webApiUrl,{
      method:'post',
      body:data
    })
    let responseJson = await res.json();
    console.log('respone JSON='+JSON.stringify(responseJson))
    if(responseJson.status==true){
      Alert.alert('',responseJson.Assign_Task_To_Agent,[{text:'Ok', style:'cancel', onPress:()=>hideModal()}])
      setShowButton(false)
    }else{console.log(responseJson)}
   }else{Alert.alert('','Please Select An Agent',[{text:'Ok', style:'cancel'}])}
    
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
     
                    
                        {value.AssignedJob=='No' && showButton!=false?<View style={{marginHorizontal: '20%', justifyContent:'flex-end', marginVertical:20}}><ButtonComp title={"Assign Task to"} onPress={showModal} /></View>:null}
                        <Modal visible={visible}  onDismiss={hideModal} style={{justifyContent:'flex-end'}} contentContainerStyle={{backgroundColor: 'white', paddingHorizontal:10, paddingTop:10, borderWidth:1, borderRadius:10}}>
                          {console.log('showbutton='+showButton)}
                          <View style={{flexDirection:'row', justifyContent:'space-between'}}><Text>Assign task to Agents</Text><TouchableOpacity onPress={hideModal}><Icon name="close-circle-outline" size={18} /></TouchableOpacity></View>
                          <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: "black" }]}containerStyle={{height:250, top: Platform.OS=='android' && -30}}
                            data={agents}
                            search
                            labelField="first_name"
                            valueField="user_id"
                            placeholder={!isFocus ? "Select Agent" : "..."}
                            value={values}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item) => {
                              setValue(item.user_id);
                              setLabel(item.first_name+" "+item.last_name);
                              setIsFocus(false);
                            }}
                          />{console.log('label='+JSON.stringify(values))}
                          <View style={{marginHorizontal:'20%', marginBottom:10}}><ButtonComp title={'Assign Task'} onPress={AssignAgent} /></View>
                        </Modal>

                      </View>
                    );
                  }
                })}
              
                {/* individual boxes of job list ends */}
              </View>
              
              {/* view ends */}
            </View>
          </ScrollView>
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

export default ScheduleDetail;
