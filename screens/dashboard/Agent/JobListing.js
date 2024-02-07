import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet, RefreshControl, ImageBackground, Image
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/Ionicons'
import {useFocusEffect, useIsFocused, CommonActions } from '@react-navigation/native';
import Color from "../../../constant/Colors";
import EnvVariables from "../../../constant/EnvVariables";
import Splash from "../../../components/Splash";

const JobListing = (props) => {
  const [jobList, setJobList] = useState(undefined);
  const [dataload, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [id, setId]=useState(undefined);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  
  const getDetails=async()=>{
    setId(await AsyncStorage.getItem("user_id"));
  }

  useEffect(() => {
    console.log("Useeffect in JobListing")
    props.navigation.addListener('focus',()=>{getJobsData()})
},[id]);

  // useEffect(()=>{
  //   if(isFocused){ 
  //     getCustomerData();
  // }
  // },[isFocused]);

  // useEffect(() => {
  //   console.log('inside useEffect')
  //   //if (dataload == false) {
  //     getDetails()
  //     setApiLoader(true);
  //     let webApiUrl =
  //       EnvVariables.API_HOST +
  //       `APIs/ViewJobs/ViewJobs.php?user_type=Agents&loggedIn_user_id=${id}`;
  //       console.log('webapiurl in agent job list='+webApiUrl)
  //     axios.get(webApiUrl).then((res) => {
  //       console.log("response in agents=" + JSON.stringify(res.data));
  //       const reversed = [...res.data.View_Jobs_List].reverse();
  //       setJobList(reversed);
  //       setDataLoaded(true);
  //       setApiLoader(false);
  //     });
  //  // }
  // }, []);


  const getJobsData=async ()=>{
    console.log("getJobsData called in jobListing screen")
    getDetails()
    setApiLoader(true);
    let webApiUrl =
      EnvVariables.API_HOST +
      `APIs/ViewJobs/ViewJobs.php?user_type=Agents&loggedIn_user_id=${await AsyncStorage.getItem("user_id")}`;
      console.log('webapiurl in agent job list='+webApiUrl)
    axios.get(webApiUrl).then((res) => {
      console.log("response in agents=" + JSON.stringify(res.data));
      const reversed = [...res.data.View_Jobs_List].reverse();
      setJobList(reversed);
      setDataLoaded(true);
      setApiLoader(false);
    });
  }
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    let webApiUrl =
        EnvVariables.API_HOST +
        `APIs/ViewJobs/ViewJobs.php?user_type=Agents&loggedIn_user_id=${id}`;
      axios.get(webApiUrl).then((res) => {
        console.log("response in agents=" + JSON.stringify(res.data));
        const reversed = [...res.data.View_Jobs_List].reverse();
        setJobList(reversed);
      });
    setRefreshing(false);
  }, [id, jobList]);

  console.log("job list=" + JSON.stringify(jobList));


  if(jobList==undefined){
    return(
      <View style={{ flex: 1, backgroundColor: "#c9d1fb" }}>
        <ImageBackground
          source={require("./../../../assets/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}>
            <View style={styles.viewNothing}>
              <Text style={styles.textNothing}>No Jobs</Text>
            </View>
        </ImageBackground>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#c9d1fb'}}>
      <ImageBackground
        source={require("./../../../assets/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >

{/* <TouchableOpacity 
        style={{ width: '20%',height:'5%',justifyContent:"center",
        alignSelf:"flex-end", marginTop: 15,backgroundColor: "#B4C1CF"  }}
        onPress={() => props.navigation.navigate('CreateAgentJob',{
        customerName : props.route.params.customerName,
        customerId: props.route.params.customerId
            })}
        >
            <Text style={{color:'#fff',alignSelf:"center"}}>
                ADD JOB
            </Text>
        </TouchableOpacity>
        <Text>
        {props.route.params.customerName} {props.route.params.customerId}
     
        </Text> */}
      {apiLoader ? (
        <Splash style={{alignItems:'center', justifyContent:'center', flex:1}}>
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
          <View style={{ marginTop: 20, marginHorizontal: 10 }}>
            {/* <Text
              style={{ fontWeight: "500", fontSize: 20, textAlign: "center" }}
            >
              Jobs
            </Text> */}

            {/* view starts */}
            <View>
              {/* individual boxes of job list starts */}
              {jobList != null || jobList != undefined
                ? jobList.map((value, index) => (
                    <TouchableOpacity key={value.order_request_id}
                    onPress={() => {AsyncStorage.setItem('screenBoolean', "false");
                      value.Measurement_details.length != 0
                        ? props.navigation.navigate("JobDetail", {
                            order_request_id: value.order_request_id,
                            order_request: value.order_request,
                            date_of_visit: value.date_of_visit,
                            S_T_V: value.S_T_V,
                            Request_by_name: value.Customer_name,
                            contact_no: value.contact_no,
                            visit_address: value.visit_address,
                            created_date: value.created_date,
                            jobabc: jobList,
                          })
                          :  props.navigation.dispatch(CommonActions.reset({
                            index:0,
                            routes:[
                              {
                                name:"AddMeasurnment",
                                params:{
                                  order_id: value.order_request_id,
                                  order_request: value.order_request,
                                  date_of_visit: value.date_of_visit,
                                  S_T_V: value.S_T_V,
                                  Request_by_name: value.Customer_name,
                                  contact_no: value.contact_no,
                                  visit_address: value.visit_address,
                                  created_date: value.created_date,
                                  boo:"JobListing",
                                  customerId:id
                                }
                              }
                            ]
                          }))
                        // : props.navigation.navigate("AddMeasurnment", {
                        //     order_id: value.order_request_id,
                        //     order_request: value.order_request,
                        //     date_of_visit: value.date_of_visit,
                        //     S_T_V: value.S_T_V,
                        //     Request_by_name: value.Customer_name,
                        //     contact_no: value.contact_no,
                        //     visit_address: value.visit_address,
                        //     created_date: value.created_date,
                        //     boo:"JobListing"
                        //   });
                    }}
                      // onPress={()=>{value.Measurement_details.length!=0?props.navigation.navigate("JobDetail",{order_request_id:value.order_request_id,order_request:value.order_request, date_of_visit:value.date_of_visit, S_T_V:value.S_T_V, Request_by_name:value.Request_by_name, contact_no:value.contact_no, visit_address:value.visit_address, created_date:value.created_date, jobabc:jobList}):props.navigation.navigate("AddMeasurnment",{order_id:value.order_request_id,order_request:value.order_request, date_of_visit:value.date_of_visit, S_T_V:value.S_T_V, Request_by_name:value.Request_by_name, contact_no:value.contact_no, visit_address:value.visit_address, created_date:value.created_date})}}
                    >
                      <View style={[styles.individualBoxView, value.Measurement_details.length!=0 && {backgroundColor:'#D9DFFF'}]}>
                        <View style={styles.viewInfo}><Text style={styles.textHead}>Service </Text><Text style={{textTransform:'capitalize'}}>: {value.order_request}</Text></View>
                        <View style={styles.viewInfo}><Text style={styles.textHead}>Customer Name </Text><Text>: {value.Customer_name}</Text></View>
                        <View style={styles.viewInfo}><Text style={styles.textHead}>Contact No. </Text><Text>: {value.contact_no}</Text></View>
                        <View style={styles.viewInfo}><Text style={styles.textHead}>Email </Text><Text>: {value.Customer_email}</Text></View>
                        {value.Quotation_Details_Data.length==0 && (<View style={styles.viewInfo}><Text style={{fontWeight:'bold', color:'red'}}>No quotation created </Text></View>)}
                        <View
                          style={{ borderWidth: 0.5, marginVertical: 10 }}
                        />

                        <View
                          style={styles.dateHead}
                        >
                          <Text style={{fontWeight:'bold'}}>Date of request:</Text>
                          <Text style={{fontWeight:'bold'}}>Date of visit:</Text>
                        </View>
                        <View
                          style={styles.valueDate}
                        >
                          <View style={{flexDirection:'row'}}><Icon name="calendar-outline" size={14} /><Text style={{ marginLeft: 5 }}>{value.created_date}</Text></View>
                          
                          <View style={{flexDirection:'row'}}><Icon name="calendar-outline" size={14} /><Text style={{ marginLeft: 5 }}>{value.date_of_visit}</Text></View>
                        </View>
                        {value.Measurement_details!=null?<Text>{value.Measurement_details.product}</Text>:null}
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
  viewInfo:{flexDirection:'row',justifyContent: "flex-start",marginTop: 10,},
  textHead:{ fontWeight:'bold',width: 130},
  dateHead:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  valueDate:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  viewNothing:{justifyContent:'center', alignItems:'center', flex:1},
  textNothing:{fontWeight:'bold', fontSize:24, color:'white'}
});

export default JobListing;
