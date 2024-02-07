import React, {
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  ImageBackground,
  TouchableOpacity,Image
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused, useFocusEffect } from '@react-navigation/native';

import Colors from "../../../constant/Colors";
import EnvVariables from "../../../constant/EnvVariables";
import Splash from "../../../components/Splash";

const ViewSchedule = (props) => {
  const [schedule, setSchedule] = useState(undefined);
  const [id, setId] = useState(undefined);
  const [dataload, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // const idFromDrawer = props.route.params.id;
  //console.log("id from drawer=" + idFromDrawer);

  // const schedules = props.route.params.schedule;
  // console.log("schedule from drawer=" + schedules);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: "My schedules",
      headerTintColor: "red",
    });
  }, [props]);

  const isFocused = useIsFocused();

  const setDetails=async()=>{
    // setUserType(await AsyncStorage.getItem("user_type"));
    setId(await AsyncStorage.getItem("user_id"));
    console.log('first this should print'+id)
  }

  useEffect(() => {
    if(isFocused){
      setDetails()
      if (dataload == false) {
        // setId(await AsyncStorage.getItem("user_id"));
        console.log("inside useEffect");
        setApiLoader(true);
        let webApiUrl =
          EnvVariables.API_HOST +
          `APIs/ViewAllSchedule/ViewAllSchedule.php?user_type=Users&loggedIn_user_id=${id}`;
        console.log("webapi=" + webApiUrl);
        axios.get(webApiUrl).then((res) => {
          setSchedule(res.data.Schedule_List);
          setDataLoaded(true);
          setApiLoader(false);
        });
      }
    }
  }, [id, schedule, setDetails]);

  useEffect(()=>{
    props.navigation.addListener('blur', () => {console.log('unblurred');setApiLoader(true);setDataLoaded(false)})
  },[])

  console.log("id=" + id);
  console.log("schedule=" + JSON.stringify(schedule));

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    let webApiUrl =
      EnvVariables.API_HOST +
      `APIs/ViewAllSchedule/ViewAllSchedule.php?user_type=Users&loggedIn_user_id=${id}`;
    console.log("webapi=" + webApiUrl);
    axios.get(webApiUrl).then((res) => {
      console.log("view schedule=" + JSON.stringify(res.data));
      setSchedule(res.data.Schedule_List);
    });
    setRefreshing(false);
  }, [id, schedule]);

  if(schedule==undefined){
    return(
      <View style={{ flex: 1, backgroundColor: "#c9d1fb" }}>
        <ImageBackground
          source={require("./../../../assets/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}>
            <View style={styles.viewNothing}>
              <Text style={styles.textNothing}>No Schedules Yet</Text>
            </View>
        </ImageBackground>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#c9d1fb" }}>
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
        <Text style={{fontWeight:'bold', marginTop:10}}>Loading...</Text>
      </Splash>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={{ marginTop: 20, marginHorizontal: 10 }}>
              {/* <Text
              style={{ fontWeight: "500", fontSize: 20, textAlign: "center" }}
            >
              My Schedules
            </Text> */}

              {/* View starts */}
              {/* <View style={{ backgroundColor: "white", marginTop: 15 }}> */}
              <View
                style={{
                  marginTop: 10,
                  marginHorizontal: 10,
                  marginBottom: 10,
                }}
              >
                {/* individual boxes of schedule starts */}

                {schedule != null || schedule != undefined ? (
                  schedule.map((value) => (
                    <View
                      style={[
                        styles.individualBoxView,
                        value.AssignedJob == "Yes" && {
                          backgroundColor: "#D9DFFF",
                        },
                      ]}
                      key={value.order_request_id}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate("InvoiceCustomer", {
                            orid: value.order_request_id,
                            user_id: value.user_id,
                          })
                        }
                      >
                        <View style={styles.viewInfo}>
                          <Text style={styles.textInfo}>Service Type</Text>
                          <Text>: {value.schedule_type}</Text>
                        </View>
                        <View style={styles.viewInfo}>
                          <Text style={styles.textInfo}>Order Request</Text>
                          <Text style={{ textTransform: "capitalize" }}>
                            : {value.order_request}
                          </Text>
                        </View>
                        <View style={styles.viewInfo}>
                          <Text style={styles.textInfo}>Description</Text>
                          <Text>: {value.consultation}</Text>
                        </View>
                        {value.Assigned_To_Agent_Name != " " && (
                          <View style={styles.viewInfo}>
                            <Text style={styles.textInfo}>Assigned To</Text>
                            <Text>: {value.Assigned_To_Agent_Name}</Text>
                          </View>
                        )}
                        {/* <View style={{flexDirection:'row', justifyContent:'space-between', marginTop: 10}}><Text style={{fontWeight:'bold'}}>Schedule Status:</Text><Text style={{ }}>
                            {value.schedule_status}
                          </Text></View> */}
                        <View
                          style={{ borderWidth: 0.5, marginVertical: 10 }}
                        />
                        <View style={styles.dateHead}>
                          <Text style={{ fontWeight: "bold" }}>Date of request:</Text>
                          <Text style={{ fontWeight: "bold" }}>Date of visit:</Text>
                        </View>
                        <View style={styles.valueDate}>
                          <View style={{ flexDirection: "row" }}>
                            <Icon name="calendar-outline" size={14} />
                            <Text style={{ marginLeft: 5 }}>
                              {value.created_date}
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Icon name="calendar-outline" size={14} />
                            <Text style={{ marginLeft: 5 }}>
                              {value.date_of_visit}
                            </Text>
                          </View>
                        </View>

                      </TouchableOpacity>
                    </View>
                  ))
                ) : null}

                {/* individual boxes of schedule ends */}
              </View>
              {/* </View> */}
              {/* View ends */}
            </View>
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
    shadowOffset: { height: 6, width: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: "black",
  },
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 1,
  },
  viewInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  textInfo: { fontWeight: "bold", width: 130 },
  dateHead:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  valueDate:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  viewNothing:{justifyContent:'center', alignItems:'center', flex:1},
  textNothing:{fontWeight:'bold', fontSize:24, color:'white'}
});

export default ViewSchedule;
