import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "react-native-paper";
import axios from "axios";
import { useFocusEffect } from '@react-navigation/native';
import ButtonComp from "../../../components/ButtonComp";

import CustomTextInput from "../../../components/CustomTextInput";
import EnvVariables from "../../../constant/EnvVariables";

const CreateQuote = (props) => {
  var measurnment = props.route.params.measurnment;
  var order_id = props.route.params.order_id;
  var order_request = props.route.params.order_request;
  var date_of_visit = props.route.params.date_of_visit;
  var S_T_V = props.route.params.S_T_V;
  var Request_by_name = props.route.params.Request_by_name;
  var contact_no = props.route.params.contact_no;
  var visit_address = props.route.params.visit_address;
  var cDate = props.route.params.created_date;
  var createQuoteResponse = props.route.params.createQuoteResponse;
  var Quotation_no = props.route.params.Quotation_no;
  var quote_status = props.route.params.quote_status;
  var Expiry_date = props.route.params.Expiry_date;
  var created_date = props.route.params.created_date;
  var first_name = props.route.params.first_name;
  var last_name = props.route.params.last_name;
  var email = props.route.params.email;
  // var quote_id=props.route.params.quote_id;

  const [focus, setFocus]=useState(false);
  const [orid, setOrid] = useState("");
  const [discount, setDicsount] = useState("");
  const [taxex, setTaxex] = useState("");
  const [priceTotal, setpriceTotal] = useState([]);
  const [workExtraTotal, setworkExtraTotal] = useState([]);
  const [grandTotal, setgrandTotal] = useState([]);

  const [price, setPrice] = useState(new Array(createQuoteResponse.length));
  const [wexp, setWexp] = useState(new Array(createQuoteResponse.length));

  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [showInvoiceButton, setShowInvoiceButton]=useState(false)
  let i;

  useFocusEffect(
    React.useCallback(() => {
      console.log("cleaned up from createquote");
      setDicsount("")
      setTaxex("")
      setpriceTotal([])
      setworkExtraTotal([])
      setgrandTotal([])
      setPrice([])
      setWexp([])
      setShowSubmitButton(true)
      setShowInvoiceButton(false)
      return () => {
      };
    }, [])
  );

  useEffect(() => {
    props.navigation.addListener("blur", () => {
      console.log("unblurred from create quoteeeeeeeee");
      setDicsount("")
      setTaxex("")
      setpriceTotal([])
      setworkExtraTotal([])
      setgrandTotal([])
      setPrice([])
      setWexp([])
      setShowSubmitButton(true)
      setShowInvoiceButton(false)
    });
  }, []);


  const updatePriceAndDiscount = () => {
    var allDataFilled = true;
    console.log("price = ",JSON.stringify(price))
    console.log("wexp = ",JSON.stringify(wexp))
    for(var k =0;k<createQuoteResponse.length;k++)
      {
        if(wexp[k] == undefined || wexp[k] === '' || price[k] == undefined || price[k] === '')
        {
          allDataFilled=false;
        }
      }

    if (discount == "" || taxex == "") {
      Alert.alert("", "Kindly fill discount and Taxex", [
        { text: "Ok", style: "cancel" },
      ]);
    } else if (allDataFilled === false) {
      Alert.alert("", "Kindly fill price and work extra", [
        { text: "Ok", style: "cancel" },
      ]);
    } 
    else {
      for(var k =0;k<createQuoteResponse.length;k++)
      {
        let webApiUrl = EnvVariables.API_HOST +`APIs/EditPriceQuote/EditPriceQuote.php?orid=${createQuoteResponse[k].order_request_id}&mid=${createQuoteResponse[k].measurement_id}&quantity=${createQuoteResponse[k].quantity}&wexp=${wexp[k]}&price=${price[k]}`;
        let webapiurl = EnvVariables.API_HOST +`APIs/AddDiscountTaxex/AddDiscountTaxex.php?orid=${order_id}&discount=${discount}&Taxex=${taxex}`;  
        console.log("webApiUrl 1 = ",JSON.stringify(webApiUrl))
        console.log("webApiUrl 2 = ",JSON.stringify(webapiurl))
        axios
          .get(webApiUrl)
          .then((res) => {
            axios
              .get(webapiurl)
              .then((response) => {
                console.log(
                  "response of discount and taxes=" +
                    JSON.stringify(response.data)
                );
              })
              .catch((err) => console.log(err));
          })
          .catch((error) => console.log(error));
       }
       Alert.alert(
        "",
        "Price and Discount updated successfully!",
        [{ text: "Ok", style: "cancel" }]
      );
       setShowSubmitButton(false)
       setShowInvoiceButton(true);
      console.log("PriceTotal = ",priceTotal)
      console.log("GrandTotal = ",grandTotal)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, backgroundColor: "#c9d1fb" }}>
        <ImageBackground
          source={require("./../../../assets/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginTop: 20, marginHorizontal: 10 }}>
              <View style={styles.individualBoxView}>
                <View
                  style={{ justifyContent: "flex-start", flexDirection: "row" }}
                >
                  <Text style={styles.textHead}>Customer Name </Text>
                  <Text style={{ fontWeight: "normal" }}>
                    : {first_name} {last_name}
                  </Text>
                </View>
                <View style={styles.assignedJobView}>
                  <Text style={styles.textHead}>Contact No. </Text>
                  <Text style={{ fontWeight: "normal" }}>: {contact_no}</Text>
                </View>
                <View style={styles.assignedJobView}>
                  <Text style={styles.textHead}>Address </Text>
                  <Text style={{ fontWeight: "normal" }}>
                    : {visit_address}
                  </Text>
                </View>
                <View style={styles.assignedJobView}>
                  <Text style={styles.textHead}>Service Name </Text>
                  <Text
                    style={{
                      fontWeight: "normal",
                      textTransform: "capitalize",
                    }}
                  >
                    : {order_request}
                  </Text>
                </View>

              </View>
            </View>
            <View style={{ borderWidth: 1, marginVertical: 10 }} />
            <View style={{ marginHorizontal: 10 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  textAlign: "center",
                  color: "white",
                }}
              >
                Order Details
              </Text>

              <View style={{flexDirection:'row', justifyContent:'space-evenly', marginTop:15}}>
                <CustomTextInput
                  placeholder="Disc %"
                  value={discount}
                  editable={true}
                  onChangeText={(value) => {
                    const isValid = /^(100|[1-9]?\d)$/.test(value);
                    if (isValid) {
                      setDicsount(value);
                    } else {
                      setDicsount('');
                    }
                    setShowSubmitButton(true)
                    // setDicsount(value)
                  }}
                  // onChangeText={text => setInputValue(text)}
                />

                <CustomTextInput
                  placeholder="Taxes %"
                  value={taxex}
                  editable={true}
                    onChangeText={(value) => {
                      const isValid = /^(100|[1-9]?\d)$/.test(value);
                      if (isValid) {
                        setTaxex(value);
                      } else {
                        setTaxex('');
                      }
                      setShowSubmitButton(true)
                      // setTaxex(value)
                    }
                    }
                  // onChangeText={text => setInputValue(text)}
                />

                <CustomTextInput
                  placeholder="Expiry Date"
                  value={Expiry_date}
                  editable={false}
                />
              </View>

              {createQuoteResponse.map((value, index) => (
                <View style={{ ...styles.individualBoxView, marginBottom: 20 }}>
                  <View
                    style={{
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      marginTop: 5,
                    }}
                  >
                    <Text style={styles.textHead}>Product </Text>
                    <Text style={{ fontWeight: "normal" }}>
                      : {value.product}
                    </Text>
                  </View>
                  <View style={styles.assignedJobView}>
                    <Text style={styles.textHead}>Remarks </Text>
                    <Text style={{ fontWeight: "normal" }}>
                      : {value.remarks}
                    </Text>
                  </View>
                  <View style={styles.assignedJobView}>
                    <Text style={styles.textHead}>Quantity </Text>
                    <Text style={{ fontWeight: "normal" }}>
                      : {value.quantity} nos
                    </Text>
                  </View>
                  <View style={styles.assignedJobView}>
                    <Text style={styles.textHead}>Width </Text>
                    <Text style={{ fontWeight: "normal" }}>
                      : {value.width} {value.measurement_type}
                    </Text>
                  </View>
                  <View style={styles.assignedJobView}>
                    <Text style={styles.textHead}>Height </Text>
                    <Text style={{ fontWeight: "normal" }}>
                      : {value.height} {value.measurement_type}
                    </Text>
                  </View>
                  
                  {console.log("index=" + index)}
                  <View style={styles.assignedJobView}>
                    <Text
                      style={{
                        fontWeight: "600",
                        textAlignVertical: "center",
                        width: 130,
                      }}
                    >
                      Price per qty{" "}
                    </Text>
                    <TextInput
                      mode="outlined"
                      placeholder="$ price"
                      keyboardType='phone-pad'
                      value={price[index]}
                      onChangeText={(abc) => {

                        const some_array = [...price]
                        some_array[index] = abc
                        setPrice(some_array)

                       // price[index]=abc;
                        console.log("onchange price = ",JSON.stringify(price))
                        var newPriceTotal = priceTotal
                        newPriceTotal.splice(index, 1, abc * value.quantity);
                        setpriceTotal(newPriceTotal)
                        setShowSubmitButton(true)
                        console.log("experiment=" + priceTotal.length);
                      }}
                      style={styles.textInput}
                    />
                  </View>
                  <View style={styles.assignedJobView}>
                    <Text
                      style={{
                        fontWeight: "600",
                        textAlignVertical: "center",
                        width: 130,
                      }}
                    >
                      Extra Work{" "}
                    </Text>
                    <TextInput
                    
                      mode="outlined"
                      placeholder="$ work"
                      value={wexp[index]}
                      keyboardType='phone-pad'
                      onChangeText={(abc) => {

                        const some_array = [...wexp]
                        some_array[index] = abc
                        setWexp(some_array)

                        //wexp[index]=abc;
                        console.log("onchange wexp = ",JSON.stringify(wexp))
                        var newworkExtraTotal = workExtraTotal;
                        newworkExtraTotal.splice(index, 1, abc);
                        setworkExtraTotal(newworkExtraTotal)
                        setShowSubmitButton(true)
                      }}
                      style={styles.textInput}
                    />
                  </View>
                 
                </View>
              ))}

                {
                  showSubmitButton === true ?
                  <View style={{ marginVertical: 10, marginHorizontal: "10%" }}>
                      <ButtonComp
                      title={"Submit"}
                      onPress={() => {updatePriceAndDiscount()}}
                    />
                  </View>
                  :
                  null
                }
              

              {showInvoiceButton==true ? (<View style={{ marginVertical: 20, marginHorizontal: "10%" }}>
                <ButtonComp
                  title={"Invoice"}
                  onPress={() => {
                    //console.log(discount, taxex , price[0], wexp[0])
                    var grandTotalNew=[];
                        for (i = 0; i < wexp.length; i++) {
                          grandTotalNew.push(parseInt(priceTotal[i]) + parseInt(wexp[i])) 
                        }
                    setgrandTotal(grandTotalNew)
                    console.log("grandtotal=" + grandTotalNew);

                    let sumPrice = price.reduce((a,v) =>  a = a + v , 0 );
                    let sumWexp = wexp.reduce((a,v) =>  a = a + v , 0 );
                    console.log("price length = ",sumPrice," wexp length = ",sumWexp);
                    if (discount == "" || taxex == "" ) {
                      Alert.alert("", "Kindly fill empty fields");
                    } else {
                      props.navigation.navigate("Invoice", {
                        first_name: first_name,
                        email: email,
                        priceTotal: priceTotal,
                        grandTotal: grandTotalNew,
                        Quotation_no: Quotation_no,
                        quote_status: quote_status,
                        Expiry_date: Expiry_date,
                        created_date: created_date,
                        Request_by_name: Request_by_name,
                        contact_no: contact_no,
                        visit_address: visit_address,
                        order_request: order_request,
                        order_id: order_id,
                        price: price,
                        wexp: wexp,
                        discount: (discount/100).toFixed(2),
                        taxex: (taxex/100).toFixed(2),
                        createQuoteResponse: createQuoteResponse,
                      });
                    }
                  }}
                />
              </View>
              )
              :null}

            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  individualBoxView: {
    backgroundColor: "white",
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    paddingVertical: 10,
    shadowOffset: { height: 6, width: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: "black",
  },
  assignedJobView: {
    justifyContent: "flex-start",
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  individualBoxTextHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 1,
  },
  textHead: { fontWeight: "bold", width: 130 },
  textInput: { width: "30%",  backgroundColor: "white" },
  onFocusPlaceholder:{
    backgroundColor:'white',
    top:20,
    // zIndex:2, 
    textAlign:'center',
    color:'black'
  },
  placeholder:{
    backgroundColor:'white',
    top:40,
    color:'black',
  },
  textInputP:{
    borderWidth:1,  
    borderRadius:6,
  },
});

export default CreateQuote;
