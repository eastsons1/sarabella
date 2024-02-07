import React, { useState, useRef, useEffect, useLayoutEffect,useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Modal,
  FlatList,
  Image,
  RefreshControl
} from "react-native";
import { RadioButton, TextInput, useTheme } from "react-native-paper";
import { StackActions } from "@react-navigation/native";
import RadioButtonRN from "radio-buttons-react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Dropdown } from "react-native-element-dropdown";
import Colors from "../../../constant/Colors";
import ButtonComp from "../../../components/ButtonComp";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import EnvVariables from "../../../constant/EnvVariables";
import axios from "axios";
const data2 = [
  { label: "0", value: "0" },
  { label: "1/2", value: "0.5" },
  { label: "1/4", value: "0.25" },
  { label: "3/4", value: "0.75" },
  { label: "2/3", value: "0.67" },
  { label: "2/4", value: "0.5" },
];

const dataParsed = ["0.5", "0.25", "0.75", "0.67", "0.5"];

const data3 = [
  { label: "Motorised", value: "Motorised" },
  { label: "Regular", value: "Regular" },
];

const data4 = [
  { label: "White", value: "White" },
  { label: "Grey", value: "Grey" },
  { label: "Green", value: "Green" },
];

const AddMeasurnment = (props) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [openCurrentImage, setOpenCurrentImage] = useState("");
  const [imageIndex, setImageIndex] = useState();
  console.log(props, 'propaaaaaaaaaa')
  const [jobList, setJobList] = useState([]);
  const [dataload, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [id, setId] = useState(undefined);

  useLayoutEffect(() => {
    props.navigation.addListener("focus", () => {
      // setScreenValue1(true)
      setProduct("");

      // getDetails()
      console.log("inside first useEffect==" + props.route.params.boo);
    });
  }, [props.route.params.boo, product]);
  console.log(props.route.params, 'props.route.params')
  const theme = useTheme();

  const [selected, setSelected] = useState("");

  const [isFocus, setIsFocus] = useState(false);
  const [labelWidth, setLabelWidth] = useState("");

  const [isFocusWidth, setIsFocusWidth] = useState(false);
  const [labelHeight, setLabelHeight] = useState("");

  const [valueWidth, setValueWidth] = useState("");

  const [valuHeight, setValueHeight] = useState("");

  const [valueLift, setValueLift] = useState("");
  const [valueFrame, setValueFrame] = useState("");
  const [isFocusHeight, setIsFocusHeight] = useState(false);
  const [labelLift, setLabelLift] = useState("");
  const [isFocusLift, setIsFocusLift] = useState(false);
  const [labelFrameColor, setLabelFrameColor] = useState("");
  const [isFocusFrameColor, setIsFocusFrameColor] = useState(false);
  const [control, setControl] = useState("");
  const [product, setProduct] = useState("");

  const [style, setStyle] = useState("");
  const [color, setColor] = useState("");
  const [location, setLocation] = useState("");

  const [quantity, setQuantity] = useState([]);

  const [cord, setCord] = useState([]);

  const [width, setWidth] = useState([]);

  const [height, setHeight] = useState([]);

  const [mounting, setMounting] = useState("");
  const [baseboards, setBaseBoards] = useState("");
  const [side_channel, setSide_channel] = useState("");
  const [side_channel_color, setSide_channel_color] = useState("");
  const [bottom_channel, setBottom_channel] = useState("");
  const [bottom_channel_color, setBottom_channel_color] = useState("");
  const [bottom_rail, setBottom_rail] = useState("");
  const [bottom_rail_color, setBottom_rail_color] = useState("");
  const [valance, setValance] = useState("");
  const [valance_color, setValance_color] = useState("");
  const [work_extra, setWork_extra] = useState("");

  const [remarks, setRemarks] = useState("");

  const [newArray, setNewArray] = useState([]);
  const [newArrayWidth, setNewArrayWidth] = useState([]);
  const [newArrayLift, setNewArrayLift] = useState([]);
  const [newArrayFrameColor, setNewArrayFrameColor] = useState([]);

  const [inputErrors, setInputErrors] = useState([]);
  const [inputLocationErrors, setInputLocationErrors] = useState([]);
  const [inputQuantityErrors, setInputQuantityErrors] = useState([]);
  const [inputWidthErrors, setInputWidthErrors] = useState([]);
  const [inputHeightErrors, setInputHeightErrors] = useState([]);
  const [inputCordErrors, setInputCordErrors] = useState([]);
  const [imageErrors, setImageErrors] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  // console.log('new array='+JSON.stringify(newArray))


  let today = new Date().toISOString().slice(0, 10);
  console.log("today==" + today);

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
    },
  ];

  var order_id = props.route.params.order_id;
  var order_request = props.route.params.order_request;
  var date_of_visit = props.route.params.date_of_visit;
  var S_T_V = props.route.params.S_T_V;
  var Request_by_name = props.route.params.Request_by_name;
  var contact_no = props.route.params.contact_no;
  var visit_address = props.route.params.visit_address;
  var cDate = props.route.params.created_date;
  var customerId = props.route.params.customerId;
  var created_date = props.route.params.created_date;
  var AllMeasurementData = props.route.params.AllMeasurementData
  console.log(AllMeasurementData, 'AllMeasurementData')
  console.log("c date=" + cDate);

  const [numInputs, setNumInputs] = useState(1);
  const refInputs = useRef([product]);
  const refImage = useRef([openCurrentImage]);
  const refInputsStyle = useRef([style]);
  const refInputsColor = useRef([color]);
  const refInputsLocation = useRef([location]);
  const refInputsQuantity = useRef([quantity]);
  const refInputsWidth = useRef([width]);
  const refInputsWidth2 = useRef([labelWidth]);
  const refInputsHeight = useRef([height]);
  const refInputsHeight2 = useRef([labelHeight]);
  const refInputLift = useRef([labelLift]);
  const refInputFrameColor = useRef([labelFrameColor]);
  console.log("ref inpouts height new=" + JSON.stringify(refInputsHeight2));
  console.log("ref inputs width=" + JSON.stringify(refInputsWidth2, refInputs));
  const refInputsMounting = useRef([mounting]);
  const refInputsBaseboards = useRef([baseboards]);
  const refInputsSideChannel = useRef([side_channel]);
  const refInputsSideChannelColor = useRef([side_channel_color]);
  const refInputsBottomChannel = useRef([bottom_channel]);
  const refInputsBottomChannelColor = useRef([bottom_channel_color]);
  const refInputsBottomRail = useRef([bottom_rail]);
  const refInputsBottomRailColor = useRef([bottom_rail_color]);
  const refInputsValance = useRef([valance]);
  const refInputsValanceColor = useRef([valance_color]);
  const refInputsExtraWork = useRef([work_extra]);
  const refInputsRemarks = useRef([remarks]);
  const refInputsSelected = useRef([selected]);
  const refInputsControl = useRef([control]);
  const refInputsCord = useRef([cord]);

  const isFocused = useIsFocused();

  const [screenValue, setScreenValue] = useState(false);
  const [screenValue1, setScreenValue1] = useState(false);
  const OpenImage = (index,value) => {

    const image = refImage.current;
    image[index] = value;
    setOpenCurrentImage(value);
    setShowEditModal(false);

  };

  const OpenModal = (index) => {

    
    setShowEditModal(true);
    setImageIndex(index)

  };
  const getDetails = async () => {
    setId(await AsyncStorage.getItem("user_id"));
  };

  useEffect(async () => {
    console.log("getJobsData called in jobListing screen");
    getDetails();
    setApiLoader(true);
    let webApiUrl =
      EnvVariables.API_HOST + `APIs/ViewProductImages/ViewProductImages.php`;
    console.log("webapiurl in agent job list=" + webApiUrl);
    axios.get(webApiUrl).then((res) => {
      console.log("response in agents=" + JSON.stringify(res.data));
      const reversed = res.data;

      setJobList(reversed);
      setDataLoaded(true);
      setApiLoader(false);
    });
  }, []);

  const onRefresh = useCallback(async () => {

    setRefreshing(true);
    props.navigation.addListener("focus", () => {
      // setScreenValue1(true)
      setProduct("");

      // getDetails()
      setRefreshing(false);
      console.log("inside first useEffect==" + props.route.params.boo);
    });

  }, []);




  // FOR ALL MEAS DATA
  const setInputValue = (index, value) => {
    // console.log("index=" + index + "value=" + value);
    console.log(value, 'INPUTTTTIII')
    const inputs = refInputs.current;
    inputs[index] = value;
    setProduct(value);
  };
  const setInputValueStyle = (index, value) => {
    const inputsStyle = refInputsStyle.current;
    inputsStyle[index] = value;
    setStyle(value);
  };
  const setInputValueColor = (index, value) => {
    const inputsColor = refInputsColor.current;
    inputsColor[index] = value;
    setColor(value);
  };
  const setInputValueLocation = (index, value) => {
    const inputsLocation = refInputsLocation.current;
    inputsLocation[index] = value;
    setLocation(value);
  };

  const setInputValueQuantity = (index, value) => {
    console.log("index=" + index + " value=" + value);
    const inputsQuantity = [...refInputsQuantity.current];
    inputsQuantity[index] = value;
    refInputsQuantity.current = inputsQuantity;
    setQuantity(inputsQuantity);
  };

  const setInputValueCord = (index, value) => {
    const inputsCord = [...refInputsCord.current];
    inputsCord[index] = value;
    refInputsCord.current = inputsCord;
    setCord(inputsCord);
    // const inputsCord = refInputsCord.current;
    // inputsCord[index] = value;
    // setCord(value);
  };

  const setInputValueWidth = (index, value) => {
    const inputsWidth = [...refInputsWidth.current];
    inputsWidth[index] = value;
    refInputsWidth.current = inputsWidth;
    setWidth(inputsWidth);
    // const inputsWidth = refInputsWidth.current;
    // inputsWidth[index] = value;
    // setWidth(value);
  };
  const setInputValueWidth2 = (index, value) => {
    setNewArrayWidth((values) => [...values, value]);
    refInputsWidth2.current[index];
    const inputsWidth2 = refInputsWidth2.current;
    inputsWidth2[index] = value;
    setLabelWidth(value);
  };
  const setInputValueHeight = (index, value) => {
    const inputsHeight = [...refInputsHeight.current];
    inputsHeight[index] = value;
    refInputsHeight.current = inputsHeight;
    setHeight(inputsHeight);
    // const inputsHeight = refInputsHeight.current;
    // inputsHeight[index] = value;
    // setHeight(value);
  };
  const setInputValueHeight2 = (index, value) => {
    setNewArray((values) => [...values, value]);
    refInputsHeight2.current[index];
    const inputsHeight2 = refInputsHeight2.current;
    inputsHeight2[index] = value;
    setLabelHeight(value);
  };
  const setInputValueLift = (index, value) => {
    setNewArrayLift((values) => [...values, value]);
    refInputLift.current[index];
    const inputsLift = refInputLift.current;
    inputsLift[index] = value;
    setLabelLift(value);
  };
  const setInputValueFrameColor = (index, value) => {
    setNewArrayFrameColor((values) => [...values, value]);
    refInputFrameColor.current[index];
    const inputsFrameColor = refInputFrameColor.current;
    inputsFrameColor[index] = value;
    setLabelFrameColor(value);
  };
  const setInputValueMounting = (index, value) => {
    const inputsMounting = refInputsMounting.current;
    inputsMounting[index] = value;
    setMounting(value);
  };
  const setInputValueBaseboard = (index, value) => {
    const inputsBaseboard = refInputsBaseboards.current;
    inputsBaseboard[index] = value;
    setBaseBoards(value);
  };
  const setInputValueSideChannel = (index, value) => {
    const inputsSideChannel = refInputsSideChannel.current;
    inputsSideChannel[index] = value;
    setSide_channel(value);
  };
  const setInputValueSideChannelColor = (index, value) => {
    const inputsSideChannelColor = refInputsSideChannelColor.current;
    inputsSideChannelColor[index] = value;
    setSide_channel_color(value);
  };
  const setInputValueBottomChannel = (index, value) => {
    const inputsBottomChannel = refInputsBottomChannel.current;
    inputsBottomChannel[index] = value;
    setBottom_channel(value);
  };
  const setInputValueBottomChannelColor = (index, value) => {
    const inputsBottomChannelColor = refInputsBottomChannelColor.current;
    inputsBottomChannelColor[index] = value;
    setBottom_channel_color(value);
  };
  const setInputValueBottomRail = (index, value) => {
    const inputsBottomRail = refInputsBottomRail.current;
    inputsBottomRail[index] = value;
    setBottom_rail(value);
  };
  const setInputValueBottomRailColor = (index, value) => {
    const inputsBottomRailColor = refInputsBottomRailColor.current;
    inputsBottomRailColor[index] = value;
    setBottom_rail_color(value);
  };
  const setInputValueValance = (index, value) => {
    const inputsValance = refInputsValance.current;
    inputsValance[index] = value;
    setValance(value);
  };
  const setInputValueValanceColor = (index, value) => {
    const inputsValanceColor = refInputsValanceColor.current;
    inputsValanceColor[index] = value;
    setValance_color(value);
  };
  const setInputExtraWork = (index, value) => {
    const inputsExtraWork = refInputsExtraWork.current;
    inputsExtraWork[index] = value;
    setWork_extra(value);
  };
  const setInputRemark = (index, value) => {
    const inputsRemark = refInputsRemarks.current;
    inputsRemark[index] = value;
    setRemarks(value);
  };
  const setInputSelected = (index, value) => {
    // console.log("index=" + index + "value=" + value);
    refInputsSelected.current[index];
    const inputsSelected = refInputsSelected.current;
    inputsSelected[index] = value;
    setSelected(value);
  };


  const addInput = () => {
    refInputs.current.push("");
    refInputsStyle.current.push("");
    refInputsColor.current.push("");
    refInputsLocation.current.push("");
    // refInputsQuantity.current.push("");
    refInputsQuantity.current = [...refInputsQuantity.current, ""];
    // setQuantity((prevQuantity) => [...prevQuantity, ""]);
    // refInputsWidth.current.push("");
    refInputsWidth.current = [...refInputsWidth.current, ""];
    refInputsWidth2.current.push("");
    // refInputsHeight.current.push("");
    refInputsHeight.current = [...refInputsHeight.current, ""];
    refInputsHeight2.current.push("");
    refInputLift.current.push("");
    refInputFrameColor.current.push("");
    refInputsMounting.current.push("");
    refInputsBaseboards.current.push("");
    refInputsSideChannel.current.push("");
    refInputsSideChannelColor.current.push("");
    refInputsBottomChannel.current.push("");
    refInputsBottomChannelColor.current.push("");
    refInputsBottomRail.current.push("");
    refInputsBottomRailColor.current.push("");
    refInputsValance.current.push("");
    refInputsValanceColor.current.push("");
    refInputsExtraWork.current.push("");
    refInputsRemarks.current.push("");
    refInputsSelected.current.push("");
    refInputsControl.current.push("");
    // refInputsCord.current.push("");
    refInputsCord.current = [...refInputsCord.current, ""];
    setNumInputs((value) => value + 1);
  };

  const removeInput = (i) => {
    refInputs.current.splice(i, 1)[0];
    refInputsStyle.current.splice(i, 1)[0];
    refInputsColor.current.splice(i, 1)[0];
    refInputsLocation.current.splice(i, 1)[0];
    refImage.current.splice(i, 1)[0];

    const updatedInputsQuantity = [...refInputsQuantity.current];
    updatedInputsQuantity.splice(i, 1);
    refInputsQuantity.current = updatedInputsQuantity;
    const updatedQuantity = [...quantity];
    updatedQuantity.splice(i, 1);
    setQuantity(updatedQuantity);

    // refInputsQuantity.current.splice(i, 1)[0];
    // refInputsWidth.current.splice(i, 1)[0];

    const updatedInputWidth = [...refInputsWidth.current];
    updatedInputWidth.splice(i, 1);
    refInputsWidth.current = updatedInputWidth;
    const updatedWidth = [...width];
    updatedWidth.splice(i, 1);
    setWidth(updatedWidth);

    refInputsWidth2.current.splice(i, 1)[0];
    // refInputsHeight.current.splice(i, 1)[0];

    const updatedInputHeight = [...refInputsHeight.current];
    updatedInputHeight.splice(i, 1);
    refInputsHeight.current = updatedInputHeight;
    const updatedHeight = [...height];
    updatedHeight.splice(i, 1);
    setHeight(updatedHeight);

    refInputsHeight2.current.splice(i, 1)[0];
    refInputLift.current.splice(i, 1)[0];
    refInputFrameColor.current.splice(i, 1)[0];
    refInputsMounting.current.splice(i, 1)[0];
    refInputsBaseboards.current.splice(i, 1)[0];
    refInputsSideChannel.current.splice(i, 1)[0];
    refInputsSideChannelColor.current.splice(i, 1)[0];
    refInputsBottomChannel.current.splice(i, 1)[0];
    refInputsBottomChannelColor.current.splice(i, 1)[0];
    refInputsBottomRail.current.splice(i, 1)[0];
    refInputsBottomRailColor.current.splice(i, 1)[0];
    refInputsValance.current.splice(i, 1)[0];
    refInputsValanceColor.current.splice(i, 1)[0];
    refInputsExtraWork.current.splice(i, 1)[0];
    refInputsRemarks.current.splice(i, 1)[0];
    refInputsSelected.current.splice(i, 1)[0];
    refInputsControl.current.splice(i, 1)[0];
    // refInputsCord.current.splice(i, 1)[0];

    const updatedInputCord = [...refInputsCord.current];
    updatedInputCord.splice(i, 1);
    refInputsCord.current = updatedInputCord;
    const updatedCord = [...cord];
    updatedCord.splice(i, 1);
    setCord(updatedCord);

    setNumInputs((value) => value - 1);
  };

  const inputs = [];

  for (let i = 0; i < numInputs; i++) {
    inputs.push(
      <View style={styles.individualBoxView}>
        <Text style={{ fontWeight: "600" }}>Choose Conversion*:</Text>
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <RadioButtonRN
            boxStyle={{ width: "30%" }}
            style={{ flexDirection: "row" }}
            textStyle={{ marginLeft: 10 }}
            data={data}
            box={false}
            animationTypes={["zoomIn"]}
            //animationTypes={['pulse']}
            //animationTypes={['shake']}
            //animationTypes={['rotate']}
            activeColor="black"
            boxActiveBgColor="black"
            deactiveColor="gainsboro"
            value={refInputsSelected.current[i]}
            // selectedBtn={(e) => setSelected(e.label)}
            selectedBtn={(e) => setInputSelected(i, e.label)}
          // icon={
          //   <Icon name="checkmark-circle-outline" size={25} color="#2c9dd1" />
          // }
          />
        </View>

        <TextInput
          mode="outlined"
          onChangeText={(value) => setInputValue(i, value)}
          value={refInputs.current[i]}
          style={styles.textInputStyle}
          label="Enter Product Name*"
          error={inputErrors[i] || false}
        />

        <View style={{ flexDirection: 'row' }}>
          <TextInput
            mode='outlined'
            onChangeText={(value) => setInputValueLocation(i, value)}
            value={refInputsLocation.current[i]}
            style={{ width: '80%', backgroundColor: '#fff', borderWidth: 0 }}
            label="Enter Location*"
            error={inputLocationErrors[i] || false}
          />
          <TouchableOpacity onPress={() => {OpenModal(i) }} style={{ borderWidth: imageErrors[i] || false ?2: 1, borderColor: imageErrors[i] || false && !refImage.current[i] ? 'red':'gray', borderRadius: 5, width: '20%', justifyContent: 'center', height: 50, alignItems: 'center', marginTop: 6 }}>
            {
              refImage.current[i] ?
                <Image
                  source={{
                    uri:
                      "https://sarabella.ca/backend/product_gallery/" +
                      refImage.current[i],
                  }}
                  style={{
                    width: 30,
                    height: 30,
                    // resizeMode: "center",
                  }}

                />
                :
                <Icon name="images" size={21} />

            }

          </TouchableOpacity>

        </View>

        <TextInput
          mode="outlined"
          onChangeText={(value) => setInputValueQuantity(i, value)}
          value={
            i == 0 && refInputsQuantity.current[i].length == 0
              ? ""
              : refInputsQuantity.current[i]
          }
          style={styles.textInputStyle}
          label="Enter Quantity*"
          keyboardType="number-pad"
          error={inputQuantityErrors[i] || false}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            mode="outlined"
            onChangeText={(value) => setInputValueWidth(i, value)}
            value={
              i == 0 && refInputsWidth.current[i].length == 0
                ? ""
                : refInputsWidth.current[i]
            }
            // value={refInputsWidth.current[i]}
            style={styles.flexDirectionText}
            label="Enter Width*"
            keyboardType="number-pad"
            error={inputWidthErrors[i] || false}
          />
          <Icon name="add-sharp" size={30} style={{ alignSelf: "center" }} />
          <Dropdown
            style={[styles.dropdown1, isFocusWidth && { borderColor: "black" }]}
            placeholderStyle={{ fontSize: 16 }}
            containerStyle={{ top: Platform.OS == "android" && -30 }}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={data2}
            labelField="label"
            valueField="value"
            placeholder={!isFocusWidth ? "Enter Width" : "..."}
            value={refInputsWidth2.current[i]}
            //value={newArrayWidth.length!=0? newArrayWidth[i].label:refInputsWidth2.current[i]}
            onFocus={() => setIsFocusWidth(true)}
            onBlur={() => setIsFocusWidth(false)}
            onChange={(item) => {
              // if(item.value==valueWidth)
              if (item.value == refInputsWidth2.current[i]) {
                refInputsWidth2.current.splice(i, 1, "");
                setValueWidth("");
                setIsFocusWidth(false);
              } else {
                //setValueWidth(item.value);
                setInputValueWidth2(i, item.value);
                setValueWidth(item.value);
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
          <TextInput
            mode="outlined"
            onChangeText={(value) => setInputValueHeight(i, value)}
            // value={refInputsHeight.current[i]}
            value={
              i == 0 && refInputsHeight.current[i].length == 0
                ? ""
                : refInputsHeight.current[i]
            }
            style={styles.flexDirectionText}
            label="Enter Height*"
            keyboardType="number-pad"
            error={inputHeightErrors[i] || false}
          />
          <Icon name="add-sharp" size={30} style={{ alignSelf: "center" }} />

          <Dropdown
            style={[
              styles.dropdown1,
              isFocusHeight && { borderColor: "black" },
            ]}
            containerStyle={{ top: Platform.OS == "android" && -30 }}
            placeholderStyle={{ fontSize: 16 }}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={data2}
            labelField="label"
            valueField="value"
            placeholder={!isFocusHeight ? "Enter Height" : "..."}
            value={refInputsHeight2.current[i]}
            //value={newArray.length!=0? newArray[i].label:refInputsHeight2.current[i]}
            onFocus={() => setIsFocusHeight(true)}
            onBlur={() => setIsFocusHeight(false)}
            onChange={(item) => {
              if (item.value == refInputsHeight2.current[i]) {
                refInputsHeight2.current.splice(i, 1, "");
                setValueHeight("");
                setIsFocusHeight(false);
              } else {
                //setValueWidth(item.value);
                setInputValueHeight2(i, item.value);
                setValueHeight(item.value);
                setIsFocusHeight(false);
              }
              // setInputValueHeight2(i, item.value);
              // setValueHeight(item.value);
              // setIsFocusHeight(false);
            }}
          />
        </View>

        <TextInput
          mode="outlined"
          onChangeText={(value) => setInputValueCord(i, value)}
          // value={refInputsCord.current[i]}
          value={
            i == 0 && refInputsCord.current[i].length == 0
              ? ""
              : refInputsCord.current[i]
          }
          keyboardType={"default"}
          style={styles.textInputStyle}
          label="Enter Cord*"
          error={inputCordErrors[i] || false}
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
            value={refInputLift.current[i]}
            // value={refInputsHeight.current[i]}
            //value={(newArrayLift.length!=0)? newArrayLift[i].label:refInputLift.current[i]}
            onFocus={() => setIsFocusLift(true)}
            onBlur={() => setIsFocusLift(false)}
            onChange={(item) => {
              if(item.value==refInputLift.current[i]){
                refInputLift.current.splice(i,1,'')
                setValueLift('')
                setIsFocusLift(false)
              }else {
                setInputValueLift(i, item.label);
                setValueLift(item.value)
                setIsFocusLift(false);
              }
              // setInputValueLift(i, item.label);
              // setValueLift(item.value)
              // setIsFocusLift(false);
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
            value={refInputFrameColor.current[i]}
            //  value={refInputsHeight2.current[i]}
            //value={newArrayFrameColor.length!=0? newArrayFrameColor[i].label:refInputFrameColor.current[i]}
            onFocus={() => setIsFocusFrameColor(true)}
            onBlur={() => setIsFocusFrameColor(false)}
            onChange={(item) => {
              if(item.value==refInputFrameColor.current[i]){
                refInputFrameColor.current.splice(i,1,'')
                setValueFrame('')
                setIsFocusFrameColor(false)
              }else {
                setInputValueFrameColor(i, item.label);
                setValueFrame(item.value)
                setIsFocusFrameColor(false);
              }
              // setInputValueFrameColor(i, item.label);
              // setValueFrame(item.value)
              // setIsFocusFrameColor(false);
            }}
          />
        </View>

        <View style={styles.controlView}>
          <Text style={{ alignSelf: "center",marginTop:10 }}>Control</Text>
  
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
                deactiveColor="gainsboro"
                value={refInputsControl.current[i]}
                // selectedBtn={(e) => setSelected(e.label)}
                selectedBtn={(e) => setInputControl(i, e.label)}
                // icon={
                //   <Icon name="checkmark-circle-outline" size={25} color="#2c9dd1" />
                // }
              />
          </View>
        </View>
        
        <TextInput
          mode="outlined"
          onChangeText={(value) => setInputValueStyle(i, value)}
          value={refInputsStyle.current[i]}
          style={styles.textInputStyle}
          label="Enter Style Name"
        />
        <TextInput
          mode="outlined"
          onChangeText={(value) => setInputValueColor(i, value)}
          value={refInputsColor.current[i]}
          style={styles.textInputStyle}
          label="Enter Color"
        />

        <TextInput
          mode="outlined"
          onChangeText={(value) => setInputValueMounting(i, value)}
          value={refInputsMounting.current[i]}
          style={styles.textInputStyle}
          label="Enter Mounting Name"
        />
        <TextInput
          mode="outlined"
          onChangeText={(value) => setInputValueBaseboard(i, value)}
          value={refInputsBaseboards.current[i]}
          style={styles.textInputStyle}
          label="Enter Baseboard Name"
        />
        <TextInput
          mode="outlined"
          onChangeText={(value) => setInputValueSideChannel(i, value)}
          value={refInputsSideChannel.current[i]}
          style={styles.textInputStyle}
          label="Enter Side Channel Name"
        />
        <TextInput
          mode="outlined"
          onChangeText={(value) => setInputValueSideChannelColor(i, value)}
          value={refInputsSideChannelColor.current[i]}
          style={styles.textInputStyle}
          label="Enter Side Channel Color"
        />
        <TextInput
          mode="outlined"
          onChangeText={(value) => setInputValueBottomChannel(i, value)}
          value={refInputsBottomChannel.current[i]}
          style={styles.textInputStyle}
          keyboardType='name-phone-pad'
          label="Enter Bottom Channel"
        />
        <TextInput
          mode="outlined"
          onChangeText={(value) => setInputValueBottomChannelColor(i, value)}
          value={refInputsBottomChannelColor.current[i]}
          style={styles.textInputStyle}
          label="Enter Bottom Channel Color"
        />
        <TextInput
          mode="outlined"
          onChangeText={(value) => setInputValueBottomRail(i, value)}
          value={refInputsBottomRail.current[i]}
          style={styles.textInputStyle}
          keyboardType='name-phone-pad'
          label="Enter Bottom Rail"
        />
        <TextInput
          mode="outlined"
          onChangeText={(value) => setInputValueBottomRailColor(i, value)}
          value={refInputsBottomRailColor.current[i]}
          style={styles.textInputStyle}
          label="Enter Bottom Rail Color"
        />
        <TextInput
          mode="outlined"
          onChangeText={(value) => setInputValueValance(i, value)}
          value={refInputsValance.current[i]}
          style={styles.textInputStyle}
          keyboardType='name-phone-pad'
          label="Enter Valance"
        />
        <TextInput
          mode="outlined"
          onChangeText={(value) => setInputValueValanceColor(i, value)}
          value={refInputsValanceColor.current[i]}
          style={styles.textInputStyle}
          label="Enter Valance Color"
        /> */}
        <TextInput
          mode="outlined"
          onChangeText={(value) => setInputExtraWork(i, value)}
          value={refInputsExtraWork.current[i]}
          style={styles.textInputStyle}
          label="Extra Work"
        />
        <TextInput
          mode="outlined"
          onChangeText={(value) => setInputRemark(i, value)}
          value={refInputsRemarks.current[i]}
          style={styles.textInputStyle}
          label="Remarks"
        />

        {i != 0 ? (
          <View style={{ width: "40%", marginBottom: 10 }}>
            <ButtonComp title={"-Remove"} onPress={() => removeInput(i)} />
          </View>
        ) : null}
      </View>
    );
  }




  let measurnment = [];
  for (let j = 0; j < numInputs; j++) {
    measurnment = refInputs.current.map((item, idx) => {
      return {
        ["order_request_id"]: order_id,
        ["Measurement_type"]: refInputsSelected.current[idx],
        ["product"]: item,
        ["product_image"]: refImage.current[idx],
        ["style"]: refInputsStyle.current[idx],
        ["color"]: refInputsColor.current[idx],
        ["location"]: refInputsLocation.current[idx],
        ["quantity"]:
          idx == 0 && refInputsQuantity.current[0].length == 0
            ? ""
            : refInputsQuantity.current[idx] || "",
        ["width"]:
          idx == 0 && refInputsWidth.current[0].length == 0
            ? ""
            : refInputsWidth.current[idx] || "",
        ["width2"]: refInputsWidth2.current[idx],
        // ["height"]:refInputsHeight.current[0].length==0?"":refInputsHeight.current[idx],
        ["height"]:
          idx == 0 && refInputsHeight.current[0].length == 0
            ? ""
            : refInputsHeight.current[idx] || "",
        // ["height"]: refInputsHeight.current[idx],
        ["height2"]: refInputsHeight2.current[idx],
        ["lifting_systems"]: refInputLift.current[idx],
        ["frame_color"]: refInputFrameColor.current[idx],
        ["mounting"]: refInputsMounting.current[idx],
        ["baseboards"]: refInputsBaseboards.current[idx],
        ["side_channel"]: refInputsSideChannel.current[idx],
        ["side_channel_color"]: refInputsSideChannelColor.current[idx],
        ["bottom_channel"]: refInputsBottomChannel.current[idx],
        ["bottom_channel_color"]: refInputsBottomChannelColor.current[idx],
        ["bottom_rail"]: refInputsBottomRail.current[idx],
        ["bottom_rail_color"]: refInputsBottomRailColor.current[idx],
        ["valance"]: refInputsValance.current[idx],
        ["valance_color"]: refInputsValanceColor.current[idx],
        ["work_extra"]: refInputsExtraWork.current[idx],
        ["remarks"]: refInputsRemarks.current[idx],
        ["created_date"]: today,
        // ["cord_details"]: refInputsCord.current[idx],
        ["cord_details"]:
          refInputsCord.current[0].length == 0
            ? ""
            : refInputsCord.current[idx],
        ["control_left"]: control,
        ["control_right"]: control,
      };
    });
  }


  console.log("measurnment=" + JSON.stringify(measurnment));

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
          <ScrollView showsVerticalScrollIndicator={false}  refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                      }>
            <View style={{ marginTop: 20, marginHorizontal: 10 }}>
              {/* <View style={styles.individualBoxView}>
           
          </View> */}


              {inputs}
              <View
                style={{
                  width: "40%",
                  alignSelf: "center",
                  marginBottom: 10,
                  marginTop: 15,
                }}
              >
                {/* <ButtonComp title={"Remove"} onPress={removeInput(i)} /> */}
                <ButtonComp title={"+ Add more"} onPress={addInput} />
              </View>
              <View
                style={{ width: "80%", alignSelf: "center", marginBottom: 20 }}
              >
                <ButtonComp
                  title={"View Measurement"}
                  onPress={async () => {
                    let isMissingFields = false; // initialize flag
                    // const newInputBorderColors = [...inputBorderColors];

                    for (let k = 0; k < measurnment.length; k++) {
                      if (
                        !refInputs.current[k] ||
                        !refInputsCord.current[k] ||
                        !refInputsLocation.current[k] ||
                        !refInputsQuantity.current[k] ||
                        !refInputsWidth.current[k] ||
                        !refInputsHeight.current[k] ||
                        !refImage.current[k]
                      ) {
                        isMissingFields = true; // set flag to true if any field is missing
                        // newInputBorderColors[k] = 'red';
                        // inputErrors[k] = true;

                        if (k == 0 && refInputs.current[0].length == 0) {
                          inputErrors[k] = true;
                        } else {
                          inputErrors[k] = !refInputs.current[k];
                        }
                        if (
                          k == 0 &&
                          refInputsLocation.current[0].length == 0
                        ) {
                          inputLocationErrors[k] = true;
                        } else {
                          inputLocationErrors[k] =
                            !refInputsLocation.current[k];
                        }
                        if (
                          k == 0 &&
                          refInputsQuantity.current[0].length == 0
                        ) {
                          inputQuantityErrors[k] = true;
                        } else {
                          inputQuantityErrors[k] =
                            !refInputsQuantity.current[k];
                        }
                        if (k == 0 && refInputsWidth.current[0].length == 0) {
                          inputWidthErrors[k] = true;
                        } else {
                          inputWidthErrors[k] = !refInputsWidth.current[k];
                        }
                        if (k == 0 && refInputsHeight.current[0].length == 0) {
                          inputHeightErrors[k] = true;
                        } else {
                          inputHeightErrors[k] = !refInputsHeight.current[k];
                        }
                        if (k == 0 && refInputsCord.current[0].length == 0) {
                          inputCordErrors[k] = true;
                        } else {
                          inputCordErrors[k] = !refInputsCord.current[k];
                        }
                        if (k == 0 && refImage.current[0].length == 0) {
                          imageErrors[k] = true;
                        } else {
                          imageErrors[k] = !refImage.current[k];
                        }
                      } else {
                        inputErrors[k] = false;
                        inputLocationErrors[k] = false; // Reset error state if the field is valid
                        inputQuantityErrors[k] = false;
                        inputWidthErrors[k] = false; // Reset error state if the field is valid
                        inputHeightErrors[k] = false; // Reset error state if the field is valid
                        inputCordErrors[k] = false;
                        imageErrors[k] = false
                        // newInputBorderColors[k] = undefined; // Reset borderColor if the field is valid
                      }
                    }
                    setInputErrors([...inputErrors]);
                    setInputLocationErrors([...inputLocationErrors]); // Update the state array
                    setInputQuantityErrors([...inputQuantityErrors]);
                    setInputWidthErrors([...inputWidthErrors]); // Update the state array
                    setInputHeightErrors([...inputHeightErrors]); // Update the state array
                    setInputCordErrors([...inputCordErrors]);
                    setImageErrors([...imageErrors])
                    // setInputBorderColors(newInputBorderColors);
                    if (isMissingFields) {
                      Alert.alert("", "Kindly enter all important fields");
                    } else {
                      AsyncStorage.setItem("screenBoolean", "true");
                      setScreenValue(true);
                      // navigate to next screen
                      props.navigation.navigate("ViewMeasurnment", {
                        screenName: "AddMeasurnment",
                        order_id: order_id,
                        measurnment: measurnment,
                        order_request: order_request,
                        date_of_visit: date_of_visit,
                        S_T_V: S_T_V,
                        Request_by_name: Request_by_name,
                        contact_no: contact_no,
                        visit_address: visit_address,
                        // customerId: props.route.params.customerId,
                        customerId: customerId,
                        cDate: cDate,
                        created_date: created_date,
                        quote_details: [],
                      });
                    }
                  }}
                />
              </View>
            </View>
            <Modal
              animationType="slide"
              // transparent={true}
              visible={showEditModal}
              onRequestClose={() => {
                setShowEditModal(false);
              }}
            >
              <View style={styles.modalWrapper2}>
                <View style={styles.modalWrapp}>

                  <View style={{ justifyContent: "center" }}>

                    {/* <TouchableOpacity
                      onPress={() => setShowEditModal(false)}
                      style={{
                        // position: "absolute",
                        right: 10,
                        top: '5%',
                        alignSelf: "flex-end",
                        width: 30,
                        height: 30,
                        borderRadius: 50 / 2,
                        justifyContent: "center",
                        backgroundColor: "red",
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: "#fff",
                          fontSize: 14,
                        }}
                      >
                        X
                      </Text>
                    </TouchableOpacity> */}
                    <FlatList
                      data={jobList.Produc_Listt}
                      numColumns={2}
                     
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => OpenImage( imageIndex,item.gallery_image)}
                          style={styles.item}
                        >
                          <Image
                            source={{
                              uri:
                                "https://sarabella.ca/backend/product_gallery/" +
                                item.gallery_image,
                            }}
                            style={{
                              width: 100,
                              height: 100,
                              // resizeMode: "center",
                            }}
                          />
                          {/* <Text style={{ textAlign: "center" }}>
                            Product Code {item.product_code}
                          </Text> */}
                        </TouchableOpacity>
                      )}
                      keyExtractor={(item) => item.id}
                    />
                  </View>

                </View>
              </View>
            </Modal>
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
    paddingTop: 10,
    shadowOffset: { height: 6, width: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: "black",
    //height: "100%",
  },
  flexDirectionText: {
    backgroundColor: "white",
    marginBottom: 10,
    width: "45%",
  },
  textInputStyle: {
    backgroundColor: "white",
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
    backgroundColor: "white",
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
    backgroundColor: "white",
    width: "30%",
    height: 40,
  },
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 1,
  },
  modalWrapper2: {
    // backgroundColor: "#00000040",
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  item: {
    // flex: 1,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

export default AddMeasurnment;
