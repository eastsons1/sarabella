import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert, ImageBackground,
  KeyboardAvoidingView, Platform, FlatList, RefreshControl, Modal
} from "react-native";
import axios from "axios";
import { useFocusEffect } from '@react-navigation/native';
import { RadioButton, TextInput } from "react-native-paper";
import RadioButtonRN from "radio-buttons-react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Dropdown } from "react-native-element-dropdown";
import Splash from "../../../components/Splash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EnvVariables from "../../../constant/EnvVariables";
import Colors from "../../../constant/Colors";
import ButtonComp from "../../../components/ButtonComp";

const data2 = [
  { label: "1/2", value: "0.5" },
  { label: "1/4", value: "0.25" },
  { label: "3/4", value: "0.75" },
  { label: "2/3", value: "0.67" },
  { label: "2/4", value: "0.5" },
];

const dataParsed = ["0.5", "0.25", "0.75", "0.67", "0.5"]


const data3 = [
  { label: "Motorised", value: "1" },
  { label: "Regular", value: "2" },
];

const data4 = [
  { label: "White", value: "1" },
  { label: "Grey", value: "2" },
  { label: "Green", value: "3" }
];


const EditCustomerMeasurement = (props) => {

  var firstItem;
  const [selected, setSelected] = useState();
  const [isFocus, setIsFocus] = useState(false);
  const [labelWidth, setLabelWidth] = useState("");
  const [isFocusWidth, setIsFocusWidth] = useState(false);
  const [labelHeight, setLabelHeight] = useState("");
  const [valueWidth, setValueWidth] = useState("")
  const [valuHeight, setValueHeight] = useState('')
  const [valueLift, setValueLift] = useState('');
  const [valueFrame, setValueFrame] = useState('');
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
  const [quantity, setQuantity] = useState("");
  const [cord, setCord] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
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
  const [newArrayWidth, setNewArrayWidth] = useState([])
  const [newArrayLift, setNewArrayLift] = useState([])
  const [newArrayFrameColor, setNewArrayFrameColor] = useState([])
  // const [apiLoader, setApiLoader] = useState(true);
  const [measurementDetails, setMeasurementDetail] = useState([])
  const [openCurrentImage, setOpenCurrentImage] = useState("");
  const [imageIndex, setImageIndex] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const [jobList, setJobList] = useState([]);

  // console.log('new array='+JSON.stringify(newArray))
  var order_id = props.route.params.order_id;
  var date_of_visit = props.route.params.date_of_visit;
  var S_T_V = props.route.params.S_T_V;
  var Request_by_name = props.route.params.Request_by_name;
  var contact_no = props.route.params.contact_no;
  var visit_address = props.route.params.visit_address;
  var created_date = props.route.params.created_date;
  var cDate = props.route.params.cDate;
  var customerId = props.route.params.customerId;
  var created_date = props.route.params.created_date;
  let today = new Date().toISOString().slice(0, 10);
  const [refreshing, setRefreshing] = useState(false);
  const [jobabc, setJobabc] = useState([]);
  const [apiLoader, setApiLoader] = useState(true);
  // useFocusEffect(

  //   React.useCallback(() => {
  //    clearMeasurnment();
  //    getMeasurementData();
  //     return;
  //   }, [])
  // );
  console.log(product, 'AK')
  // console.log(jobabc[0]?.Measurement_Data, 'jobabc')
  console.log(measurementDetails, 'measurementDetails')

  useEffect(() => {
    props.navigation.addListener("focus", () => {
      console.log("unblurred from EditCustomer");
      clearMeasurnment();
      getMeasurementData();
    });
  }, [props.route.params])

  function clearMeasurnment() {
    //refInputs.current.value.reset();

    //console.log("refInputsStyle 1= ",refInputsStyle.current.length)
    setNumInputs(0)
    refInputsStyle.current.splice(0, refInputsStyle.current.length);
    console.log("refInputsStyle 2= ", refInputsStyle.current.length)
    refInputsColor.current.splice(0, refInputs.current.length);
    refInputsLocation.current.splice(0, refInputs.current.length);
    refInputsQuantity.current.splice(0, refInputs.current.length);
    refInputsWidth.current.splice(0, refInputs.current.length);
    refInputsWidth2.current.splice(0, refInputs.current.length);
    refInputsHeight.current.splice(0, refInputs.current.length);
    refInputsHeight2.current.splice(0, refInputs.current.length);
    refInputLift.current.splice(0, refInputs.current.length);
    refInputFrameColor.current.splice(0, refInputs.current.length);
    refInputsMounting.current.splice(0, refInputs.current.length);
    refInputsBaseboards.current.splice(0, refInputs.current.length);
    refInputsSideChannel.current.splice(0, refInputs.current.length);
    refInputsSideChannelColor.current.splice(0, refInputs.current.length);
    refInputsBottomChannel.current.splice(0, refInputs.current.length);
    refInputsBottomChannelColor.current.splice(0, refInputs.current.length);
    refInputsBottomRail.current.splice(0, refInputs.current.length);
    refInputsBottomRailColor.current.splice(0, refInputs.current.length);
    refInputsValance.current.splice(0, refInputs.current.length);
    refInputsValanceColor.current.splice(0, refInputs.current.length);
    refInputsExtraWork.current.splice(0, refInputs.current.length);
    refInputsRemarks.current.splice(0, refInputs.current.length);
    refInputsSelected.current.splice(0, refInputs.current.length);
    refInputsControl.current.splice(0, refInputs.current.length);
    refInputsCord.current.splice(0, refInputs.current.length);
    refInputs.current.splice(0, refInputs.current.length);
  }
  const onLiftChange = (i, item) => {
    setInputValueLift(i, item.label);
    setValueLift(item.value)
    setIsFocusLift(false);
  }
  const data = [
    {
      label: "CM",
      // accessibilityLabel: "Your label",
    },
    {
      label: "Inches",
      // accessibilityLabel: "Your label",
    },
    {
      label: "Meter",
      // accessibilityLabel: "Your label",
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

  var order_id = props.route.params.order_id;
  var order_request = props.route.params.order_request;
  var date_of_visit = props.route.params.date_of_visit;
  var S_T_V = props.route.params.S_T_V;
  var Request_by_name = props.route.params.Request_by_name;
  var contact_no = props.route.params.contact_no;
  var visit_address = props.route.params.visit_address;
  var cDate = props.route.params.created_date;
  var customerId = '';
  var measurement = props.route.params.m

  console.log('edit customer measurement ===' + JSON.stringify(measurement))

  console.log(props.route.params.m
    , 'him')

  const [numInputs, setNumInputs] = useState(0);
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
  const refInputsCord = useRef([cord])
  console.log("refproduct", refInputs)
  console.log("reflocation", refInputsLocation)
  console.log("refInputsWidth", refInputsWidth)
  console.log("refInputsHeight", refInputsHeight)
  console.log("refInputLift", refInputLift)
  console.log("refInputFrameColor", refInputFrameColor)
  const OpenImage = (index, value) => {

    const image = refImage.current;
    image[index] = value;
    setOpenCurrentImage(value);
    setShowEditModal(false);

  };
  const OpenModal = (index) => {


    setShowEditModal(true);
    setImageIndex(index)

  };
  const setFirstItemValue = (data) => {
    console.log("firstValue = ", data)
    refInputs.current.push(data.product)
  }
  const setInputValue = (index, value) => {
    // console.log("index=" + index + "value=" + value);
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
    const inputsQuantity = refInputsQuantity.current;
    inputsQuantity[index] = value;
    setQuantity(value);
  };

  const setInputValueCord = (index, value) => {
    const inputsCord = refInputsCord.current;
    inputsCord[index] = value;
    setCord(value);
  }

  const setInputValueWidth = (index, value) => {
    const inputsWidth = refInputsWidth.current;
    inputsWidth[index] = value;
    setWidth(value);
  };
  const setInputValueWidth2 = (index, value) => {
    setNewArrayWidth((values) => [...values, value]);
    refInputsWidth2.current[index]
    const inputsWidth2 = refInputsWidth2.current;
    inputsWidth2[index] = value;
    setLabelWidth(value);
  };
  const setInputValueHeight = (index, value) => {
    const inputsHeight = refInputsHeight.current;
    inputsHeight[index] = value;
    setHeight(value);
  };
  const setInputValueHeight2 = (index, value) => {
    setNewArray((values) => [...values, value])
    refInputsHeight2.current[index];
    const inputsHeight2 = refInputsHeight2.current;
    inputsHeight2[index] = value;
    setLabelHeight(value);
  };
  const setInputValueLift = (index, value) => {
    setNewArrayLift((values) => [...values, value]);
    refInputLift.current[index]
    const inputsLift = refInputLift.current;
    inputsLift[index] = value;
    setLabelLift(value);
  };
  const setInputValueFrameColor = (index, value) => {
    setNewArrayFrameColor((values) => [...values, value]);
    refInputFrameColor.current[index]
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
    console.log("radiooooo" + value);
    refInputsSelected.current[index];
    const inputsSelected = refInputsSelected.current;
    inputsSelected[index] = value;
    setSelected(value);
  };


  const setInputControl = (index, value) => {
    refInputsControl.current[index];
    const inputsCurrent = refInputsControl.current;
    inputsCurrent[index] = value;
    setControl(value);
  };


  const getMeasurementData = async () => {
    if (measurement != undefined) {
      setMeasurementDetail(measurement != undefined && measurement)

      if (measurement.length === 1) {
        addInput(measurement[0]);
      }
      else {
        for (var i = 0; i < measurement.length; i++) {
          addInput(measurement[i]);
        }
      }
    }
  }
  const getDetails = async () => {
    setId(await AsyncStorage.getItem("user_id"));
  };

  const onSubmit = async (item) => {
    // console.log("measurementDetails = ", JSON.stringify(measurementDetails))
    // let webapiurl = EnvVariables.API_HOST + `APIs/EditMeasurement/EditMeasurement.php`
    // console.log(webapiurl, 'webapiurlEdit')
    // Alert.alert('Hello World')

    // refInputs.current.map(async (item, idx) => {
    //     console.log(refInputsWidth.current[idx],'widthh')
    //     console.log(refInputsQuantity.current[idx],'quantityy')
    //   const data = new FormData();
    //   data.append("order_request_id", order_id)
    //   data.append("measurement_id", measurementDetails[idx].measurement_id)
    //   data.append("product", refInputs.current[idx])
    //   data.append("Measurement_type", refInputsSelected.current[idx])
    //   data.append("style", refInputsStyle.current[idx])
    //   data.append("color", refInputsColor.current[idx])
    //   data.append("location", refInputsLocation.current[idx])
    //   data.append("quantity", refInputsQuantity.current[idx])
    //   data.append("width",  refInputsWidth.current[idx])
    //   data.append("width2", refInputsWidth2.current[idx])
    //   data.append("height", refInputsHeight.current[idx])
    //   data.append("height2", refInputsHeight2.current[idx])
    //   data.append("mounting", refInputsMounting.current[idx])
    //   data.append("control_left", refInputsControl.current[idx])
    //   data.append("control_right", refInputsControl.current[idx])
    //   data.append("baseboards", refInputsBaseboards.current[idx])
    //   data.append("cord_details", refInputsCord.current[idx])
    //   data.append("lifting_systems", refInputLift.current[idx])
    //   data.append("frame_color", refInputFrameColor.current[idx])
    //   data.append("side_channel", refInputsSideChannel.current[idx])
    //   data.append("side_channel_color", refInputsSideChannelColor.current[idx])
    //   data.append("bottom_channel", refInputsBottomChannel.current[idx])
    //   data.append("bottom_channel_color", refInputsBottomChannelColor.current[idx])
    //   data.append("bottom_rail", refInputsBottomRail.current[idx])
    //   data.append("bottom_rail_color", refInputsBottomRailColor.current[idx])
    //   data.append("valance", refInputsValance.current[idx])
    //   data.append("valance_color", refInputsValanceColor.current[idx])
    //   data.append("work_extra", refInputsExtraWork.current[idx])
    //   data.append("remarks", refInputsRemarks.current[idx])


    //   console.log('dataEdit' + JSON.stringify(data))

    //   let response = await fetch(webapiurl, {
    //     method: "post",
    //     body:data,
    //     headers: {
    //       Accept: "*/*",
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   let responseJSON = await response.json();
    //   console.log('response in edit measurement=' + JSON.stringify(responseJSON))
    //   // if(responseJSON.status==true){

    //   // } else {
    //   //   Alert.alert('',"Please Try Again!",[{text:'Ok', style:'cancel'}])
    //   // }
    // });2w
    const FormData = require('form-data');
    refInputsWidth.current.map(async (item, idx) => {

      let data = new FormData();
      data.append('order_request_id', order_id);
      data.append('measurement_id', measurementDetails[idx].measurement_id);
      data.append('product', refInputs.current[idx]);
      data.append('Measurement_type', refInputsSelected.current[idx]);
      // data.append('previous_measurement_type', 'Meter');
      data.append('style', refInputsStyle.current[idx]);
      data.append('color', refInputsColor.current[idx]);
      data.append('location', refInputsLocation.current[idx]);
      data.append('quantity', refInputsQuantity.current[idx]);
      data.append('width', refInputsWidth.current[idx]);
      data.append('width2', refInputsWidth2.current[idx]);
      data.append('height', refInputsHeight.current[idx]);
      data.append('height2', refInputsHeight2.current[idx]);
      data.append('mounting', refInputsMounting.current[idx]);
      data.append('lifting_systems', refInputLift.current[idx]);
      data.append('frame_color', refInputFrameColor.current[idx]);
      data.append('control_left', refInputsControl.current[idx]);
      data.append('control_right', refInputsControl.current[idx]);
      data.append('baseboards', refInputsBaseboards.current[idx]);
      data.append('cord_details', refInputsCord.current[idx]);
      data.append('side_channel', refInputsSideChannel.current[idx]);
      data.append('side_channel_color', refInputsSideChannelColor.current[idx]);
      data.append('bottom_channel', refInputsBottomChannel.current[idx]);
      data.append('bottom_channel_color', refInputsBottomChannelColor.current[idx]);
      data.append("bottom_rail", refInputsBottomRail.current[idx])
      data.append("bottom_rail_color", refInputsBottomRailColor.current[idx])
      data.append("valance", refInputsValance.current[idx])
      data.append("valance_color", refInputsValanceColor.current[idx])
      // data.append('mechanism', 'fdsfdsfdsfds');
      // data.append('mechanism_color', 'white');
      data.append('work_extra', refInputsExtraWork.current[idx]);
      data.append('remarks', refInputsRemarks.current[idx]);
      console.log(data, 'dataEdit')
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://sarabella.ca/backend/APIs/EditMeasurement/EditMeasurement.php',
        headers: { "Accept": "application/json, text/plain, /", "Content-Type": "multipart/form-data" },

        data: data
      };

      await axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data), 'dummy');
          Alert.alert('', "Measurement Updated Successfully", [{
            text: 'Ok', style: 'cancel', onPress: async () => {
              //   await AsyncStorage.setItem("measurn_data",JSON.stringify(measurementDetails));
              // props.navigation.navigate('ViewMeasurnment',{
              //   order_id: order_id,
              //   measurnment: measurementDetails,
              //   order_request: props.route.params.order_request,
              //   date_of_visit: props.route.params.date_of_visit,
              //   S_T_V: props.route.params.S_T_V,
              //   Request_by_name: props.route.params.Request_by_name,
              //   contact_no: props.route.params.contact_no,
              //   visit_address: props.route.params.visit_address,
              //   cDate: props.route.params.cDate,
              //   quote_details:props.route.params.quote_details,
              // })

              props.navigation.navigate("CustomerList")
            }
          }])
        })
        .catch((error) => {
          console.log(error);
        });

    });
  }


  const addMeasurnment = async () => {
    AsyncStorage.setItem('screenBoolean', "false")
    setApiLoader(true)
    let webApiUrl = EnvVariables.API_HOST + `APIs/AddMeasurement/AddMeasurement.php`;
    await axios.post(webApiUrl, measurnment).then(async (res) => {
      console.log('response in view measurnment=' + JSON.stringify(res.data))
      let apiUrl = EnvVariables.API_HOST + `APIs/CreateAQuote/CreateAQuote.php?orid=${order_id}&loggedIn_user_id=${id}`;
      console.log('apiurl in viw measurement=' + apiUrl)
      // https://refuel.site/projects/sarabella/APIs/CreateAQuote/CreateAQuote.php?orid=
      await axios.get(apiUrl).then((response) => {
        // console.log('response of create quote='+JSON.stringify(response.data));
        console.log('quote id in create quote=' + JSON.stringify(response.data));
        //props.route.params.cleanup();
        props.navigation.navigate('CreateQuote', {
          order_id: order_id,
          measurnment: measurnment,
          order_request: order_request,
          date_of_visit: date_of_visit,
          S_T_V: S_T_V,
          Request_by_name: Request_by_name,
          contact_no: contact_no,
          visit_address: visit_address,
          cDate: cDate,
          createQuoteResponse: response.data.Measurement_Items,
          Quotation_no: response.data.quote_data_list.Quotation_no,
          quote_status: response.data.quote_data_list.quote_status,
          Expiry_date: response.data.quote_data_list.Expiry_date,
          created_date: response.data.quote_price_data != null ? response.data.quote_price_data.created_date : null, /// write condition for null
          first_name: response.data.Customer_data.first_name,
          quote_id: response.data.quote_data_list.Quote_id,
          email: response.data.Customer_data.email
        })
      }).catch((err) => {
        setApiLoader(false);
        console.log('errrr=', err)
      })
    }).catch((err) => console.log('e==', err))
  }

  const addInput = (details) => {
    console.log("addInput details = =", JSON.stringify(details))
    refInputs.current.push(details.product);
    refInputsStyle.current.push(details.style);
    refInputsColor.current.push(details.color);
    refInputsLocation.current.push(details.location);
    refInputsQuantity.current.push(details.quantity);
    refInputsWidth.current.push(details.width);
    refInputsWidth2.current.push(details.labelWidth);
    refInputsHeight.current.push(details.height);
    refInputsHeight2.current.push(details.labelHeight);
    refInputLift.current.push(details.labelLift);
    refInputFrameColor.current.push(details.labelFrameColor);
    refInputsMounting.current.push(details.mounting);
    refInputsBaseboards.current.push(details.baseboards);
    refInputsSideChannel.current.push(details.side_channel);
    refInputsSideChannelColor.current.push(details.side_channel_color);
    refInputsBottomChannel.current.push(details.bottom_channel);
    refInputsBottomChannelColor.current.push(details.bottom_channel_color);
    refInputsBottomRail.current.push(details.bottom_rail);
    refInputsBottomRailColor.current.push(details.bottom_rail_color);
    refInputsValance.current.push(details.valance);
    refInputsValanceColor.current.push(details.valance_color);
    refInputsExtraWork.current.push(details.work_extra);
    refInputsRemarks.current.push(details.remarks);
    refInputsSelected.current.push(details.measurement_type);
    refInputsControl.current.push(details.control_right);
    refInputsCord.current.push(details.cord_details);
    setNumInputs((value) => value + 1);
  };

  const removeInput = (i) => {
    refInputs.current.splice(i, 1)[0];
    refInputsStyle.current.splice(i, 1)[0];
    refInputsColor.current.splice(i, 1)[0];
    refInputsLocation.current.splice(i, 1)[0];
    refInputsQuantity.current.splice(i, 1)[0];
    refInputsWidth.current.splice(i, 1)[0];
    refInputsWidth2.current.splice(i, 1)[0];
    refInputsHeight.current.splice(i, 1)[0];
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
    refInputsCord.current.splice(i, 1)[0];
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
            deactiveColor="lightgray"
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
        />
        <TextInput
          mode="outlined"
          onChangeText={(value) => setInputValueLocation(i, value)}
          value={refInputsLocation.current[i]}
          style={styles.textInputStyle}
          label="Enter Location*"
        />
        <TextInput
          mode="outlined"
          onChangeText={(value) => setInputValueQuantity(i, value)}
          value={refInputsQuantity.current[i]}
          style={styles.textInputStyle}
          label="Enter Quantity*"
          keyboardType="number-pad"
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
            value={refInputsWidth.current[i]}
            style={styles.flexDirectionText}
            //style={styles.textInputStyle}
            label="Enter Width*"
            keyboardType="number-pad"
          />
          <Icon name="add-sharp" size={30} style={{ alignSelf: "center" }} />
          <Dropdown
            style={[styles.dropdown1, isFocusWidth && { borderColor: "black" }]}
            placeholderStyle={{ fontSize: 16 }}
            containerStyle={{ top: Platform.OS == 'android' && -30 }}
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
              //setValueWidth(item.value);
              setInputValueWidth2(i, item.value);
              setValueWidth(item.value);
              setIsFocusWidth(false);
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
            value={refInputsHeight.current[i]}
            style={styles.flexDirectionText}
            //style={styles.textInputStyle}
            label="Enter Height*"
            keyboardType="number-pad"
          />
          <Icon name="add-sharp" size={30} style={{ alignSelf: "center" }} />
          {/* <Dropdown
            style={[styles.dropdown1, isFocusHeight && { borderColor: "black" }]}
            placeholderStyle={{ fontSize: 16 }}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={data2}
            labelField="label"
            valueField="value"
            value={newArray.length!=0? newArray[i].label:refInputsHeight3.current[i]}
            onChange={(item)=>{
              setNewArray((value)=>[...value, item])
              const inputsHeight3 = refInputsHeight3.current;
              inputsHeight3[i] = item.label;
              setLabel(item.label);
              setValue(item.value);
            }}
          /> */}
          <Dropdown
            style={[styles.dropdown1, isFocusHeight && { borderColor: "black" }]}
            containerStyle={{ top: Platform.OS == 'android' && -30 }}
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
              setInputValueHeight2(i, item.value);
              setValueHeight(item.value);
              setIsFocusHeight(false);
            }}
          />
        </View>

        <TextInput
          mode="outlined"
          onChangeText={(value) => setInputValueCord(i, value)}
          value={refInputsCord.current[i]}
          keyboardType={"default"}
          style={styles.textInputStyle}
          label="Enter Cord*"
        />


        <View>
          <Dropdown
            style={[styles.dropdown1, isFocusLift && { borderColor: "black" }, { width: '100%' }]}
            placeholderStyle={{ fontSize: 16 }}
            containerStyle={{ top: Platform.OS == 'android' && -40 }}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={data3}
            labelField="label"
            valueField="value"
            placeholder={!isFocusLift ? "Lifting Systems" : "..."}
            value={refInputLift.current[i]}
            // value={(newArrayLift!=undefined && newArrayLift.length!=0)? newArrayLift[i].label:refInputLift.current[i]}
            onFocus={() => setIsFocusLift(true)}
            onBlur={() => setIsFocusLift(false)}
            onChange={(item) => {
              onLiftChange(i, item)

            }}
          />
          <Dropdown
            style={[styles.dropdown1, isFocusFrameColor && { borderColor: "black" }, { width: '100%' }]}
            containerStyle={{ top: Platform.OS == 'android' && -30 }}
            placeholderStyle={{ fontSize: 16 }}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={data4}
            labelField="label"
            valueField="value"
            placeholder={!isFocusFrameColor ? "Frame Color" : "..."}
            value={refInputFrameColor.current[i]}
            //value={newArrayFrameColor.length!=0? newArrayFrameColor[i].label:refInputFrameColor.current[i]}
            onFocus={() => setIsFocusFrameColor(true)}
            onBlur={() => setIsFocusFrameColor(false)}
            onChange={(item) => {
              setInputValueFrameColor(i, item.label);
              setValueFrame(item.value)
              setIsFocusFrameColor(false);
            }}
          />
        </View>

        <View style={styles.controlView}>
          <Text style={{ alignSelf: "center", marginTop: 10 }}>Control</Text>

          <View style={{ marginLeft: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
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

        {/* <View style={styles.controlView}>
          <Text style={{ alignSelf: "center",marginTop:10 }}>Control</Text>
  
          <View style={{ marginLeft:20,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <RadioButtonRN
                boxStyle={{ width: "40%" }}
                style={{ flexDirection: "row" }}
                textStyle={{ marginLeft: 10 }}
                data={data_control}
                box={false}
                animationTypes={["zoomIn"]}
                activeColor="red"
                boxActiveBgColor="red"
                deactiveColor="black"
                value={refInputsControl.current[i]}
                // selectedBtn={(e) => setSelected(e.label)}
                selectedBtn={(e) => setInputControl(i, e.label)}
                icon={
                  <Icon name="checkmark-circle-outline" size={25} color="#2c9dd1" />
                }
              />
          </View>
        </View> */}
        {/* 
        <View style={styles.controlView}>
          <Text style={{ alignSelf: "center" }}>Control</Text>
          <TextInput
            style={{...styles.controlText, marginHorizontal:'5%'}}
            mode="outlined"
            outlineColor="grey"
            label={"Left"}
          />
          <TextInput
            style={styles.controlText}
            mode="outlined"
            outlineColor="grey"
            label={"Right"}
          />
        </View> */}

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
        />
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
        ["style"]: refInputsStyle.current[idx],
        ["color"]: refInputsColor.current[idx],
        ["location"]: refInputsLocation.current[idx],
        ["quantity"]: refInputsQuantity.current[idx],
        ["width"]: refInputsWidth.current[idx],
        ["width2"]: refInputsWidth2.current[idx],
        ["height"]: refInputsHeight.current[idx],
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
        ["cord_details"]: refInputsCord.current[idx],
        ["control_left"]: control,
        ["control_right"]: control,
      };
    });
  }
  console.log("measurnmentHAIII" + JSON.stringify(measurnment));
  useEffect(() => {
    //setCustomerID(props.route.params.customerId)
    //  props.navigation.addListener("focus", () => {

    setApiLoader(true);
    getMeasurementData()
    // let webApiUrl =
    //   EnvVariables.API_HOST + "APIs/ViewSingleJobDetails/ViewSingleJobDetails.php?loggedIn_user_id=482&order_request_id=" + props?.route?.params?.order_id;

    // console.log("webApiUrlwebApiUrl", webApiUrl);
    // fetch(webApiUrl, {
    //   method: "GET",
    //   headers: new Headers({
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     // "Authorization": authtoken,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log("singleUserDetails11", responseJson?.Measurement_Data);
    //     if (responseJson.status == true) {
    //       let reversed = responseJson;

    //       console.log(reversed, 'EDITTTTT')
    //       setJobabc(reversed.Output);
    //       setApiLoader(false);
    //     }
    //   })
    //   .catch((error) => console.log(error));

    //  });
    // refInputs.current.map((item, idx) => {
    //   console.log(item, 'refffff')
    // })
  }, [refreshing, props.route.params]);
  useEffect(() => {
    refInputs.current.map((item, idx) => {
      console.log(item, 'refffff')
    })
  }, [refInputs])
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
      // setDataLoaded(true);
      setApiLoader(false);
    });
  }, []);
  const onRefresh = useCallback(async () => {

    setRefreshing(true);

    // let webApiUrl =
    //   EnvVariables.API_HOST + "APIs/ViewSingleJobDetails/ViewSingleJobDetails.php?loggedIn_user_id=482&order_request_id=" + props.route.params.order_request_id;

    // console.log("webApiUrlwebApiUrl", webApiUrl);
    // fetch(webApiUrl, {
    //   method: "GET",
    //   headers: new Headers({
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     // "Authorization": authtoken,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log("singleUserDetails", responseJson);
    //     if (responseJson.status == true) {
    //       let reversed = responseJson;

    //       // console.log(reversed,'WWWWWWWWWWWWWWWW')
    //       setJobabc(reversed.Output);

    //       setRefreshing(false);
    //     }
    //   })
    //   .catch((error) => console.log(error));
    getMeasurementData()
    setRefreshing(false);
  }, []);


  const renderItem = ({ item }) => {
    return (
      <View>


        {item.Measurement_Data && item.Measurement_Data.map((values, i) => (
          <View style={styles.individualBoxView}>
            <View key={values.measurement_id}>



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
                    deactiveColor="lightgray"
                    // value={values.measurement_type}
                    
                    // value={refInputsSelected.current[i]}
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
                  // value={refInputs.current[i]}
                  defaultValue={values.product}
                  // value={values.product}
                  style={styles.textInputStyle}
                  editable={true}
                  label="Enter Product Name*"
                />
                <View style={{ flexDirection: 'row' }}>

                  <TextInput
                    mode="outlined"
                    onChangeText={(value) => setInputValueLocation(i, value)}
                    // value={refInputsLocation.current[i]}
                    defaultValue={values.location}
                    style={styles.textInputStyle}
                    label="Enter Location*"
                  />
                  <TouchableOpacity onPress={() => { OpenModal(i) }} style={{ borderWidth: imageErrors[i] || false ? 2 : 1, borderColor: imageErrors[i] || false ? 'red' : 'gray', borderRadius: 5, width: '20%', justifyContent: 'center', height: 50, alignItems: 'center', marginTop: 6 }}>
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
                  // value={refInputsQuantity.current[i]}
                  defaultValue={values.quantity}
                  style={styles.textInputStyle}
                  label="Enter Quantity*"
                  keyboardType={Platform.OS == 'android' ? "number-pad" : "decimal-pad"}
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
                    // value={refInputsWidth.current[i]}
                    defaultValue={values.width}
                    style={styles.flexDirectionText}
                    //style={styles.textInputStyle}
                    label="Enter Width*"
                    keyboardType={Platform.OS == 'android' ? "number-pad" : "decimal-pad"}
                  />
                  <Icon name="add-sharp" size={30} style={{ alignSelf: "center" }} />
                  <Dropdown
                    style={[styles.dropdown1, isFocusWidth && { borderColor: "black" }]}
                    placeholderStyle={{ fontSize: 16 }}
                    containerStyle={{ top: Platform.OS == 'android' && -30 }}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={data2}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocusWidth ? "Enter Width" : "..."}
                    // value={refInputsWidth2.current[i]}
                    defaultValue={values.width2}
                    //value={newArrayWidth.length!=0? newArrayWidth[i].label:refInputsWidth2.current[i]}
                    onFocus={() => setIsFocusWidth(true)}
                    onBlur={() => setIsFocusWidth(false)}
                    onChange={(item) => {
                      //setValueWidth(item.value);
                      setInputValueWidth2(i, item.value);
                      setValueWidth(item.value);
                      setIsFocusWidth(false);
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
                    defaultValue={values.height}
                    style={styles.flexDirectionText}
                    //style={styles.textInputStyle}
                    label="Enter Height*"
                    keyboardType={Platform.OS == 'android' ? "number-pad" : "decimal-pad"}
                  />
                  <Icon name="add-sharp" size={30} style={{ alignSelf: "center" }} />
                  {/* <Dropdown
            style={[styles.dropdown1, isFocusHeight && { borderColor: "black" }]}
            placeholderStyle={{ fontSize: 16 }}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={data2}
            labelField="label"
            valueField="value"
            value={newArray.length!=0? newArray[i].label:refInputsHeight3.current[i]}
            onChange={(item)=>{
              setNewArray((value)=>[...value, item])
              const inputsHeight3 = refInputsHeight3.current;
              inputsHeight3[i] = item.label;
              setLabel(item.label);
              setValue(item.value);
            }}
          /> */}
                  <Dropdown
                    style={[styles.dropdown1, isFocusHeight && { borderColor: "black" }]}
                    containerStyle={{ top: Platform.OS == 'android' && -30 }}
                    placeholderStyle={{ fontSize: 16 }}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={data2}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocusHeight ? "Enter Height" : "..."}
                    // value={refInputsHeight2.current[i]}
                    defaultValue={values.height2}
                    //value={newArray.length!=0? newArray[i].label:refInputsHeight2.current[i]}
                    onFocus={() => setIsFocusHeight(true)}
                    onBlur={() => setIsFocusHeight(false)}
                    onChange={(item) => {
                      setInputValueHeight2(i, item.value);
                      setValueHeight(item.value);
                      setIsFocusHeight(false);
                    }}
                  />
                </View>

                <TextInput
                  mode="outlined"
                  onChangeText={(value) => setInputValueCord(i, value)}
                  // value={refInputsCord.current[i]}
                  defaultValue={values.cord_details}
                  keyboardType={"default"}
                  style={styles.textInputStyle}
                  label="Enter Cord*"
                />


                <View>
                  <Dropdown
                    style={[styles.dropdown1, isFocusLift && { borderColor: "black" }, { width: '100%' }]}
                    placeholderStyle={{ fontSize: 16 }}
                    containerStyle={{ top: Platform.OS == 'android' && -40 }}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={data3}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocusLift ? "Lifting Systems" : "..."}
                    // value={refInputsHeight.current[i]}
                    defaultValue={values.height}
                    // value={(newArrayLift!=undefined && newArrayLift.length!=0)? newArrayLift[i].label:refInputLift.current[i]}
                    onFocus={() => setIsFocusLift(true)}
                    onBlur={() => setIsFocusLift(false)}
                    onChange={(item) => {
                      setInputValueLift(i, item.label);
                      setValueLift(item.value)
                      setIsFocusLift(false);
                    }}
                  />
                  <Dropdown
                    style={[styles.dropdown1, isFocusFrameColor && { borderColor: "black" }, { width: '100%' }]}
                    containerStyle={{ top: Platform.OS == 'android' && -30 }}
                    placeholderStyle={{ fontSize: 16 }}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={data4}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocusFrameColor ? "Frame Color" : "..."}
                    // value={refInputsHeight2.current[i]}
                    defaultValue={values.height2}
                    //value={newArrayFrameColor.length!=0? newArrayFrameColor[i].label:refInputFrameColor.current[i]}
                    onFocus={() => setIsFocusFrameColor(true)}
                    onBlur={() => setIsFocusFrameColor(false)}
                    onChange={(item) => {
                      setInputValueFrameColor(i, item.label);
                      setValueFrame(item.value)
                      setIsFocusFrameColor(false);
                    }}
                  />
                </View>

                <View style={styles.controlView}>
                  <Text style={{ alignSelf: "center", marginTop: 10 }}>Control</Text>

                  <View style={{ marginLeft: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
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
                      // value={refInputsControl.current[i]}
                      defaultValue={values.control_left}
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
                  // value={refInputsStyle.current[i]}
                  defaultValue={values.style}
                  style={styles.textInputStyle}
                  label="Enter Style Name"
                />
                <TextInput
                  mode="outlined"
                  onChangeText={(value) => setInputValueColor(i, value)}
                  // value={refInputsColor.current[i]}
                  defaultValue={values.color}
                  style={styles.textInputStyle}
                  label="Enter Color"
                />

                {/* <View style={styles.controlView}>
          <Text style={{ alignSelf: "center",marginTop:10 }}>Control</Text>
  
          <View style={{ marginLeft:20,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <RadioButtonRN
                boxStyle={{ width: "40%" }}
                style={{ flexDirection: "row" }}
                textStyle={{ marginLeft: 10 }}
                data={data_control}
                box={false}
                animationTypes={["zoomIn"]}
                activeColor="red"
                boxActiveBgColor="red"
                deactiveColor="black"
                value={refInputsControl.current[i]}
                // selectedBtn={(e) => setSelected(e.label)}
                selectedBtn={(e) => setInputControl(i, e.label)}
                icon={
                  <Icon name="checkmark-circle-outline" size={25} color="#2c9dd1" />
                }
              />
          </View>
        </View> */}
                {/* 
        <View style={styles.controlView}>
          <Text style={{ alignSelf: "center" }}>Control</Text>
          <TextInput
            style={{...styles.controlText, marginHorizontal:'5%'}}
            mode="outlined"
            outlineColor="grey"
            label={"Left"}
          />
          <TextInput
            style={styles.controlText}
            mode="outlined"
            outlineColor="grey"
            label={"Right"}
          />
        </View> */}

                <TextInput
                  mode="outlined"
                  onChangeText={(value) => setInputValueMounting(i, value)}
                  // value={refInputsMounting.current[i]}
                  defaultValue={values.mounting}
                  style={styles.textInputStyle}
                  label="Enter Mounting Name"
                />
                <TextInput
                  mode="outlined"
                  onChangeText={(value) => setInputValueBaseboard(i, value)}
                  // value={refInputsBaseboards.current[i]}
                  defaultValue={values.baseboards}
                  style={styles.textInputStyle}
                  label="Enter Baseboard Name"
                />
                <TextInput
                  mode="outlined"
                  onChangeText={(value) => setInputValueSideChannel(i, value)}
                  // value={refInputsSideChannel.current[i]}
                  defaultValue={values.side_channel}
                  style={styles.textInputStyle}
                  label="Enter Side Channel Name"
                />
                <TextInput
                  mode="outlined"
                  onChangeText={(value) => setInputValueSideChannelColor(i, value)}
                  // value={refInputsSideChannelColor.current[i]}
                  defaultValue={values.side_channel_color}
                  style={styles.textInputStyle}
                  label="Enter Side Channel Color"
                />
                <TextInput
                  mode="outlined"
                  onChangeText={(value) => setInputValueBottomChannel(i, value)}
                  // value={refInputsBottomChannel.current[i]}
                  defaultValue={values.bottom_channel}
                  style={styles.textInputStyle}
                  keyboardType='name-phone-pad'
                  label="Enter Bottom Channel"
                />
                <TextInput
                  mode="outlined"
                  onChangeText={(value) => setInputValueBottomChannelColor(i, value)}
                  // value={refInputsBottomChannelColor.current[i]}
                  defaultValue={values.bottom_channel_color}
                  style={styles.textInputStyle}
                  label="Enter Bottom Channel Color"
                />
                <TextInput
                  mode="outlined"
                  onChangeText={(value) => setInputValueBottomRail(i, value)}
                  // value={refInputsBottomRail.current[i]}
                  defaultValue={values.bottom_rail}
                  style={styles.textInputStyle}
                  keyboardType='name-phone-pad'
                  label="Enter Bottom Rail"
                />
                <TextInput
                  mode="outlined"
                  onChangeText={(value) => setInputValueBottomRailColor(i, value)}
                  // value={refInputsBottomRailColor.current[i]}
                  defaultValue={values.bottom_rail_color}
                  style={styles.textInputStyle}
                  label="Enter Bottom Rail Color"
                />
                <TextInput
                  mode="outlined"
                  onChangeText={(value) => setInputValueValance(i, value)}
                  // value={refInputsValance.current[i]}
                  defaultValue={values.valance}
                  style={styles.textInputStyle}
                  keyboardType='name-phone-pad'
                  label="Enter Valance"
                />
                <TextInput
                  mode="outlined"
                  onChangeText={(value) => setInputValueValanceColor(i, value)}
                  // value={refInputsValanceColor.current[i]}
                  defaultValue={values.valance_color}
                  style={styles.textInputStyle}
                  label="Enter Valance Color"
                />
                <TextInput
                  mode="outlined"
                  onChangeText={(value) => setInputExtraWork(i, value)}
                  // value={refInputsExtraWork.current[i]}
                  defaultValue={values.work_extra}
                  style={styles.textInputStyle}
                  label="Extra Work"
                />
                <TextInput
                  mode="outlined"
                  onChangeText={(value) => setInputRemark(i, value)}
                  // value={refInputsRemarks.current[i]}
                  defaultValue={values.remarks}
                  style={styles.textInputStyle}
                  label="Remarks"
                />



                {/* {i != 0 ? (
          <View style={{ width: "40%", marginBottom: 10 }}>
            <ButtonComp title={"-Remove"} onPress={() => removeInput(i)} />
          </View>
        ) : null} */}
              </View>





            </View>
          </View>
        ))}

        {inputs}
        {/* <View
          style={{
            width: "40%",
            alignSelf: "center",
            marginBottom: 10,
            marginTop: 15,
          }}
        >

          <ButtonComp title={"+ Add more"} onPress={addInput} />
        </View>
        <View
          style={{ width: "80%", alignSelf: "center", marginBottom: 20 }}
        >
          <ButtonComp
            title={"Edit Measurement"}
            onPress={async () => {


              AsyncStorage.setItem("screenBoolean", "true");
              setScreenValue(true);
              // navigate to next screen
              props.navigation.navigate("EditCustomerMeasurement", {
                screenName: "EditCustomerMeasurement",
                order_id: props.route.params.order_request_id,
                measurnment: measurnment,
                order_request: order_request,
                date_of_visit: date_of_visit,
                S_T_V: S_T_V,
                Request_by_name: Request_by_name,
                contact_no: contact_no,
                visit_address: visit_address,
                customerId: props.route.params.customerId,
                // customerId: customerId,
                cDate: cDate,
                created_date: created_date,
                quote_details: [],
              });
            }}

          />
        </View> */}
      </View>
    );
  };


  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      {/* {apiLoader ? (
          <Splash style={{alignItems:'center', justifyContent:'center', flex:1}}>
          <Image
           source={require("../../../assets/logo.png")}
           resizeMode="contain"
           resizeMethod="scale"
           style={{ width: 160, height: 100 }}
         />
         <Text style={{fontWeight:'bold'}}>Loading...</Text>
       </Splash>): */}
      <View style={{ flex: 1, backgroundColor: '#c9d1fb' }}>
        <ImageBackground
          source={require("./../../../assets/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <ScrollView showsVerticalScrollIndicator={false} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
            <View style={{ marginTop: 20, marginHorizontal: 10 }}>
              {/* {inputs} */}
              {/* <FlatList


                data={measurementDetails}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              /> */}
              {measurementDetails && measurementDetails.map((values, i) => (
                <View style={styles.individualBoxView}>
                  <View key={values.measurement_id}>



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
                          // initial={'CM'}
                          //animationTypes={['pulse']}
                          //animationTypes={['shake']}
                          //animationTypes={['rotate']}
                          activeColor="black"
                          boxActiveBgColor="black"
                          deactiveColor="lightgray"
                          value={values.measurement_type}
                          
                          // value={refInputsSelected.current[i]}
                          // selectedBtn={(e) => setSelected(e.label)}
                          selectedBtn={(e) =>{
                              setInputSelected(i, e.label)

                          }}
                        // icon={
                        //   <Icon name="checkmark-circle-outline" size={25} color="#2c9dd1" />
                        // }
                        />
                      </View>
                      <TextInput
                        mode="outlined"
                        onChangeText={(value) => setInputValue(i, value)}
                        // value={refInputs.current[i]}
                        defaultValue={values.product}
                        // value={values.product}
                        style={styles.textInputStyle}
                        editable={true}
                        label="Enter Product Name*"
                      />
                      <View style={{ flexDirection: 'row' }}>

                        <TextInput
                          mode="outlined"
                          onChangeText={(value) => setInputValueLocation(i, value)}
                          // value={refInputsLocation.current[i]}
                          defaultValue={values.location}
                          style={{ width: '80%', backgroundColor: '#fff', borderWidth: 0 }}
                          label="Enter Location*"
                        />
                        <TouchableOpacity onPress={() => { OpenModal(i) }} style={{ borderWidth:  1, borderColor: 'gray', borderRadius: 5, width: '20%', justifyContent: 'center', height: 50, alignItems: 'center', marginTop: 6 }}>
                          {
                            values?.product_image ?
                              <Image
                                source={{
                                  uri:
                                    "https://sarabella.ca/backend/product_gallery/" +
                                    values?.product_image,
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
                        // value={refInputsQuantity.current[i]}
                        defaultValue={values.quantity}
                        style={styles.textInputStyle}
                        label="Enter Quantity*"
                        keyboardType="number-pad"
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
                          // value={refInputsWidth.current[i]}
                          defaultValue={values.width}
                          style={styles.flexDirectionText}
                          //style={styles.textInputStyle}
                          label="Enter Width*"
                          keyboardType="number-pad"
                        />
                        <Icon name="add-sharp" size={30} style={{ alignSelf: "center" }} />
                        <Dropdown
                          style={[styles.dropdown1, isFocusWidth && { borderColor: "black" }]}
                          placeholderStyle={{ fontSize: 16 }}
                          containerStyle={{ top: Platform.OS == 'android' && -30 }}
                          selectedTextStyle={styles.selectedTextStyle}
                          iconStyle={styles.iconStyle}
                          data={data2}
                          labelField="label"
                          valueField="value"
                          placeholder={!isFocusWidth ? "Enter Width" : "..."}
                          // value={refInputsWidth2.current[i]}
                          defaultValue={values.width2}
                          //value={newArrayWidth.length!=0? newArrayWidth[i].label:refInputsWidth2.current[i]}
                          onFocus={() => setIsFocusWidth(true)}
                          onBlur={() => setIsFocusWidth(false)}
                          onChange={(item) => {
                            //setValueWidth(item.value);
                            setInputValueWidth2(i, item.value);
                            setValueWidth(item.value);
                            setIsFocusWidth(false);
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
                          defaultValue={values.height}
                          style={styles.flexDirectionText}
                          //style={styles.textInputStyle}
                          label="Enter Height*"
                          keyboardType="number-pad"
                        />
                        <Icon name="add-sharp" size={30} style={{ alignSelf: "center" }} />
                        {/* <Dropdown
            style={[styles.dropdown1, isFocusHeight && { borderColor: "black" }]}
            placeholderStyle={{ fontSize: 16 }}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={data2}
            labelField="label"
            valueField="value"
            value={newArray.length!=0? newArray[i].label:refInputsHeight3.current[i]}
            onChange={(item)=>{
              setNewArray((value)=>[...value, item])
              const inputsHeight3 = refInputsHeight3.current;
              inputsHeight3[i] = item.label;
              setLabel(item.label);
              setValue(item.value);
            }}
          /> */}
                        <Dropdown
                          style={[styles.dropdown1, isFocusHeight && { borderColor: "black" }]}
                          containerStyle={{ top: Platform.OS == 'android' && -30 }}
                          placeholderStyle={{ fontSize: 16 }}
                          selectedTextStyle={styles.selectedTextStyle}
                          iconStyle={styles.iconStyle}
                          data={data2}
                          labelField="label"
                          valueField="value"
                          placeholder={!isFocusHeight ? "Enter Height" : "..."}
                          // value={refInputsHeight2.current[i]}
                          defaultValue={values.height2}
                          //value={newArray.length!=0? newArray[i].label:refInputsHeight2.current[i]}
                          onFocus={() => setIsFocusHeight(true)}
                          onBlur={() => setIsFocusHeight(false)}
                          onChange={(item) => {
                            setInputValueHeight2(i, item.value);
                            setValueHeight(item.value);
                            setIsFocusHeight(false);
                          }}
                        />
                      </View>

                      <TextInput
                        mode="outlined"
                        onChangeText={(value) => setInputValueCord(i, value)}
                        // value={refInputsCord.current[i]}
                        defaultValue={values.cord_details}
                        keyboardType={"default"}
                        style={styles.textInputStyle}
                        label="Enter Cord*"
                      />


                      <View>
                        <Dropdown
                          style={[styles.dropdown1, isFocusLift && { borderColor: "black" }, { width: '100%' }]}
                          placeholderStyle={{ fontSize: 16 }}
                          containerStyle={{ top: Platform.OS == 'android' && -40 }}
                          selectedTextStyle={styles.selectedTextStyle}
                          iconStyle={styles.iconStyle}
                          data={data3}
                          labelField="label"
                          valueField="value"
                          placeholder={!isFocusLift ? "Lifting Systems" : "..."}
                          value={refInputsHeight.current[i]}
                          // defaultValue={1}
                          // value={(newArrayLift!=undefined && newArrayLift.length!=0)? newArrayLift[i].label:refInputLift.current[i]}
                          onFocus={() => setIsFocusLift(true)}
                          onBlur={() => setIsFocusLift(false)}
                          onChange={(item) => {
                            setInputValueLift(i, item.label);
                            setValueLift(item.value)
                            setIsFocusLift(false);
                          }}
                        />
                        <Dropdown
                          style={[styles.dropdown1, isFocusFrameColor && { borderColor: "black" }, { width: '100%' }]}
                          containerStyle={{ top: Platform.OS == 'android' && -30 }}
                          placeholderStyle={{ fontSize: 16 }}
                          selectedTextStyle={styles.selectedTextStyle}
                          iconStyle={styles.iconStyle}
                          data={data4}
                          labelField="label"
                          valueField="value"
                          placeholder={!isFocusFrameColor ? "Frame Color" : "..."}
                          // value={refInputsHeight2.current[i]}
                          defaultValue={values.height2}
                          //value={newArrayFrameColor.length!=0? newArrayFrameColor[i].label:refInputFrameColor.current[i]}
                          onFocus={() => setIsFocusFrameColor(true)}
                          onBlur={() => setIsFocusFrameColor(false)}
                          onChange={(item) => {
                            setInputValueFrameColor(i, item.label);
                            setValueFrame(item.value)
                            setIsFocusFrameColor(false);
                          }}
                        />
                      </View>

                      <View style={styles.controlView}>
                        <Text style={{ alignSelf: "center", marginTop: 10 }}>Control</Text>

                        <View style={{ marginLeft: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
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
                            // value={refInputsControl.current[i]}
                            defaultValue={values.control_left}
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
                        // value={refInputsStyle.current[i]}
                        defaultValue={values.style}
                        style={styles.textInputStyle}
                        label="Enter Style Name"
                      />
                      <TextInput
                        mode="outlined"
                        onChangeText={(value) => setInputValueColor(i, value)}
                        // value={refInputsColor.current[i]}
                        defaultValue={values.color}
                        style={styles.textInputStyle}
                        label="Enter Color"
                      />

                      {/* <View style={styles.controlView}>
          <Text style={{ alignSelf: "center",marginTop:10 }}>Control</Text>
  
          <View style={{ marginLeft:20,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <RadioButtonRN
                boxStyle={{ width: "40%" }}
                style={{ flexDirection: "row" }}
                textStyle={{ marginLeft: 10 }}
                data={data_control}
                box={false}
                animationTypes={["zoomIn"]}
                activeColor="red"
                boxActiveBgColor="red"
                deactiveColor="black"
                value={refInputsControl.current[i]}
                // selectedBtn={(e) => setSelected(e.label)}
                selectedBtn={(e) => setInputControl(i, e.label)}
                icon={
                  <Icon name="checkmark-circle-outline" size={25} color="#2c9dd1" />
                }
              />
          </View>
        </View> */}
                      {/* 
        <View style={styles.controlView}>
          <Text style={{ alignSelf: "center" }}>Control</Text>
          <TextInput
            style={{...styles.controlText, marginHorizontal:'5%'}}
            mode="outlined"
            outlineColor="grey"
            label={"Left"}
          />
          <TextInput
            style={styles.controlText}
            mode="outlined"
            outlineColor="grey"
            label={"Right"}
          />
        </View> */}

                      <TextInput
                        mode="outlined"
                        onChangeText={(value) => setInputValueMounting(i, value)}
                        // value={refInputsMounting.current[i]}
                        defaultValue={values.mounting}
                        style={styles.textInputStyle}
                        label="Enter Mounting Name"
                      />
                      <TextInput
                        mode="outlined"
                        onChangeText={(value) => setInputValueBaseboard(i, value)}
                        // value={refInputsBaseboards.current[i]}
                        defaultValue={values.baseboards}
                        style={styles.textInputStyle}
                        label="Enter Baseboard Name"
                      />
                      <TextInput
                        mode="outlined"
                        onChangeText={(value) => setInputValueSideChannel(i, value)}
                        // value={refInputsSideChannel.current[i]}
                        defaultValue={values.side_channel}
                        style={styles.textInputStyle}
                        label="Enter Side Channel Name"
                      />
                      <TextInput
                        mode="outlined"
                        onChangeText={(value) => setInputValueSideChannelColor(i, value)}
                        // value={refInputsSideChannelColor.current[i]}
                        defaultValue={values.side_channel_color}
                        style={styles.textInputStyle}
                        label="Enter Side Channel Color"
                      />
                      <TextInput
                        mode="outlined"
                        onChangeText={(value) => setInputValueBottomChannel(i, value)}
                        // value={refInputsBottomChannel.current[i]}
                        defaultValue={values.bottom_channel}
                        style={styles.textInputStyle}
                        keyboardType='name-phone-pad'
                        label="Enter Bottom Channel"
                      />
                      <TextInput
                        mode="outlined"
                        onChangeText={(value) => setInputValueBottomChannelColor(i, value)}
                        // value={refInputsBottomChannelColor.current[i]}
                        defaultValue={values.bottom_channel_color}
                        style={styles.textInputStyle}
                        label="Enter Bottom Channel Color"
                      />
                      <TextInput
                        mode="outlined"
                        onChangeText={(value) => setInputValueBottomRail(i, value)}
                        // value={refInputsBottomRail.current[i]}
                        defaultValue={values.bottom_rail}
                        style={styles.textInputStyle}
                        keyboardType='name-phone-pad'
                        label="Enter Bottom Rail"
                      />
                      <TextInput
                        mode="outlined"
                        onChangeText={(value) => setInputValueBottomRailColor(i, value)}
                        // value={refInputsBottomRailColor.current[i]}
                        defaultValue={values.bottom_rail_color}
                        style={styles.textInputStyle}
                        label="Enter Bottom Rail Color"
                      />
                      <TextInput
                        mode="outlined"
                        onChangeText={(value) => setInputValueValance(i, value)}
                        // value={refInputsValance.current[i]}
                        defaultValue={values.valance}
                        style={styles.textInputStyle}
                        keyboardType='name-phone-pad'
                        label="Enter Valance"
                      />
                      <TextInput
                        mode="outlined"
                        onChangeText={(value) => setInputValueValanceColor(i, value)}
                        // value={refInputsValanceColor.current[i]}
                        defaultValue={values.valance_color}
                        style={styles.textInputStyle}
                        label="Enter Valance Color"
                      />
                      <TextInput
                        mode="outlined"
                        onChangeText={(value) => setInputExtraWork(i, value)}
                        // value={refInputsExtraWork.current[i]}
                        defaultValue={values.work_extra}
                        style={styles.textInputStyle}
                        label="Extra Work"
                      />
                      <TextInput
                        mode="outlined"
                        onChangeText={(value) => setInputRemark(i, value)}
                        // value={refInputsRemarks.current[i]}
                        defaultValue={values.remarks}
                        style={styles.textInputStyle}
                        label="Remarks"
                      />



                      {/* {i != 0 ? (
          <View style={{ width: "40%", marginBottom: 10 }}>
            <ButtonComp title={"-Remove"} onPress={() => removeInput(i)} />
          </View>
        ) : null} */}
                    </View>





                  </View>
                </View>
              ))}


              <View style={{ width: "40%", alignSelf: "center", marginBottom: 10, marginTop: 15 }}>
                {/* <ButtonComp title={"Remove"} onPress={removeInput(i)} /> */}
                <ButtonComp title={"+ Add more"} onPress={addInput} />
              </View>
              <View style={{ width: "80%", alignSelf: "center", marginBottom: 20 }}>
                <ButtonComp
                  title={"Submit"}
                  onPress={onSubmit}
                />
              </View>
            </View>
          </ScrollView>
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
                        onPress={() => OpenImage(imageIndex, item.gallery_image)}
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
        </ImageBackground>
      </View>
      {/* } */}

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
    shadowOffset: { height: 6, width: 6 }, shadowOpacity: 0.2, shadowRadius: 4, shadowColor: 'black'
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
  viewInfo: { justifyContent: 'flex-start', flexDirection: 'row', marginTop: 20 },
  textInfo: { fontWeight: '600', width: 160 },
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

export default EditCustomerMeasurement;
