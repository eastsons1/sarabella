import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity, RefreshControl,  ImageBackground, Image
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Colors from "../../../constant/Colors";
import EnvVariables from "../../../constant/EnvVariables";
import Splash from "../../../components/Splash";

const ViewAllQuotes = (props) => {
  const [orderList, setOrderList] = useState(undefined);
  const [dataload, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [id, setId] = useState(undefined);
  const [refreshing, setRefreshing] = useState(false);

  const getDetails=async()=>{
    setId(await AsyncStorage.getItem("user_id"));
  }

  useEffect(() => {
    //if (dataload == false) {
      getDetails()
      console.log('id in orders='+id)
      setApiLoader(true); 
      let webApiUrl =
        EnvVariables.API_HOST +
        `APIs/ViewAllQuotationList/ViewAllQuotationList.php`;
      axios.get(webApiUrl).then((res) => {
        const reversed = [...res.data.Quotation_List].reverse();
        setOrderList(reversed);
        console.log("response in orders=" + JSON.stringify(res.data.Quotation_List));
        setApiLoader(false);
        setDataLoaded(true);
      });
    //}
  }, []);
  //id, orderList, getDetails

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    let webApiUrl =
        EnvVariables.API_HOST +
        `APIs/ViewAllQuotationList/ViewAllQuotationList.php`;
      axios.get(webApiUrl).then((res) => {
        const reversed = [...res.data.Quotation_List].reverse();
        setOrderList(reversed);
        console.log("response in quotes=" + JSON.stringify(res.data.Quotation_List));
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
              <Text style={styles.textNothing}>No Quotes To Show</Text>
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
       <Text style={{fontWeight:'bold', marginTop:10}}>Loading...</Text>
     </Splash>
      ) : (
        <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
          <View style={{ marginTop: 20, marginHorizontal: 10 }}>
            {/* <Text style={styles.titleText}>Quote</Text> */}
            {/* View starts for box */}
            <View>{console.log('order lisst neww=='+JSON.stringify(orderList))}
              {/* individual box for order starts */}
              {orderList != null || orderList != undefined
                ? orderList.map((value) => (
                    <TouchableOpacity
                     onPress={()=>props.navigation.navigate('QuoteDetails',{orid:value.order_request_id})}
                    >
                      <View style={styles.individualBoxView}>
                        <View style={styles.viewInfo}><Text style={styles.textInfo}>Customer Name </Text><Text>: {value.Customer_name}</Text></View>
                        <View style={styles.viewInfo}><Text style={styles.textInfo}>Quotation No. </Text><Text>: {value.quotation_no}</Text></View>
                        <View style={styles.viewInfo}><Text style={styles.textInfo}>Quotation Date </Text><Text>: {value.quotation_date}</Text></View>
                        <View style={styles.viewInfo}><Text style={styles.textInfo}>Expiry Date </Text><Text>: {value.quote_expiry_date}</Text></View>
                        <View style={styles.viewInfo}><Text style={styles.textInfo}>Payment Status </Text><Text>: {value.status}</Text></View>
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
  titleText: { fontWeight: "500", fontSize: 20, textAlign: "center" },
  individualBoxView: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
    shadowOffset:{height:6, width:6}, shadowOpacity:0.2, shadowRadius:4, shadowColor:'black'
  },
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 1,
  },
  viewInfo:{flexDirection:'row', marginBottom:10,justifyContent:'flex-start'},
  textInfo:{fontWeight:'bold', width:160},
  viewNothing:{justifyContent:'center', alignItems:'center', flex:1},
  textNothing:{fontWeight:'bold', fontSize:24, color:'white'}
});

export default ViewAllQuotes;
