import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, StyleSheet, Alert, RefreshControl, ImageBackground, Image, Platform } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import Colors from "../../../constant/Colors";
import ButtonComp from "../../../components/ButtonComp";
import EnvVariables from "../../../constant/EnvVariables";
import Splash from "../../../components/Splash";

const data = [
  { label: "Start", value: "1" },
  { label: "Process", value: "2" },
  { label: "Manufacturing", value: "3" },
  { label: "Finish", value: "4" },
];

const WorkStatus = (props) => {
  const [apiLoader, setApiLoader] = useState(true);
  const [quotationNo, setQuotationNo] = useState(undefined);
  const [dataload, setDataLoaded] = useState(false);
  const [value, setValue] = useState(null);
  const [label, setLabel] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [id, setId]=useState(undefined);
  const [refreshing, setRefreshing] = useState(false);

  const [valueQuotation, setValueQuotation] = useState(null);
  const [labelQuotation, setLabelQuotation] = useState(null);
  const [isFocusQuotation, setIsFocusQuotation] = useState(false);

     //var quotation_no = props.route.params.quotation_no;
  //   console.log("quotation number=" + quotation_no);

  const getDetails=async()=>{
    setId(await AsyncStorage.getItem("user_id"));
  }

  useEffect(() => {
    if (dataload == false) {
      getDetails()
      setApiLoader(true);
      let webApiUrl =
        EnvVariables.API_HOST +
        `APIs/ViewAllQuotationList/ViewAllQuotationListLoggedInManufacturer.php?manufacturing_id=${id}`;
      axios.get(webApiUrl).then((res) => {
        setQuotationNo(res.data.View_Manufacturing_Unit_Jobs);
        console.log(
          "response in work status=" +
            JSON.stringify(res.data.View_Manufacturing_Unit_Jobs)
        );
        setApiLoader(false);
        setDataLoaded(true);
      });
    }
  }, [id, quotationNo, getDetails]);

  const onRefresh = useCallback(async() => {
    setRefreshing(true);
    let webApiUrl =
    EnvVariables.API_HOST +
    `APIs/ViewAllQuotationList/ViewAllQuotationListLoggedInManufacturer.php?manufacturing_id=${id}`;
  axios.get(webApiUrl).then((res) => {
    setQuotationNo(res.data.View_Manufacturing_Unit_Jobs);
    console.log(
      "response in work status=" +
        JSON.stringify(res.data.View_Manufacturing_Unit_Jobs)
    );
  });
    setRefreshing(false);
  }, [id, quotationNo]);

  const updateStatus=async()=>{
    setApiLoader(true);
    let webApiUrl=EnvVariables.API_HOST +`APIs/ManufacturingUnitWorkStatus/ManufacturingUnitWorkStatus.php`
    const data = new FormData();
    data.append('work_status',label);
    data.append('quote_no',labelQuotation);

    let res=await fetch(webApiUrl,{
      method:'post',
      body:data
    });
    let responseJson=await res.json();
    console.log('response json='+JSON.stringify(responseJson));
    if(responseJson.status==true){
      Alert.alert('',"Status Updated",[{text:'Ok', style:'cancel', onPress:()=>props.navigation.navigate("Home ")}])
      setApiLoader(false)
    } else {
      Alert.alert('',"Kindly recheck",[{text:'Ok', style:'cancel'}])
      setApiLoader(false)
    }
  }

  if(quotationNo==undefined){
    return(
      <View style={{ flex: 1, backgroundColor: '#c9d1fb' }}>
        <ImageBackground
          source={require("./../../../assets/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <Text style={{color:'white', fontSize:24}}>No quotes to update.</Text>
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
      // <ScrollView refreshControl={
      //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      //   >
        <View style={{ marginTop: 40, marginHorizontal: 10}}>
          {/* <Text style={styles.titleText}>Work Status</Text> */}
          <View style={styles.individualBoxView}>
            <Text style={{fontWeight:'bold'}}>Quotation:</Text>
            {/* {quotationNo != null || quotationNo != undefined
              ? quotationNo.map((abc) => ( */}
                  <View>
                    {/* {quotationNo!=undefined && ( */}
                      <Dropdown
                        style={[styles.dropdown, isFocusQuotation && { borderColor: "black" }]}
                        placeholderStyle={{ fontSize: 16 }}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={quotationNo}
                        containerStyle={{ backgroundColor: 'white', top:Platform.OS=='android' && -30 }}
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
                    {/* )} */}
                  </View>
                 {/* ))
              : null} */}
            {/* <TextInput value={quotation_no} editable={false} mode='outlined' style={{height:40, backgroundColor:Colors.boxBackground}} /> */}
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "black" }]}
              placeholderStyle={{ fontSize: 16 }}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={data}
              containerStyle={{ backgroundColor: 'white', top:Platform.OS=='android' && -30 }}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Work Status" : "..."}
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.value);
                setLabel(item.label);
                setIsFocus(false);
              }}
            />
            <View style={{ marginVertical: 20, marginHorizontal: 70 }}>
              <ButtonComp title={"Update"} onPress={updateStatus} />
            </View>
          </View>
        </View>
      // </ScrollView>
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
    paddingTop: 10,
    shadowOffset:{height:6, width:6}, shadowOpacity:0.2, shadowRadius:4, shadowColor:'black'
    //height:'100%'
  },
  dropdown: {
    borderColor: "black",
    //borderWidth: 0.5,
    paddingHorizontal: 8,
    width: "100%",
    alignSelf: "center",
    marginTop: 10,
    height: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 6,
    height: 50,
  },

  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 1,
  },
});

export default WorkStatus;
