import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, ImageBackground } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect, useIsFocused, CommonActions } from '@react-navigation/native';

import EnvVariables from "../../../constant/EnvVariables";
import Color from "../../../constant/Colors";
import ButtonComp from "../../../components/ButtonComp";

const JobDetail = (props) => {
  const [userType, setUserType] = useState(undefined);
  var order_id = props.route.params.order_request_id;
  var jobabc = props.route.params.jobabc;
  console.log("ho jaaaa bhai=" + JSON.stringify(props));
  console.log("order_id=" + order_id);
  let measurement;

  //var measurnment = props.route.params.measurnment;
  //var order_id = props.route.params.order_id;
  var order_request = props.route.params.order_request;
  var date_of_visit = props.route.params.date_of_visit;
  var S_T_V = props.route.params.S_T_V;
  var Request_by_name = props.route.params.Request_by_name;
  var contact_no = props.route.params.contact_no;
  var visit_address = props.route.params.visit_address;
  var cDate = props.route.params.cDate;
  // measurement=jobabc.map((value)=>{if(value.order_request_id == order_id){
  //  value.Measurement_details.map((values)=>{
  //   return values
  //  })
  // }})


  console.log('measurement='+JSON.stringify(measurement))

  const [jobDetails, setJobDetail] = useState(undefined);
  const [dataload, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [id, setId]=useState(undefined);

  // useEffect(() => {
  //   //console.log('inside useEffect')
  //   if (dataload == false) {
  //     setApiLoader(true);
  //     let webApiUrl =
  //       EnvVariables.API_HOST +
  //       `APIs/ViewJobs/ViewJobs.php?user_type=Admin&loggedIn_user_id=1`;
  //     axios.get(webApiUrl).then((res) => {
  //       setJobDetail(res.data.View_Jobs_list);
  //       setDataLoaded(true);
  //       setApiLoader(false);
  //     });
  //   }
  // }, []);
  //console.log('kya scene?')

  const getDetails=async()=>{
    setUserType(await AsyncStorage.getItem("user_type"));
    setId(await AsyncStorage.getItem("user_id"));
  }

  useEffect(()=>{
    getDetails()
  },[id, getDetails])
  console.log('id in job detail='+id)

  const addMeasurnment=async(measurnment)=>{
    // console.log('inside add measurement='+JSON.stringify(measurnment))
    // let webApiUrl=EnvVariables.API_HOST+`APIs/AddMeasurement/AddMeasurement.php`;
    // await axios.post(webApiUrl,measurnment).then(async(res)=>{
    //   console.log('response in view measurnment='+JSON.stringify(res.data))
      let apiUrl=EnvVariables.API_HOST+`APIs/CreateAQuote/CreateAQuote.php?orid=${order_id}&loggedIn_user_id=${id}`;
      await axios.get(apiUrl).then((response)=>{
        console.log('response of create quote='+JSON.stringify(response.data));
        props.navigation.navigate('CreateQuote',{ 
          order_id: order_id,
          //measurnment: measurnment,
          order_request: order_request,
          date_of_visit: date_of_visit,
          S_T_V: S_T_V,
          Request_by_name: Request_by_name,
          contact_no: contact_no,
          visit_address: visit_address,
          cDate: cDate,
          createQuoteResponse:response.data.Measurement_Items,
          Quotation_no:response.data.quote_data_list.Quotation_no,
          quote_status:response.data.quote_data_list.quote_status,
          Expiry_date:response.data.quote_data_list.Expiry_date,
          // created_date:response.data.quote_price_data.created_date,
          created_date:response.data.Measurement_Items[0].created_date,
          // created_date:response.data.quote_price_data!=null?response.data.quote_price_data.created_date:null,
          first_name:response.data.Customer_data.first_name,
          email:response.data.Customer_data.email,
          quote_id:response.data.quote_data_list.Quote_id,
        })
      }).catch((err)=>console.log(err))
    // }).catch((err)=>console.log(err))
   }

  return (
    <View style={{ flex: 1, backgroundColor: '#c9d1fb' }}>
      <ImageBackground
        source={require("./../../../assets/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
      {/* {apiLoader ? (
        <View>
          <Text>Loader</Text>
        </View>
      ) : ( */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 20, marginHorizontal: 10 }}>
            {/* <Text
              style={{ fontWeight: "500", fontSize: 20, textAlign: "center" }}
            >
              Jobs
            </Text> */}

            {/* view starts */}
            {/* <View style={{ backgroundColor: "white", marginTop: 15 }}> */}
            <View>
              {/* individual boxes of job list starts */}
              {jobabc.map((value) => {
                if (value.order_request_id == order_id) {
                  return (
                    <View style={styles.individualBoxView}>
                      <Text style={{fontSize:18, fontWeight:'bold', marginBottom:15, textAlign:'center'}}>Assigned Job Details</Text>
                      <View style={{justifyContent:'flex-start', flexDirection:'row'}}><Text style={styles.textInfo}>Service </Text><Text style={{fontWeight:'normal', textTransform:'capitalize'}}>: {value.order_request}</Text></View>
                      <View style={styles.viewInfo}><Text style={styles.textInfo}>Date of visit </Text><Text style={{fontWeight:'normal'}}>: {value.date_of_visit}</Text></View>
                      <View style={styles.viewInfo}><Text style={styles.textInfo}>Time of visit </Text><Text style={{fontWeight:'normal'}}>: {value.S_T_V}</Text></View>
                      <View style={styles.viewInfo}><Text style={styles.textInfo}>Requested by </Text><Text style={{fontWeight:'normal'}}>: {value.Customer_name}</Text></View>
                      <View style={styles.viewInfo}><Text style={styles.textInfo}>Contact No. </Text><Text style={{fontWeight:'normal'}}>: {value.contact_no}</Text></View>
                      <View style={styles.viewInfo}><Text style={styles.textInfo}>Visit Address </Text><Text style={{fontWeight:'normal'}}>: {value.visit_address}</Text></View>
                      <View style={{justifyContent:'flex-start', flexDirection:'row', marginTop:20, marginBottom:20}}><Text style={styles.textInfo}>Date of request </Text><Text style={{fontWeight:'normal'}}>: {value.created_date}</Text></View>
                      {/* <Text>Job Assigned by: {value.}</Text> */}
                      {
                        userType=='Agents'?
                        <View>
                          {
                            console.log("value.Quotation_Details_Data.length = ",value.Quotation_Details_Data.length)
                          }
                          {
                            value.Measurement_details.length==0?
                            <View style={{marginHorizontal: 80, justifyContent:'flex-end', flex:1, marginBottom:20}}><ButtonComp title={"Add Measurnments"} onPress={()=>{AsyncStorage.setItem('screenBoolean', "false");
                              props.navigation.dispatch(CommonActions.reset({
                                index:0,
                                routes:[
                                  {
                                    name:"AddMeasurnment",
                                    params:{
                                      order_id: order_id,
                                      order_request: value.order_request,
                                      date_of_visit: value.date_of_visit,
                                      S_T_V: value.S_T_V,
                                      Request_by_name: value.Request_by_name,
                                      contact_no: value.contact_no,
                                      visit_address: value.visit_address,
                                      created_date: value.created_date,
                                      boo: "JobDetail",
                                      customerId:id
                                    }
                                  }
                                ]
                              }))
                              // props.navigation.navigate("AddMeasurnment", {
                              //   order_id: order_id,
                              //   order_request: value.order_request,
                              //   date_of_visit: value.date_of_visit,
                              //   S_T_V: value.S_T_V,
                              //   Request_by_name: value.Request_by_name,
                              //   contact_no: value.contact_no,
                              //   visit_address: value.visit_address,
                              //   created_date: value.created_date,
                              //   boo: "JobDetail",
                              // });
                            }} /></View>
                            :
                            value.Quotation_Details_Data.length!==0?null:
                            <View>
                              {/* <View style={{marginHorizontal: 80, justifyContent:'flex-end', flex:1, marginBottom:20}}><ButtonComp title={"Add Measurnments"} onPress={()=>props.navigation.navigate("AddMeasurnment",{order_id:order_id, order_request:value.order_request,date_of_visit:value.date_of_visit, S_T_V:value.S_T_V, Request_by_name:value.Request_by_name, contact_no:value.contact_no, visit_address:value.visit_address, created_date:value.created_date })} /></View> */}
                              <View style={{marginBottom:20, marginHorizontal:80}}><ButtonComp title={'Create Quote'} onPress={()=>addMeasurnment(value.Measurement_details)} /></View>
                            </View>
                          }
                        </View>
                        :
                        <View>
                          <View style={{marginHorizontal: 80, justifyContent:'flex-end', flex:1, marginBottom:20}}><ButtonComp title={"Add Measurnments"} onPress={()=>{AsyncStorage.setItem('screenBoolean', "false");
                            props.navigation.dispatch(CommonActions.reset({
                              index:0,
                              routes:[
                                {
                                  name:"AddMeasurnment",
                                  params:{
                                    order_id: order_id,
                                    order_request: value.order_request,
                                    date_of_visit: value.date_of_visit,
                                    S_T_V: value.S_T_V,
                                    Request_by_name: value.Request_by_name,
                                    contact_no: value.contact_no,
                                    visit_address: value.visit_address,
                                    created_date: value.created_date,
                                    boo: "JobDetail",
                                    customerId:id
                                  }
                                }
                              ]
                            }))
                            // props.navigation.navigate("AddMeasurnment", {
                            //   order_id: order_id,
                            //   order_request: value.order_request,
                            //   date_of_visit: value.date_of_visit,
                            //   S_T_V: value.S_T_V,
                            //   Request_by_name: value.Request_by_name,
                            //   contact_no: value.contact_no,
                            //   visit_address: value.visit_address,
                            //   created_date: value.created_date,
                            //   boo: "JobDetail",
                            // });
                          }} /></View>
                          <View style={{marginBottom:20, marginHorizontal:80}}><ButtonComp title={'Create Quote'} onPress={()=>addMeasurnment(value.Measurement_details)} /></View>
                        </View>
                      }
                      </View>
                  );
                }
              })}

              {/* Need to add cord details In the API */}
              {jobabc.map((value, index)=>{
                if (value.order_request_id == order_id) {
                  return (
                <View  key={index}>
                  {value.Measurement_details.map((values, indexs)=>(
                    <View style={styles.individualBoxView}>{console.log('inside job detail='+JSON.stringify(value.Measurement_details))}
                      <Text style={styles.individualBoxTextHeading}>Added Measurement Details</Text>
                      <View style={{justifyContent:'flex-start', flexDirection:'row'}}><Text style={styles.textInfo}>Record No. </Text><Text style={{fontWeight:'normal'}}>: {indexs+1}</Text></View>
                      <View style={styles.assignedJobView}><Text style={styles.textInfo}>Measurement Type </Text><Text style={{fontWeight:'normal'}}>: {values.measurement_type}</Text></View>
                      <View style={styles.assignedJobView}><Text style={styles.textInfo}>Product Name </Text><Text style={{fontWeight:'normal'}}>: {values.product}</Text></View>
                      <View style={styles.assignedJobView}><Text style={styles.textInfo}>Location </Text><Text style={{fontWeight:'normal'}}>: {values.location}</Text></View>
                      <View style={styles.assignedJobView}><Text style={styles.textInfo}>Quantity </Text><Text style={{fontWeight:'normal'}}>: {values.quantity}</Text></View>
                      <View style={styles.assignedJobView}><Text style={styles.textInfo}>Width </Text><Text style={{fontWeight:'normal'}}>: {values.width}+{values.width2}</Text></View>
                      <View style={styles.assignedJobView}><Text style={styles.textInfo}>Height </Text><Text style={{fontWeight:'normal'}}>: {values.height}+{values.height2}</Text></View>
                      <View style={styles.assignedJobView}><Text style={styles.textInfo}>Cord Details </Text><Text style={{fontWeight:'normal'}}>: {values.cord_details}</Text></View>
                      <View style={styles.assignedJobView}><Text style={styles.textInfo}>Lifting System </Text><Text style={{fontWeight:'normal'}}>: {values.lifting_systems}</Text></View>
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
                      <View style={styles.assignedJobView}><Text style={styles.textInfo}>Valance Color </Text><Text style={{fontWeight:'normal'}}>: {values.valance_color}</Text></View>
                      <View style={styles.assignedJobView}><Text style={styles.textInfo}>Work Extra </Text><Text style={{fontWeight:'normal'}}>: {values.work_extra}</Text></View>
                      <View style={styles.assignedJobView}><Text style={styles.textInfo}>Remarks </Text><Text style={{fontWeight:'normal'}}>: {values.remarks}</Text></View>
                      <View style={{...styles.assignedJobView, marginBottom:20}}><Text style={styles.textInfo}>Created Date </Text><Text style={{fontWeight:'normal'}}>: {values.created_date}</Text></View>
                    </View>
                  ))}
                    
                </View>
              )}})}

              {/* individual boxes of job list ends */}
            </View>

            {/* view ends */}
          </View>
        </ScrollView>
        </ImageBackground>
      {/* )} */}
    </View>
  );
};

const styles=StyleSheet.create({
  individualBoxView: {
    backgroundColor: 'white',
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    paddingTop: 10,
    shadowOffset:{height:6, width:6}, shadowOpacity:0.2, shadowRadius:4, shadowColor:'black'
    //height:'100%'
  },
  individualBoxTextHeading:{fontSize:18, fontWeight:'bold', marginBottom:15, textAlign:'center'},
  assignedJobView:{justifyContent:'flex-start', flexDirection:'row', marginTop:20},
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 1,
  },
  viewInfo:{justifyContent:'flex-start', flexDirection:'row', marginTop:20},
  textInfo:{fontWeight:'600',width: 160}
})

export default JobDetail;
