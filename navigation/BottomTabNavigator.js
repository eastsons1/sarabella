import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

import {
  // StackNavigator, AnotherScreenNavigator,
  MainScreen,
  AgentScreens,
} from "./Navigator";
import Search from "../screens/dashboard/Search";
import SyncData from "../screens/dashboard/SyncData";
import Profile from "../screens/dashboard/Profile";
import ViewSchedule from "../screens/dashboard/Customer/ViewSchedule";
import CreateSchedule from "../screens/dashboard/Customer/CreateSchedule";
import JobListing from "../screens/dashboard/Agent/JobListing";
import CustomerList from "../screens/dashboard/Agent/CustomerList";
import CreateCustomer from "../screens/dashboard/Agent/CreateCustomer";
import JobDetail from "../screens/dashboard/Agent/JobDetail";
import AddMeasurnment from "../screens/dashboard/Agent/AddMeasurnment";
import Orders from "../screens/dashboard/Manufacturing Units/Orders";
import WorkStatus from "../screens/dashboard/Manufacturing Units/WorkStatus";
import ViewMeasurnment from "../screens/dashboard/Agent/ViewMeasurnment";
import CreateQuote from "../screens/dashboard/Agent/CreateQuote";
import ViewAllSchedule from "../screens/dashboard/Admin/ViewAllSchedule";
import ScheduleDetail from "../screens/dashboard/Admin/ScheduleDetail";
import ViewJobs from "../screens/dashboard/Admin/ViewJobs";
import ViewAllQuotes from "../screens/dashboard/Admin/ViewAllQuotes";
import Invoice from "../screens/dashboard/Agent/Invoice";
import QuoteDetails from "../screens/dashboard/Admin/QuoteDetails";
import PaymentStatus from "../screens/dashboard/Admin/PaymentStatus";
import ViewAllOrders from "../screens/dashboard/Admin/ViewAllOrders";
import IndividualOrder from "../screens/dashboard/Admin/IndividualOrder";
import ViewIndividualJob from "../screens/dashboard/Admin/ViewIndividualJob";
import ViewIndividualOrder from "../screens/dashboard/Manufacturing Units/ViewIndividualOrder";
import EditMeasurement from "../screens/dashboard/Admin/EditMeasurement";
import EditCustomerMeasurement from "../screens/dashboard/Agent/EditCustomerMeasurement";
import InvoiceCustomer from "../screens/dashboard/Customer/InvoiceCustomer";
import ViewInvoice from "../screens/dashboard/Customer/ViewInvoice";
import Home from "../screens/dashboard/Home";
import OrderStatus from "../screens/dashboard/Customer/OrderStatus";
import CloseSchedule from "../screens/dashboard/Admin/CloseSchedule";
import CloseScheduleDetail from "../screens/dashboard/Admin/CloseScheduleDetail";
import ViewReport from "../screens/dashboard/Admin/ViewReport";
import Estimate from "../screens/dashboard/Admin/Estimate";
import EstimateScheduleDetail from "../screens/dashboard/Admin/EstimateScheduleDetail";
import ProductGallary from "../screens/dashboard/Agent/ProductGallary";

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home "
      screenOptions={({ route, navigation, focused }) => ({
        unmountOnBlur: false,
      })}
      // screenOptions={({ route }) => ({})}
    >
      {/* <BottomTab.Screen
        name="MainScreen"
        component={MainScreen}
        options={({ route }) => ({
          headerShown:false,tabBarLabel:'Home',
          tabBarIcon: ({ focused }) =>focused?(<Icon name="home" size={24} />):(<Icon size={22} name="home-outline"/>)
        })}
      /> */}
      <BottomTab.Screen
        name="Home "
        component={MainScreen}
        options={({ route }) => ({
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon name="home" size={24} />
            ) : (
              <Icon size={22} name="home-outline" />
            ),
        })}
      />
      {/* <BottomTab.Screen
        name="Search"
        component={Search}
        options={({ route }) => ({
          headerShown:false,
          tabBarIcon: ({ focused }) =>focused?(<Icon name="search" size={24} />):(<Icon size={22} name="search-outline"/>)
         })}
      /> */}
      {/* <BottomTab.Screen name="Button" component={()=>null} options={{tabBarButton:()=>(<TouchableOpacity style={{position:'relative', bottom:10}}><View style={{alignItems:'center'}}><Icon name="add-circle-outline" size={40} /></View></TouchableOpacity>)}} /> */}
      {/* <BottomTab.Screen
        name="SyncData"
        component={SyncData}
        options={({ route }) => ({headerShown:false })}
      /> */}
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon name="person" size={24} />
            ) : (
              <Icon size={22} name="person-outline" />
            ),
        })}
      />
      <BottomTab.Screen
        name="ViewSchedule"
        component={ViewSchedule}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="CreateSchedule"
        component={CreateSchedule}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="JobListing"
        component={JobListing}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="CreateCustomer"
        component={CreateCustomer}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="CustomerList"
        component={CustomerList}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="JobDetail"
        component={JobDetail}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="AddMeasurnment"
        component={AddMeasurnment}
        options={({ route }) => (
          console.log("HOOOO" + JSON.stringify(route)),
          {
            tabBarButton: (props) => null,
            headerShown: false,
            // unmountOnBlur:true
            // unmountOnBlur:route.name=='AddMeasurnment'?true:false
          }
        )}
      />
      <BottomTab.Screen
        name="Orders"
        component={Orders}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="WorkStatus"
        component={WorkStatus}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="ViewMeasurnment"
        component={ViewMeasurnment}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="CreateQuote"
        component={CreateQuote}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="ViewAllSchedule"
        component={ViewAllSchedule}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="ScheduleDetail"
        component={ScheduleDetail}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="ViewJobs"
        component={ViewJobs}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="ViewAllQuotes"
        component={ViewAllQuotes}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="ProductGallary"
        component={ProductGallary}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="Invoice"
        component={Invoice}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="QuoteDetails"
        component={QuoteDetails}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="PaymentStatus"
        component={PaymentStatus}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="ViewAllOrders"
        component={ViewAllOrders}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="IndividualOrder"
        component={IndividualOrder}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="ViewIndividualJob"
        component={ViewIndividualJob}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="ViewIndividualOrder"
        component={ViewIndividualOrder}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="EditMeasurement"
        component={EditMeasurement}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="EditCustomerMeasurement"
        component={EditCustomerMeasurement}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="InvoiceCustomer"
        component={InvoiceCustomer}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="ViewInvoice"
        component={ViewInvoice}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="OrderStatus"
        component={OrderStatus}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="CloseSchedule"
        component={CloseSchedule}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="CloseScheduleDetail"
        component={CloseScheduleDetail}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="ViewReport"
        component={ViewReport}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="Estimate"
        component={Estimate}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="EstimateScheduleDetail"
        component={EstimateScheduleDetail}
        options={({ route }) => ({
          tabBarButton: (props) => null,
          headerShown: false,
        })}
      />
      {/* <BottomTab.Screen name="AgentScreen" component={AgentScreens} options={{tabBarButton:(props)=>null, headerShown:false}} /> */}
      {/* <BottomTab.Screen name='Home' component={StackNavigator} /> */}
      {/* <BottomTab.Screen name='AnotherScreen' component={AnotherScreenNavigator} /> */}
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
