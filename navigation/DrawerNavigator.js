import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,RefreshControl, StatusBar, Platform
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { StackActions } from '@react-navigation/native';
import { getFocusedRouteNameFromRoute, useIsFocused, useFocusEffect, CommonActions } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Divider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import BottomTabNavigator from "./BottomTabNavigator";
import Colors from "../constant/Colors";
import EnvVariables from "../constant/EnvVariables";
// import { AnotherScreenNavigator } from "./Navigator";
// import OneScreen from "../screens/OneScreen";
import Login from "../screens/signup/Login";
import Signup from "../screens/signup/Signup";
import SplashScreen from "../screens/SplashScreen";
import { ScheduleScreen, MainScreen } from "./Navigator";
import ViewSchedule from "../screens/dashboard/Customer/ViewSchedule";
import CreateSchedule from "../screens/dashboard/Customer/CreateSchedule";

const Drawer = createDrawerNavigator();

// const CustomDrawerContent=(props)=>{
//   return (
//     <DrawerContentScrollView {...props}>

//         <DrawerItemList {...props}  />
//         <DrawerItem label="Help" onPress={()=>props.navigation.navigate("ViewSchedule")} //style={{marginLeft:40}}
//          ></DrawerItem>
//          <DrawerItem label="create" onPress={()=>props.navigation.navigate("CreateSchedule")} //style={{marginLeft:40}}
//          ></DrawerItem>

//     </DrawerContentScrollView>
//   );
// }

