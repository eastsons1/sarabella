import "react-native-gesture-handler";
import React from "react";
import { View, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import SplashScreen from "../screens/SplashScreen";
import AnotherOne from "../screens/AnotherOne";
import Home from "../screens/dashboard/Home";
import ViewSchedule from "../screens/dashboard/Customer/ViewSchedule";
import CreateSchedule from "../screens/dashboard/Customer/CreateSchedule";
import JobListing from "../screens/dashboard/Agent/JobListing";
import JobDetail from "../screens/dashboard/Agent/JobDetail";

const Stack = createNativeStackNavigator();

//  const StackNavigator = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="SplashScreen" component={SplashScreen} />
//       <Stack.Screen name="Home" component={Home} />
//     </Stack.Navigator>
//   );
// };

//  const AnotherScreenNavigator = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="AnotherOne" component={AnotherOne} />
//     </Stack.Navigator>
//   );
// };

const MainScreen=()=>{
  return(
    <Stack.Navigator initialRouteName="Home" screenOptions={{animation:'slide_from_left'}}>
      <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
      {/* <Stack.Screen name="CreateSchedule" component={CreateSchedule} options={{headerShown:false}} />
      <Stack.Screen name="ViewSchedule" component={ViewSchedule} options={{headerShown:false}} /> */}
    </Stack.Navigator>
  )
}

const ScheduleScreen=()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="CreateSchedule" component={CreateSchedule} options={{headerShown:false}} />
      <Stack.Screen name="ViewSchedule" component={ViewSchedule} options={{headerShown:false}} />
    </Stack.Navigator>
  )
}

// const AgentScreens=()=>{
//   return(
//     <Stack.Navigator>
//       <Stack.Screen name="JobListing" component={JobListing} options={{headerShown:false}} />
//       <Stack.Screen name="JobDetail" component={JobDetail} options={{headerShown:false}} />
//     </Stack.Navigator>
//   )
// }

export { 
  // StackNavigator, AnotherScreenNavigator, 
  MainScreen, ScheduleScreen, 
  // AgentScreens 
};
