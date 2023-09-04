import React,{useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert, ImageBackground, Image
} from "react-native";
import axios from "axios";
import { Modal, Portal, Provider } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { Dropdown } from "react-native-element-dropdown";
import RadioButtonRN from "radio-buttons-react-native";

import Color from "../../../constant/Colors";
import ButtonComp from "../../../components/ButtonComp";
import EnvVariables from "../../../constant/EnvVariables";

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

const ViewIndividualOrder = (props) => {
  var orderList = props.route.params.orderList;
  console.log("order list in individual order=" + JSON.stringify(orderList));
  var quotation_no = props.route.params.quotation_no;

  const selectedOrder = orderList.find(
    (order) => order.quotation_no == quotation_no
  );

  console.log("selected order=" + JSON.stringify(selectedOrder));

  const [selected, setSelected]=useState(data[0].label);

  function test(type,value){
    console.log('a==='+type,"   b===="+value)
    if (selected == type) {
      // do nothing
      return (<Text>{value}</Text>)
    }
    else if(selected=='Inches'){
      if(type=='CM'){
        value = value/2.54;
        return(<Text>{value.toFixed(2)}</Text>)
      }
      else if(type== "Meter"){
        value = value * 39.37;
        return(<Text>{value.toFixed(2)}</Text>)
      }
    }
    else if (selected == "Meter") {
      if(type == "CM"){
        value = value / 100;
        return(<Text>{value.toFixed(2)}</Text>)
      }
      else if(type == "Inches"){
        value = value / 39.37;
        return(<Text>{value.toFixed(2)}</Text>)
      }
    }else if(selected=='CM'){
      if(type == "Inches"){
        value = value * 2.54;
        return(<Text>{value.toFixed(2)}</Text>)
      }else if(type == "Meter"){
        value = value * 100;
        return(<Text>{value.toFixed(2)}</Text>)
      }
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#c9d1fb" }}>
      <ImageBackground
        source={require("./../../../assets/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
      {/* <Text>View Individual Order</Text> */}
      <ScrollView
        style={{ marginTop: 20, marginHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.individualBoxView}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 15,
              textAlign: "center",
            }}
          >
            Assigned Job Details
          </Text>

            {/* <View style={{flexDirection:'row', justifyContent:'space-between'}}><Text style={styles.textInfo}>Service:</Text><Text> {selectedOrder.}</Text></View> */}
            <View style={styles.assignedJobView}><Text style={styles.textInfo} >Quotation No.</Text><Text>: {selectedOrder.quotation_no}</Text></View>
            <View style={styles.assignedJobView}><Text style={styles.textInfo}>Contact No.</Text><Text>: {selectedOrder.Manufacturing_Details.mobile}</Text></View>
            <View style={{...styles.assignedJobView, marginBottom:20}}><Text style={styles.textInfo}>Visit Address</Text><Text>: {selectedOrder.Manufacturing_Details.address1}</Text></View>
            {/* <View style={{marginHorizontal: '20%',  marginVertical:20}}><ButtonComp title={'Update Status'} /></View> */}

        </View>

        <Text style={{ fontWeight: "600", color:'white' }}>Choose Conversion*:</Text>
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <RadioButtonRN
            boxStyle={{ width: "30%" }}
            style={{ flexDirection: "row", }}
            textStyle={{ marginLeft: 10, color:'white' }}
            data={data}
            box={false}
            initial={selected=='CM'?1:selected=='Inches'?2:3}
            animationTypes={["zoomIn"]}
            activeColor="black"
            boxActiveBgColor="black"
            deactiveColor="lightgray"
            value={selected}
            selectedBtn={(e)=>setSelected(e.label)}
            // icon={
            //   <Icon name="checkmark-circle-outline" size={25} color="#2c9dd1" />
            // }
          />{console.log('selected==='+selected)}
        </View>

        {selectedOrder.Measurement_Data.map((values)=>(
            <View style={styles.individualBoxView}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",textAlign:'center',
                  marginBottom: 15,
                }}
              >
                Added Measurement Details
              </Text>

              
                <View>
                  <View style={styles.assignedJobView}><Text style={styles.textInfo}>Measurement Type </Text><Text style={{fontWeight:'normal'}}>: {values.measurement_type}</Text></View>
                  <View style={styles.assignedJobView}><Text style={styles.textInfo}>Product Name </Text><Text style={{fontWeight:'normal'}}>: {values.product}</Text></View>
                  <View style={styles.assignedJobView}><Text style={styles.textInfo}>Location </Text><Text style={{fontWeight:'normal'}}>: {values.location}</Text></View>
                  <View style={styles.assignedJobView}><Text style={styles.textInfo}>Quantity </Text><Text style={{fontWeight:'normal'}}>: {values.quantity}</Text></View>
                  <View style={styles.assignedJobView}><Text style={styles.textInfo}>Width </Text><Text style={{fontWeight:'normal'}}>: {test(values.measurement_type, values.width)}+{values.width2}</Text></View>
                  <View style={styles.assignedJobView}>
                    <Text style={styles.textInfo}>Height </Text>
                    <Text style={{fontWeight:'normal'}}>: {test(values.measurement_type, values.height)}+{values.height2}
                      {/* {(selected=='CM' && values.measurement_type=='CM')?values.height:()} */}
                    </Text>
                  </View>
                  <View style={styles.assignedJobView}><Text style={styles.textInfo}>Cord Details </Text><Text style={{fontWeight:'normal'}}>: {values.cord_details}</Text></View>
                  {/* <View style={styles.assignedJobView}><Text style={styles.textInfo}>Lifting System </Text><Text style={{fontWeight:'normal'}}>: {values.lifting_systems}</Text></View>
                  <View style={styles.assignedJobView}><Text style={styles.textInfo}>Frame Color </Text><Text style={{fontWeight:'normal'}}>: {values.frame_color}</Text></View>
                  <View style={styles.assignedJobView}><Text style={styles.textInfo}>Control </Text><Text style={{fontWeight:'normal'}}>: {values.control_left}</Text></View>
                  
                  <View style={styles.assignedJobView}><Text style={styles.textInfo}>Style </Text><Text style={{fontWeight:'normal'}}>: {values.style}</Text></View>
                  <View style={styles.assignedJobView}><Text style={styles.textInfo}>Color </Text><Text style={{fontWeight:'normal'}}>: {values.color}</Text></View>
                  <View style={styles.assignedJobView}><Text style={styles.textInfo}>Mounting </Text><Text style={{fontWeight:'normal'}}>: {values.mounting}</Text></View>
                  <View style={styles.assignedJobView}><Text style={styles.textInfo}>Baseboards </Text><Text style={{fontWeight:'normal'}}>: {values.baseboards}</Text></View>
                  <View style={styles.assignedJobView}><Text style={styles.textInfo}>Side Channel </Text><Text style={{fontWeight:'normal'}}>: {values.side_channel}</Text></View>
                  <View style={styles.assignedJobView}><Text style={styles.textInfo}>Side Channel Color </Text><Text style={{fontWeight:'normal'}}>: {values.side_channel_color}</Text></View>
                  <View style={styles.assignedJobView}><Text style={styles.textInfo}>Bottom Channel </Text><Text style={{fontWeight:'normal'}}>: {values.bottom_channel}</Text></View>
                  <View style={styles.assignedJobView}><Text style={styles.textInfo}>Bottom Channel Color </Text><Text style={{fontWeight:'normal'}}>: {values.bottom_channel_color}</Text></View>
                  <View style={styles.assignedJobView}><Text style={styles.textInfo}>Bottom Rail </Text><Text style={{fontWeight:'normal'}}>: {values.bottom_rail}</Text></View>
                  <View style={styles.assignedJobView}><Text style={styles.textInfo}>Bottom Rail Color </Text><Text style={{fontWeight:'normal'}}>: {values.bottom_rail_color}</Text></View>
                  <View style={styles.assignedJobView}><Text style={styles.textInfo}>Valance </Text><Text style={{fontWeight:'normal'}}>: {values.valance}</Text></View>
                  <View style={styles.assignedJobView}><Text style={styles.textInfo}>Valance Color </Text><Text style={{fontWeight:'normal'}}>: {values.valance_color}</Text></View> */}
                  <View style={styles.assignedJobView}><Text style={styles.textInfo}>Work Extra </Text><Text style={{fontWeight:'normal'}}>: {values.work_extra}</Text></View>
                  <View style={{...styles.assignedJobView, marginBottom:20}}><Text style={styles.textInfo}>Remarks </Text><Text style={{fontWeight:'normal'}}>: {values.remarks}</Text></View>
                </View>
              
              
              
            </View>
))}

      </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles=StyleSheet.create({
  individualBoxView: {
    backgroundColor: 'white',
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    paddingTop: 10,
    shadowOffset:{height:6, width:6}, shadowOpacity:0.2, shadowRadius:4, shadowColor:'black'
  },
  assignedJobView: {
    justifyContent: "flex-start",
    flexDirection: "row",
    marginBottom:15
  },
  textInfo:{fontWeight:'bold', width:160},
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 1,
  },
})

export default ViewIndividualOrder;
