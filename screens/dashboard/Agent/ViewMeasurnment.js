import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Image,
  Alert,
  RefreshControl
} from "react-native";
import axios from "axios";
import { RadioButton, TextInput, useTheme } from "react-native-paper";
import Colors from "../../../constant/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";
import Color from "../../../constant/Colors";
import RadioButtonRN from "radio-buttons-react-native";
import { Dropdown } from "react-native-element-dropdown";
import ButtonComp from "../../../components/ButtonComp";
import EnvVariables from "../../../constant/EnvVariables";
import Splash from "../../../components/Splash";
import AddMeasurnment from "./AddMeasurnment";
import { useNavigation } from "@react-navigation/native";
import { measure } from "react-native-reanimated";

// const navigation = useNavigation();
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

const ViewMeasurnment = (props) => {
  const [id, setId] = useState(undefined);
  const [userType, setUserType] = useState(undefined);
  const [isQuoteCreated, setIsQuotecreated] = useState(false);

  const [dataload, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);

  const getDetails = async () => {
    if (dataload == false) {
      setApiLoader(true);
      setId(await AsyncStorage.getItem("user_id"));
      setUserType(await AsyncStorage.getItem("user_type"));
      setApiLoader(false);
      setDataLoaded(true);
    }
  };

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
  const [singleUser, setSingleUser] = useState([])
  const [allMeasurementData, setAllMeasurementData] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {

      singleUser.forEach(function (obj) {
        if (obj.Measurement_Data != null) {
          // setRefreshing(true)
          var measurementData = obj.Measurement_Data;
          setAllMeasurementData(measurementData)
          console.log(measurementData, 'JJJKKK'); // This will log the array for each object
          // setRefreshing(false);

        }
      });
    
  }, [singleUser, refreshing])