const CustomDrawerContent = (props) => {
  const [show, setShow] = useState(false);
  const [showReport, setShowReport]=useState(false)
  const [id, setId] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [lName, setLName] = useState(undefined);
  const [profileImage, setProfileImage] = useState(undefined);
  const [schedule, setSchedule] = useState(undefined);

  const [nameLogin, setNameLogin] = useState();
  const [lastName, setLastName] = useState();
  const [pImage, setPImage] = useState();
  const [userType, setUserType] = useState();
  const [idFromLogin, setIdFromLogin] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const [volumeReport, setVolumeReport]=useState(undefined)
  const [CReport, setCReport]=useState(undefined);
  const [SReport, setSReport]=useState(undefined);
  const [QReport, setQReport]=useState(undefined);

  const isFocused = useIsFocused();

  const setDetails=async()=>{
    setNameLogin(await AsyncStorage.getItem("first_name"));
    setLastName(await AsyncStorage.getItem("last_name"));
    setPImage(await AsyncStorage.getItem("profile_image"));
    setUserType(await AsyncStorage.getItem("user_type"));
    setIdFromLogin(await AsyncStorage.getItem("user_id"));
    setVolumeReport(await AsyncStorage.getItem("QVReport"));
    setCReport(await AsyncStorage.getItem("CReport"));
    setSReport(await AsyncStorage.getItem("SReport"));
    setQReport(await AsyncStorage.getItem("QReport"));
  }

  useEffect( () => {
    // console.log("DrawerNav useffect")
    // console.log("DrawerNav ifFocused: " + isFocused)
    setDetails()
    // if(isFocused){
    // console.log("2");
    
    // }
  }, [idFromLogin,nameLogin, lastName, pImage, userType, setDetails]);

  const onRefresh = useCallback(async() => {
    setRefreshing(true);
    setNameLogin(await AsyncStorage.getItem("first_name"));
    setLastName(await AsyncStorage.getItem("last_name"));
    setPImage(await AsyncStorage.getItem("profile_image"));
    setUserType(await AsyncStorage.getItem("user_type"));
    setIdFromLogin(await AsyncStorage.getItem("user_id"));
    console.log("user type=" + userType);
    console.log("name in 2=" + nameLogin);
    setRefreshing(false);
  }, [idFromLogin,nameLogin, lastName, pImage, userType]);

  //AsyncStorage.getItem("user_details")
  //console.log('user_details='+JSON.stringify(JSON.stringify(AsyncStorage.getItem("user_details"))))
  // console.log('name in drawer='+name)
  // console.log('lname='+lName)

  // const abc=()=>{
    
  //   return(<View><Text>hi</Text></View>)
  //    //return(<View><Text>Last try</Text></View>)
  // }

  return (
    <>
    <StatusBar translucent barStyle='default'/>
    <View style={{ flex: 1 }}>
      {isFocused?(
      <View style={{flex:1}}>
        {/* {abc()} */}
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
        <View style={{backgroundColor:'#102799', paddingTop:Platform.OS=='ios'?Constants.statusBarHeight:40}}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Profile")}
            style={{ alignItems: "center" }}
          >
            
            {pImage == "" || pImage == undefined || pImage == null ? (
              <Icon name="person-circle-outline" size={100} color={'white'} />
            ) : (
              <Image
                source={{
                  uri:
                    `https://refuel.site/projects/sarabella/UPLOAD_file/` +
                    pImage,
                }}
                style={{
                  width: 100,
                  height: 100,
                  overflow: "hidden",
                  borderRadius: 50,
                }}
                resizeMode="cover"
              />
            )}
            <Text style={{ fontWeight: "bold", marginVertical: 10, color:'white' }}>
              {nameLogin} {lastName}
            </Text>
            {/* <Text>Last try={lastTry!=undefined?lastTry:null}</Text> */}
          </TouchableOpacity>
        </View>
        <Divider style={{ borderWidth: 1 }} />
        {/* <DrawerItemList {...props} /> */}

        {userType == "Users" ? (
          <View>
            <DrawerItem
              label={({}) => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon
                    name={show == false ? "add-outline" : "remove-outline"}
                    size={18}
                    style={{ marginRight: 15 }}
                  />
                  <Text>Schedule</Text>
                </View>
              )}
              onPress={() => setShow(!show)}
              style={{}}
            />
            {show == true ? (
              <View style={{}}>
                <DrawerItem
                  label={({}) => <Text>Create Schedule</Text>}
                  onPress={() => {
                    props.navigation.navigate("CreateSchedule");
                  }}
                  style={{ marginLeft: 70 }}
                />
                <DrawerItem
                  label={({}) => <Text>View Schedule</Text>}
                  onPress={() => {props.navigation.navigate("ViewSchedule")
                    // apiCall();
                  }}
                  style={{ marginLeft: 70 }}
                />
              </View>
            ) : null}
            <DrawerItem onPress={()=>{props.navigation.navigate("ViewInvoice")}} label={({})=><Text>View Invoice</Text>} />
            <DrawerItem onPress={()=>{props.navigation.navigate("OrderStatus")}} label={({})=><Text>Order Status</Text>} />
            <DrawerItem label={({})=><Text>Product Gallary</Text>} onPress={()=>{}} />
          </View>
        ) : null}

        {userType == "Admin" ? (
          <View >
            <DrawerItem
              label={({}) => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon
                    name={show == false ? "add-outline" : "remove-outline"}
                    size={18}
                    style={{ marginRight: 15 }}
                  />
                  <Text>Schedule</Text>
                </View>
              )}
              onPress={() => setShow(!show)}
              style={{}}
            />
            {show == true ? (
              <View style={{}}>
                <DrawerItem
                  label={({}) => <Text>View All Schedule</Text>}
                  onPress={() => {
                    props.navigation.navigate("ViewAllSchedule");
                  }}
                  style={{ marginLeft: 70 }}
                />
                <DrawerItem style={{ marginLeft: 70 }} onPress={()=>props.navigation.navigate("CloseSchedule")} label={({})=><Text>Close Schedule</Text>}/>
              </View>
            ) : null}
            <DrawerItem label={({})=><Text>View All Jobs</Text>} onPress={()=>props.navigation.navigate("ViewJobs")} />
            <DrawerItem label={({})=><Text>View All Quotes</Text>} onPress={()=>props.navigation.navigate("ViewAllQuotes")} />
            <DrawerItem label={({})=><Text>Quotes Payment Status</Text>} onPress={()=>props.navigation.navigate("PaymentStatus")} />
            <DrawerItem label={({})=><Text>View All Orders</Text>} onPress={()=>props.navigation.navigate("ViewAllOrders")} />
            <DrawerItem label={({})=><Text>Product Gallary</Text>} onPress={()=>{}} />
            <DrawerItem
              label={({}) => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon
                    name={showReport == false ? "add-outline" : "remove-outline"}
                    size={18}
                    style={{ marginRight: 15 }}
                  />
                  <Text>Report</Text>
                </View>
              )}
              onPress={() => setShowReport(!showReport)}
              style={{}}
            />
            {showReport == true ? (
              <View style={{}}>
                <DrawerItem
                  label={({}) => <Text>View Report</Text>}
                  onPress={() => {
                    props.navigation.navigate("ViewReport", {volumeReport:volumeReport, CReport:CReport, SReport:SReport, QReport:QReport});
                  }}
                  style={{ marginLeft: 70 }}
                />
                <DrawerItem style={{ marginLeft: 70 }} onPress={()=>props.navigation.navigate("Estimate")} label={({})=><Text>Order Report</Text>}/>
              </View>
            ) : null}
          </View>
        ) : null}

        {userType == "Agents" ? (
          <View style={{}}>
          <DrawerItem label={({}) => <Text>Home</Text>}  onPress={() => { props.navigation.navigate("Home");}}/>
          <DrawerItem label={({}) => <Text>Customers</Text>}  options={{unmountOnBlur:true}} onPress={() => { props.navigation.navigate("CustomerList");}}/>
          <DrawerItem label={({}) => <Text>Add New Customer</Text>}  onPress={() => { props.navigation.navigate("CreateCustomer");}}/>
          <DrawerItem label={({}) => <Text>Add Measurement</Text>}  onPress={() => { props.navigation.navigate("CustomerList");}}/>
          <DrawerItem label={({}) => <Text>View Jobs</Text>}  onPress={() => { props.navigation.navigate("JobListing");}}/>
          <DrawerItem label={({}) => <Text>View Quotes</Text>}  onPress={() => { props.navigation.navigate("ViewAllQuotes");}}/>
          <DrawerItem label={({})=><Text>Product Gallary</Text>} onPress={()=>{}} />
          </View>
        ) : null}

        {userType == "Manufacturing Units" ? (
          <View>
            <DrawerItem
              label={({}) => <Text>Orders</Text>}
              onPress={() => {
                props.navigation.navigate("Orders");
              }}
            />
            <DrawerItem
              label={({}) => <Text>Work Status</Text>}
              onPress={() => {
                props.navigation.navigate("WorkStatus");
              }}
            />
            <DrawerItem label={({})=><Text>Product Gallary</Text>} onPress={()=>{}} />
          </View>
        ) : null}
      </ScrollView>
      <View style={{ marginBottom: "20%",}}>
        <Text
          style={{ textAlign: "center" }}
          onPress={async () => {console.log('logout function');
            let arr=[];
            arr=await AsyncStorage.getAllKeys();
            const keys =await AsyncStorage.getAllKeys();
            
            Alert.alert("", "Do you want to logout?", [
              {
                text: "Ok",
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
              { text: "Cancel", style: "cancel" },
            ]);
          }}
        >
          Logout
        </Text>
        </View>
      </View>
      ):(<View><Text>unfocused</Text></View>)}
      
    </View>
    </>
  );
};

