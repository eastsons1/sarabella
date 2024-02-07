import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,RefreshControl, ImageBackground,Image
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useFocusEffect } from '@react-navigation/native';

import Colors from "../../../constant/Colors";
import EnvVariables from "../../../constant/EnvVariables";
import Splash from "../../../components/Splash";

const Orders = (props) => {
  const [orderList, setOrderList] = useState(undefined);
  const [dataload, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [id, setId] = useState(undefined);
  const [refreshing, setRefreshing] = useState(false);

  const getDetails=async()=>{
    setId(await AsyncStorage.getItem("user_id"));
  }

  const isFocused = useIsFocused();

  useEffect(() => {
    if(isFocused){
    if (dataload == false) {
      getDetails()
      console.log('id in orders='+id)
      setApiLoader(true); 
      let webApiUrl =
        EnvVariables.API_HOST +
        `APIs/ViewAllQuotationList/ViewAllQuotationListLoggedInManufacturer.php?manufacturing_id=${id}`;
      axios.get(webApiUrl).then((res) => {
        setOrderList(res.data.View_Manufacturing_Unit_Jobs);
        console.log("response in orders=" + JSON.stringify(res.data.View_Manufacturing_Unit_Jobs));
        setApiLoader(false);
        setDataLoaded(true);
      });
    }
  }
  }, [id, orderList, getDetails]);

  useEffect(() => {
    props.navigation.addListener("blur", () => {
      console.log("unblurred from Orders");
     setOrderList(undefined)
     setDataLoaded(false)
     setApiLoader(true)
     setId(undefined)
    });
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    let webApiUrl =
        EnvVariables.API_HOST +
        `APIs/ViewAllQuotationList/ViewAllQuotationListLoggedInManufacturer.php?manufacturing_id=${id}`;
      axios.get(webApiUrl).then((res) => {
        setOrderList(res.data.View_Manufacturing_Unit_Jobs);
        console.log("response in orders=" + JSON.stringify(res.data.View_Manufacturing_Unit_Jobs));
      });
    setRefreshing(false);
  }, [id, orderList]);

  if(orderList==undefined){
    return(
      <View style={{ flex: 1, backgroundColor: "#c9d1fb" }}>
        <ImageBackground
          source={require("../../../assets/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}>
            <View style={styles.viewNothing}>
              <Text style={styles.textNothing}>No Orders Yet</Text>
            </View>
        </ImageBackground>
      </View>
    )
  }



  return (
    <View style={{ flex: 1, backgroundColor: '#c9d1fb' }}>
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
        <ScrollView  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          <View style={{ marginTop: 20, marginHorizontal: 10 }}>
            {/* <Text style={styles.titleText}>Orders</Text> */}
            {/* View starts for box */}
            <View>
              {/* individual box for order starts */}
              {orderList != null || orderList != undefined
                ? orderList.map((value) => (
                    <TouchableOpacity onPress={()=>props.navigation.navigate('ViewIndividualOrder', {quotation_no:value.quotation_no, orderList:orderList})}>
                      <View style={styles.individualBoxView}>
                        <View style={styles.viewInfo}><Text style={styles.textInfo}>Customer Name</Text><Text>: {value.Customer_name}</Text></View>
                        <View style={styles.viewInfo}><Text style={styles.textInfo}>Service Type</Text><Text style={{textTransform:'capitalize'}}>: {value.order_request}</Text></View>
                        <View style={styles.viewInfo}><Text style={styles.textInfo}>Quotation No.</Text><Text>: {value.quotation_no}</Text></View>
                        <View style={styles.viewInfo}><Text style={styles.textInfo}>Quotation Date</Text><Text>: {value.quotation_date}</Text></View>
                        <View style={styles.viewInfo}><Text style={styles.textInfo}>Expiry Date</Text><Text>: {value.quote_expiry_date}</Text></View>
                        <View style={styles.viewInfo}><Text style={styles.textInfo}>Work Status</Text><Text>: {value.work_status.length!=0?value.work_status:"Kindly update status"}</Text></View>
                      </View>
                    </TouchableOpacity>
                  ))
                : null}
              {/* individual box for order ends */}
            </View>
            {/* view ends for box */}
          </View>
        </ScrollView>
      )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: { fontWeight: "500", fontSize: 20, textAlign: "center", marginBottom:10 },
  individualBoxView: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    paddingTop: 10,
    borderRadius:8, shadowOffset:{height:6, width:6}, shadowOpacity:0.2, shadowRadius:4, shadowColor:'black', 
    marginBottom:20
  },
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 1,
  },
  viewInfo:{flexDirection:'row', justifyContent:'flex-start', marginBottom:10},
  textInfo:{fontWeight:'bold', width:130},
  viewNothing:{justifyContent:'center', alignItems:'center', flex:1},
  textNothing:{fontWeight:'bold', fontSize:24, color:'white'}
});

export default Orders;