console.log(singleUser,'singleUser')
  console.log(allMeasurementData, 'AllMeasure')
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

  console.log("c date=" + cDate);
  console.log(order_id, 'order_id')
  const [numInputs, setNumInputs] = useState(0);
  const refInputs = useRef([product]);
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
  console.log("ref inputs width=" + JSON.stringify(refInputsWidth2));
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

  const [screenValue, setScreenValue] = useState(false);
  const [screenValue1, setScreenValue1] = useState(false);

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

  const setInputControl = (index, value) => {
    refInputsControl.current[index];
    const inputsCurrent = refInputsControl.current;
    inputsCurrent[index] = value;
    setControl(value);
  };

  useEffect(() => {
    // if(dataload==false){
    //   console.log('inside use effecttttttttttttt')
    // setApiLoader(true)
    getDetails();
    console.log("view measurement id=" + JSON.stringify(props.route.params));
    if (props.route.params.screenName === "CustomerList") {
      if (props.route.params.quote_details[0].quote_details.length !== 0) {
        setIsQuotecreated(true);
      } else {
        setIsQuotecreated(false);
      }
    } else {
      if (props.route.params.quote_details.length !== 0) {
        setIsQuotecreated(true);
      } else {
        setIsQuotecreated(false);
      }
    }
    //   setApiLoader(false);
    //   setDataLoaded(true);
    // }
  }, [id, getDetails]);

  useFocusEffect(
    React.useCallback(() => {
      getDetails();
    }, [getDetails])
  );

  useEffect(() => {
    props.navigation.addListener("blur", () => {
      console.log("unblurred from view measurement");
      setApiLoader(true);
      setDataLoaded(false);
      // setSubmitPressed(false)
    });
  }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     alert('Screen focused')
  //     console.log("Props refresh = ",JSON.stringify(props));

  //     // Do something when the screen is focused
  //     return () => {
  //       alert('Screen was unfocused');
  //       // Do something when the screen is unfocused
  //       // Useful for cleanup functions
  //     };
  //   }, [])
  // );

  console.log(props.route.params.measurnment, 'ALLLLLLLLLL')

  var measurnment = props.route.params.measurnment;
  var order_id = props.route.params.order_id;
  var order_request = props.route.params.order_request;
  var date_of_visit = props.route.params.date_of_visit;
  var S_T_V = props.route.params.S_T_V;
  var Request_by_name = props.route.params.Request_by_name;
  var contact_no = props.route.params.contact_no;
  var visit_address = props.route.params.visit_address;
  var cDate = props.route.params.cDate;
  var customerId = props.route.params.customerId;
  var created_date = props.route.params.created_date;


  var newMeasurement = [...allMeasurementData, ...measurnment]
  console.log(newMeasurement, 'SHUBH')
  console.log("created date in view measurement=" + cDate);
  console.log("order request=" + order_request);
  console.log("measurnment=" + JSON.stringify(measurnment));
  console.log("user id=" + customerId);
  console.log("body=" + JSON.stringify({ email: contact_no }));

  //  const [submitPressed, setSubmitPressed]=useState(false)

  //  const submitMeasurnment=async()=>{
  //   AsyncStorage.setItem('screenBoolean', "false")
  //   setApiLoader(true)
  //   setSubmitPressed(true)
  //   let webApiUrl=EnvVariables.API_HOST+`APIs/AddMeasurement/AddMeasurement.php`;
  //   await axios.post(webApiUrl,measurnment).then(async(res)=>{
  //     console.log('response in view measurnment='+JSON.stringify(res.data))
  //   }).catch((err)=>{
  //     setApiLoader(false)
  //   }).finally(()=>{
  //     setApiLoader(false)
  //   })
  //  }
  const GetData = async () => {

    let AgentId = await AsyncStorage.getItem("user_id");

    setApiLoader(true);

    let webApiUrl =
      EnvVariables.API_HOST + "APIs/ViewSingleJobDetails/ViewSingleJobDetails.php?loggedIn_user_id=" + AgentId + "&order_request_id=" + order_id;

    console.log("webApiUrlwebApiUrl", webApiUrl);
    fetch(webApiUrl, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        // "Authorization": authtoken,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("singleUserDetailsVM", responseJson[0]?.Measurement_Data);
        if (responseJson.status == true) {
          let reversed = responseJson;

          // console.log(reversed,'WWWWWWWWWWWWWWWW')
          setSingleUser(reversed.Output);
          setApiLoader(false);
        }
      })
      .catch((error) => console.log(error));

  }
  const onRefresh = async () => {
    let AgentId = await AsyncStorage.getItem("user_id");
    setRefreshing(true)
    setApiLoader(true);

    let webApiUrl =
      EnvVariables.API_HOST + "APIs/ViewSingleJobDetails/ViewSingleJobDetails.php?loggedIn_user_id=" + AgentId + "&order_request_id=" + order_id;

    console.log("webApiUrlwebApiUrl", webApiUrl);
    fetch(webApiUrl, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        // "Authorization": authtoken,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("singleUserDetailsVM", responseJson[0]?.Measurement_Data);
        if (responseJson.status == true) {
          let reversed = responseJson;

          // console.log(reversed,'WWWWWWWWWWWWWWWW')
          setSingleUser(reversed.Output);
          setApiLoader(false);
          setRefreshing(false)
        }
      })
      .catch((error) => console.log(error));
  }

  const addMeasurnment = async () => {

    AsyncStorage.setItem("screenBoolean", "false");
    setApiLoader(true);
    let webApiUrl =
      EnvVariables.API_HOST + `APIs/AddMeasurement/AddMeasurement.php`;
    await axios
      .post(webApiUrl, measurnment)
      .then(async (res) => {
        console.log("response in view measurnment=" + JSON.stringify(res.data));
        let apiUrl =
          EnvVariables.API_HOST +
          `APIs/CreateAQuote/CreateAQuote.php?orid=${order_id}&loggedIn_user_id=${id}`;
        console.log("apiurl in viw measurement=" + apiUrl);
        // https://refuel.site/projects/sarabella/APIs/CreateAQuote/CreateAQuote.php?orid=
        await axios
          .get(apiUrl)
          .then((response) => {
            // console.log('response of create quote='+JSON.stringify(response.data));
            console.log(
              "quote id in create quote=" + JSON.stringify(response.data)
            );

            //props.route.params.cleanup();
            props.navigation.navigate("CreateQuote", {
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
              // created_date:cDate,
              created_date: created_date,
              // created_date:response.data.quote_price_data!=null? response.data.quote_price_data.created_date:null, /// write condition for null
              first_name: response.data.Customer_data.first_name,
              last_name: response.data.Customer_data.last_name,
              quote_id: response.data.quote_data_list.Quote_id,
              email: response.data.Customer_data.email,
            });
          })
          .catch((err) => {
            setApiLoader(false);
            console.log("errrr=", err);
          });
      })
      .catch((err) => console.log("e==", err));
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
  useEffect(() => {
    GetData()

  }, [])

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

        <TextInput
          mode="outlined"
          onChangeText={(value) => setInputValueLocation(i, value)}
          value={refInputsLocation.current[i]}
          style={styles.textInputStyle}
          label="Enter Location*"
          error={inputLocationErrors[i] || false}
        />
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

        {i == 0 ? (
          <View style={{ width: "40%", marginBottom: 10 }}>
            <ButtonComp title={"-Remove"} onPress={() => removeInput(i)} />
          </View>
        ) : null}
      </View>
    );
  }

  for (let j = 0; j < numInputs; j++) {
    measurnment = refInputs.current.map((item, idx) => {
      return {
        ["order_request_id"]: order_id,
        ["Measurement_type"]: refInputsSelected.current[idx],
        ["product"]: item,
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
    <View style={{ flex: 1, backgroundColor: "#c9d1fb" }}>
      <ImageBackground
        source={require("./../../../assets/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        {apiLoader == true ? (
          <Splash
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <Image
              source={require("../../../assets/logo.png")}
              resizeMode="contain"
              resizeMethod="scale"
              style={{ width: 160, height: 160 }}
            />
            <Text style={{ fontWeight: "bold" }}>Loading...</Text>
          </Splash>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={{ marginTop: 20, marginHorizontal: 10 }}>
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 20,
                  textAlign: "center",
                  color: "white",
                }}
              >
                Jobs Details
              </Text>
              {/* Assigned Job Details starts */}
              <View style={styles.individualBoxView}>
                <Text style={styles.individualBoxTextHeading}>
                  Assigned Job Details
                </Text>
                <View
                  style={{ justifyContent: "flex-start", flexDirection: "row" }}
                >
                  <Text style={styles.textHead}>Service </Text>
                  <Text
                    style={{
                      fontWeight: "normal",
                      textTransform: "capitalize",
                    }}
                  >
                    : {order_request}
                  </Text>
                </View>
                {Request_by_name && (
                  <View style={styles.assignedJobViews}>
                    <Text style={styles.textHead}>Requested by </Text>
                    <Text style={{ fontWeight: "normal" }}>
                      : {Request_by_name}
                    </Text>
                  </View>
                )}
                {date_of_visit && (
                  <View style={styles.assignedJobViews}>
                    <Text style={styles.textHead}>Date of visit </Text>
                    <Text style={{ fontWeight: "normal" }}>
                      : {date_of_visit}
                    </Text>
                  </View>
                )}
                {S_T_V && (
                  <View style={styles.assignedJobViews}>
                    <Text style={styles.textHead}>Time of visit </Text>
                    <Text style={{ fontWeight: "normal" }}>: {S_T_V}</Text>
                  </View>
                )}
                {contact_no && (
                  <View style={styles.assignedJobViews}>
                    <Text style={styles.textHead}>Contact No. </Text>
                    <Text style={{ fontWeight: "normal" }}>: {contact_no}</Text>
                  </View>
                )}
                {visit_address && (
                  <View style={styles.assignedJobViews}>
                    <Text style={styles.textHead}>Visit Address </Text>
                    <Text style={{ fontWeight: "normal" }}>
                      : {visit_address}
                    </Text>
                  </View>
                )}
                {cDate && (
                  <View
                    style={{
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      marginTop: 20,
                      marginBottom: 20,
                    }}
                  >
                    <Text style={styles.textHead}>Date of request </Text>
                    <Text style={{ fontWeight: "normal" }}>: {cDate}</Text>
                  </View>
                )}
              </View>
              {/* Assigned job details end */}
              {/* All Measurement DAta */}

              {/* ENd All */}



              {
                allMeasurementData != null ?
                  newMeasurement.map((value, index) => (
                    <View style={styles.individualBoxView} key={index}>
                      <Text style={styles.individualBoxTextHeading}>
                        Added Measurement Details
                        {console.log(value, "AAAAAAAAAAAAAAAAAAAAA")}
                      </Text>
                      <View
                        style={{
                          justifyContent: "flex-start",
                          flexDirection: "row",
                        }}
                      >
                        <Text style={styles.textHead}>Record No. </Text>
                        <Text style={{ fontWeight: "normal" }}>: {index + 1}</Text>
                      </View>
                      <View style={styles.assignedJobView}>
                        <Text style={styles.textHead}>Measurement Type </Text>
                        <Text style={{ fontWeight: "normal" }}>
                          : {value.measurement_type}
                        </Text>
                      </View>
                      <View style={styles.assignedJobView}>
                        <Text style={styles.textHead}>Product Name </Text>
                        <Text style={{ fontWeight: "normal" }}>
                          : {value.product}
                        </Text>
                      </View>
                      <View style={styles.assignedJobView}>
                        <Text style={styles.textHead}>Location </Text>
                        <Text style={{ fontWeight: "normal" }}>
                          : {value.location}
                        </Text>
                      </View>
                      <View style={styles.assignedJobView}>
                        <Text style={styles.textHead}>Quantity </Text>
                        <Text style={{ fontWeight: "normal" }}>
                          : {value.quantity}
                        </Text>
                      </View>
                      <View style={styles.assignedJobView}>
                        <Text style={styles.textHead}>Width </Text>
                        <Text style={{ fontWeight: "normal" }}>
                          : {value.width}+
                          {value.width2.length == 0 ? "0" : value.width2}
                        </Text>
                      </View>
                      <View style={styles.assignedJobView}>
                        <Text style={styles.textHead}>Height </Text>
                        <Text style={{ fontWeight: "normal" }}>
                          : {value.height}+
                          {value.height2.length == 0 ? "0" : value.height2}
                        </Text>
                      </View>
                      <View style={styles.assignedJobView}>
                        <Text style={styles.textHead}>Cord Details </Text>
                        <Text style={{ fontWeight: "normal" }}>
                          : {value.cord_details}
                        </Text>
                      </View>
                      {/* <View style={styles.assignedJobView}><Text style={styles.textHead}>Lifting System </Text><Text style={{fontWeight:'normal'}}>: {value.lifting_systems}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Frame Color </Text><Text style={{fontWeight:'normal'}}>: {value.frame_color}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Control </Text><Text style={{fontWeight:'normal'}}>: {value.control_left}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Style </Text><Text style={{fontWeight:'normal'}}>: {value.style}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Color </Text><Text style={{fontWeight:'normal'}}>: {value.color}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Mounting </Text><Text style={{fontWeight:'normal'}}>: {value.mounting}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Baseboards </Text><Text style={{fontWeight:'normal'}}>: {value.baseboards}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Side Channel </Text><Text style={{fontWeight:'normal'}}>: {value.side_channel}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Side Channel Color </Text><Text style={{fontWeight:'normal'}}>: {value.side_channel_color}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Bottom Channel </Text><Text style={{fontWeight:'normal'}}>: {value.bottom_channel}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Bottom Channel Color </Text><Text style={{fontWeight:'normal'}}>: {value.bottom_channel_color}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Bottom Rail </Text><Text style={{fontWeight:'normal'}}>: {value.bottom_rail}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Bottom Rail Color </Text><Text style={{fontWeight:'normal'}}>: {value.bottom_rail_color}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Valance </Text><Text style={{fontWeight:'normal'}}>: {value.valance}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Valance Color </Text><Text style={{fontWeight:'normal'}}>: {value.valance_color}</Text></View> */}
                      <View style={styles.assignedJobView}>
                        <Text style={styles.textHead}>Work Extra </Text>
                        <Text style={{ fontWeight: "normal" }}>
                          : {value.work_extra}
                        </Text>
                      </View>
                      <View style={styles.assignedJobView}>
                        <Text style={styles.textHead}>Remarks </Text>
                        <Text style={{ fontWeight: "normal" }}>
                          : {value.remarks}
                        </Text>
                      </View>
                      <View style={styles.assignedJobView}>
                        <Text style={styles.textHead}>Created Date </Text>
                        <Text style={{ fontWeight: "normal" }}>
                          : {value.created_date}
                        </Text>
                      </View>
                    </View>
                  ))
                  :
                  measurnment.map((value, index) => (
                    <View style={styles.individualBoxView} key={index}>
                      <Text style={styles.individualBoxTextHeading}>
                        Added Measurement Details
                        {console.log(value, "AAAAAAAAAAAAAAAAAAAAA")}
                      </Text>
                      <View
                        style={{
                          justifyContent: "flex-start",
                          flexDirection: "row",
                        }}
                      >
                        <Text style={styles.textHead}>Record No. </Text>
                        <Text style={{ fontWeight: "normal" }}>: {index + 1}</Text>
                      </View>
                      <View style={styles.assignedJobView}>
                        <Text style={styles.textHead}>Measurement Type </Text>
                        <Text style={{ fontWeight: "normal" }}>
                          : {value.measurement_type}
                        </Text>
                      </View>
                      <View style={styles.assignedJobView}>
                        <Text style={styles.textHead}>Product Name </Text>
                        <Text style={{ fontWeight: "normal" }}>
                          : {value.product}
                        </Text>
                      </View>
                      <View style={styles.assignedJobView}>
                        <Text style={styles.textHead}>Location </Text>
                        <Text style={{ fontWeight: "normal" }}>
                          : {value.location}
                        </Text>
                      </View>
                      <View style={styles.assignedJobView}>
                        <Text style={styles.textHead}>Quantity </Text>
                        <Text style={{ fontWeight: "normal" }}>
                          : {value.quantity}
                        </Text>
                      </View>
                      <View style={styles.assignedJobView}>
                        <Text style={styles.textHead}>Width </Text>
                        <Text style={{ fontWeight: "normal" }}>
                          : {value.width}+
                          {value.width2.length == 0 ? "0" : value.width2}
                        </Text>
                      </View>
                      <View style={styles.assignedJobView}>
                        <Text style={styles.textHead}>Height </Text>
                        <Text style={{ fontWeight: "normal" }}>
                          : {value.height}+
                          {value.height2.length == 0 ? "0" : value.height2}
                        </Text>
                      </View>
                      <View style={styles.assignedJobView}>
                        <Text style={styles.textHead}>Cord Details </Text>
                        <Text style={{ fontWeight: "normal" }}>
                          : {value.cord_details}
                        </Text>
                      </View>
                      {/* <View style={styles.assignedJobView}><Text style={styles.textHead}>Lifting System </Text><Text style={{fontWeight:'normal'}}>: {value.lifting_systems}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Frame Color </Text><Text style={{fontWeight:'normal'}}>: {value.frame_color}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Control </Text><Text style={{fontWeight:'normal'}}>: {value.control_left}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Style </Text><Text style={{fontWeight:'normal'}}>: {value.style}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Color </Text><Text style={{fontWeight:'normal'}}>: {value.color}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Mounting </Text><Text style={{fontWeight:'normal'}}>: {value.mounting}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Baseboards </Text><Text style={{fontWeight:'normal'}}>: {value.baseboards}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Side Channel </Text><Text style={{fontWeight:'normal'}}>: {value.side_channel}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Side Channel Color </Text><Text style={{fontWeight:'normal'}}>: {value.side_channel_color}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Bottom Channel </Text><Text style={{fontWeight:'normal'}}>: {value.bottom_channel}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Bottom Channel Color </Text><Text style={{fontWeight:'normal'}}>: {value.bottom_channel_color}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Bottom Rail </Text><Text style={{fontWeight:'normal'}}>: {value.bottom_rail}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Bottom Rail Color </Text><Text style={{fontWeight:'normal'}}>: {value.bottom_rail_color}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Valance </Text><Text style={{fontWeight:'normal'}}>: {value.valance}</Text></View>
                    <View style={styles.assignedJobView}><Text style={styles.textHead}>Valance Color </Text><Text style={{fontWeight:'normal'}}>: {value.valance_color}</Text></View> */}
                      <View style={styles.assignedJobView}>
                        <Text style={styles.textHead}>Work Extra </Text>
                        <Text style={{ fontWeight: "normal" }}>
                          : {value.work_extra}
                        </Text>
                      </View>
                      <View style={styles.assignedJobView}>
                        <Text style={styles.textHead}>Remarks </Text>
                        <Text style={{ fontWeight: "normal" }}>
                          : {value.remarks}
                        </Text>
                      </View>
                      <View style={styles.assignedJobView}>
                        <Text style={styles.textHead}>Created Date </Text>
                        <Text style={{ fontWeight: "normal" }}>
                          : {value.created_date}
                        </Text>
                      </View>
                    </View>
                  ))
              }

              {userType == "Agents" ? (
                <View>
                  {props.route.params.screenName === "AddMeasurnment" ? (
                    <View
                      style={{
                        marginBottom: 10,
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <View style={{ width: "80%" }}>
                        <ButtonComp
                          title={"Edit Measurement"}
                          onPress={async () => {
                            props.navigation.navigate("AddMeasurnment", {
                              order_id: order_id,
                              order_request: order_request,
                              // props.navigation.navigate('EditCustomerMeasurement',{order_id:order_id, order_request: order_request,
                              date_of_visit: date_of_visit,
                              S_T_V: S_T_V,
                              Request_by_name: Request_by_name,
                              contact_no: contact_no,
                              visit_address: visit_address,
                              cDate: cDate,
                              created_date: created_date,
                              m: measurnment,
                              customerId: customerId,
                              AllMeasurementData: allMeasurementData,
                              boo: "ViewMeasurement",
                            });
                          }}
                        />
                      </View>
                      {/* {submitPressed==false && (<View style={{width:'40%'}}>
                 <ButtonComp title={'Submit'} onPress={submitMeasurnment} />
                 </View>)} */}
                    </View>
                  ) : null}

                  {isQuoteCreated === false ? (
                    <View
                      style={{
                        marginBottom: 20,
                        width: "85%",
                        alignSelf: "center",
                      }}
                    >
                      <ButtonComp
                        title={"Create Quote"}
                        onPress={addMeasurnment}
                      />
                    </View>
                  ) : null}
                </View>
              ) : (
                <View>
                  <View
                    style={{
                      marginBottom: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ width: "80%" }}>
                      <ButtonComp
                        title={"Edit Measurement"}
                        onPress={() =>
                          props.navigation.navigate("AddMeasurnment", {
                            order_id: order_id,
                            order_request: order_request,
                            // onPress={()=>props.navigation.navigate('EditCustomerMeasurement',{order_id:order_id, order_request: order_request,
                            date_of_visit: date_of_visit,
                            S_T_V: S_T_V,
                            Request_by_name: Request_by_name,
                            contact_no: contact_no,
                            visit_address: visit_address,
                            cDate: cDate,
                            created_date: created_date,
                            m: measurnment,
                            boo: "ViewMeasurement",
                          })
                        }
                      />
                    </View>
                    {/* <View style={{width:'44%'}}>
                <ButtonComp title={'Submit'} onPress={submitMeasurnment} />
                </View> */}
                  </View>
                  <View
                    style={{
                      marginBottom: 20,
                      width: "85%",
                      alignSelf: "center",
                    }}
                  >
                    <ButtonComp
                      title={"Create Quote"}
                      onPress={addMeasurnment}
                    />
                  </View>
                </View>
              )}
              {/* <View style={{marginBottom:10}}><ButtonComp title={'Create Quote'} onPress={()=>{props.navigation.navigate('CreateQuote',{ order_id: order_id,
                    measurnment: measurnment,
                    order_request: order_request,
                    date_of_visit: date_of_visit,
                    S_T_V: S_T_V,
                    Request_by_name: Request_by_name,
                    contact_no: contact_no,
                    visit_address: visit_address,
                    cDate: cDate})}}
              //onPress={addMeasurnment} 
            /></View> */}
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
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
                  <ButtonComp
                    title={"+ Add more"}
                    // onPress={addInput}
                    onPress={async () => {
                      props.navigation.navigate("AddMeasurnment", {
                        order_id: order_id,
                        order_request: order_request,
                        // props.navigation.navigate('EditCustomerMeasurement',{order_id:order_id, order_request: order_request,
                        date_of_visit: date_of_visit,
                        S_T_V: S_T_V,
                        Request_by_name: Request_by_name,
                        contact_no: contact_no,
                        visit_address: visit_address,
                        cDate: cDate,
                        created_date: created_date,
                        m: measurnment,
                        customerId: customerId,
                        boo: "ViewMeasurement",
                      });
                    }}
                  />
                </View>
                <View
                  style={{
                    width: "80%",
                    alignSelf: "center",
                    marginBottom: 20,
                  }}
                >
                  {/* <ButtonComp
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
                          !refInputsHeight.current[k]
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
                          if (
                            k == 0 &&
                            refInputsHeight.current[0].length == 0
                          ) {
                            inputHeightErrors[k] = true;
                          } else {
                            inputHeightErrors[k] = !refInputsHeight.current[k];
                          }
                          if (k == 0 && refInputsCord.current[0].length == 0) {
                            inputCordErrors[k] = true;
                          } else {
                            inputCordErrors[k] = !refInputsCord.current[k];
                          }
                        } else {
                          inputErrors[k] = false;
                          inputLocationErrors[k] = false; // Reset error state if the field is valid
                          inputQuantityErrors[k] = false;
                          inputWidthErrors[k] = false; // Reset error state if the field is valid
                          inputHeightErrors[k] = false; // Reset error state if the field is valid
                          inputCordErrors[k] = false;
                          // newInputBorderColors[k] = undefined; // Reset borderColor if the field is valid
                        }
                      }
                      setInputErrors([...inputErrors]);
                      setInputLocationErrors([...inputLocationErrors]); // Update the state array
                      setInputQuantityErrors([...inputQuantityErrors]);
                      setInputWidthErrors([...inputWidthErrors]); // Update the state array
                      setInputHeightErrors([...inputHeightErrors]); // Update the state array
                      setInputCordErrors([...inputCordErrors]);
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
                  /> */}
                </View>
              </View>
            </ScrollView>
          </ScrollView>
        )}
      </ImageBackground>
    </View>
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
    //height:'100%'
  },
  flexDirectionText: {
    backgroundColor: "white",
    marginBottom: 10,
    width: "45%",
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
  assignedJobView: {
    justifyContent: "flex-start",
    flexDirection: "row",
    marginTop: 20,
  },
  assignedJobViews: {
    justifyContent: "flex-start",
    flexDirection: "row",
    marginTop: 20,
  },
  individualBoxTextHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 1,
  },
  textHead: { fontWeight: "bold", width: 160 },
});

export default ViewMeasurnment;
