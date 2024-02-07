import React, { useEffect, useState, useCallback, useLayoutEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
  TouchableOpacity, ImageBackground, Image,
  BackHandler
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';
import { DataTable } from "react-native-paper";

import Colors from "../../../constant/Colors";
import EnvVariables from "../../../constant/EnvVariables";
import Splash from "../../../components/Splash";

const QuoteDetails = (props) => {
  const [orderDetails, setOrderDetails] = useState(undefined);
  const [dataload, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [id, setId] = useState(undefined);
  const [refreshing, setRefreshing] = useState(false);

  var orid = props.route.params.orid;
  console.log("orid in quote details neeeww=" + orid);

  const isFocused = useIsFocused();


  const apiCall = async () => {
    if (dataload == false) {
      console.log('inside apicall')
      setApiLoader(true);
      //setId(await AsyncStorage.getItem("user_id"));
      //console.log("id in quote details=" + id);
      let webApiUrl =
        EnvVariables.API_HOST +
        `APIs/ViewQuotationDetails/ViewQuotationDetails.php?orid=${orid}`;

      axios.get(webApiUrl).then((res) => {
        setOrderDetails(res.data.Quotation_Details);
        console.log(
          "response in quote details=" +
          JSON.stringify(res.data.Quotation_Details)
        );
        setApiLoader(false);
        setDataLoaded(true);
      });
    }
  };

  // useEffect(async() => {
  //   console.log('inside useEffect in quote details')
  //   orid=await props.route.params.orid
  //   apiCall()
  // }, [orderDetails,apiCall, orid]);



  useEffect(() => {
    if (isFocused) {
      console.log('inside orid=' + orid)
      console.log('inside useEffect in quote details')
      console.log('dataloaded=' + dataload)
      if (dataload == false) {
        console.log('inside apicall')
        setApiLoader(true);
        let webApiUrl =
          EnvVariables.API_HOST +
          `APIs/ViewQuotationDetails/ViewQuotationDetails.php?orid=${orid}`;
        axios.get(webApiUrl).then(async (res) => {
          setOrderDetails(await res.data.Quotation_Details);
          console.log(
            "response in quote details=" +
            JSON.stringify(res.data.Quotation_Details)
          );
          setApiLoader(false);
          setDataLoaded(true);
        });
      }
    }
    // return()=>{orid=null}
  }, [orid, orderDetails, apiCall, dataload, apiLoader]);

  useEffect(() => {
    props.navigation.addListener("blur", () => {
      setApiLoader(true);
      setDataLoaded(false);
    })
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    let webApiUrl =
      EnvVariables.API_HOST +
      `APIs/ViewQuotationDetails/ViewQuotationDetails.php?orid=${orid}`;
    axios.get(webApiUrl).then((res) => {
      setOrderDetails(res.data.Quotation_Details);
      console.log(
        "response in quote details=" +
        JSON.stringify(res.data.Quotation_Details)
      );
    });
    setRefreshing(false);
  }, [orderDetails, orid]);

  return (
    <View style={{ backgroundColor: '#c9d1fb', flex: 1 }}>
      <ImageBackground
        source={require("./../../../assets/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        {apiLoader ? (
          <Splash style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Image
              source={require("../../../assets/logo.png")}
              resizeMode="contain"
              resizeMethod="scale"
              style={{ width: 160, height: 160 }}
            />
            <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Loading...</Text>
          </Splash>
        ) : orderDetails != null || orderDetails != undefined ? (
          orderDetails.map((value) => (
            <ScrollView
              style={{}}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <View style={{ marginTop: 20, marginHorizontal: 10, marginBottom: 10 }}>
                {/* <TouchableOpacity> */}
                <View style={styles.individualBoxView}>
                  <View style={styles.viewInfo}><Text style={styles.textInfo}>
                    Customer Name </Text><Text>: {value.party_name.first_name}{" "}
                      {value.party_name.last_name}
                    </Text></View>
                  <View style={styles.viewInfo}><Text style={styles.textInfo}>Contact No. </Text><Text>: {value?.party_name.contact_no}</Text></View>
                  <View style={styles.viewInfo}><Text style={styles.textInfo}>Email </Text><Text>: {value?.party_name.email}</Text></View>
                  <View style={styles.viewInfo}><Text style={styles.textInfo}>Location </Text><Text>: {value?.party_name.visit_address}</Text></View>
                  <View style={styles.viewInfo}><Text style={styles.textInfo}>Service Name </Text><Text style={{ textTransform: 'capitalize' }}>: {value.service_name.order_request}</Text></View>
                  <View style={styles.viewInfo}><Text style={styles.textInfo}>Assigned Agent </Text><Text>: {value?.assign_to_agent_details.first_name} {value.assign_to_agent_details.last_name}</Text></View>
                  <View style={styles.viewInfo}><Text style={styles.textInfo}>Quotation Number </Text><Text>: {value?.quote_details[0].quotation_no}</Text></View>
                </View>
                {/* </TouchableOpacity> */}
              </View>

              <View style={{ borderWidth: 0.5, marginVertical: 10, borderColor: '#E3E7FD' }} />

              <View style={{ marginHorizontal: 10 }}>
                <Text
                  style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}
                >
                  Order Details
                </Text>

                <View style={{ marginTop: 20 }}>
                  <DataTable style={{ width: '96%', marginHorizontal: '2%', borderRadius: 8, backgroundColor: 'white', shadowOffset: { height: 6, width: 6 }, shadowOpacity: 0.2, shadowRadius: 4, shadowColor: 'black' }}>
                    <DataTable.Header style={{}}>
                      <DataTable.Title>Quantity</DataTable.Title>
                      <DataTable.Title>Product</DataTable.Title>
                      <DataTable.Title>Unit Price</DataTable.Title>
                      <DataTable.Title>Extra Work</DataTable.Title>
                      <DataTable.Title>Total</DataTable.Title>
                    </DataTable.Header>
                    {value.quote_details.map((values) => (
                      <DataTable.Row>
                        <DataTable.Cell>{values.quantity}</DataTable.Cell>
                        <DataTable.Cell>{values.product}</DataTable.Cell>
                        <DataTable.Cell>{values.price_per_qty}</DataTable.Cell>
                        <DataTable.Cell>{values.work_extra_price}</DataTable.Cell>
                        <DataTable.Cell>{values.total_price}</DataTable.Cell>
                      </DataTable.Row>
                    ))}
                  </DataTable>
                </View>


                
                <View style={{ marginTop: 20 }}>
                  <View style={styles.viewCalculation}><Text style={styles.textCalculationHead}>Total: </Text><Text style={styles.valueCalculation}> ${value.quote_price.total_price}</Text></View>
                  <View style={styles.viewCalculation}><Text style={styles.textCalculationHead}>Extra Work: </Text><Text style={styles.valueCalculation}> ${value.quote_price.total_work_extra}</Text></View>
                  <View style={styles.viewCalculation}><Text style={styles.textCalculationHead}>Discount: </Text><Text style={styles.valueCalculation}> {value.quote_price.discount}%</Text></View>
                  <View style={styles.viewCalculation}><Text style={styles.textCalculationHead}>Taxes: </Text><Text style={styles.valueCalculation}> {value.quote_price.taxex}%</Text></View>
                  <View style={styles.viewCalculation}><Text style={styles.textCalculationHead}>Grand Total: </Text><Text style={styles.valueCalculation}> ${value.quote_price.grand_total}</Text></View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center', backgroundColor: '#fff', borderRadius: 10, padding: 10, marginTop: 20}}>
                  {value.quote_details.map((values) => (
                    values?.product_image &&
                    <View>
                      <Image
                        source={{
                          uri: "https://sarabella.ca/backend/product_gallery/" +
                            values?.product_image,
                        }}
                        style={{
                          width: 60,
                          height: 60,
                          // marginTop: 10,
                          // borderRadius:10
                          // resizeMode: "center",
                        }}
                      />
                      <Text style={{ textAlign: 'center' }}>{values?.location}</Text>
                    </View>
                  ))}

                </View>
              </View>
            </ScrollView>
          ))
        ) : null}
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
    shadowOffset: { height: 6, width: 6 }, shadowOpacity: 0.2, shadowRadius: 4, shadowColor: 'black'
  },
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 1,
  },
  viewInfo: { flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10 },
  textInfo: { fontWeight: 'bold', width: 160 },
  viewCalculation: { flexDirection: 'row', justifyContent: 'flex-end', marginRight: 30, marginBottom: 10 },
  textCalculationHead: { textAlign: 'right', fontWeight: 'bold', color: 'black' },
  valueCalculation: { color: 'black' },
});

export default QuoteDetails;
