import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, ImageBackground, Image } from "react-native";
import axios from "axios";
import { DataTable } from "react-native-paper";

import ButtonComp from '../../../components/ButtonComp';
import Splash from "../../../components/Splash";
import EnvVariables from "../../../constant/EnvVariables";

const InvoiceCustomer = (props) => {
  var orid = props.route.params.orid;
  console.log("orid in invoice customer=" + orid);
  var user_id = props.route.params.user_id;
  console.log("user id in invoice customer=" + user_id);

  const [dataload, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [details, setDetails]=useState(undefined)
  const [selected, setSelected]=useState()

  const apiCall = async() => {
    if (dataload == false) {
      setApiLoader(true);
      let webApiUrl = EnvVariables.API_HOST +`APIs/ViewQuotationDetails/ViewQuotationDetailsPerticularCustomer.php?loggedIn_user_id=${user_id}&user_type=Users`;
      await axios.get(webApiUrl).then(async(res) => {
        console.log('response in invoice customer='+JSON.stringify(res.data.Quote_Details))
        setDetails(await res.data.Quote_Details)
        console.log('kjasdbfkbf')
        setDataLoaded(true);
        setApiLoader(false);
      });
    }
  };

  

  useEffect(() => {
    props.navigation.addListener("focus", () => {
    apiCall();  
    });
  }, [details, selected, apiCall]);
  
  useEffect(()=>{
    if(details!=undefined){
      console.log('sdhvjkdfjbvdsf ')
      setSelected(details.find((abc)=>abc.order_request_id==orid))
    }
      console.log('selected='+JSON.stringify(selected))
  },[details, selected])

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
       <Text style={{fontWeight:'bold', marginTop:10}}>Loading...</Text>
     </Splash>
      ) : (
          <ScrollView>
            <View style={{ marginTop: 20, marginHorizontal: 10, marginBottom:10 }}>
              <TouchableOpacity>
                <View style={styles.individualBoxView}>
                  {selected!=undefined && <View style={styles.viewInfo}><Text style={styles.textInfoHead}>
                    Customer Name </Text><Text>: {selected.first_name}{" "}
                    {selected.last_name}
                  </Text></View>}
                  <View style={styles.viewInfo}><Text style={styles.textInfoHead}>Contact No. </Text><Text>: {selected.contact_no}</Text></View>
                  <View style={styles.viewInfo}><Text style={styles.textInfoHead}>Email </Text><Text>: {selected.email}</Text></View>
                  <View style={styles.viewInfo}><Text style={styles.textInfoHead}>Location </Text><Text>: {selected.visit_address}</Text></View>
                  <View style={styles.viewInfo}><Text style={styles.textInfoHead}>Service Name </Text><Text style={{textTransform:'capitalize'}}>: {selected.order_request}</Text></View>
                  <View style={styles.viewInfo}><Text style={styles.textInfoHead}>Assigned Agent </Text><Text>: {selected.Assigned_To_Agent_Name}</Text></View>
                  {selected.Measurement.length!=0 && <View style={styles.viewInfo}><Text style={styles.textInfoHead}>Quotation Number </Text><Text>: {selected.Measurement[0].quotation_no}</Text></View>}
                </View>
              </TouchableOpacity>
            </View>

            <View style={{borderWidth:0.5, marginVertical:10, borderColor:'#E3E7FD'}}/>

            <View style={{ marginHorizontal: 10 }}>
              <Text
                style={{color:'white', fontWeight:'bold', fontSize:18, textAlign:'center'}}
              >
                Order Details
              </Text>

              {selected.Measurement.length!=0?(<View style={{marginTop:20}}>
                <DataTable style={{width:'96%', marginHorizontal:'2%',borderRadius:8, backgroundColor:'white',shadowOffset:{height:6, width:6}, shadowOpacity:0.2, shadowRadius:4, shadowColor:'black'}}>
                  <DataTable.Header style={{}}>
                    <DataTable.Title>Quantity</DataTable.Title>
                    <DataTable.Title>Product</DataTable.Title>
                    <DataTable.Title>Unit Price</DataTable.Title>
                    <DataTable.Title>Extra Work</DataTable.Title>
                    <DataTable.Title>Total</DataTable.Title>
                  </DataTable.Header>
                  {selected.Measurement.map((values) => (
                    <DataTable.Row>
                      <DataTable.Cell>{values.quantity}</DataTable.Cell>
                      <DataTable.Cell>{values.product}</DataTable.Cell>
                      <DataTable.Cell>{values.price_per_qty}</DataTable.Cell>
                      <DataTable.Cell>{values.work_extra_price}</DataTable.Cell>
                      <DataTable.Cell>{values.total_price}</DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
              </View>):(<View style={{marginTop:20, alignItems:'center'}}><Text style={{fontSize:16, color:'white'}}>No Invoice To Show</Text></View>)}

              {selected.quote_price!=null && selected.Measurement.length!=0 &&  (<View style={{marginTop:20}}>
              <View style={styles.viewCalculation}><Text style={styles.textCalculationHead}>Total: </Text><Text style={styles.valueCalculation}> ${selected.quote_price.total_price}</Text></View>
                <View style={styles.viewCalculation}><Text style={styles.textCalculationHead}>Extra Work: </Text><Text style={styles.valueCalculation}> ${selected.quote_price.total_work_extra}</Text></View>
                <View style={styles.viewCalculation}><Text style={styles.textCalculationHead}>Discount: </Text><Text style={styles.valueCalculation}> {selected.quote_price.discount}%</Text></View>
                <View style={styles.viewCalculation}><Text style={styles.textCalculationHead}>Taxes: </Text><Text style={styles.valueCalculation}> {selected.quote_price.taxex}%</Text></View>
                <View style={styles.viewCalculation}><Text style={styles.textCalculationHead}>Grand Total: </Text><Text style={styles.valueCalculation}> ${selected.quote_price.grand_total}</Text></View>
              </View>)}
            </View>

            {selected.PDF_Links_details!=null && (<View style={{marginHorizontal:'20%', marginBottom:'10%'}}>
              <ButtonComp title={'Download Invoice'} onPress={() => {
                      var url = `${selected.PDF_Links_details.pdf_link}`;
                      Linking.canOpenURL(url).then((supported) => {
                        if (supported) {
                          Linking.openURL(url);
                        } else {
                          console.log("Don't know how to open URI: " + url);
                        }
                      });
              }} />
            </View>)}


          </ScrollView>
      )}
      </ImageBackground>
    </View>
  );
};

const styles=StyleSheet.create({
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
  viewCalculation:{flexDirection:'row', justifyContent:'flex-end', marginRight:30, marginBottom:10},
  textCalculationHead:{textAlign:'right',  fontWeight:'bold', color:'black'},
  valueCalculation:{color:'black'},
  viewInfo:{flexDirection:'row', justifyContent:'flex-start', marginBottom:10},
  textInfoHead:{fontWeight:'bold', width:130}
})

export default InvoiceCustomer;
