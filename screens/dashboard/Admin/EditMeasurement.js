import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert, ImageBackground,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import axios from "axios";
import { RadioButton, TextInput } from "react-native-paper";
import RadioButtonRN from "radio-buttons-react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Dropdown } from "react-native-element-dropdown";

import Colors from "../../../constant/Colors";
import ButtonComp from "../../../components/ButtonComp";
import EnvVariables from "../../../constant/EnvVariables";

const data2 = [
  { label: "1/2", value: "0.5" },
  { label: "1/4", value: "0.25" },
  { label: "3/4", value: "0.75" },
  { label: "2/3", value: "0.67" },
  { label: "2/4", value: "0.5" },
];

  const data3 = [
    { label: "Motorised", value: "Motorised" },
    { label: "Regular", value: "Regular" },
  ];

  const data4 = [
    { label: "White", value: "White" },
    { label: "Grey", value: "Grey" },
    { label: "Green", value: "Green" }
  ];

const EditMeasurement = (props) => {

  console.log('props='+JSON.stringify(props))

  
  const measurementDetails=props.route.params.measurementDetails;
  var order_id = props.route.params.order_id;
  var mid=props.route.params.mid
  console.log('order_id='+order_id)
  console.log('mid='+mid)
  console.log('measurementDetails='+JSON.stringify(measurementDetails))

  const setValues=()=>{
    setProduct(measurementDetails.product)
    setStyle(measurementDetails.style)
    setColor(measurementDetails.color)
    setLocation(measurementDetails.location)
    setQuantity(measurementDetails.quantity)
    setWidth(measurementDetails.width)
    setHeight(measurementDetails.height)
    setValueWidth(measurementDetails.width2)
    setValueHeight(measurementDetails.height2)
    // setLabelWidth(measurementDetails.width2)
    // setLabelHeight(measurementDetails.height2)
    setMounting(measurementDetails.mounting)
    setBaseBoards(measurementDetails.baseboards)
    setSide_channel(measurementDetails.side_channel)
    setSide_channel_color(measurementDetails.side_channel_color)
    setBottom_channel(measurementDetails.bottom_channel)
    setBottom_channel_color(measurementDetails.bottom_channel_color)
    setBottom_rail(measurementDetails.bottom_rail)
    setBottom_rail_color(measurementDetails.bottom_rail_color)
    setValance(measurementDetails.valance)
    setValance_color(measurementDetails.valance_color)
    setWork_extra(measurementDetails.work_extra)
    setRemarks(measurementDetails.remarks)
    setControl(measurementDetails.control_right)
    setControl(measurementDetails.control_left)
    setCord(measurementDetails.cord_details)
    setSelected(measurementDetails.measurement_type)
    setValueLift(measurementDetails.lifting_systems)
    setValueFrameColor(measurementDetails.frame_color)
  }

  useEffect(()=>{
    setValues()
    console.log('inside use effect of edit measurement')
    console.log('measurement details='+JSON.stringify(measurementDetails))
    measurementDetails
  },[measurementDetails])

  const [selected, setSelected] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [labelWidth, setLabelWidth] = useState(null);
  const [valueWidth, setValueWidth]=useState(null)
  const [isFocusWidth, setIsFocusWidth] = useState(false);
  const [labelHeight, setLabelHeight] = useState(null);
  const [valueHeight, setValueHeight]=useState(null)
  const [isFocusHeight, setIsFocusHeight] = useState(false);

  const [product, setProduct] = useState('');
  const [style, setStyle] = useState('');
  const [color, setColor] = useState('');
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [cord, setCord] = useState("");
  const [control ,setControl] = useState("");
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [mounting, setMounting] = useState('');
  const [baseboards, setBaseBoards] = useState('');
  const [side_channel, setSide_channel] = useState('');
  const [side_channel_color, setSide_channel_color] = useState('');
  const [bottom_channel, setBottom_channel] = useState('');
  const [bottom_channel_color, setBottom_channel_color] = useState('');
  const [bottom_rail, setBottom_rail] = useState('');
  const [bottom_rail_color, setBottom_rail_color] = useState('');
  const [valance, setValance] = useState();
  const [valance_color, setValance_color] = useState('');
  const [work_extra, setWork_extra] = useState('');
  const [remarks, setRemarks] = useState('');
  const [controlRight, setControlRight]=useState('')
  const [controlLeft, setControlLeft]=useState('')

  const [isFocusLift, setIsFocusLift] = useState(false);
  const [isFocusFrameColor, setIsFocusFrameColor] = useState(false);

  const [labelLift, setLabelLift] = useState(null);
  const [valueLift, setValueLift]=useState(null)

  const [labelFrameColor, setLabelFrameColor] = useState(null);
  const [valueFrameColor, setValueFrameColor]=useState(null);

  const [isProductEmpty, setIsProductEmpty] = useState(false);
  const [isLocationEmpty, setIsLocationEmpty] = useState(false);
  const [isQuantityEmpty, setIsQuantityEmpty] = useState(false);
  const [isCordEmpty, setIsCordEmpty] = useState(false);
  const [isWidthEmpty, setIsWidthEmpty] = useState(false);
  const [isHeightEmpty, setIsHeightEmpty] = useState(false);


  let today = new Date().toISOString().slice(0, 10);

  const data = [
    {
      label: "CM",
      accessibilityLabel: "Your label",
    },
    {
      label: "Inches",
      accessibilityLabel: "Your label",
    },
    {
      label: "Meter",
      accessibilityLabel: "Your label",
    },
  ];

  const data_control = [
    {
      label: "Left",
      accessibilityLabel: "Your label",
    },
    {
      label: "Right",
      accessibilityLabel: "Your label",
    }
  ];


  const inputs = [];

    inputs.push(
      <View style={styles.individualBoxView}>
        <Text style={{ fontWeight: "600" }}>Choose Conversion:</Text>
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <RadioButtonRN
            boxStyle={{ width: "30%" }}
            style={{ flexDirection: "row" }}
            textStyle={{ marginLeft: 10 }}
            data={data}
            box={false}
            animationTypes={["zoomIn"]}
            activeColor="black"
            boxActiveBgColor="black"
            deactiveColor="lightgray"
            initial={selected=="Inches"?2:selected=="CM"?1:3}
            value={selected}
            selectedBtn={(e)=>{setSelected(e.label)}}
          />
        </View>
        {/* <TextInput
          mode="outlined"
          value={product}
          onChangeText={(value) => setProduct(value)}
          style={styles.textInputStyle}
          label="Enter Product Name"
        /> */}
        <TextInput
          mode="outlined"
          value={product}
          onChangeText={(value) => {
            setProduct(value);
            setIsProductEmpty(value.trim() === '');
          }}
          onBlur={() => setIsProductEmpty(product.trim() === '')}
          style={[styles.textInputStyle]}
          label="Enter Product Name*"
          error={isProductEmpty}
        />

        {/* <TextInput
          mode="outlined"
          onChangeText={(value) => setLocation(value)}
          value={location}
          style={styles.textInputStyle}
          label="Enter Location"
        /> */}
        <TextInput
          mode="outlined"
          value={location}
          onChangeText={(value) => {
            setLocation(value);
            setIsLocationEmpty(value.trim() === '');
          }}
          onBlur={() => setIsLocationEmpty(location.trim() === '')}
          style={[styles.textInputStyle]}
          label="Enter Location*"
          error={isLocationEmpty}
        />


        {/* <TextInput
          mode="outlined"
          onChangeText={(value) => setQuantity(value)}
          value={quantity}
          style={styles.textInputStyle}
          label="Enter Quantity*"
        /> */}
         <TextInput
            mode="outlined"
            value={quantity}
            onChangeText={(value) => {
              setQuantity(value);
              setIsQuantityEmpty(value.trim() === '');
            }}
            onBlur={() => setIsQuantityEmpty(quantity.trim() === '')}
            style={[styles.textInputStyle,]}
            label="Enter Quantity*"
            error={isQuantityEmpty}
          />

<View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* <TextInput
            mode="outlined"
            onChangeText={(value) => setWidth(value)}
            value={width}
            style={styles.flexDirectionText}
            keyboardType="number-pad"
            //style={styles.textInputStyle}
            label="Enter Width*"
          /> */}
           <TextInput
              mode="outlined"
              value={width}
              onChangeText={(value) => {
                setWidth(value);
                setIsWidthEmpty(value.trim() === '');
              }}
              onBlur={() => setIsWidthEmpty(width.trim() === '')}
              style={[styles.flexDirectionText]}
              keyboardType="number-pad"
              label="Enter Width*"
              error={isWidthEmpty}
            />

          <Icon name="add-sharp" size={30} style={{ alignSelf: "center" }} />
          <Dropdown
            style={[styles.dropdown1, isFocusWidth && { borderColor: "black" }]}
            containerStyle={{top:Platform.OS=='android'&& -30}}
            placeholderStyle={{ fontSize: 16 }}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={data2}
            labelField="label"
            valueField="value"
            placeholder={!isFocusWidth ? "Enter Width" : "..."}
            value={valueWidth}
            onFocus={() => setIsFocusWidth(true)}
            onBlur={() => setIsFocusWidth(false)}
            onChange={(item) => {
              if(item.value==valueWidth){
                setValueWidth(null)
                setLabelWidth(null)
                setIsFocusWidth(false);
              }else {
                setValueWidth(item.value)
                setLabelWidth(item.label)
                setIsFocusWidth(false);
              }
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* <TextInput
            mode="outlined"
            onChangeText={(value) => setHeight(value)}
            value={height}
            style={styles.flexDirectionText}
            keyboardType="number-pad"
            label="Enter Height"
          /> */}
          <TextInput
            mode="outlined"
            value={height}
            onChangeText={(value) => {
              setHeight(value);
              setIsHeightEmpty(value.trim() === '');
            }}
            onBlur={() => setIsHeightEmpty(height.trim() === '')}
            style={[styles.flexDirectionText]}
            keyboardType="number-pad"
            label="Enter Height*"
            error={isHeightEmpty}
          />
          <Icon name="add-sharp" size={30} style={{ alignSelf: "center" }} />
          <Dropdown
            style={[styles.dropdown1, isFocus && { borderColor: "black" }]}
            containerStyle={{top:Platform.OS=='android'&& -30}}
            placeholderStyle={{ fontSize: 16 }}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={data2}
            labelField="label"
            valueField="value"
            placeholder={!isFocusHeight ? "Enter Height" : "..."}
            value={valueHeight}
            onFocus={() => setIsFocusHeight(true)}
            onBlur={() => setIsFocusHeight(false)}
            onChange={(item) => {
              if(item.value==valueHeight){
                setValueHeight(null)
                setLabelHeight(null)
                setIsFocusHeight(false);
              }else {
                setValueHeight(item.value)
                setLabelHeight(item.label)
                setIsFocusHeight(false);
              }
            }}
          />
        </View>

        {/* <TextInput
          mode="outlined"
          onChangeText={(value) => setCord(value)}
          value={cord}
          keyboardType={"default"}
          style={styles.textInputStyle}
          label="Enter Cord*"
        /> */}
        <TextInput
          mode="outlined"
          value={cord}
          onChangeText={(value) => {
            setCord(value);
            setIsCordEmpty(value.trim() === '');
          }}
          onBlur={() => setIsCordEmpty(cord.trim() === '')}
          style={[styles.textInputStyle]}
          keyboardType="default"
          label="Enter Cord*"
          error={isCordEmpty}
        />

        {/* <View>
          <Dropdown
            style={[styles.dropdown1, isFocusLift && { borderColor: "black" }, {width:'100%'}]}
            placeholderStyle={{ fontSize: 16 }}
            containerStyle={{top:Platform.OS=='android'&& -40}}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={data3}
            labelField="label"
            valueField="value"
            placeholder={!isFocusLift ? "Lifting Systems" : "..."}
            value={valueLift}
            onFocus={() => setIsFocusLift(true)}
            onBlur={() => setIsFocusLift(false)}
            onChange={(item) => {
              if(item.value==valueLift){
                setValueLift(null)
                setLabelLift(null)
                setIsFocusLift(false);
              }else {
                setValueLift(item.value)
                setLabelLift(item.label)
                setIsFocusLift(false);
              }
            }}
          />
           <Dropdown
            style={[styles.dropdown1, isFocusFrameColor && { borderColor: "black" }, {width:'100%'}]}
            containerStyle={{top:Platform.OS=='android'&& -30}}
            placeholderStyle={{ fontSize: 16 }}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={data4}
            labelField="label"
            valueField="value"
            placeholder={!isFocusFrameColor ? "Frame Color" : "..."}
            onFocus={() => setIsFocusFrameColor(true)}
            onBlur={() => setIsFocusFrameColor(false)}
            value={valueFrameColor}
            onChange={(item) => {
              if(item.value==valueFrameColor){
                setValueFrameColor(null)
                setLabelFrameColor(null)
                setIsFocusFrameColor(false);
              }else {
                setValueFrameColor(item.value)
                setLabelFrameColor(item.label)
                setIsFocusFrameColor(false);
              }
            }}
          />
        </View>

        <View style={styles.controlView}>
          <Text style={{ alignSelf: "center" }}>Control</Text>
    
          <View style={{ marginLeft:20,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <RadioButtonRN
                boxStyle={{ width: "40%" }}
                style={{ flexDirection: "row" }}
                textStyle={{ marginLeft: 10 }}
                data={data_control}
                box={false}
                animationTypes={["zoomIn"]}
                activeColor="black"
            boxActiveBgColor="black"
            deactiveColor="lightgray"
                value={control}
                selectedBtn={(e) => setControl(e.label)}
              />
        </View>
        </View>

        <TextInput
          mode="outlined"
          onChangeText={(value) => setStyle(value)}
          value={style}
          style={styles.textInputStyle}
          label="Enter Style Name"
        />
        <TextInput
          mode="outlined"
          onChangeText={(value) => setColor(value)}
          value={color}
          style={styles.textInputStyle}
          label="Enter Color"
        />

        <TextInput
          mode="outlined"
          onChangeText={(value) => setMounting(value)}
          value={mounting}
          style={styles.textInputStyle}
          label="Enter Mounting Name"
        />

        <TextInput
          mode="outlined"
          onChangeText={(value) => setBaseBoards(value)}
          value={baseboards}
          style={styles.textInputStyle}
          label="Enter Baseboard Name"
        />

        <TextInput
          mode="outlined"
          onChangeText={(value) => setSide_channel(value)}
          value={side_channel}
          style={styles.textInputStyle}
          label="Enter Side Channel Name"
        />
        <TextInput
          mode="outlined"
          onChangeText={(value) => setSide_channel_color(value)}
          value={side_channel_color}
          style={styles.textInputStyle}
          label="Enter Side Channel Color"
        />
        <TextInput
          mode="outlined"
          onChangeText={(value) => setBottom_channel(value)}
          value={bottom_channel}
          style={styles.textInputStyle}
          label="Enter Bottom Channel"
        />
        <TextInput
          mode="outlined"
          onChangeText={(value) => setBottom_channel_color(value)}
          value={bottom_channel_color}
          style={styles.textInputStyle}
          label="Enter Bottom Channel Color"
        />
        <TextInput
          mode="outlined"
          onChangeText={(value) => setBottom_rail(value)}
          value={bottom_rail}
          style={styles.textInputStyle}
          label="Enter Bottom Rail"
        />
        <TextInput
          mode="outlined"
          onChangeText={(value) => setBottom_channel_color(value)}
          value={bottom_rail_color}
          style={styles.textInputStyle}
          label="Enter Bottom Rail Color"
        />
        <TextInput
          mode="outlined"
          onChangeText={(value) => setValance(value)}
          value={valance}
          style={styles.textInputStyle}
          label="Enter Valance"
        />
        <TextInput
          mode="outlined"
          onChangeText={(value) => setValance_color(value)}
          value={valance_color}
          style={styles.textInputStyle}
          label="Enter Valance Color"
        /> */}
        <TextInput
          mode="outlined"
          onChangeText={(value) => setWork_extra(value)}
          value={work_extra}
          style={styles.textInputStyle}
          label="Extra Work"
        />
        <TextInput
          mode="outlined"
          onChangeText={(value) => setRemarks(value)}
          value={remarks}
          style={styles.textInputStyle}
          label="Remarks"
        />

      </View>
    );
  // }

  const onSubmit=async()=>{
    if(selected.length==0 || product.length==0 || location.length==0 || quantity.length==0 || width.length==0 || height.length==0 || cord.length==0){
      Alert.alert('', 'Kindly enter all important fields')
      return
    } else {
    let webapiurl=EnvVariables.API_HOST +`APIs/EditMeasurement/EditMeasurement.php`
    const data=new FormData();
    data.append("order_request_id",order_id)
    data.append("measurement_id",mid)
    data.append("product", product)
    data.append("Measurement_type", selected)
    data.append("style", style)
    data.append("color", color)
    data.append("location", location)
    data.append("quantity",quantity)
    data.append("width", width)
    data.append("width2", valueWidth)
    data.append("height", height)
    data.append("height2", valueHeight)
    data.append("cord_details", cord)
    data.append("lifting_systems", valueLift)
    data.append("frame_color", valueFrameColor)
    data.append("mounting", mounting)
    data.append("control_left", controlLeft)
    data.append("control_right", controlRight)
    data.append("baseboards", baseboards)
    data.append("side_channel", side_channel)
    data.append("side_channel_color", side_channel_color)
    data.append("bottom_channel", bottom_channel)
    data.append("bottom_channel_color", bottom_channel_color)
    data.append("bottom_rail", bottom_rail)
    data.append("bottom_rail_color", bottom_rail_color)
    data.append("valance", valance)
    data.append("valance_color", valance_color)
    data.append("work_extra", work_extra)
    data.append("remarks", remarks)

    console.log('data form data='+JSON.stringify(data))

    let response=await fetch(webapiurl,{
          method: "post",
          body: data,
          headers: {
            Accept: "*/*",
            "Content-Type": "multipart/form-data",
          },
    })
    let responseJSON = await response.json();
    console.log('response in edit measurement='+JSON.stringify(responseJSON))
    if(responseJSON.status==true){
      Alert.alert('',"Measurement Updated Successfully",[{text:'Ok', style:'cancel',onPress:()=>props.navigation.navigate('ViewJobs')}])
    } else {
      Alert.alert('',"Please Try Again!",[{text:'Ok', style:'cancel'}])
    }
  }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex:1}}>
    <View style={{ flex: 1, backgroundColor: '#c9d1fb' }}>
      <ImageBackground
        source={require("./../../../assets/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 20, marginHorizontal: 10 }}>
          {inputs}
          <View style={{ width: "80%", alignSelf: "center", marginBottom:20 }}>
            <ButtonComp
              title={"Submit"}
              onPress={onSubmit}
            />
          </View>
        </View>
      </ScrollView>
      </ImageBackground>
    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  individualBoxView: {
    backgroundColor: 'white',
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    paddingTop: 10,
    shadowOffset:{height:6, width:6}, shadowOpacity:0.2, shadowRadius:4, shadowColor:'black'
    //height: "100%",
  },
  flexDirectionText: {
    backgroundColor: 'white',
    marginBottom: 10,
    width: "45%",
  },
  textInputStyle: {
    backgroundColor: 'white',
    marginBottom: 10,
  },
  dropdown: {
    borderColor: "gray",
    //borderWidth: 0.5,
    paddingHorizontal: 8,
    width: "100%",
    alignSelf: "center",
    marginBottom: 10,
    height: 57,
    backgroundColor: Colors.boxBackground,
    borderWidth: 1,
    borderRadius: 6,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  dropdown1: {
    borderColor: "gray",
    //borderWidth: 0.5,
    paddingHorizontal: 8,
    width: "45%",
    alignSelf: "center",
    marginBottom: 10,
    height: 57.5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 5.5,
  },
  controlView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  controlText: {
    backgroundColor: 'white',
    width: "30%",
    height: 40,
  },
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 1,
  },
});

export default EditMeasurement;
