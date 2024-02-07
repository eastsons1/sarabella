import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {useFocusEffect,useIsFocused} from "@react-navigation/native";

import EnvVariables from "../../constant/EnvVariables";
import Splash from "../../components/Splash";
// import AddGifImage from "../../components/AddGifImage";

const Home = (props) => {
  const [id, setId] = useState(undefined);
  const [dataload, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [schedule, setSchedule] = useState(undefined);
  const [refreshing, setRefreshing] = useState(false);
  const [customerList, setCustomerList]=useState(undefined)
  const [quotList, setQuotList]=useState(undefined);
  const [orderList, setOrderList]=useState(undefined)
  const [jobList, setJobList]=useState(undefined)
  const [orderListMan, setOrderListMan]=useState(undefined)
  const [invoiceList, setInvoiceList]=useState(undefined);
  const [email, setEmail]=useState(undefined)
  const [orderDetails, setOrderDetails]=useState(undefined)
  const [statusEmail, setStatusEmail]=useState(0)

  const [userType, setUserType] = useState(undefined);

  const isFocused = useIsFocused();

  const setDetails = async () => {
    console.log("Set Details called");
    setUserType(await AsyncStorage.getItem("user_type"));
    setId(await AsyncStorage.getItem("user_id"));
  };


  async function fetchCustomerData(id) {
    const data = new FormData();
    data.append("agent_id", id);
    let webApiUrl =EnvVariables.API_HOST +`APIs/getCustomerList/getCustomerList.php?`;
    let res = await fetch(webApiUrl, {
      method: "post",
      body: data,
    });
    let responseJson = await res.json();
    console.log('Customer_List in home screen='+JSON.stringify(responseJson.Customer_List))
    if(responseJson.Status == true)
    {
      const reversed = [...responseJson.Customer_List].reverse();
      setCustomerList(reversed);
      // setDataLoaded(true);
      // setApiLoader(false);
    } 
    //console.log('Customer_List in home screen='+JSON.stringify(customerList))
  }

  async function fetchQuotesData(id) {
    const data = new FormData();
    data.append("agent_id", id);
    let webApiUrl =EnvVariables.API_HOST +`APIs/ViewAgentQuotationList/ViewAgentQuotationList.php?`;
    let res = await fetch(webApiUrl, {
      method: "post",
      body: data,
    });
    let responseJson = await res.json();
    console.log("ViewAgentQuotationList data = ",JSON.stringify(responseJson))
    if(responseJson.status == true)
    {
      setQuotList(await responseJson.Agent_Quotation_List.reverse());
      // setDataLoaded(true);
      // setApiLoader(false);
    } 
    setDataLoaded(true);
    setApiLoader(false);
    //console.log("responseJson = ",JSON.stringify(quotList))
  }

  const getUserData =() => {
    setDetails();
      console.log("userType = ",userType)
      if (userType == "Users") {
        if (dataload == false) {
          setApiLoader(true);
          if (id != undefined && userType != undefined && id != "" && userType !== "") {
            let webApiUrl =EnvVariables.API_HOST +`APIs/ViewAllSchedule/ViewAllSchedule.php?user_type=Users&loggedIn_user_id=${id}`;
              axios.get(webApiUrl).then(async(res) => {
              // console.log("response in home=" + JSON.stringify(res.data));
              setSchedule(await res.data.Schedule_List.reverse());
              setDataLoaded(true);
              setApiLoader(false);
            });
            let webApiUrl1=EnvVariables.API_HOST +`APIs/ViewQuotationDetails/ViewQuotationDetailsPerticularCustomer.php?loggedIn_user_id=${id}&user_type=Users`;
            axios.get(webApiUrl1).then((res) => {
              // console.log("response in home invoice=" + JSON.stringify(res.data));
              setInvoiceList(res.data.Quote_Details)
              setDataLoaded(true);
              setApiLoader(false);
            });
            // for order status starts
            let webApiUrl2=EnvVariables.API_HOST +`APIs/ViewUserDetails/ViewUserDetails.php?id=${id}`;
            axios.get(webApiUrl2).then(async(res)=>{
              // console.log('response of profile='+JSON.stringify(res.data))
              setEmail(await res.data.Users_details_View[0].email)
              console.log('email in home='+email)
              let webApiUrl2 =EnvVariables.API_HOST +`APIs/OrderListDashboard/OrderListDashboard.php`;
              axios.get(webApiUrl2).then(async(res)=>{
                setOrderList(await res.data.Order_List)
                setDataLoaded(true);
                setApiLoader(false);
                // console.log('order list='+JSON.stringify(res.data.Order_List))
              })
            })
            // for order status ends 
          }
        }
      }
      else if(userType=="Admin"){
        if(dataload==false){
          setApiLoader(true)
          if(id != undefined && userType != undefined && id != "" && userType !== ""){
            let webApiUrl=EnvVariables.API_HOST +`APIs/ViewAllSchedule/ViewAllSchedule.php?user_type=Admin&loggedIn_user_id=${id}`;
            axios.get(webApiUrl).then(async(res) => {
              // console.log("response in schedules of home admin=" + JSON.stringify(res.data));
              setSchedule(await res.data.Schedule_List.reverse());
              setDataLoaded(true);
              setApiLoader(false);
            });
            if(userType=='Admin'){
              let webApiUrl1 =EnvVariables.API_HOST +`APIs/ViewAllQuotationList/ViewAllQuotationList.php`;
              axios.get(webApiUrl1).then(async(res)=>{
                //console.log('response of quote in home for admin='+JSON.stringify(res.data))
                setQuotList(await res.data.Quotation_List)
                setDataLoaded(true);
                setApiLoader(false);
              })
            }
            if(userType=='Admin'){
              let webApiUrl2 =EnvVariables.API_HOST +`APIs/OrderListDashboard/OrderListDashboard.php`;
              axios.get(webApiUrl2).then(async(res)=>{
                // console.log('orderlist in home='+JSON.stringify(res.data.Order_List))
                setOrderList(await res.data.Order_List);
                setDataLoaded(true);
                setApiLoader(false);
              })
            }
            if(userType=='Admin'){
              let webApiUrl3=EnvVariables.API_HOST +`APIs/ViewReportQuantityAndVolume/ViewReportQuantityAndVolume.php`;
              axios.get(webApiUrl3).then(async(res)=>{
                console.log('response of resport and volume in home='+JSON.stringify(res.data))
                AsyncStorage.setItem('QVReport', JSON.stringify(await res.data))
              })
            }
            if(userType=='Admin'){
              let webApiUrl4=EnvVariables.API_HOST +`APIs/ViewCustomersReport/ViewCustomersReport.php`;
              axios.get(webApiUrl4).then(async(res)=>{
                AsyncStorage.setItem('CReport', JSON.stringify(await res.data))
              })
            }
            if(userType=='Admin'){
              let webApiUrl5=EnvVariables.API_HOST +`APIs/ViewSalesReport/ViewSalesReport.php`;
              axios.get(webApiUrl5).then(async(res)=>{
                AsyncStorage.setItem('SReport',JSON.stringify(await res.data))
              })
            }
            if(userType=='Admin'){
              let webApiUrl6=EnvVariables.API_HOST +`APIs/ViewQuantityReport/ViewQuantityReport.php`;
              axios.get(webApiUrl6).then(async(res)=>{
                AsyncStorage.setItem('QReport', JSON.stringify(await res.data))
              })
            }
          }
        }
      } 
      else if(userType=='Agents'){
        if(dataload==false){
          setApiLoader(true)
          if(id != undefined && userType != undefined && id != "" && userType !== ""){
            
            fetchCustomerData(id);
            fetchQuotesData(id);
            let webApiUrl =EnvVariables.API_HOST +`APIs/ViewJobs/ViewJobs.php?user_type=Agents&loggedIn_user_id=${id}`;
            axios.get(webApiUrl).then(async(res)=>{
              console.log('joblist in home screen='+JSON.stringify(res.data.View_Jobs_List))
              const reversed = [...res.data.View_Jobs_List].reverse();
              setJobList(reversed);
            })
            
          }
      } 
    }
      else if(userType=='Manufacturing Units'){
        if(dataload==false){
          setApiLoader(true)
          if(id != undefined && userType != undefined && id != "" && userType !== ""){
            let webApiUrl =EnvVariables.API_HOST +`APIs/ViewAllQuotationList/ViewAllQuotationListLoggedInManufacturer.php?manufacturing_id=${id}`;
            axios.get(webApiUrl).then(async(res)=>{
               console.log('order list in home screen MU ='+JSON.stringify(res.data))
              setOrderListMan(await res.data.View_Manufacturing_Unit_Jobs);
              setApiLoader(false);
              setDataLoaded(true);
            })
          }
        }
      }
  }

  useEffect(()=>{
    getUserData();
  },[userType,id]);

  useFocusEffect(
    React.useCallback(() => {
      getUserData();
    }, [userType,id])
  );


  useEffect(() => {
    props.navigation.addListener("blur", () => {
      console.log("unblurred from home");
      setUserType("");
      setId("");
      setQuotList(undefined)
      setOrderList(undefined)
      setSchedule(undefined)
      setJobList(undefined)
      setOrderListMan(undefined)
      setInvoiceList(undefined)
      setStatusEmail(0)
      setApiLoader(true);
      setDataLoaded(false); 
    });
  }, []);

  // console.log("user type==" + userType);
  // console.log("id=====" + id);
  // console.log('quote list='+JSON.stringify(quotList))

  if(userType=='Users'){
    if(schedule==undefined && invoiceList==undefined && statusEmail==0 ){
      return(
        <View style={{ flex: 1, backgroundColor: "#c9d1fb" }}>
          <ImageBackground
            source={require("../../assets/background.png")}
            resizeMode="cover"
            style={styles.rootScreen}
            imageStyle={styles.backgroundImage}>
              <View style={styles.viewNothing}>
                <Text style={styles.textNothing}>Kindly Create Schedule</Text>
              </View>
          </ImageBackground>
        </View>
      )
    }
  }

  if(userType=='Admin'){
    if(schedule==undefined && orderList==undefined && quotList==undefined){
      return(
        <View style={{ flex: 1, backgroundColor: "#c9d1fb" }}>
          <ImageBackground
            source={require("../../assets/background.png")}
            resizeMode="cover"
            style={styles.rootScreen}
            imageStyle={styles.backgroundImage}>
              <View style={styles.viewNothing}>
                <Text style={styles.textNothing}>Nothing To Show</Text>
              </View>
          </ImageBackground>
        </View>
      )
    }
  }

  if(userType=='Agents'){
    if(jobList==undefined){
      return(
        <View style={{ flex: 1, backgroundColor: "#c9d1fb" }}>
          <ImageBackground
            source={require("../../assets/background.png")}
            resizeMode="cover"
            style={styles.rootScreen}
            imageStyle={styles.backgroundImage}>
              <View style={styles.viewNothing}>
                <Text style={styles.textNothing}>Nothing To Show</Text>
              </View>
          </ImageBackground>
        </View>
      )
    }
  }

  if(userType=='Manufacturing Units'){
    if(orderListMan==undefined){
      return(
        <View style={{ flex: 1, backgroundColor: "#c9d1fb" }}>
          <ImageBackground
            source={require("../../assets/background.png")}
            resizeMode="cover"
            style={styles.rootScreen}
            imageStyle={styles.backgroundImage}>
              <View style={styles.viewNothing}>
                <Text style={styles.textNothing}>Nothing To Show</Text>
              </View>
          </ImageBackground>
        </View>
      )
    }
  }

  return (
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
        ) : (
          <ScrollView nestedScrollEnabled={true}>
            <View style={{marginHorizontal:10, marginTop:20}}>
              {/* <AddGifImage/> */}
              {/* Recent schedule starts customer or admin*/}
              {schedule!=undefined && (
                <TouchableOpacity style={styles.individualBox} onPress={()=>{if(userType=='Users'){props.navigation.navigate('ViewSchedule')}else{props.navigation.navigate('ViewAllSchedule')} }}>
                  <View style={{...styles.headingView, backgroundColor:'#1363DF'}}>
                    <Text style={{color:'white', fontWeight:'bold'}}>Recent Requests</Text>
                  </View>
                  <FlatList
                    data={schedule.length!=0 && schedule} keyExtractor={(item) => item.order_request_id}
                    renderItem={({ item, index }) => (
                      <View>
                        {index==0 && (
                          <View style={{...styles.individualInfoBox}}>
                            <View style={styles.viewInfo}><Text style={styles.textInfo}>Date Of Visit</Text><Text>: {item.date_of_visit}</Text></View>
                            <View style={styles.viewInfo}><Text style={styles.textInfo}>Service</Text><Text style={{textTransform:'capitalize'}}>: {item.order_request}</Text></View>
                            {userType=='Admin' && (
                              <View style={styles.viewInfo}><Text style={styles.textInfo}>Customer Name</Text><Text>: {item.Request_by_name}</Text></View>
                            )}
                          </View>
                        )}
                        {index==1 && (
                          <View style={styles.individualInfoBox}>
                            <View style={styles.viewInfo}><Text style={styles.textInfo}>Date Of Visit</Text><Text>: {item.date_of_visit}</Text></View>
                            <View style={styles.viewInfo}><Text style={styles.textInfo}>Service</Text><Text style={{textTransform:'capitalize'}}>: {item.order_request}</Text></View>
                            {userType=='Admin' && (
                              <View style={styles.viewInfo}><Text style={styles.textInfo}>Customer Name</Text><Text>: {item.Request_by_name}</Text></View>
                            )}
                          </View>
                        )}
                      </View>
                    )}
                  />
                </TouchableOpacity>
              )}
              {/* recent schedule ends for customer or admin*/}

              {/* Invoice list starts for customer */}
              {invoiceList!=undefined && (
                <TouchableOpacity style={styles.individualBox} onPress={()=>props.navigation.navigate('ViewInvoice')}>
                  <View style={{...styles.headingView, backgroundColor:'#0098FF'}}>
                    <Text style={{color:'white', fontWeight:'bold'}}>Recent Invoices</Text>
                  </View>
                  <FlatList
                    data={invoiceList} keyExtractor={(item) => item.order_request_id}
                    renderItem={({ item, index }) => (
                      <View>
                        {index==(invoiceList.length-2) && (
                          <View style={styles.individualInfoBox}>
                            {/* quotation number should be added, not coming in response */}
                            <View style={styles.viewInfo}><Text style={styles.textInfo}>Created Date</Text><Text>: {item.created_date}</Text></View>
                            <View style={styles.viewInfo}><Text style={styles.textInfo}>Service</Text><Text style={{textTransform:'capitalize'}}>: {item.order_request}</Text></View>
                          </View>
                        )}
                        {index==(invoiceList.length-1) && (
                          <View style={styles.individualInfoBox}>
                            {/* quotation number should be added, not coming in response */}
                          <View style={styles.viewInfo}><Text style={styles.textInfo}>Created Date</Text><Text>: {item.created_date}</Text></View>
                          <View style={styles.viewInfo}><Text style={styles.textInfo}>Service</Text><Text style={{textTransform:'capitalize'}}>: {item.order_request}</Text></View>
                        </View>
                        )}
                      </View>
                    )}
                  />
                </TouchableOpacity>
              )}
              {/* invoice list ends for customer  */}

              {orderList!=undefined && <FlatList data={orderList[0].Order_details} keyExtractor={(item)=>item.quote_id} 
              renderItem={({item,index})=>{
                if(item.Customer_email===email){
                  setStatusEmail(1)
                }
              }}
               />}

              {/* Order status for customer starts*/}
              {userType=='Users' &&  orderList!=undefined && statusEmail==1 &&(
                <TouchableOpacity style={styles.individualBox} onPress={()=>props.navigation.navigate('OrderStatus')}>
                  <View style={{...styles.headingView, backgroundColor:'#54BAFF'}}>
                    <Text style={{color:'white', fontWeight:'bold'}}>Recent Orders</Text>
                  </View>
                  <FlatList data={orderList[0].Order_details} keyExtractor={(item)=>item.quote_id}
                    renderItem={({item, index})=>{
                        if(item.Customer_email===email){
                          return(
                            <View>
                              <View style={styles.individualInfoBox}>
                                <View style={styles.viewInfo}><Text style={styles.textInfo}>Quotation No.</Text><Text>: {item.quotation_no}</Text></View>
                                <View style={styles.viewInfo}><Text style={styles.textInfo}>Work Status</Text><Text>: {item.work_status==''?'Not Updated Yet':item.work_status}</Text></View>
                              </View> 
                            </View>
                          )
                        }
                      }
                    }
                  />
                </TouchableOpacity>
              )}
              {/* Order status for customer ends*/}

              {/* recent quote starts for admin */}
                {quotList!=undefined && (
                  <TouchableOpacity style={styles.individualBox} onPress={()=>props.navigation.navigate("ViewAllQuotes")}>
                  <View style={{...styles.headingView, backgroundColor:'#0098FF'}}>
                    <Text style={{color:'white', fontWeight:'bold'}}>Recent Quotes</Text>
                  </View>
                  <FlatList
                    data={quotList.filter((item)=>item!=null)} keyExtractor={(item) => item.quote_id.toString()}
                    renderItem={({ item, index }) => (
                      <View>
                        {index==(0) && (
                          <View style={styles.individualInfoBox}>
                            <View style={styles.viewInfo}><Text style={styles.textInfo}>Quotation Date</Text><Text>: {item.quotation_date}</Text></View>
                            <View style={styles.viewInfo}><Text style={styles.textInfo}>Quotation No.</Text><Text>: {item.quotation_no}</Text></View>
                            <View style={styles.viewInfo}><Text style={styles.textInfo}>Customer Name</Text><Text>: {item.customer_full_name}</Text></View>
                          </View>
                        )}
                        {index==(1) && (
                          <View style={styles.individualInfoBox}>
                            <View style={styles.viewInfo}><Text style={styles.textInfo}>Quotation Date</Text><Text>: {item.quotation_date}</Text></View>
                            <View style={styles.viewInfo}><Text style={styles.textInfo}>Quotation No.</Text><Text>: {item.quotation_no}</Text></View>
                            <View style={styles.viewInfo}><Text style={styles.textInfo}>Customer Name</Text><Text>: {item.customer_full_name}</Text></View>
                          </View>
                        )}
                      </View>
                    )}
                  />
                </TouchableOpacity>
                )}
              {/* recent quote ends for admin */}
              {/* Recent order starts for admin */}
              {userType=='Admin' && orderList!=undefined && (
                <TouchableOpacity style={styles.individualBox} onPress={()=>props.navigation.navigate("ViewAllOrders")}>
                  <View style={{...styles.headingView, backgroundColor:'#54BAFF'}}>
                    <Text style={{color:'white', fontWeight:'bold'}}>Recent Orders</Text>
                  </View>
                  <FlatList
                    data={orderList[0].Order_details} keyExtractor={(item)=>item.quote_id}
                    renderItem={({ item,index })=>(
                      <View>
                        {index==(orderList[0].Order_details.length-2) && (
                          <View style={styles.individualInfoBox}>
                            <View style={styles.viewInfo}><Text style={styles.textInfo}>Quotation No.</Text><Text>: {item.quotation_no}</Text></View>
                            <View style={styles.viewInfo}><Text style={styles.textInfo}>Assigned Manufacturer</Text><Text>: {item.Assigned_Manufacturer_name}</Text></View>
                            <View style={styles.viewInfo}><Text style={styles.textInfo}>Customer Name</Text><Text>: {item.Customer_name}</Text></View>
                          </View>
                        )}
                        {index==(orderList[0].Order_details.length-1) && (
                          <View style={styles.individualInfoBox}>
                          <View style={styles.viewInfo}><Text style={styles.textInfo}>Quotation No.</Text><Text>: {item.quotation_no}</Text></View>
                          <View style={styles.viewInfo}><Text style={styles.textInfo}>Assigned Manufacturer</Text><Text>: {item.Assigned_Manufacturer_name}</Text></View>
                          <View style={styles.viewInfo}><Text style={styles.textInfo}>Customer Name</Text><Text>: {item.Customer_name}</Text></View>
                        </View>
                        )}
                      </View>
                    )}
                  />
                </TouchableOpacity>
              )}
              {/* Recent order ends for admin */}

              {/* joblist for agent starts  */}
              {jobList!==undefined && (
                  <TouchableOpacity style={styles.individualBox} onPress={() => {
                    props.navigation.navigate("JobListing");
                  }}>
                  <View style={{...styles.headingView,backgroundColor:'#0098FF'}}>
                    <Text style={{color:'white', fontWeight:'bold'}}>Recent Jobs</Text>
                  </View>
                  <FlatList
                    data={jobList} keyExtractor={(item) => item.order_request_id}
                    renderItem={({ item, index }) => (
                      <View>
                        {/* {
                          console.log("JobList Item = ",JSON.stringify(item))
                        } */}
                        {index<2 && (
                          <View style={styles.individualInfoBox}>
                            {/* <View style={styles.viewInfo}><Text style={styles.textInfo}>Quotation Date</Text><Text>: {item.quotation_date}</Text></View> */}
                            <View style={styles.viewInfo}><Text style={styles.textInfo}>Service</Text><Text style={{textTransform:'capitalize'}}>: {item.order_request}</Text></View>
                            <View style={styles.viewInfo}><Text style={styles.textInfo}>Customer Name</Text><Text>: {item.Customer_name}</Text></View>
                            <View style={styles.viewInfo}><Text style={styles.textInfo}>Contact No.</Text><Text>: {item.contact_no}</Text></View>
                          </View>
                        )}
                       
                      </View>
                    )}
                  />
                </TouchableOpacity>
              )}
              {/* job list for agent ends */}

              {/* recent customers starts for agent */}
              {
              customerList!=undefined && (
                                <TouchableOpacity style={styles.individualBox} onPress={()=>props.navigation.navigate("CustomerList")}>
                                <View style={{...styles.headingView, backgroundColor:'#0098FF'}}>
                                  <Text style={{color:'white', fontWeight:'bold'}}>Recent Customer Added</Text>
                                </View>
                                <FlatList
                                  data={customerList.filter(item => item !== null)} // Filter out null values from the array
                                  renderItem={({ item, index }) => (
                                    <View>
                                      {
                                      index<2 && (
                                        <View style={styles.individualInfoBox}>
                                          <View style={styles.viewInfo}><Text style={styles.textInfo}>Customer Name</Text><Text>: {item.first_name+" "+item.last_name}</Text></View>
                                          <View style={styles.viewInfo}><Text style={styles.textInfo}>Mobile Number</Text><Text>: {item.mobile}</Text></View>
                                        </View>
                                      )}
                      </View>
                    )}
                  />
                </TouchableOpacity>
                )}
              {/* recent customers ends for agent */}
              
              {/* Recent orderlist for manufacturing starts */}
              {orderListMan!=undefined && (
                  <TouchableOpacity style={styles.individualBox} onPress={() => {
                    props.navigation.navigate("Orders");
                  }}>
                  <View style={{...styles.headingView,backgroundColor:'#1363DF'}}>
                    <Text style={{color:'white', fontWeight:'bold'}}>Recent Orders</Text>
                  </View>
                  <FlatList
                    data={orderListMan} keyExtractor={(item) => item.quote_id}
                    renderItem={({ item, index }) => (
                      <View>
                        {index==(orderListMan.length-2) && (
                          <View style={styles.individualInfoBox}>
                            <View style={styles.viewInfo}><Text style={styles.textInfo}>Quotation No.</Text><Text>: {item.quotation_no}</Text></View>
                            <View style={styles.viewInfo}><Text style={styles.textInfo}>Customer Name</Text><Text>: {item.Customer_name}</Text></View>
                            <View style={styles.viewInfo}><Text style={styles.textInfo}>Service</Text><Text style={{textTransform:'capitalize'}}>: {item.order_request}</Text></View>
                            <View style={styles.viewInfo}><Text style={styles.textInfo}>Work Status</Text><Text>: {item.work_status.length!=0?item.work_status:"Kindly update status"}</Text></View>
                          </View>
                        )}
                        {index==(orderListMan.length-1) && (
                          <View style={styles.individualInfoBox}>
                          <View style={styles.viewInfo}><Text style={styles.textInfo}>Quotation No.</Text><Text>: {item.quotation_no}</Text></View>
                          <View style={styles.viewInfo}><Text style={styles.textInfo}>Customer Name</Text><Text>: {item.Customer_name}</Text></View>
                          <View style={styles.viewInfo}><Text style={styles.textInfo}>Service</Text><Text style={{textTransform:'capitalize'}}>: {item.order_request}</Text></View>
                          <View style={styles.viewInfo}><Text style={styles.textInfo}>Work Status</Text><Text>: {item.work_status.length!=0?item.work_status:"Kindly update status"}</Text></View>
                        </View>
                        )}
                      </View>
                    )}
                  />
                </TouchableOpacity>
              )}
              {/* Recent orderlist for manufacturing unit ends  */}
            </View>
          </ScrollView>
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
  individualBox:{
    backgroundColor:'white', 
    shadowOffset: { height: 6, width: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: "black",
    borderRadius:8, 
    overflow:'hidden',
    marginBottom:20
  },
  headingView:{
    backgroundColor:'red', 
    height:40, 
    // alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:10,
    marginBottom:10
  },
  individualInfoBox:{
    backgroundColor:'#D1EBFD', 
    marginBottom:10,
    marginHorizontal:10,
    paddingHorizontal:10,
    paddingVertical:5,
    borderRadius:8
  },
  viewInfo:{flexDirection:'row'},
  textInfo:{width:170, fontWeight:'bold'},
  viewNothing:{justifyContent:'center', alignItems:'center', flex:1},
  textNothing:{fontWeight:'bold', fontSize:24, color:'white'}
});

export default Home;