const DrawerNavigator = (props) => {

  const [idFromLogin, setIdFromLogin] = useState();

  const isFocused = useIsFocused();

  const detail=async()=>{
    setIdFromLogin(await AsyncStorage.getItem('user_id'))
  }

  useEffect(() => {
    if(isFocused){
      detail()
      console.log("DrawerNavigator useEffect")
    }
  }, [idFromLogin, detail])
  console.log('inside drawer navigator component='+idFromLogin)

  return (
    isFocused?<Drawer.Navigator
      useLegacyImplementation 
      drawerContent={(props) => isFocused?<CustomDrawerContent {...props} />:null}
      screenOptions={{
        drawerActiveTintColor: null,
        drawerActiveBackgroundColor: null,
      }}
    >
      {/* <Drawer.Screen
        name="OneScreen"
        component={OneScreen}
        options={{
          drawerItemStyle: { display: "none" },
          title: "One screen",
          drawerIcon: () => null,
          drawerLabel: () => null,
          headerLeftLabelVisible: () => false,
          headerLeft: () => null,
          headerShown:false
        }}
      /> */}
      <Drawer.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          drawerItemStyle: { display: "none" },
          title: "Splash Screen",
          drawerIcon: () => null,
          drawerLabel: () => null,
          headerLeftLabelVisible: () => false,
          headerLeft: () => null,
          headerShown: false,
          swipeEdgeWidth: 0,
        }}
      />
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{
          drawerItemStyle: { display: "none" },
          title: "Login",
          drawerIcon: () => null,
          drawerLabel: () => null,
          headerLeftLabelVisible: () => false,
          headerLeft: () => null,
          headerShown: false,
          swipeEdgeWidth: 0,
        }}
      />
      <Drawer.Screen
        name="Signup"
        component={Signup}
        options={{
          drawerItemStyle: { display: "none" },
          title: "Signup",
          drawerIcon: () => null,
          drawerLabel: () => null,
          headerLeftLabelVisible: () => false,
          headerLeft: () => null,
          headerShown: false,
          swipeEdgeWidth: 0,
        }}
      />
      <Drawer.Screen
        name="Main"
        component={BottomTabNavigator}
        options={({ route, navigation }) =>{
          const routeName = getFocusedRouteNameFromRoute(route);
          switch (routeName) {
            case "Home ": {
              return {
                headerTitle: "Home",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "Search": {
              return {
                headerTitle: "Search",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "SyncData": {
              return {
                headerTitle: "Sync Data",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "Profile": {
              return {
                headerTitle: "Profile",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "ViewSchedule": {
              return {
                headerTitle: "View Schedule",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "CreateSchedule": {
              return {
                headerTitle: "Create Schedule",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "JobListing": {
              return {
                headerTitle: "View Jobs",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "CustomerList": {
              return {
                headerTitle: "Customer List",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
                headerRight:()=>(<TouchableOpacity onPress={()=>{navigation.navigate('CreateCustomer')}}><View style={{paddingRight:10}}><Text style={{color:'white', fontSize:18, fontWeight:'600'}}>Add Customer</Text></View></TouchableOpacity>)
              };
            }
            case "CreateCustomer": {
              return {
                headerTitle: "Add Customer",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "JobDetail": {
              return {
                headerTitle: "Job Detail",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "AddMeasurnment": {
              return {
                headerTitle: "Add Measurement",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white", 
                // unmountOnBlur: true
              };
            }
            case "Orders": {
              return {
                headerTitle: "Orders",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "WorkStatus": {
              return {
                headerTitle: "Work Status",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "ViewMeasurnment": {
              return {
                headerTitle: "View Measurement",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
                // headerRight:()=><TouchableOpacity onPress={()=>navigation.goBack()}><Text>Back</Text></TouchableOpacity>
              };
            }
            case "CreateQuote": {
              return {
                headerTitle: "Create Quote",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "ViewAllSchedule": {
              return {
                headerTitle: "Schedules",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "ScheduleDetail": {
              return {
                headerTitle: "Schedule Detail",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "ViewJobs": {
              return {
                headerTitle: "View Jobs",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "ViewAllQuotes": {
              return {
                headerTitle: "View Quotes",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "ViewAllOrders": {
              return {
                headerTitle: "View All Orders",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "Invoice": {
              return {
                headerTitle: "Invoice",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }  case "QuoteDetails": {
              return {
                headerTitle: "Quote Details",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "PaymentStatus": {
              return {
                headerTitle: "Payment Status",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }case "IndividualOrder": {
              return {
                headerTitle: "Individual Order",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "ViewIndividualJob": {
              return {
                headerTitle: "Individual Job",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "ViewIndividualOrder": {
              return {
                headerTitle: "Individual Order",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "EditMeasurement": {
              return {
                headerTitle: "Edit Measurement",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "EditCustomerMeasurement": {
              return {
                headerTitle: "Edit Measurement",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "InvoiceCustomer": {
              return {
                headerTitle: "Invoice Customer",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "ViewInvoice": {
              return {
                headerTitle: "View Invoice",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "OrderStatus": {
              return {
                headerTitle: "Order Status",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "CloseSchedule": {
              return {
                headerTitle: "Close Schedule",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "CloseScheduleDetail": {
              return {
                headerTitle: "Schedule Detail",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "ViewReport": {
              return {
                headerTitle: "View Report",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
                drawerItemStyle: { display: "none" },
                // title: "Splash Screen",
                // drawerIcon: () => null,
                // drawerLabel: () => null,
                // headerLeftLabelVisible: () => false,
                // headerLeft: () => null,
                // headerShown: false,
                swipeEnabled:false,
                swipeEdgeWidth:0
              };
            }
            case "Estimate": {
              return {
                headerTitle: "Order Report",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "EstimateScheduleDetail": {
              return {
                headerTitle: "Order Report",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
            case "Home":
            default: {
              return {
                headerTitle: "Home",
                headerStyle: { backgroundColor: Colors.mainColor },
                headerTintColor: "white",
              };
            }
          }
        }}
      />

      {/* <Drawer.Screen name="AgentScreen" component={BottomTabNavigator} options={({route})=>{
        const routeName = getFocusedRouteNameFromRoute(route);
        switch (routeName){
          case "JobListing":{
            return{
              headerTitle:"Job Listing"
            }
          }
        }
      }} /> */}
      {/* <Drawer.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "CreateSchedule";
          switch (routeName) {
            case "CreateSchedule": {
              return {
                headerTitle: "Create Schedule",
                // drawerIcon: () => null,
                // drawerLabel: () => null,
                // headerLeftLabelVisible: () => false,
                // drawerItemStyle: { display: "none" },
                // drawerActiveBackgroundColor:'red'
              };
            }
            case "ViewSchedule": {
              return {
                headerTitle: "View Schedule",
                drawerIcon: () => null,
                drawerLabel: () => null,
                headerLeftLabelVisible: () => false,
                drawerItemStyle: { display: "none" },
              };
            }
            // default:{
            //   return{
            //     drawerIcon: () => null,
            //     drawerLabel: () => null,
            //     headerLeftLabelVisible: () => false,
            //     drawerItemStyle: { display: "none" },
            //   }
            // }
          }
        }}
      /> */}

      {/* <Drawer.Screen name="Search" component={AnotherTabNavigator} /> */}
      {/* <Drawer.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{ headerShown: true }}
      /> */}
      {/* <Drawer.Screen name="AnotherScreen" component={AnotherScreenNavigator} /> */}
    </Drawer.Navigator>:null
  );
};

export default DrawerNavigator;
