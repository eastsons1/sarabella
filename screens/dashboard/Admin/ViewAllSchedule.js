import React,{useState, useEffect, useCallback} from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, ImageBackground, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Icon from 'react-native-vector-icons/Ionicons'

import Color from "../../../constant/Colors";
import EnvVariables from "../../../constant/EnvVariables";
import Splash from "../../../components/Splash";

const ViewAllSchedule = (props) => {
  const [scheduleList, setscheduleList] = useState(undefined);
  const [dataload, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [id, setId] = useState(undefined);
  const [refreshing, setRefreshing] = useState(false);

  const apiCall=async()=>{
    if (dataload == false) {
      setId(await AsyncStorage.getItem("user_id"));
      setApiLoader(true);
      let webApiUrl =
        EnvVariables.API_HOST +
        `APIs/ViewAllSchedule/ViewAllSchedule.php?user_type=Admin&loggedIn_user_id=${id}`;
      axios.get(webApiUrl).then((res) => {
        console.log("response in schedules=" + JSON.stringify(res.data));
        setscheduleList(res.data.Schedule_List);
        setDataLoaded(true);
        setApiLoader(false);
      });
    }
  }

  useEffect(() => {
    console.log("inside useEffect");
    props.navigation.addListener('focus',()=>apiCall())
  }, [id, scheduleList]);

  useEffect(()=>{
    props.navigation.addListener('blur', () => {console.log('unblurred');setApiLoader(true); setDataLoaded(false)})
  },[])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    let webApiUrl =
        EnvVariables.API_HOST +
        `APIs/ViewAllSchedule/ViewAllSchedule.php?user_type=Admin&loggedIn_user_id=${id}`;
        console.log('webapirurl in view all schedule='+webApiUrl)
      axios.get(webApiUrl).then((res) => {
        console.log("response in schedule=" + JSON.stringify(res.data));
        setscheduleList(res.data.Schedule_List);
      });
    setRefreshing(false);
  }, [id, scheduleList]);


  if(scheduleList==undefined){
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

  console.log("job list=" + JSON.stringify(scheduleList));
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
       <Text style={{fontWeight:'bold', marginTop:10}}>Loading...</Text>
     </Splash>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          <View style={{ marginTop: 20, marginHorizontal: 10 }}>
            {/* <Text
              style={{ fontWeight: "500", fontSize: 20, textAlign: "center" }}
            >
              Jobs
            </Text> */}

            {/* view starts */}
            {/* <View style={{ backgroundColor: "white", marginTop: 15 }}> */}
            <View>
              {/* individual boxes of job list starts */}
              {scheduleList != null || scheduleList != undefined
                ? scheduleList.map((value) => (
                    <TouchableOpacity
                      key={value.order_request_id}
                      onPress={() =>
                        props.navigation.navigate("ScheduleDetail", {
                          order_request_id: value.order_request_id,
                          scheduleabc: scheduleList,
                          loggedInUserId:id
                        })
                      }
                    >
                      <View style={[styles.individualBoxView, value.AssignedJob=='Yes' && {backgroundColor:'#D9DFFF'}]}
                      // style={[
                      //   styles.dropdown,
                      //   isFocus && { borderColor: "black" },
                      // ]}
                      >
                        <View style={{flexDirection: "row",justifyContent: "flex-start",}}><Text style={styles.textInfo}>Service </Text><Text style={{textTransform:'capitalize'}}>: {value.order_request}</Text></View>
                        <View style={styles.viewInfo}><Text style={styles.textInfo}>Customer Name </Text><Text>: {value.Request_by_name}</Text></View>
                        <View style={styles.viewInfo}><Text style={styles.textInfo}>Contact No. </Text><Text>: {value.contact_no}</Text></View>

                        {value.Assigned_To_Agent_Name != " " && (
                          <View style={styles.viewInfo}>
                            <Text style={styles.textInfo}>Assigned To</Text>
                            <Text>: {value.Assigned_To_Agent_Name}</Text>
                          </View>
                        )}

                        <View
                          style={{ borderWidth: 0.5, marginVertical: 10 }}
                        />

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom:5
                          }}
                        >
                          <Text style={{fontWeight:'bold'}}>Date of request:</Text>
                          <Text style={{fontWeight:'bold'}}>Date of visit:</Text>
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

                      </View>
                    </TouchableOpacity>
                  ))
                : null}
              {/* individual boxes of job list ends */}
            </View>

            {/* view ends */}
          </View>
        </ScrollView>
      )}
      </ImageBackground>
    </View>
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
  valueDate:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  viewNothing:{justifyContent:'center', alignItems:'center', flex:1},
  textNothing:{fontWeight:'bold', fontSize:24, color:'white'}
});

export default ViewAllSchedule;
