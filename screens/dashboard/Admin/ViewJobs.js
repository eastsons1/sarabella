import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet, RefreshControl, Alert, ImageBackground, Image
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'

import Color from "../../../constant/Colors";
import EnvVariables from "../../../constant/EnvVariables";
import Splash from "../../../components/Splash";

const ViewJobs = (props) => {
  const [jobList, setJobList] = useState(undefined);
  const [dataload, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [id, setId]=useState(undefined);
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();

  var one=1;

  const apiCall=async()=>{
    if (dataload == false) {
      setId(await AsyncStorage.getItem("user_id"));
      setApiLoader(true);
      let webApiUrl =
        EnvVariables.API_HOST +
        `APIs/ViewJobs/ViewJobs.php?user_type=Admin&loggedIn_user_id=${id}`;
      axios.get(webApiUrl).then((res) => {
        console.log("response in admin view jobs=" + JSON.stringify(res.data));
        setJobList(res.data.View_Jobs_List);
        setDataLoaded(true);
        setApiLoader(false);
      });
    }
  }

  useEffect(() => {
    console.log('inside useeffect')
    // apiCall()
    // if(dataload==false){
      props.navigation.addListener('focus',()=>{apiCall()})

    //   setApiLoader(true)
    //   setId(await AsyncStorage.getItem("user_id"));
    //   let webApiUrl = EnvVariables.API_HOST +`APIs/ViewJobs/ViewJobs.php?user_type=Admin&loggedIn_user_id=${id}`;
    //   axios.get(webApiUrl).then((res) => {
    //     console.log("response in admin view jobs=" + JSON.stringify(res.data));
    //     setJobList(res.data.View_Jobs_List);
    //     setDataLoaded(true);
    //     setApiLoader(false);
    // });
    // }
  },[]);

  useEffect(()=>{
    props.navigation.addListener('blur', () => {console.log('unblurred');})
  },[])



  // useFocusEffect(()=>{
  //   if (dataload == false) {
  //         setId(AsyncStorage.getItem("user_id"));
  //         setApiLoader(true);
  //         let webApiUrl =
  //           EnvVariables.API_HOST +
  //           `APIs/ViewJobs/ViewJobs.php?user_type=Admin&loggedIn_user_id=${id}`;
  //         axios.get(webApiUrl).then((res) => {
  //           console.log("response in admin view jobs=" + JSON.stringify(res.data));
  //           setJobList(res.data.View_Jobs_List);
  //           setDataLoaded(true);
  //           setApiLoader(false);
  //         });
  //       }
  // },[])
  console.log('id in view jobs='+id)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    let webApiUrl =
        EnvVariables.API_HOST +
        `APIs/ViewJobs/ViewJobs.php?user_type=Admin&loggedIn_user_id=${id}`;
      axios.get(webApiUrl).then((res) => {
        console.log("response in admin view jobs=" + JSON.stringify(res.data));
        setJobList(res.data.View_Jobs_List);
      });
    setRefreshing(false);
  }, [id, jobList]);

  if(jobList==undefined){
    return(
      <View style={{ flex: 1, backgroundColor: "#c9d1fb" }}>
        <ImageBackground
          source={require("./../../../assets/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}>
            <View style={styles.viewNothing}>
              <Text style={styles.textNothing}>No Jobs Yet</Text>
            </View>
        </ImageBackground>
      </View>
    )
  }


  // console.log("job list=" + JSON.stringify(jobList));
  return (
    <View style={{ flex: 1, backgroundColor: '#c9d1fb' }}>
      <ImageBackground
        source={require("./../../../assets/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
      {isFocused && (
        <View>
          {apiLoader ? (
        <Splash style={{alignItems:'center', justifyContent:'center', height:'100%'}}>
        <Image
         source={require("../../../assets/logo.png")}
         resizeMode="contain"
         resizeMethod="scale"
         style={{ width: 160, height: 160 }}
       />
       <Text style={{fontWeight:'bold', marginTop:10}}>Loading...</Text>
     </Splash>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
          <View style={{ marginTop: 20, marginHorizontal: 10 }}>{console.log('apiloader='+apiLoader)}
            {/* <Text
              style={{ fontWeight: "500", fontSize: 20, textAlign: "center" }}
            >
              Jobs
            </Text> */}

            {/* view starts */}
            {/* <View style={{ backgroundColor: "white", marginTop: 15 }}> */}
            <View>
              {/* individual boxes of job list starts */}
              {jobList != null || jobList != undefined
                ? jobList.map((value) => (
                  <TouchableOpacity onPress={()=>{value.Measurement_details.length!=0?props.navigation.navigate('ViewIndividualJob',{orid:value.order_request_id,jobList:jobList}):Alert.alert('','Measurement not taken yet',[{text:'Ok', style:'cancel'}])}}>
                      <View
                      //style={[styles.individualBoxView, value.AssignedJob=='Yes' && {backgroundColor:'#DDF3D8'}]} 
                      style={[styles.individualBoxView, value.Measurement_details.length!=0 && {backgroundColor:'#D9DFFF'}]}
                      >
                        <View style={{flexDirection:'row', marginBottom:10}}><Text style={styles.textInfo}>Service </Text><Text style={{textTransform:'capitalize'}}>: {value.order_request}</Text></View>
                        <View style={{flexDirection:'row', marginBottom:10}}><Text style={styles.textInfo}>Customer Name </Text><Text>: {value.Customer_name}</Text></View>
                        <View style={{flexDirection:'row', marginBottom:10}}><Text style={styles.textInfo}>Contact No. </Text><Text>: {value.contact_no}</Text></View>
                        <View style={{flexDirection:'row', marginBottom:10}}><Text style={styles.textInfo}>Assigned to agent </Text><Text>: {value.Assigned_To_Agent_Name}</Text></View>

                        <View
                          style={{ borderWidth: 0.5, marginVertical: 10 }}
                        />

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            // marginTop: 10,
                          }}
                        >
                          <Text style={{fontWeight:'bold'}}>Date of request:</Text>
                          <Text style={{fontWeight:'bold'}}>Date of visit:</Text>
                        </View>
                        
                          <View style={styles.valueDate}>
                            <View style={{ flexDirection: "row" }}>
                              <Icon name="calendar-outline" size={14} />
                              <Text style={{ marginLeft: 5 }}>
                                {value.created_date}
                              </Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                              <Icon name="calendar-outline" size={14} />
                              <Text style={{ marginLeft: 5 }}>
                                {value.date_of_visit}
                              </Text>
                            </View>
                          </View>

                      </View>
                    </TouchableOpacity>
                  ))
                : null}
              {/* individual boxes of job list ends */}
            </View>

            {/* view ends */}
          </View>
        </ScrollView>
      )}
        </View>
      )}
      </ImageBackground>
      
    </View>
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
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 1,
  },
  valueDate:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  textInfo:{fontWeight:'bold', width:130},
  viewNothing:{justifyContent:'center', alignItems:'center', flex:1},
  textNothing:{fontWeight:'bold', fontSize:24, color:'white'}
});

export default ViewJobs;
