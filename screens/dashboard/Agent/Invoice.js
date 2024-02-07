import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Alert, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { DataTable } from "react-native-paper";

import Colors from "../../../constant/Colors";
import ButtonComp from "../../../components/ButtonComp";
import EnvVariables from "../../../constant/EnvVariables";

const Invoice = (props) => {
  const [id, setId] = useState(undefined);
  const [quoteButton,showQuoteButton] = useState(true)

  var Request_by_name = props.route.params.Request_by_name;
  var contact_no = props.route.params.contact_no;
  var visit_address = props.route.params.visit_address;
  var order_request = props.route.params.order_request;
  var order_id=props.route.params.order_id;
  var Quotation_no=props.route.params.Quotation_no;
  var quote_status=props.route.params.quote_status;
  var Expiry_date=props.route.params.Expiry_date;
  var created_date=props.route.params.created_date;
  var first_name=props.route.params.first_name;
  var email=props.route.params.email;
  var createQuoteResponse=props.route.params.createQuoteResponse;

  var price=props.route.params.price;
  var wexp=props.route.params.wexp;
  var discount=props.route.params.discount;
  var taxex=props.route.params.taxex;
  var priceTotal=props.route.params.priceTotal;
  var grandTotalWithWExtra=props.route.params.grandTotal
console.log(props.route.params,'props.route.params')
  console.log('quotation number='+Quotation_no)
  console.log('quotation status='+quote_status)
  console.log('expiry date='+Expiry_date)
  console.log('created date='+created_date)
  console.log('first name='+first_name)
  console.log('email='+email)
  console.log('order id='+order_id)

  console.log('price='+price)
  console.log('wexp='+wexp);
  console.log('discount='+discount)
  console.log('taxex='+taxex)
  console.log('price total='+priceTotal)
  console.log('create quote response in invoice='+JSON.stringify(createQuoteResponse))

  const [total, setTotal]=useState([])

  // const getDetails=async()=>{
  //   setId(await AsyncStorage.getItem("user_id"));
  // }

  useEffect(() => {
    // getDetails()
    setTotal((value)=>[price])
    console.log('total='+total)
  }, []);
  
  let grandTotal=[parseInt(-discount),parseInt(taxex)].reduce((partialSum, a) => partialSum + a, 0);
  let totalWithoutDiscountWExtra=grandTotalWithWExtra
  const sum=grandTotal
  console.log('grand total='+sum)
   let abc=totalWithoutDiscountWExtra.reduce((partialSum, a) => partialSum + a);
  console.log('totalwithout discount and extra work='+abc)


//   const sum = [1, 2, 3].reduce((partialSum, a) => partialSum + a, 0);
// console.log('sum='+sum);

  const saveQuote=async()=>{
    let webapiurl=EnvVariables.API_HOST +`APIs/SaveQuote/SaveQuote.php`;
    const data = new FormData();
    data.append("orid", order_id);
    data.append("quote_no", Quotation_no)
    data.append("quote_date", created_date)
    data.append("status", quote_status)
    data.append("Customer_name",first_name)
    data.append("customer_email",email)
    data.append("expiry_date",Expiry_date)

    let res = await fetch(webapiurl, {
      method: "post",
      body: data,
    });

    let responseJson = await res.json();
    console.log("response json=" + JSON.stringify(responseJson));
    if(responseJson.status==true){
      showQuoteButton(false)
      Alert.alert('', "Quotation Saved Successfully",[{text:'Ok', style:'cancel'}])
    }
  }

  const sendToCustomer=()=>{
    // let webapirurl=`https://refuel.site/projects/sarabella/APIs/SendQuoteToCustomer/SendQuoteToCustomerPDF.php?quote_id=${quote_id}&orid=${order_id}&Customer_Email=${email}`
    let webapirurl=EnvVariables.API_HOST +`APIs/SendQuoteToCustomer/SendQuoteToCustomerPDF.php?orid=${order_id}&Customer_Email=${email}`
    console.log('web api url='+webapirurl)
    axios.get(webapirurl).then((res)=>{
      console.log('response in invoice send to customer='+JSON.stringify(res.data))
      if(res.data.status==true){
        Alert.alert('Thanks!','Quote Sent Successfully To Customer',[{text:'Ok', style:'cancel', onPress:()=>props.navigation.navigate('Home ')}])
      }
    })
  }

  



  return (
    <View style={{ flex: 1, backgroundColor: '#c9d1fb' }}>
      <ImageBackground
        source={require("./../../../assets/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
      <ScrollView>
      <View style={{ marginTop: 20, marginHorizontal: 10 }}>
          {/* <Text style={{ fontWeight: "500", fontSize: 20, textAlign: "center" }}>Create Quote</Text> */}
          <View style={styles.individualBoxView}>
            <View style={{ justifyContent: "flex-start", flexDirection: "row" }}><Text style={styles.textInfo}>Customer Name </Text><Text style={{ fontWeight: "normal" }}>: {first_name}</Text></View>
            <View style={styles.assignedJobView}><Text style={styles.textInfo}>Contact No. </Text><Text style={{fontWeight:'normal'}}>: {contact_no}</Text></View>
            {
              visit_address ?
              <View style={styles.assignedJobView}><Text style={styles.textInfo}>Address </Text><Text style={{fontWeight:'normal'}}>: {visit_address}</Text></View>
              : null
            }
            <View style={styles.assignedJobView}><Text style={styles.textInfo}>Service Name </Text><Text style={{fontWeight:'normal', textTransform:'capitalize'}}>: {order_request}</Text></View>
            {/* <View style={styles.assignedJobView}><Text style={{fontWeight:'600'}}>Expiry: </Text><Text style={{fontWeight:'normal'}}>{order_request}</Text></View>
            <View style={styles.assignedJobView}><Text style={{fontWeight:'600'}}>Deposit: </Text><Text style={{fontWeight:'normal'}}>{order_request}</Text></View> */}
          </View>
        </View>

        <View style={{borderWidth:0.5, marginVertical:10, borderColor:'#E3E7FD'}}/>

        <View style={{marginTop:10}}>
          <View style={{marginBottom:10, alignItems:'center'}}><Text style={{color:'white', fontWeight:'bold', fontSize:18}}>Payment Detail</Text></View>
                <DataTable style={styles.dataTableStyle}>
                  <DataTable.Header style={{}}>
                    <DataTable.Title>Quantity</DataTable.Title>
                    <DataTable.Title>Product</DataTable.Title>
                    <DataTable.Title>Unit Price</DataTable.Title>
                    <DataTable.Title>Extra Work</DataTable.Title>
                    <DataTable.Title>Total</DataTable.Title>
                  </DataTable.Header>
                  {createQuoteResponse.map((values,index) => (
                    <DataTable.Row>{console.log('index='+index)}
                      <DataTable.Cell>{values.quantity}</DataTable.Cell>
                      <DataTable.Cell>{values.product}</DataTable.Cell>
                      {/* <DataTable.Cell>{values.price_per_qty}</DataTable.Cell> */}
                      <DataTable.Cell>{price[index]}</DataTable.Cell>
                      <DataTable.Cell>{wexp[index]}</DataTable.Cell>
                      <DataTable.Cell>{price[index]*values.quantity+parseInt(wexp[index])}</DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
               

                <View style={{marginTop:20}}>
                  <View style={styles.totalViewStyle}><Text style={styles.totalTextStyle}>Total:</Text><Text style={styles.valueCalculation}> ${abc}</Text></View>
                  <View style={styles.totalViewStyle}><Text style={styles.totalTextStyle}>Discount:</Text><Text style={styles.valueCalculation}>{(discount*100).toFixed()}%</Text></View>
                  <View style={styles.totalViewStyle}><Text style={styles.totalTextStyle}>Taxes:</Text><Text style={styles.valueCalculation}>{(taxex*100).toFixed()}%</Text></View>
                  {/* <View style={styles.totalViewStyle}><Text style={styles.totalTextStyle}>Grand Total:</Text><Text style={styles.valueCalculation}> ${(parseInt(abc)-(parseFloat(discount)*parseInt(abc)))+(parseFloat(taxex)* (parseInt(abc)-(parseFloat(discount)*parseInt(abc))))}</Text></View> */}
                  <View style={styles.totalViewStyle}><Text style={styles.totalTextStyle}>Grand Total:</Text><Text style={styles.valueCalculation}> 
      ${(parseInt(abc) - parseFloat(discount) * parseInt(abc) + parseFloat(taxex) * (parseInt(abc) - parseFloat(discount) * parseInt(abc))).toFixed(2)}
                
                  </Text></View>
                  <Text style={styles.valueCalculation}>
      {/* ${(parseInt(abc) - parseFloat(discount) * parseInt(abc) + parseFloat(taxex) * (parseInt(abc) - parseFloat(discount) * parseInt(abc))).toFixed(2)} */}
    </Text>
                </View>
              </View>

        {quoteButton?<View style={{width:'50%', alignSelf:'center', marginVertical:20}}><ButtonComp title={"Save Quote"} onPress={saveQuote} /></View>:null}
        
        {quoteButton==false?<View style={{width:'50%', alignSelf:'center'}}><ButtonComp title={"Send To Customer"} onPress={sendToCustomer}/></View>:null}

      </ScrollView>
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
      paddingVertical: 10,
      shadowOffset:{height:6, width:6}, shadowOpacity:0.2, shadowRadius:4, shadowColor:'black'
      //height:'100%'
    },
    assignedJobView: {
      justifyContent: "flex-start",
      flexDirection: "row",
      marginTop: 20,alignItems:'center'
    },
    totalViewStyle:{flexDirection:'row', justifyContent:'flex-end', marginRight:30, marginBottom:10},
    totalTextStyle:{textAlign:'right',  fontWeight:'bold', color:'black'},
    dataTableStyle:{
      width:'96%', marginHorizontal:'2%',borderRadius:8, backgroundColor:'white',shadowOffset:{height:6, width:6}, shadowOpacity:0.2, shadowRadius:4, shadowColor:'black'
    },
    textInfo:{ fontWeight: "bold", width:130 },
    rootScreen: {
      flex: 1,
    },
    backgroundImage: {
      opacity: 1,
    },
    valueCalculation:{color:'black'}
})

export default Invoice;
