import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  RefreshControl,
  ImageBackground,
  Image,
  Dimensions,
  Modal,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useFocusEffect,
  useIsFocused,
  CommonActions,
} from "@react-navigation/native";
import Color from "../../../constant/Colors";
import EnvVariables from "../../../constant/EnvVariables";
import Splash from "../../../components/Splash";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const ProductGallary = (props) => {
  const [jobList, setJobList] = useState([]);
  const [dataload, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [id, setId] = useState(undefined);
  const [showEditModal, setShowEditModal] = useState(false);
  const [openCurrentImage, setOpenCurrentImage] = useState("");
  const [ImageCode, setImageCode] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const getDetails = async () => {
    setId(await AsyncStorage.getItem("user_id"));
  };

  useEffect(() => {
    console.log("Useeffect in JobListing");
    props.navigation.addListener("focus", () => {
      //getJobsData();
    });
  }, [id]);

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    let webApiUrl =
      EnvVariables.API_HOST + `APIs/ViewProductImages/ViewProductImages.php`;
    axios.get(webApiUrl).then((res) => {
      console.log("response in agents=" + JSON.stringify(res.data));
      const reversed = res.data;

      setJobList(reversed);
    });
    setRefreshing(false);
  }, [id]);

  const OpenImage = (imagepath,imageCode) => {
    setShowEditModal(true);
    setOpenCurrentImage(imagepath);
    setImageCode(imageCode)
  };

 // console.log("job list=" + jobList, "DDDDDDDDDDDDDD");

  if (jobList == undefined) {
    return (
      <View style={{ flex: 1, backgroundColor: "#c9d1fb" }}>
        <ImageBackground
          source={require("./../../../assets/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <View style={styles.viewNothing}>
            <Text style={styles.textNothing}>No Jobs</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }

  //console.log(jobList, "LLLLLLLLLLLLLLLLLLLLL");

  return (
    <View style={{ flex: 1, backgroundColor: "#c9d1fb" }}>
      <ImageBackground
        source={require("./../../../assets/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        {apiLoader ? (
          <Splash
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <Image
              source={require("../../../assets/logo.png")}
              resizeMode="contain"
              resizeMethod="scale"
              style={{ width: 160, height: 160 }}
            />
            <Text style={{ fontWeight: "bold", marginTop: 10 }}>
              Loading...
            </Text>
          </Splash>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={{ marginTop: 20, marginHorizontal: 10 }}>
              <View>
                <FlatList
                  data={jobList.Produc_Listt}
                  numColumns={2}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => OpenImage(item.gallery_image,item.product_code)}
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
                      <Text style={{ textAlign: "center" }}>
                        Product Code {item.product_code}
                      </Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.id}
                />
              </View>

              {/* view ends */}
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
                
                  <View style={{justifyContent:"center"}}>

                  <TouchableOpacity
                    onPress={() => setShowEditModal(false)}
                    style={{
                     // position: "absolute",
                      right: 10,
                      top: '5%',
                      alignSelf:"flex-end",
                      width: 30,
                      height: 30,
                      borderRadius: 50 / 2,
                      justifyContent: "center",
                      backgroundColor: "#000",
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
                  </TouchableOpacity>
                  <Image
                    source={{
                      uri:
                        "https://sarabella.ca/backend/product_gallery/" +
                        openCurrentImage,
                    }}
                    style={{
                      height: "80%",
                      width: deviceWidth,
                      resizeMode:"cover",
                      marginTop: "15%",
                    }}
                  />
                  <Text style={{textAlign:"center",padding:20,fontSize:16,fontWeight:'bold'}}>Code: {ImageCode}</Text>

                  </View>
                 
                </View>
              </View>
            </Modal>
          </ScrollView>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start", // if you want to fill rows left to right
  },
  item: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    alignItems: "center",
  },
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
  modalWrapper2: {
    // backgroundColor: "#00000040",
    justifyContent:"center",
    backgroundColor: "#fff",
    alignItems: "center",
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
  textHead: { fontWeight: "bold", width: 130 },
  dateHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  valueDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  viewNothing: { justifyContent: "center", alignItems: "center", flex: 1 },
  textNothing: { fontWeight: "bold", fontSize: 24, color: "white" },
});

export default ProductGallary;
