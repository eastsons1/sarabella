import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,ImageBackground
} from "react-native";
import axios from "axios";
import { Modal, Portal, Provider } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { Dropdown } from "react-native-element-dropdown";

import Color from "../../../constant/Colors";
import ButtonComp from "../../../components/ButtonComp";
import EnvVariables from "../../../constant/EnvVariables";

const ViewIndividualJob = (props) => {
  var orid = props.route.params.orid;
  var jobList = props.route.params.jobList;


  const [valuess, setValue] = useState(null);
  const [label, setLabel] = useState(null);
  const [manufacturingEmail, setManufacturingEmail] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [manufacturingUnits, setManufacturingUnits] = useState(undefined);

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <Provider>
      <Portal>
        
        <View style={{ flex: 1, backgroundColor: "#c9d1fb" }}>
        <ImageBackground
        source={require("./../../../assets/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
          <ScrollView
            style={{ marginTop: 20, marginHorizontal: 10 }}
            showsVerticalScrollIndicator={false}
          >
            {jobList.map((value) => {
                if (value.order_request_id == orid) {
                    return(<View style={styles.individualBoxView}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            marginBottom: 15,
                            textAlign: "center",
                          }}
                        >{console.log('value='+JSON.stringify(value))}
                          Assigned Job Details:
                        </Text>
                        <View
                          style={styles.viewInfo}
                        >
                          <Text style={styles.textInfo}>
                            Service{" "}
                          </Text>
                          <Text style={{textTransform:'capitalize'}}>: {value.order_request}</Text>
                        </View>
                        <View
                          style={styles.viewInfo}
                        >
                          <Text style={styles.textInfo}>
                            Customer Name{" "}
                          </Text>
                          <Text>: {value.Customer_name}</Text>
                        </View>
                        <View
                          style={styles.viewInfo}
                        >
                          <Text style={styles.textInfo}>
                            Contact No.{" "}
                          </Text>
                          <Text>: {value.contact_no}</Text>
                        </View>
                        {/* <View style={{flexDirection:'row', justifyContent:'space-between'}}><Text style={{fontWeight:'600'}}>Service:</Text><Text> {value.Services_details[0].order_request}</Text></View>
                        <View style={styles.assignedJobView}><Text style={{fontWeight:'600'}} >Quotation No.:</Text><Text> {values.quotation_no}</Text></View>
                        <View style={styles.assignedJobView}><Text style={{fontWeight:'600'}}>Contact No.:</Text><Text> {value.Services_details[0].contact_no}</Text></View>
                        <View style={styles.assignedJobView}><Text style={{fontWeight:'600'}}>Visit Address:</Text><Text> {value.Services_details[0].visit_address}</Text></View> */}

                        
                      </View>)
                }})}

            {jobList.map((value) => {
              return (
                <View>
                  {value.Measurement_details.map((values) => {
                    if (values.order_request_id == orid) {
                      return (
                        <View style={styles.individualBoxView}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: "bold",
                              textAlign: "center",
                              //marginBottom: 15,
                            }}
                          >
                            Added Measurement Details:
                          </Text>

                          <View style={styles.assignedJobView}>
                            <Text style={styles.textMeasurement}>
                              Measurement Type{" "}
                            </Text>
                            <Text style={{ fontWeight: "normal" }}>
                             : {values.measurement_type}
                            </Text>
                          </View>
                          <View style={styles.assignedJobView}>
                            <Text style={styles.textMeasurement}>
                              Product Name{" "}
                            </Text>
                            <Text style={{ fontWeight: "normal" }}>
                             : {values.product}
                            </Text>
                          </View>
                          
                          <View style={styles.assignedJobView}>
                            <Text style={styles.textMeasurement}>
                              Location{" "}
                            </Text>
                            <Text style={{ fontWeight: "normal" }}>
                             : {values.location}
                            </Text>
                          </View>
                          <View style={styles.assignedJobView}>
                            <Text style={styles.textMeasurement}>
                              Quantity{" "}
                            </Text>
                            <Text style={{ fontWeight: "normal" }}>
                             : {values.quantity}
                            </Text>
                          </View>
                          <View style={styles.assignedJobView}>
                            <Text style={styles.textMeasurement}>Width </Text>
                            <Text style={{ fontWeight: "normal" }}>
                             : {values.width}+{values.width2}
                            </Text>
                          </View>
                          <View style={styles.assignedJobView}>
                            <Text style={styles.textMeasurement}>Height </Text>
                            <Text style={{ fontWeight: "normal" }}>
                             : {values.height}+{values.height2}
                            </Text>
                          </View>
                          <View style={styles.assignedJobView}>
                            <Text style={styles.textMeasurement}>Cord Details </Text>
                            <Text style={{ fontWeight: "normal" }}>
                             : {values.cord_details}
                            </Text>
                          </View>
                          {/* <View style={styles.assignedJobView}>
                            <Text style={styles.textMeasurement}>Lifting System </Text>
                            <Text style={{ fontWeight: "normal" }}>
                             : {values.lifting_systems}
                            </Text>
                          </View>
                          <View style={styles.assignedJobView}>
                            <Text style={styles.textMeasurement}>Frame Color </Text>
                            <Text style={{ fontWeight: "normal" }}>
                             : {values.frame_color}
                            </Text>
                          </View>
                          <View style={styles.assignedJobView}>
                            <Text style={styles.textMeasurement}>Control </Text>
                            <Text style={{ fontWeight: "normal" }}>
                             : {values.control_left}
                            </Text>
                          </View>
                          <View style={styles.assignedJobView}>
                            <Text style={styles.textMeasurement}>Style </Text>
                            <Text style={{ fontWeight: "normal" }}>
                             : {values.style}
                            </Text>
                          </View>
                          <View style={styles.assignedJobView}>
                            <Text style={styles.textMeasurement}>Color </Text>
                            <Text style={{ fontWeight: "normal" }}>
                             : {values.color}
                            </Text>
                          </View>
                          <View style={styles.assignedJobView}>
                            <Text style={styles.textMeasurement}>
                              Mounting{" "}
                            </Text>
                            <Text style={{ fontWeight: "normal" }}>
                             : {values.mounting}
                            </Text>
                          </View>
                          <View style={styles.assignedJobView}>
                            <Text style={styles.textMeasurement}>
                              Baseboards{" "}
                            </Text>
                            <Text style={{ fontWeight: "normal" }}>
                             : {values.baseboards}
                            </Text>
                          </View>
                          <View style={styles.assignedJobView}>
                            <Text style={styles.textMeasurement}>
                              Side Channel{" "}
                            </Text>
                            <Text style={{ fontWeight: "normal" }}>
                             : {values.side_channel}
                            </Text>
                          </View>
                          <View style={styles.assignedJobView}>
                            <Text style={styles.textMeasurement}>
                              Side Channel Color{" "}
                            </Text>
                            <Text style={{ fontWeight: "normal" }}>
                             : {values.side_channel_color}
                            </Text>
                          </View>
                          <View style={styles.assignedJobView}>
                            <Text style={styles.textMeasurement}>
                              Bottom Channel{" "}
                            </Text>
                            <Text style={{ fontWeight: "normal" }}>
                             : {values.bottom_channel}
                            </Text>
                          </View>
                          <View style={styles.assignedJobView}>
                            <Text style={styles.textMeasurement}>
                              Bottom Channel Color{" "}
                            </Text>
                            <Text style={{ fontWeight: "normal" }}>
                             : {values.bottom_channel_color}
                            </Text>
                          </View>
                          <View style={styles.assignedJobView}>
                            <Text style={styles.textMeasurement}>
                              Bottom Rail{" "}
                            </Text>
                            <Text style={{ fontWeight: "normal" }}>
                             : {values.bottom_rail}
                            </Text>
                          </View>
                          <View style={styles.assignedJobView}>
                            <Text style={styles.textMeasurement}>
                              Bottom Rail Color{" "}
                            </Text>
                            <Text style={{ fontWeight: "normal" }}>
                             : {values.bottom_rail_color}
                            </Text>
                          </View>
                          <View style={styles.assignedJobView}>
                            <Text style={styles.textMeasurement}>Valance </Text>
                            <Text style={{ fontWeight: "normal" }}>
                             : {values.valance}
                            </Text>
                          </View>
                          <View style={styles.assignedJobView}>
                            <Text style={styles.textMeasurement}>
                              Valance Color{" "}
                            </Text>
                            <Text style={{ fontWeight: "normal" }}>
                             : {values.valance_color}
                            </Text>
                          </View> */}
                          <View style={styles.assignedJobView}>
                            <Text style={styles.textMeasurement}>
                              Work Extra{" "}
                            </Text>
                            <Text style={{ fontWeight: "normal" }}>
                             : {values.work_extra}
                            </Text>
                          </View>
                          <View
                            style={{
                              ...styles.assignedJobView,
                              marginBottom: 20,
                            }}
                          >
                            <Text style={styles.textMeasurement}>Remarks </Text>
                            <Text style={{ fontWeight: "normal" }}>
                             : {values.remarks}
                            </Text>
                          </View>

                            <View style={{marginBottom:20}}><ButtonComp title={'Edit Measurement'} onPress={()=>props.navigation.navigate("EditMeasurement",{order_id:orid, measurementDetails:values, mid:values.measurement_id })} /></View>

                        </View>
                      );
                    }
                  })}
                </View>
              );
            })}
          </ScrollView>
          </ImageBackground>
        </View>
      </Portal>
    </Provider>
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
  },
  dropdown: {
    borderColor: "gray",
    //borderWidth: 0.5,
    paddingHorizontal: 8,
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    height: 40,
    backgroundColor: "white",
    borderWidth: 1,
    marginBottom: 20,
  },
  assignedJobView: {
    justifyContent: "flex-start",
    flexDirection: "row",
    marginTop: 15,
  },
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 1,
  },
  viewInfo:{ flexDirection: "row", marginBottom: 10 },
  textInfo:{ fontWeight: "bold", width:160 },
  textMeasurement:{ fontWeight: "bold", width:160 }
});

export default ViewIndividualJob;
