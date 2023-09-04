import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

import Colors from "../../../constant/Colors";
import ButtonComp from "../../../components/ButtonComp";
import EnvVariables from "../../../constant/EnvVariables";
import Splash from "../../../components/Splash";

const data = [
  { label: "New Inquiry", value: "1" },
  { label: "Installation", value: "2" },
  // { label: "Agents", value: "3" },
  // { label: "Manufacturing Units", value: "4" },
];

const CreateSchedule = (props) => {
  const [value, setValue] = useState(null);
  const [label, setLabel] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [date, setDate] = useState('');
  const [show, setShow] = useState(false);
  const [time, setTime] = useState("");
  const [showTime, setShowTime] = useState(false);
  const [endTimes, setEndTimes] = useState("");
  const [showTimeEnds, setShowTimeEnds] = useState(false);
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [consultation, setConsultation] = useState("");
  const [id, setId] = useState(undefined);
  const [valueRequest, setValueRequest] = useState(null);
  const [labelRequest, setLabelRequest] = useState(null);
  const [isFocusRequest, setIsFocusRequest] = useState(false);
  const [apiLoader, setApiLoader]=useState(true);
  const [dataload, setDataLoaded]=useState(false)

  // let endDate = new Date();

  // const onChange = (event, date) => {
  //   if (date != null) {
  //     let dt = new Date(date);
  //     let year = dt.getFullYear();
  //     let monthNum = dt.getMonth() + 1;
  //     //let monthAlpha = Months[monthNum];
  //     //let modifiedDate = dt.getDate() + " " + monthAlpha + " " + year;
  //     let modifiedDate = dt.getDate() + "-" + monthNum + "-" + year;
  //     //let modifiedDate = dt.getDate() + "-" + dt.getMonth() + "-" + dt.setMonth();
  //     endDate = date;
  //     setDate(modifiedDate);
  //     setShow(false);
  //   }
  // };

  // let endTime = new Date();
  // let endTimeVisit = new Date();

  // const onChangeTime = (event, time) => {
  //   if (time != null) {
  //     console.log('time='+time)
  //     let tm = new Date(time);
  //     let hours = tm.getHours();
  //     let minutes = tm.getMinutes();
  //     let modifiedTime = hours + ":" + minutes;
  //     endTime = time;
  //     setTime(modifiedTime);
  //     //setShowTime(false);
  //   }
  // };

  // const onChangeTimeEnds = (event, endTimes) => {
  //   if (endTimes != null) {
  //     let tm = new Date(endTimes);
  //     let hours = tm.getHours();
  //     let minutes = tm.getMinutes();
  //     let modifiedTime = hours + ":" + minutes;
  //     endTimeVisit = endTimes;
  //     setEndTimes(modifiedTime);
  //     //setShowTimeEnds(false);
  //   }
  // };

  const [abc, setAbc] = useState(undefined);

  const [timePickerShow, setTimePickerShow]=useState(false);
  const [dateObj, setDateObj]=useState(new Date());
  const [STV, setSTV]=useState('')


  const [timePickerEndShow, setTimePickerEndShow]=useState(false);
  const [dateEndObj, setDateEndObj]=useState(new Date());
  const [ETV, setETV]=useState('')

  const [datePickerShow, setDatePickerShow]=useState(false);
  const [dateAObj, setDateAObj]=useState(new Date());
  const [datePicker, setDatePicker]=useState('')


  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    // setSTV(strTime)
    return strTime;
  }

  const getDetails=async()=>{
    setId(await AsyncStorage.getItem("user_id"));
  }

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dateAObj;
    if (selectedDate !== undefined) {
      setDateAObj(currentDate);
    }
  };

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || dateObj;
    if (selectedTime !== undefined) {
      setDateObj(currentTime);
    }
  };

  const onChangeEnd = (event, selectedTime) => {
    const currentTime = selectedTime || dateEndObj;
    if (selectedTime !== undefined) {
      setDateEndObj(currentTime);
    }
  };

  const showDatePicker = () => {
    setDatePickerShow(true);
  };

  const showTimePicker = () => {
    setTimePickerShow(true);
  };

  const showTimeEndPicker=()=>{
    setTimePickerEndShow(true)
  }

  let formattedDate = 'DD-MM-YYYY';
  if (dateAObj !== new Date()) {
    const day = dateAObj.getDate();
    const month = dateAObj.getMonth() + 1;
    const year = dateAObj.getFullYear();
    formattedDate = `${day < 10 ? `0${day}` : day}-${
      month < 10 ? `0${month}` : month
    }-${year}`;
  }

  let formattedTime = 'hh:mm';
  if (dateObj !== new Date()) {
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    if (hours === 0) {
      formattedTime = `12:${minutes < 10 ? `0${minutes}` : minutes} am`;
    } else if (hours < 12) {
      formattedTime = `${hours}:${minutes < 10 ? `0${minutes}` : minutes} am`;
    } else if (hours === 12) {
      formattedTime = `12:${minutes < 10 ? `0${minutes}` : minutes} pm`;
    } else {
      formattedTime = `${hours - 12}:${minutes < 10 ? `0${minutes}` : minutes} pm`;
    }
  }

  let formattedTimeEnd = 'hh:mm';
  if (dateEndObj !== new Date()) {
    const hours = dateEndObj.getHours();
    const minutes = dateEndObj.getMinutes();

    if (hours === 0) {
      formattedTimeEnd = `12:${minutes < 10 ? `0${minutes}` : minutes} am`;
    } else if (hours < 12) {
      formattedTimeEnd = `${hours}:${minutes < 10 ? `0${minutes}` : minutes} am`;
    } else if (hours === 12) {
      formattedTimeEnd = `12:${minutes < 10 ? `0${minutes}` : minutes} pm`;
    } else {
      formattedTimeEnd = `${hours - 12}:${minutes < 10 ? `0${minutes}` : minutes} pm`;
    }
  }

  useEffect(() => {
    if(dataload==false){
      getDetails()
      setApiLoader(true)
      let webApiUrl =
        EnvVariables.API_HOST + `APIs/ViewAllServices/ViewAllServices.php`;
      axios.get(webApiUrl).then((res) => {
        console.log("response in create schedule=" + JSON.stringify(res.data));
        setAbc(res.data.OutPut);
        setDataLoaded(true);
        setApiLoader(false)
      });
    }
  }, [id, getDetails]);
  console.log("id in create=" + id);

  const createSchedule = async () => {
    if(Platform.OS=='android'){
      if(label!=null && labelRequest!=null && datePicker!="" && STV!="" && ETV!="" && contact!="" && address!="" && consultation!=""){
        setApiLoader(true)
        console.log("id in create=" + id);
        const data = new FormData();
        data.append("order_request", label);
        data.append("date_of_visit", datePicker);
        data.append("S_T_V", STV);
        data.append("E_T_V", ETV);
        data.append("contact_no", contact);
        data.append("visit_address", address);
        data.append("loggedIn_user_id", id);
        data.append("schedule_type", labelRequest);
        data.append("Consultation", consultation);

        let webApiUrl =
          EnvVariables.API_HOST + `APIs/CreateSchedule/CreateSchedule.php`;
          console.log('webapi url in screate schedule='+webApiUrl)
        let res = await fetch(webApiUrl, {
          method: "post",
          body: data,
        });
        let responseJson = await res.json();
        console.log("response json=" + JSON.stringify(responseJson));
        if (responseJson.status == true) {
          setApiLoader(false)
          Alert.alert("", "Schedule Added Successfully", [
            {
              text: "Ok",
              style: "cancel",
              onPress: () => {
                setDate("");
                setTime("");
                setEndTimes("");
                setContact("")
                setAddress("");
                setConsultation("")
                props.navigation.navigate("Home ")
              },
            },
          ]);
        }
      } else {
        Alert.alert('','Kindly fill all the fields')
      }
    }
    else {
      console.log('stv=='+moment(dateObj).format('hh:mm a'))
      if(label!=null && labelRequest!=null && contact!="" && address!="" && consultation!=""){
        setApiLoader(true)
        console.log("id in create=" + id);
        const data = new FormData();
        data.append("order_request", label);
        data.append("date_of_visit", moment(dateAObj).format('DD-MM-YYYY'));
        data.append("S_T_V", moment(dateObj).format('hh:mm a'));
        data.append("E_T_V", moment(dateEndObj).format('hh:mm a'));
        data.append("contact_no", contact);
        data.append("visit_address", address);
        data.append("loggedIn_user_id", id);
        data.append("schedule_type", labelRequest);
        data.append("Consultation", consultation);

        let webApiUrl =
          EnvVariables.API_HOST + `APIs/CreateSchedule/CreateSchedule.php`;
          console.log('webapi url in screate schedule='+webApiUrl)
        let res = await fetch(webApiUrl, {
          method: "post",
          body: data,
        });
        let responseJson = await res.json();
        console.log("response json=" + JSON.stringify(responseJson));
        if (responseJson.status == true) {
          setApiLoader(false)
          Alert.alert("", "Schedule Added Successfully", [
            {
              text: "Ok",
              style: "cancel",
              onPress: () => {
                setDate("");
                setTime("");
                setEndTimes("");
                setContact("")
                setAddress("");
                setConsultation("")
                props.navigation.navigate("Home ")
              },
            },
          ]);
        }
      } else {
        Alert.alert('','Kindly fill all the fields')
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding" } style={{flex:1}}>
    <View style={{ flex: 1, 
    //backgroundColor: Colors.backgroundColor
    backgroundColor:'#c9d1fb'
     }}>
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 20, marginHorizontal: 10 }}>
          <Text
            style={{ fontWeight: "500", fontSize: 20, textAlign: "center", color:'white' }}
          >
            Enter Details
          </Text>
          {/* Enter details from start */}
          <View style={{ backgroundColor: "white", marginTop: 15,marginBottom:20, borderRadius:8,shadowOffset:{height:6, width:6}, shadowOpacity:0.5, shadowRadius:8, shadowColor:'black' }}>
            {/* View for components starts */}
            <View
              style={{ marginTop: 10, marginHorizontal: 10, marginBottom: 15 }}
            >
              <View>
                <Text style={{ fontWeight: "500", fontSize:12, opacity:0.5 }}>Select Request Type</Text>
                <Dropdown
                  style={[
                    styles.dropdown,
                    { marginTop: 5,  },
                    isFocusRequest && { borderColor: "black" },
                  ]}
                  containerStyle={{top:Platform.OS=='android'&& -30}}
                  placeholderStyle={{ fontSize: 16 }}
                  selectedTextStyle={{...styles.selectedTextStyle, fontSize:16}}
                  iconStyle={styles.iconStyle}
                  data={data}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocusRequest ? "Select Request Type" : "..."}
                  value={valueRequest}
                  onFocus={() => setIsFocusRequest(true)}
                  onBlur={() => setIsFocusRequest(false)}
                  onChange={(item) => {
                    setValueRequest(item.value);
                    setLabelRequest(item.label);
                    setIsFocusRequest(false);
                  }}
                />
              </View>
              {/* Model type starts */}
              {labelRequest == "New Inquiry" && (
                <View>
                  <Text style={{ fontWeight: "500", fontSize:12,opacity:0.5, marginTop:20 }}>Select Service Type</Text>
                  <Dropdown
                    style={[
                      styles.dropdown,
                      { marginTop: 5 },
                      isFocus && { borderColor: "black" },
                    ]}
                    containerStyle={{top:Platform.OS=='android'&& -30}}
                    placeholderStyle={{ fontSize: 16 }}
                    selectedTextStyle={{...styles.selectedTextStyle, fontSize:16}}
                    iconStyle={styles.iconStyle}
                    data={abc}
                    labelField="service_title"
                    valueField="services_id"
                    placeholder={!isFocus ? "Select Service Type" : "..."}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(item) => {
                      setValue(item.services_id);
                      setLabel(item.service_title);
                      setIsFocus(false);
                    }}
                  />
                </View>
              )}

              {/* Model type ends */}

              {/* Date of visit starts */}

              <View style={{marginTop:20}}>
                <Text style={{ fontWeight: "500", fontSize:12,opacity:0.5 }}>Date Of Visit</Text>
                  <View style={styles.dateView}>
                    {Platform.OS=='android' && <View>{datePicker==''?(<TouchableOpacity onPress={()=>{setDatePickerShow(true)}}><Text style={{ marginLeft: 10, fontSize:16 }}>Pick Date</Text></TouchableOpacity>):
                    (<TouchableOpacity onPress={()=>{setDatePickerShow(true)}}><Text style={{ marginLeft: 10, fontSize:16 }}>{datePicker}</Text></TouchableOpacity>)}
                    </View>}
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


              {/* <View style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: "500", fontSize:12,opacity:0.5 }}>Date Of Visit</Text>

                <View style={styles.dateView}>
                  {date == "" ? (
                    <TouchableOpacity onPress={() => setShow(true)}>
                      <Text style={{ marginLeft: 10 }}>Pick Date</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setShow(true)}>
                      <Text style={{ marginLeft: 10 }}>{date}</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {show && (
                  <RNDateTimePicker
                    value={endDate}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    minimumDate={new Date(Date.now())}
                  />
                )}
              </View> */}
              {/* Date of Visit ends */}

              {/* {this.state.datePickerShow  &&
                (<RNDateTimePicker value={new Date(this.state.dateObj)} onChange={async(event, date) => {await this.setState({datePickerShow: false}); this.setState({harvestDate: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(), dateObj: date.toLocaleDateString()}) }} maximumDate={new Date()} minimumDate={new Date(this.state.STV)} />)
                } */}

                <View style={{marginTop:20}}>
                <Text style={{ fontWeight: "500", fontSize:12,opacity:0.5 }}>Time Of Visit</Text>
                  <View style={styles.dateView}>
                  {Platform.OS=='android' && <View>{STV==''?(<TouchableOpacity onPress={()=>{setTimePickerShow(true)}}><Text style={{ marginLeft: 10, fontSize:16 }}>Pick Time</Text></TouchableOpacity>):(<TouchableOpacity onPress={()=>{setTimePickerShow(true)}}><Text style={{ marginLeft: 10, fontSize:16 }}>{STV}</Text></TouchableOpacity>)}</View>}
                  
                  {Platform.OS=='ios' && (
                    <TouchableOpacity
                      onPress={()=>{setTimePickerShow(true)}}
                      // style={styles.transportNumberStyle}
                    >
                      <Text style={{paddingLeft:10}}>{showTimePicker ? formattedTime : 'hh:mm'}</Text>
                    </TouchableOpacity>
                  )}
                  </View>
                 
                </View>
                {Platform.OS=='android' && timePickerShow && (
                  <RNDateTimePicker mode="time"
                    value={dateObj} 
                    onChange={(event, date)=>{setTimePickerShow(false); setSTV((value)=>{
                      var hours = date.getHours();
                      var minutes = date.getMinutes();
                      var ampm = hours >= 12 ? 'pm' : 'am';
                      hours = hours % 12;
                      hours = hours ? hours : 12; // the hour '0' should be '12'
                      minutes = minutes < 10 ? '0'+minutes : minutes;
                      var strTime = hours + ':' + minutes + ' ' + ampm;
                      // setSTV(strTime)
                      return strTime;
                    })}}
                  />
                )}

                {Platform.OS=='ios' && timePickerShow && (
                  <RNDateTimePicker
                    value={dateObj}
                    mode="time"
                    is24Hour={false}
                    display="default"
                    onChange={onChange}
                  />
                )}

                {/* <View><Text>{STV}</Text></View> */}
                {/* <View><Text>{dateObj}</Text></View> */}

              {/* Time starts */}
              {/* <View style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: "500",fontSize:12,opacity:0.5 }}>Time Of Visit</Text>
                <View style={styles.dateView}>
                  {time == "" ? (
                    <TouchableOpacity onPress={() => {setShowTime(true);setShowTimeEnds(false)}}>
                      <Text style={{ marginLeft: 10, fontSize:16 }}>Pick Time</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => {setShowTime(true);setShowTimeEnds(false)}}>
                      <Text style={{ marginLeft: 10 }}>{time} Hrs</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {showTime && (
                  <RNDateTimePicker
                    value={endTime}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeTime}
                    minimumDate={new Date(Date.now())}
                  />
                )}
              </View> */}
              {/* Time ends */}

              {/* End time starts */}
              <View style={{marginTop:20}}>
                <Text style={{ fontWeight: "500", fontSize:12,opacity:0.5 }}>End Time Of Visit</Text>
                  <View style={styles.dateView}>
                  {Platform.OS=='android' && <View>{ETV==''?(<TouchableOpacity onPress={()=>{setTimePickerEndShow(true)}}><Text style={{ marginLeft: 10, fontSize:16 }}>Pick Time</Text></TouchableOpacity>):(<TouchableOpacity onPress={()=>{setTimePickerEndShow(true)}}><Text style={{ marginLeft: 10, fontSize:16 }}>{ETV}</Text></TouchableOpacity>)}</View>}
                  
                  {Platform.OS=='ios' && (
                    <TouchableOpacity
                      onPress={()=>{setTimePickerEndShow(true)}}
                      // style={styles.transportNumberStyle}
                    >
                      <Text style={{paddingLeft:10}}>{showTimeEndPicker ? formattedTimeEnd : 'hh:mm'}</Text>
                    </TouchableOpacity>
                  )}
                  </View>
                 
                </View>
                {Platform.OS=='android' && timePickerEndShow && (
                  <RNDateTimePicker mode="time"
                    value={dateEndObj} 
                    onChange={(event, date)=>{setTimePickerEndShow(false); setETV((value)=>{
                      var hours = date.getHours();
                      var minutes = date.getMinutes();
                      var ampm = hours >= 12 ? 'pm' : 'am';
                      hours = hours % 12;
                      hours = hours ? hours : 12; // the hour '0' should be '12'
                      minutes = minutes < 10 ? '0'+minutes : minutes;
                      var strTime = hours + ':' + minutes + ' ' + ampm;
                      // setSTV(strTime)
                      return strTime;
                    })}}
                  />
                )}
                {Platform.OS=='ios' && timePickerEndShow && (
                  <RNDateTimePicker
                    value={dateEndObj}
                    mode="time"
                    is24Hour={false}
                    display="default"
                    onChange={onChangeEnd}
                  />
                )}
              {/* <View style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: "500",fontSize:12,opacity:0.5 }}>End Time Of Visit</Text>
                <View style={styles.dateView}>
                  {endTimes == "" ? (
                    <TouchableOpacity onPress={() => {setShowTimeEnds(true);setShowTime(false)}}>
                      <Text style={{ marginLeft: 10, fontSize:16 }}>Pick Time</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => {setShowTimeEnds(true);setShowTime(false)}}>
                      <Text style={{ marginLeft: 10 }}>{endTimes} Hrs</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {showTimeEnds && (
                  <RNDateTimePicker
                    value={endTimeVisit}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeTimeEnds}
                  />
                )}
              </View> */}
              {/* End time ends */}

              {/* Contact starts */}
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: "500",fontSize:12,opacity:0.5 }}>Contact No.</Text>
                <TextInput
                  style={{ ...styles.dropdown, borderWidth: 0, paddingHorizontal:0 }}
                  activeOutlineColor="gray"
                  mode="outlined"
                  value={contact}
                  keyboardType='phone-pad'
                  onChangeText={(value) => {setContact(value);setShowTimeEnds(false)}}
                />
              </View>
              {/* contact ends */}

              {/* Address starts */}
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: "500",fontSize:12,opacity:0.5 }}>Visiting Address</Text>
                <TextInput
                  style={{ ...styles.dropdown, borderWidth: 0, height: 80, paddingHorizontal:0 }}
                  activeOutlineColor="gray"
                  mode="outlined"
                  value={address}
                  onChangeText={(value) => setAddress(value)}
                />
              </View>
              {/* Address ends */}
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: "500",fontSize:12,opacity:0.5 }}>Description</Text>
                <TextInput
                  style={{ ...styles.dropdown, borderWidth: 0, height: 80,paddingHorizontal:0 }}
                  activeOutlineColor="gray"
                  mode="outlined"
                  value={consultation}
                  onChangeText={(value) => setConsultation(value)}
                />
              </View>

              <View style={{ marginHorizontal: 80, marginTop: 30 }}>
                <ButtonComp title={"Submit"} onPress={createSchedule} />
              </View>
            </View>
            {/* View for components ends */}
          </View>
          {/* Form ends */}
        </View>
      </ScrollView>)}
      </ImageBackground>
    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderColor: "gray",
    paddingHorizontal: 8,
    width: "100%",
    //alignSelf: "center",
    //marginTop: 10,
    height: 40,
    borderWidth: 0.5,
    borderRadius: 8,
    backgroundColor: "white",
  },

  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  dateView: {
    borderWidth: 0.5,
    height: 40,
    borderRadius: 8,
    marginTop: 5,
    justifyContent: "center",
  },
  datePicker: {
    width: 320,
    height: 260,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 1,
  },
});

export default CreateSchedule;