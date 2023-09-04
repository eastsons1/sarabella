import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground, Image
} from "react-native";
import axios from "axios";
import {useIsFocused} from "@react-navigation/native";

import Colors from "../../../constant/Colors";
import EnvVariables from "../../../constant/EnvVariables";
import ButtonComp from "../../../components/ButtonComp";
import Splash from "../../../components/Splash";

const ViewAllOrders = (props) => {
  const [dataload, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [orderList, setOrderList] = useState(undefined);

  const allOrders = () => {
    if (dataload == false) {
      setApiLoader(true);
      let webApiUrl =
        EnvVariables.API_HOST +
        `APIs/OrderListDashboard/OrderListDashboard.php`;
      axios.get(webApiUrl).then((response) => {
        console.log("respose in all orders=" + JSON.stringify(response.data));
        setOrderList(response.data.Order_List);
        setDataLoaded(true);
        setApiLoader(false);
      });
    }
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if(isFocused){
      allOrders();
    }
  }, [allOrders]);

  useEffect(()=>{
    props.navigation.addListener("blur", () => {
      setOrderList(undefined)
      setApiLoader(true);
      setDataLoaded(false); 
    });
  },[])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    let webApiUrl =
      EnvVariables.API_HOST + `APIs/OrderListDashboard/OrderListDashboard.php`;
    axios.get(webApiUrl).then((response) => {
      console.log("response in all orders=" + JSON.stringify(response.data));
      setOrderList(response.data.Order_List);
    });
    console.log("inside on refresh");
    //allQuotes();
    setRefreshing(false);
  }, []);

  if(orderList==undefined){
    return(
      <View style={{ flex: 1, backgroundColor: "#c9d1fb" }}>
        <ImageBackground
          source={require("../../../assets/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}>
            <View style={styles.viewNothing}>
              <Text style={styles.textNothing}>No Orders To Show</Text>
            </View>
        </ImageBackground>
      </View>
    )
  }

  return (
    <View style={{ backgroundColor: '#c9d1fb', flex: 1 }}>
      <ImageBackground
        source={require("./../../../assets/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
      {apiLoader ? (
        <Splash style={{alignItems:'center', justifyContent:'center', flex:1}}>
        <Image
         source={require("../../../assets/logo.png")}
         resizeMode="contain"
         resizeMethod="scale"
         style={{ width: 160, height: 160 }}
       />
       <Text style={{fontWeight:'bold'}}>Loading...</Text>
     </Splash>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={{ marginTop: 20, marginHorizontal: 10 }}>
            {/* <Text
              style={{ fontWeight: "500", fontSize: 20, textAlign: "center" }}
            >
              All Orders
            </Text> */}

            <View>
              {orderList != null || orderList != undefined ? (
                orderList.map((value) =>
                  value.Order_details.map((values) => (
                    <TouchableOpacity onPress={()=>props.navigation.navigate('IndividualOrder',{quote_id:values.quote_id,orderList:orderList})}>
                      <View style={[styles.individualBoxView, values.Assigned_Manufacturer_name!=" " && {backgroundColor:'#D9DFFF'}]}>
                        {/* <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:10}}><Text style={{fontWeight:'bold'}}>Service: </Text><Text> {value.Services_details[0].order_request}</Text></View> */}
                        <View style={styles.viewInfo}><Text style={styles.textInfo}>Customer Name </Text><Text>: {values.Customer_name}</Text></View>
                        <View style={styles.viewInfo}><Text style={styles.textInfo}>Quotation Number </Text><Text>: {values.quotation_no}</Text></View>
                        <View style={styles.viewInfo}><Text style={styles.textInfo}>Quotation Expiry Date </Text><Text>: {values.quote_expiry_date}</Text></View>
                        <View style={styles.viewInfo}><Text style={styles.textInfo}>Payment Status </Text><Text>: {values.status}</Text></View>
                        {/* <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:10}}><Text style={{fontWeight:'bold'}}>Contact No.: </Text><Text>{value.Services_details[0].contact_no}</Text></View> */}
                        {/* <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 10,
                          }}
                        >
                          <Text style={{fontWeight:'bold'}}>Quotation Date:</Text>
                          <Text style={{fontWeight:'bold'}}>Quotation Expiry Date:</Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 10,
                          }}
                        >
                          <Text>{values.quotation_date}</Text>
                          <Text>{values.quote_expiry_date}</Text>
                        </View> */}
                      </View>
                    </TouchableOpacity>
                  ))
                )
              ) : null}
            </View>
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
  viewInfo:{flexDirection:'row', justifyContent:'flex-start', marginBottom:10},
  textInfo:{fontWeight:'bold', width:160},
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 1,
  },
  viewNothing:{justifyContent:'center', alignItems:'center', flex:1},
  textNothing:{fontWeight:'bold', fontSize:24, color:'white'}
});

export default ViewAllOrders;
