import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  FlatList,
  Image,
} from "react-native";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StackActions,
  DrawerActions,
  TabActions,
  CommonActions,
} from "@react-navigation/native";

import ButtonComp from "../../../components/ButtonComp";
import Splash from "../../../components/Splash";
import EnvVariables from "../../../constant/EnvVariables";
import { ScrollView } from "react-native-gesture-handler";

const AgentJobList = (props) => {
  const [userList, setUserList] = useState([]);
  const [apiLoader, setApiLoader] = useState(false);
  const [customerID, setCustomerID] = useState('');

  let IDD = props.route.params.customerId
  console.log(IDD,'BBBBBBBBBBBBBB')

  useEffect(() => {
    //setCustomerID(props.route.params.customerId)
  //  props.navigation.addListener("focus", () => {

        setApiLoader(true);

        let webApiUrl =
          EnvVariables.API_HOST + "APIs/ViewAllJobs/ViewAllJobs.php?user_type=Agents&customer_id="+IDD;
    
           console.log("webApiUrlwebApiUrl", webApiUrl);
           fetch(webApiUrl, {
          method: "GET",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
            // "Authorization": authtoken,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
           console.log("singleUserDetails", responseJson);
            if (responseJson.status == true) {
                let reversed = responseJson;
    
               // console.log(reversed,'WWWWWWWWWWWWWWWW')
               setUserList(reversed);
               setApiLoader(false);
            }
          })
          .catch((error) => console.log(error));

  //  });
  
  }, []);



//console.log(customerID,'LLLLLLLLLLLLLLL')
 
//   useEffect( () => {
//     GetData()
//   },[setUserList]);


const GetData = async() => {
    setApiLoader(true);

    let webApiUrl =
      EnvVariables.API_HOST + "APIs/ViewAllJobs/ViewAllJobs.php?user_type=Agents&customer_id="+IDD;

    await fetch(webApiUrl, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        // "Authorization": authtoken,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
       // console.log("singleUserDetails", responseJson);
        if (responseJson.status == true) {
            let reversed = responseJson;

            //console.log(reversed,'WWWWWWWWWWWWWWWW')
           setUserList(reversed);
           setApiLoader(false);
        }
      })
      .catch((error) => console.log(error));
}




 

  if (userList == []) {
    return (
      <View style={{ flex: 1, backgroundColor: "#B4C1CF" }}>
        <View style={styles.viewNothing}>
          <Text style={styles.textNothing}>No Customer added yet...</Text>

          <View style={{ width: "50%", alignSelf: "center", marginTop: 15 }}>
            <ButtonComp
              title={"Add Customer"}
              onPress={() => {
                props.navigation.navigate("CreateCustomer");
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
     <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("./../../../assets/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <TouchableOpacity 
        style={{ width: '20%',height:'5%',justifyContent:"center",
        alignSelf:"flex-end", marginTop: 5,  }}
        onPress={() => props.navigation.navigate('CreateAgentJob',{
        customerName : props.route.params.customerName,
        customerId: props.route.params.customerId
            })}
        >
            <Text style={{color:'#fff',alignSelf:"center",fontSize:18,fontWeight:'bold'}}>
                Add Job
            </Text>
        </TouchableOpacity>
        {/* <Text>
        {props.route.params.customerName} {props.route.params.customerId}
     
        </Text> */}
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              marginTop: 20,
              marginHorizontal: 10,
            }}
          >
            {apiLoader ? (
              <View style={{ flex: 1 }}>
                <Splash
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  <Image
              source={require("../../../assets/logo.png")}
              resizeMode="contain"
              resizeMethod="scale"
              style={{ width: 160, height: 100 }}
            /> 
                   <Text style={{fontWeight:'bold'}}>Loading...</Text>
                </Splash>
              </View>
            ) : (

                <FlatList
                data={ userList.Job_List}
              //  numColumns={2}
                renderItem={({ item }) => (
                    <TouchableOpacity
                  style={{
                    backgroundColor: "#FFFFFF",
                    margin: 10,
                    padding: 10,
                    borderRadius: 9,
                  }}
                  key={item?.Job_id}

                  onPress={() => props.navigation.navigate("AgentJobDetail", {
                    order_request_id: item?.Job_id,
                    // order_request: item.order_request,
                    // date_of_visit: item.date_of_visit,
                    // S_T_V: item.S_T_V,
                    // Request_by_name: item.Customer_name,
                    // contact_no: item.contact_no,
                    // visit_address: item.visit_address,
                    // created_date: item.created_date,
                    // jobabc: jobList,
                  }) }
                  /* The below is used for show add measurement */
                  // onPress={() => {
                  //   getCustomerMeasurnmentDetails(
                  //     value.user_id,
                  //     value?.first_name + " " + value.last_name
                  //   );
                  // }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.textCustomerInfo}>
                      Job Name :{" "}
                    </Text>
                    <Text style={styles.textCustomerInfo}>
                      {item.Job_Name }{item.Job_id}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <Text style={styles.textCustomerInfo}>
                      Create At :{" "}
                    </Text>
                    <Text style={styles.textCustomerInfo}>{item?.Created_Date}</Text>
                  </View>
                </TouchableOpacity>
                )}
                keyExtractor={(item) => item.Job_id}
              />
            //   userList?.map((value) => (
            //     <TouchableOpacity
            //       style={{
            //         backgroundColor: "#FFFFFF",
            //         margin: 10,
            //         padding: 10,
            //         borderRadius: 9,
            //       }}
            //       key={value.Job_id}

            //       onPress={() => {} }
            //       /* The below is used for show add measurement */
            //       // onPress={() => {
            //       //   getCustomerMeasurnmentDetails(
            //       //     value.user_id,
            //       //     value?.first_name + " " + value.last_name
            //       //   );
            //       // }}
            //     >
            //       <View style={{ flexDirection: "row" }}>
            //         <Text style={styles.textCustomerInfo}>
            //           JOB Name :{" "}
            //         </Text>
            //         <Text style={styles.textCustomerInfo}>
            //           {value?.Job_Name }
            //         </Text>
            //       </View>
            //       <View style={{ flexDirection: "row", marginTop: 10 }}>
            //         <Text style={styles.textCustomerInfo}>
            //           Create At :{" "}
            //         </Text>
            //         <Text style={styles.textCustomerInfo}>{value.Created_Date}</Text>
            //       </View>
            //     </TouchableOpacity>
            //   ))
            )}
             
          </View>
        
        </View>
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
  viewNothing: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  textNothing: {
    fontWeight: "400",
    fontSize: 24,
    color: "black",
  },
  textCustomerInfo: {
    fontWeight: "300",
    fontSize: 16,
    color: "black",
  },
});

export default AgentJobList;
