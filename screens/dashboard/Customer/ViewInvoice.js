import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {useIsFocused} from "@react-navigation/native";

import Splash from "../../../components/Splash";
import EnvVariables from "../../../constant/EnvVariables";

const ViewInvoice = (props) => {
  const [id, setId] = useState(undefined);
  const [dataload, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [invoiceList, setInvoiceList]=useState(undefined)

  const isFocused = useIsFocused();

  const setDetails = async () => {
    setId(await AsyncStorage.getItem("user_id"));
  };
  useEffect(() => {
    if(isFocused){
      setDetails();
      if (dataload == false) {
        setApiLoader(true);
        let webApiUrl = EnvVariables.API_HOST +`APIs/ViewQuotationDetails/ViewQuotationDetailsPerticularCustomer.php?loggedIn_user_id=${id}&user_type=Users`;
        axios.get(webApiUrl).then((res) => {
          // console.log("response in view invoice=" + JSON.stringify(res.data));
          setInvoiceList(res.data.Quote_Details)
          setDataLoaded(true);
          setApiLoader(false);
        });
      }
    }
  }, [setDetails,id, invoiceList]);

  console.log('view invoice='+JSON.stringify(invoiceList))

  useEffect(()=>{
    props.navigation.addListener('blur', () => {console.log('unblurred in view invoice');setDataLoaded(false); setApiLoader(true);})
  },[])

    if(invoiceList==undefined){
      return(
        <View style={{ flex: 1, backgroundColor: "#c9d1fb" }}>
          <ImageBackground
            source={require("../../../assets/background.png")}
            resizeMode="cover"
            style={styles.rootScreen}
            imageStyle={styles.backgroundImage}>
              <View style={styles.viewNothing}>
                <Text style={styles.textNothing}>No invoice To Show</Text>
              </View>
          </ImageBackground>
        </View>
      )
    }

  return (
    <View style={{ flex: 1, backgroundColor: "#c9d1fb" }}>
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
          <ScrollView>
            <View style={{marginHorizontal:10, marginTop:20}}>
              <View style={styles.mainView}>
                <FlatList data={invoiceList} renderItem={({item, index})=>(
                  <TouchableOpacity onPress={() =>props.navigation.navigate("InvoiceCustomer", {orid: item.order_request_id,user_id: item.user_id})}>
                    <View style={styles.individualBoxView}>
                      {item.Measurement.length!=0 &&(<View style={styles.viewInfo}><Text style={styles.textInfo}>Quotation No.</Text><Text>: {item.Measurement[0].quotation_no}</Text></View>)}
                      <View style={styles.viewInfo}><Text style={styles.textInfo}>Service Type</Text><Text style={{textTransform:'capitalize'}}>: {item.order_request}</Text></View>
                      <View style={styles.viewInfo}><Text style={styles.textInfo}>Agent Name</Text><Text>: {item.Assigned_To_Agent_Name}</Text></View>
                      <View style={{...styles.viewInfo, marginBottom:10}}><Text style={styles.textInfo}>Created Date</Text><Text>: {item.created_date}</Text></View>
                    </View>
                  </TouchableOpacity>
                )} />
              </View>
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
  mainView:{
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  individualBoxView: {
    backgroundColor: "white",
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    shadowOffset: { height: 6, width: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: "black",
  },
  viewInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  textInfo: { fontWeight: "bold", width: 130 },
  viewNothing:{justifyContent:'center', alignItems:'center', flex:1},
  textNothing:{fontWeight:'bold', fontSize:24, color:'white'}
});

export default ViewInvoice;
