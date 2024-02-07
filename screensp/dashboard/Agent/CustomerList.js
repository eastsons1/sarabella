import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
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

const CustomerList = (props) => {
  const [userList, setUserList] = useState(undefined);
  const [apiLoader, setApiLoader] = useState(true);

  useEffect(() => {
    props.navigation.addListener("focus", () => {
      getCustomerData();
    });
  }, []);

  const getCustomerData = async () => {
    setApiLoader(true);
    const data = new FormData();
    data.append("agent_id", await AsyncStorage.getItem("user_id"));

    let webApiUrl =
      EnvVariables.API_HOST + `APIs/getCustomerList/getCustomerList.php?`;

    console.log("req = ", await AsyncStorage.getItem("user_id"));
    let res = await fetch(webApiUrl, {
      method: "post",
      body: data,
    });

    let responseJson = await res.json();
    console.log("response json=" + JSON.stringify(responseJson));

    setApiLoader(false);
    if (responseJson.Status == true) {
      console.log("In true bocl");
      const reversed = [...responseJson.Customer_List].reverse();
      setUserList(reversed);
    }
  };

  const getCustomerMeasurnmentDetails = async (customerId, name) => {
    const data = new FormData();
    data.append("agent_id", await AsyncStorage.getItem("user_id"));
    data.append("customer_id", customerId);

    let webApiUrl =
      EnvVariables.API_HOST +
      `APIs/getCustomerMeasurementDetails/getCustomerMeasurementDetails.php?`;

    console.log("req = ", await AsyncStorage.getItem("user_id"));
    let res = await fetch(webApiUrl, {
      method: "post",
      body: data,
    });

    let responseJson = await res.json();
    console.log(
      "getCustomerMeasurementDetails response json=" +
        JSON.stringify(responseJson.Measurement_Details)
    );
    //useComponentWillUnmount();
    //setApiLoader(false);
    if (responseJson.Output.Measurement_Details !== "") {
      //Edit measurnment details
      await AsyncStorage.setItem(
        "measurn_data",
        JSON.stringify(responseJson.Output.Measurement_Details)
      );
      props.navigation.navigate("ViewMeasurnment", {
        screenName: "CustomerList",
        measurnment: responseJson.Output.Measurement_Details,
        order_id: responseJson.Output.order_request_id,
        order_request: responseJson.Output.order_request,
        date_of_visit: responseJson.Output.date_of_visit,
        S_T_V: responseJson.Output.S_T_V,
        Request_by_name: name,
        contact_no: responseJson.Output.contact_no,
        visit_address: responseJson.Output.visit_address,
        created_date: responseJson.Output.created_date,
        cDate: responseJson.Output.created_date,
        customerId: responseJson.Output.user_id,
        quote_details: responseJson.Output.Quote_Details,
      });
      // props.navigation.navigate('AddMeasurnment',{
      //   order_id:responseJson.Output.order_request_id,
      //   order_request:responseJson.Output.order_request,
      //   date_of_visit:responseJson.Output.date_of_visit,
      //   S_T_V:responseJson.Output.S_T_V,
      //   Request_by_name:name,
      //   contact_no:responseJson.Output.contact_no,
      //   visit_address:responseJson.Output.visit_address,
      //   created_date:responseJson.Output.created_date,
      //   customerId:responseJson.Output.user_id
      // })
    } else {
      AsyncStorage.setItem("screenBoolean", "false");
      //Add measurnment details
      // props.navigation.setOptions({
      //   unmountOnBlur:true
      // })
      // props.navigation.dispatch(TabActions.jumpTo('Main',{userType:label=='Customer'?'Users':label}))
      // props.navigation.navigate('AddMeasurnment',{
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: "AddMeasurnment",
              params: {
                order_id: responseJson.Output.order_request_id,
                order_request: responseJson.Output.order_request,
                date_of_visit: responseJson.Output.date_of_visit,
                S_T_V: responseJson.Output.S_T_V,
                Request_by_name: name,
                contact_no: responseJson.Output.contact_no,
                visit_address: responseJson.Output.visit_address,
                created_date: responseJson.Output.created_date,
                customerId: responseJson.Output.user_id,
                boo: "CustomerList",
              },
            },
          ],
        })
      );
      // props.navigation.dispatch(TabActions.jumpTo('AddMeasurnment',{
      //   props.navigation.dispatch(CommonActions.reset('AddMeasurnment',{
      //   order_id:responseJson.Output.order_request_id,
      //   order_request:responseJson.Output.order_request,
      //   date_of_visit:responseJson.Output.date_of_visit,
      //   S_T_V:responseJson.Output.S_T_V,
      //   Request_by_name:name,
      //   contact_no:responseJson.Output.contact_no,
      //   visit_address:responseJson.Output.visit_address,
      //   created_date:responseJson.Output.created_date,
      //   customerId:responseJson.Output.user_id,
      //   boo:"CustomerList"
      //   // boo:true
      // }))
    }
  };

  if (userList === undefined) {
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
        <ScrollView style={{ flex: 1 }}
       
        >
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
              userList?.map((value) => (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#FFFFFF",
                    margin: 10,
                    padding: 10,
                    borderRadius: 9,
                  }}
                  key={value?.user_id}

                  onPress={() => props.navigation.navigate('AgentJobList',{
                  //  onPress={() => props.navigation.navigate('JobListing',{
                    customerId: value?.user_id,
                    customerName:value?.first_name + " " + value?.last_name
                  }) }
                 
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.textCustomerInfo}>
                      Customer Name :{" "}{value?.user_id}{" "}
                    </Text>
                    <Text style={styles.textCustomerInfo}>
                      {value?.first_name + " " + value?.last_name}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <Text style={styles.textCustomerInfo}>
                      Contact Number :{" "}
                    </Text>
                    <Text style={styles.textCustomerInfo}>{value?.mobile}</Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>
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

export default CustomerList;
