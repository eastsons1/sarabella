import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,Alert, ImageBackground, Image,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dropdown } from "react-native-element-dropdown";
import RNDateTimePicker from '@react-native-community/datetimepicker';
// import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput } from "react-native-paper";
import moment from "moment";

import Colors from "../../../constant/Colors";
import EnvVariables from "../../../constant/EnvVariables";
import ButtonComp from "../../../components/ButtonComp";
import Splash from "../../../components/Splash";

const data = [
  { label: "Pending", value: "1" },
  { label: "Completed", value: "2" },
];

const PaymentStatus = (props) => {
  const [id, setId] = useState(undefined);
  const [refreshing, setRefreshing] = useState(false);
  const [dataload, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [quotationNo, setQuotationNo] = useState(undefined);
  const [depositAmount, setDepositAmount]=useState('');
  const [cheque, setCheque]=useState('');
  const [balanceDue, setBalanceDue]=useState('');

  const [value, setValue] = useState(null);
  const [label, setLabel] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [valueQuotation, setValueQuotation] = useState(null);
  const [labelQuotation, setLabelQuotation] = useState(null);
  const [isFocusQuotation, setIsFocusQuotation] = useState(false);

  const [show, setShow] = useState(false);
  const [date, setDate] = useState("");

  const [balanceDate, setBalanceDate] = useState("");
  const [showBalance, setShowBalance] = useState(false);

  const [datePickerShow, setDatePickerShow]=useState(false);
  const [dateAObj, setDateAObj]=useState(new Date());
  const [datePicker, setDatePicker]=useState('');

  const [datePickerBalanceShow, setDatePickerBalanceShow]=useState(false);
  const [dateBObj, setDateBObj]=useState(new Date());
  const [dateBalancePicker, setDateBalancePicker]=useState('')

  const showDatePicker = () => {
    setDatePickerShow(true);
  };

  const showDatePickerBalance = () => {
    setDatePickerBalanceShow(true);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dateAObj;
    if (selectedDate !== undefined) {
      setDateAObj(currentDate);
    }
  };

  const onChangeDateBalance = (event, selectedDate) => {
    const currentDate = selectedDate || dateBObj;
    if (selectedDate !== undefined) {
      setDateBObj(currentDate);
    }
  };

  let formattedDate = 'DD-MM-YYYY';
  if (dateAObj !== new Date()) {
    const day = dateAObj.getDate();
    const month = dateAObj.getMonth() + 1;
    const year = dateAObj.getFullYear();
    formattedDate = `${day < 10 ? `0${day}` : day}-${
      month < 10 ? `0${month}` : month
    }-${year}`;
  }

  let formattedDateBalance = 'DD-MM-YYYY';
  if (dateBObj !== new Date()) {
    const day = dateBObj.getDate();
    const month = dateBObj.getMonth() + 1;
    const year = dateBObj.getFullYear();
    formattedDateBalance = `${day < 10 ? `0${day}` : day}-${
      month < 10 ? `0${month}` : month
    }-${year}`;
  }

  let endDate = new Date();

  const onChange = (event, date) => {
    if (date != null) {
      let dt = new Date(date);
      let year = dt.getFullYear();
      let monthNum = dt.getMonth() + 1;
      //let monthAlpha = Months[monthNum];
      //let modifiedDate = dt.getDate() + " " + monthAlpha + " " + year;
      let modifiedDate =  year+ "-" + monthNum + "-" +  dt.getDate()
      //let modifiedDate = dt.getDate() + "-" + dt.getMonth() + "-" + dt.setMonth();
      endDate = date;
      setDate(modifiedDate);
      setShow(false);
    }
  };

  let endDateBalance = new Date();

  const onChangeBalance = (event, balanceDate) => {
    if (balanceDate != null) {
      let dt = new Date(balanceDate);
      let year = dt.getFullYear();
      let monthNum = dt.getMonth() + 1;
      //let monthAlpha = Months[monthNum];
      //let modifiedDate = dt.getDate() + " " + monthAlpha + " " + year;
      let modifiedDate = year + "-" + monthNum + "-" + dt.getDate();
      //let modifiedDate = dt.getDate() + "-" + dt.getMonth() + "-" + dt.setMonth();
      endDateBalance = balanceDate;
      setBalanceDate(modifiedDate);
      setShowBalance(false);
    }
  };

  const allQuotes = async () => {
    if (dataload == false) {
      setApiLoader(true);
      setId(await AsyncStorage.getItem("user_id"));
      let webApiUrl =
        EnvVariables.API_HOST +
        `APIs/ViewAllQuotationList/ViewAllQuotationList.php`;
      axios.get(webApiUrl).then((response) => {
        console.log(
          "response of payment status=" + JSON.stringify(response.data)
        );
        setQuotationNo(response.data.Quotation_List);
        
        setDataLoaded(true);
        setApiLoader(false);
      });
    }
  };

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   let webApiUrl =
  //     EnvVariables.API_HOST +
  //     `APIs/ViewAllQuotationList/ViewAllQuotationList.php`;
  //   axios.get(webApiUrl).then((response) => {
  //     console.log("response in quote details=" + JSON.stringify(response.data));
  //   });
  //   console.log("inside on refresh");
  //   //allQuotes();
  //   setRefreshing(false);
  // }, [id]);

  useEffect(() => {
    props.navigation.addListener("focus", ()=>{
      allQuotes();
    })
  }, [id]);

  const onSubmit=async()=>{
    console.log('date picker='+moment(dateBObj).format('DD-MM-YYYY'))
    if(Platform.OS=='android'){
      if(valueQuotation!=null && label!=null && datePicker!="" && depositAmount!="" && cheque!="" && balanceDue!="" && dateBalancePicker!=""){
        setApiLoader(true)
        let webApiUrl=EnvVariables.API_HOST+`APIs/QuotePaymentUpdate/QuotePaymentUpdate.php`;
      const data=new FormData();
      
      data.append("quote_id", valueQuotation);
      data.append("paymentstatus",label);
      data.append("Deposit_Amount_date",datePicker)
      data.append("Deposit_Amount",depositAmount);
      data.append("Deposit_Amount_cheque",cheque);
      data.append("Balance_Due",balanceDue);
      data.append("Balance_Due_date",dateBalancePicker);
      console.log('payment status='+JSON.stringify(data))
      let res=await fetch(webApiUrl,{
        method:'post',
        body:data
      })

      let responseJson=await res.json();
      console.log('response in payment status='+JSON.stringify(responseJson))
      setApiLoader(false);
      if(responseJson.status==true){
        Alert.alert('',responseJson.Message,[{text:'Ok', style:'cancel',onPress:()=>{
          setDepositAmount('');setCheque('');setBalanceDate('');setBalanceDue('');setDate(''); setValueQuotation(null); setLabelQuotation(null); setValue(null); setLabel(null)
        }}])
      }
      console.log('response json='+JSON.stringify(responseJson))
      } else{Alert.alert('','Kindly fill above fields',[{text:'Ok', style:'cancel'}])}
    }
    else {
      if(valueQuotation!=null && label!=null && depositAmount!="" && cheque!="" && balanceDue!=""){
        setApiLoader(true)
        let webApiUrl=EnvVariables.API_HOST+`APIs/QuotePaymentUpdate/QuotePaymentUpdate.php`;
      const data=new FormData();
      
      data.append("quote_id", valueQuotation);
      data.append("paymentstatus",label);
      data.append("Deposit_Amount_date",moment(dateAObj).format('DD-MM-YYYY'))
      data.append("Deposit_Amount",depositAmount);
      data.append("Deposit_Amount_cheque",cheque);
      data.append("Balance_Due",balanceDue);
      data.append("Balance_Due_date",moment(dateBObj).format('DD-MM-YYYY'));
      console.log('payment status='+JSON.stringify(data))
      let res=await fetch(webApiUrl,{
        method:'post',
        body:data
      })

      let responseJson=await res.json();
      console.log('response in payment status='+JSON.stringify(responseJson))
      setApiLoader(false);
      if(responseJson.status==true){
        Alert.alert('',responseJson.Message,[{text:'Ok', style:'cancel',onPress:()=>{
          setDepositAmount('');setCheque('');setBalanceDate('');setBalanceDue('');setDate(''); setValueQuotation(null); setLabelQuotation(null); setValue(null); setLabel(null)
        }}])
      }
      console.log('response json='+JSON.stringify(responseJson))
      } else{Alert.alert('','Kindly fill above fields',[{text:'Ok', style:'cancel'}])}
    }
  }

  useEffect(()=>{
    props.navigation.addListener("blur",()=>{
      setQuotationNo(undefined)
      setDataLoaded(false)
      setApiLoader(true)
    })
  },[])

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding" } style={{flex:1}}>
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
         style={{ width: 160, height: 100 }}
       />
       <Text style={{fontWeight:'bold'}}>Loading...</Text>
     </Splash>
      ) : (
        <ScrollView
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
        >
          <View style={{ marginTop: 20, marginHorizontal: 10 }}>
            <View style={styles.individualBoxView}>
              <Text style={{fontSize:12, marginBottom:5}}>Select Quotes:</Text>
              {/* {quotationNo != null || quotationNo != undefined
                ? quotationNo.map((abc) => ( */}
                    <View>
                      <Dropdown
                        style={[
                          styles.dropdown,
                          isFocusQuotation && { borderColor: "black" },
                        ]}
                        
                        placeholderStyle={{ fontSize: 16 }}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={quotationNo}
                        containerStyle={{
                          backgroundColor: 'white',
                          top:Platform.OS=='android'&&-30
                        }}
                        labelField="quotation_no"
                        valueField="quote_id"
                        placeholder={!isFocusQuotation ? "Quotation" : "..."}
                        value={valueQuotation}
                        onFocus={() => setIsFocusQuotation(true)}
                        onBlur={() => setIsFocusQuotation(false)}
                        onChange={(item) => {
                          setValueQuotation(item.quote_id);
                          setLabelQuotation(item.quotation_no);
                          setIsFocusQuotation(false);
                        }}
                      />
                    </View>
                  {/* ))
                : null} */}
              <Text style={{fontSize:12, marginBottom:5}}>Payment Status:</Text>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "black" }]}
                placeholderStyle={{ fontSize: 16 }}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={data}
                containerStyle={{ backgroundColor: 'white', top: Platform.OS=='android' && -30 }}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Select Payment Status" : "..."}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setValue(item.value);
                  setLabel(item.label);
                  setIsFocus(false);
                }}
              />

              <Text style={{fontSize:12}}>Date Of Deposit Amount:</Text>
              <View style={{marginTop:5}}>
                <View style={styles.dateView}>
                {Platform.OS=='android' && <View>{datePicker==''?(<TouchableOpacity onPress={()=>{setDatePickerShow(true)}}><Text style={{ marginLeft: 10, fontSize:16 }}>Pick Date</Text></TouchableOpacity>):(<TouchableOpacity onPress={()=>{setDatePickerShow(true)}}><Text style={{ marginLeft: 10, fontSize:16 }}>{datePicker}</Text></TouchableOpacity>)}</View>}
                {Platform.OS=='ios' && (
                      <TouchableOpacity
                        onPress={()=>{setDatePickerShow(true)}}
                      >
                        <Text style={{paddingLeft:10}}>{showDatePicker ? formattedDate : 'DD-MM-YYYY'}</Text>
                      </TouchableOpacity>
                    )}
                </View>
                 
              </View>
              {Platform.OS=='android' && datePickerShow && (
                <RNDateTimePicker mode="date"
                  value={dateAObj} 
                  onChange={(event, date)=>{setDatePickerShow(false); setDatePicker(date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear())}}
                />
              )}

                {Platform.OS=='ios' && datePickerShow && (
                  <RNDateTimePicker
                    value={dateAObj}
                    mode="date"
                    is24Hour={false}
                    display="default"
                    onChange={onChangeDate}
                  />
                )}

              {/* <View style={{marginTop:5}}>
                <View style={styles.dateView}>
                  {date == "" ? (
                    <TouchableOpacity onPress={() => setShow(true)}>
                      <Text style={{ marginLeft: 10 }}>YYYY-MM-DD</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setShow(true)}>
                      <Text style={{ marginLeft: 10 }}>{date}</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {show && (
                  <DateTimePicker
                    value={endDate}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View> */}

              <Text style={{ marginTop: 20,  fontSize:12 }}>Deposit Amount:</Text>
              <View style={{ flexDirection: "row", marginBottom:20 }}>
                <TextInput
                  mode="outlined"
                  style={{
                    width: "48%",
                    // height: 50,
                    marginRight: "2%",
                    backgroundColor: 'white',
                  }} 
                  placeholder='Deposit Amount'
                  // label='Deposit Amount'
                  value={depositAmount}
                  keyboardType='number-pad'
                  onChangeText={(value)=>setDepositAmount(value)}
                ></TextInput>
                <TextInput
                  mode="outlined"
                  style={{
                    width: "48%",
                    // height: 50,
                    backgroundColor: 'white',
                  }}
                  placeholder='Deposit Amount Cheque'
                  // label='Deposit Amount Cheque'
                  value={cheque}
                  onChangeText={(value)=>setCheque(value)}
                ></TextInput>
              </View>

              <Text style={{fontSize:12}}>Date Of Balance Due:</Text>
              <View style={{marginTop:5}}>
                <View style={styles.dateView}>
                {Platform.OS=='android' && <View>{dateBalancePicker==''?(<TouchableOpacity onPress={()=>{setDatePickerBalanceShow(true)}}><Text style={{ marginLeft: 10, fontSize:16 }}>Pick Date</Text></TouchableOpacity>):(<TouchableOpacity onPress={()=>{setDatePickerBalanceShow(true)}}><Text style={{ marginLeft: 10, fontSize:16 }}>{dateBalancePicker}</Text></TouchableOpacity>)}</View>}
                {Platform.OS=='ios' && (
                      <TouchableOpacity
                        onPress={()=>{setDatePickerBalanceShow(true)}}
                      >
                        <Text style={{paddingLeft:10}}>{showDatePickerBalance ? formattedDateBalance : 'DD-MM-YYYY'}</Text>
                      </TouchableOpacity>
                    )}
                </View>
                 
              </View>
              {Platform.OS=='android' && datePickerBalanceShow && (
                <RNDateTimePicker mode="date"
                  value={dateBObj} 
                  onChange={(event, date)=>{setDatePickerBalanceShow(false); setDateBalancePicker(date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear())}}
                />
              )}

                {Platform.OS=='ios' && datePickerBalanceShow && (
                  <RNDateTimePicker
                    value={dateBObj}
                    mode="date"
                    is24Hour={false}
                    display="default"
                    onChange={onChangeDateBalance}
                  />
                )}

              {/* <View style={{marginTop:5}}>
                <View style={styles.dateView}>
                  {balanceDate == "" ? (
                    <TouchableOpacity onPress={() => setShowBalance(true)}>
                      <Text style={{ marginLeft: 10 }}>YYYY-MM-DD</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setShowBalance(true)}>
                      <Text style={{ marginLeft: 10 }}>{balanceDate}</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {showBalance && (
                  <DateTimePicker
                    value={endDateBalance}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeBalance}
                  />
                )}
              </View> */}
              <Text style={{marginTop:20,  fontSize:12}}>Balance Due:</Text>
              <TextInput
                  mode="outlined"
                  style={{
                    //width: "48%",
                    // height: 50,
                    backgroundColor: 'white',
                  }}
                  placeholder='Balance Due'
                  // label='Balance Due'
                  value={balanceDue}
                  keyboardType='number-pad'
                  onChangeText={(value)=>setBalanceDue(value)}
                ></TextInput>

                  <View style={{marginVertical:25, marginHorizontal:'20%'}}><ButtonComp title={'Submit'} onPress={onSubmit}/></View>

            </View>
          </View>
        </ScrollView>
      )}
      </ImageBackground>
    </View>
    </KeyboardAvoidingView>
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
  dropdown: {
    borderColor: "black",
    //borderWidth: 0.5,
    paddingHorizontal: 8,
    width: "100%",
    alignSelf: "center",
    
    //height: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 6,
    height: 50,
    marginBottom: 20,
  },

  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  dateView: {
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
    //marginTop: 10,
    justifyContent: "center",
  },
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 1,
  },
});

export default PaymentStatus;
