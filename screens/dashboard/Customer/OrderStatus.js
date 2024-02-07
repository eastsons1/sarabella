import React,{useEffect, useState} from "react";
import { View, Text, ImageBackground, StyleSheet, ScrollView, FlatList, Image } from "react-native";
import {useIsFocused} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import Splash from "../../../components/Splash";

import EnvVariables from "../../../constant/EnvVariables";

const OrderStatus = (props) => {
  const [id, setId] = useState(undefined);
  const [dataload, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [orderList, setOrderList]=useState(undefined);
  const [email, setEmail]=useState(undefined)
  const [statusEmail, setStatusEmail]=useState(0)

  const isFocused = useIsFocused();

  const setDetails = async () => {
    setId(await AsyncStorage.getItem("user_id"));
  };

    useEffect(()=>{
        if(isFocused){
            setDetails();
            if(dataload==false){
            setApiLoader(true);
                if(id!=undefined){
                    let webApiUrl=EnvVariables.API_HOST +`APIs/ViewUserDetails/ViewUserDetails.php?id=${id}`;
                    axios.get(webApiUrl).then(async(res)=>{
                        setEmail(await res.data.Users_details_View[0].email)
                        if(email!=undefined){
                            console.log('email in order status='+email)
                            let webApiUrl2 =EnvVariables.API_HOST +`APIs/OrderListDashboard/OrderListDashboard.php`;
                            axios.get(webApiUrl2).then(async(res)=>{
                                setOrderList(await res.data.Order_List)
                                console.log('order list in order status='+JSON.stringify(res.data.Order_List[0]))
                                setDataLoaded(true);
                                setApiLoader(false);
                            })
                        }    
                    })
                }
            } 
        }
    },[setDetails, email, orderList, statusEmail])

    useEffect(() => {
        props.navigation.addListener("blur", () => {
          console.log("unblurred from home");
          // setStatusEmail(0)
          setApiLoader(true);
          setDataLoaded(false); 
        });
      }, []);

      if(orderList==undefined){
        return(<View style={{ flex: 1, backgroundColor: "#c9d1fb" }}>
        <ImageBackground
          source={require("../../../assets/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}>
            <View style={styles.viewNothing}>
              <Text style={styles.textNothing}>Nothing To Show</Text>
            </View>
        </ImageBackground>
      </View>)
      }

      // if(statusEmail==0){
      //   return(
      //     <View style={{ flex: 1, backgroundColor: "#c9d1fb" }}>
      //       <ImageBackground
      //         source={require("../../../assets/background.png")}
      //         resizeMode="cover"
      //         style={styles.rootScreen}
      //         imageStyle={styles.backgroundImage}>
      //           <View style={styles.viewNothing}>
      //             <Text style={styles.textNothing}>Nothing To Show</Text>
      //           </View>
      //       </ImageBackground>
      //     </View>
      //   )
      // }

  return (
    <View style={{ flex: 1, backgroundColor: "#c9d1fb" }}>
        <ImageBackground
        source={require("../../../assets/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        {apiLoader?
            (
              <Splash style={{alignItems:'center', justifyContent:'center', flex:1}}>
              <Image
               source={require("../../../assets/logo.png")}
               resizeMode="contain"
               resizeMethod="scale"
               style={{ width: 160, height: 100 }}
             />
             <Text style={{fontWeight:'bold'}}>Loading...</Text>
           </Splash>
            ):
            (
                <ScrollView>
                    <View style={{marginHorizontal:10, marginTop:20}}>

                    {orderList!=undefined && <FlatList data={orderList[0].Order_details} keyExtractor={(item)=>item.quote_id} 
                      renderItem={({item,index})=>{
                        if(item.Customer_email===email){
                          setStatusEmail(1)
                        }
                      }}
                    />}
                        {orderList!=undefined && statusEmail==1 ? (
                            <View style={styles.mainView}>
                            <FlatList data={orderList[0].Order_details} keyExtractor={(item)=>item.quote_id}
                                renderItem={({item, index})=>{
                                    if(item.Customer_email==email){
                                    return(
                                        <View style={styles.individualBoxView}>
                                            <View style={styles.viewInfo}><Text style={styles.textInfo}>Quotation No.</Text><Text>: {item.quotation_no}</Text></View>
                                            <View style={{...styles.viewInfo, marginBottom:10}}><Text style={styles.textInfo}>Work Status</Text><Text>: {item.work_status==''?'Not Updated Yet':item.work_status}</Text></View>
                                        </View> 
                                    )}
                                }}
                            />
                            </View>
                        ):(
                            <View style={styles.viewNothing}>
                              <Text style={styles.textNothing}>Nothing To Show</Text>
                            </View>
                        )}
                    </View>
                </ScrollView>
            )
        }
      </ImageBackground>
    </View>
  );
};
const styles=StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 1,
    },
    individualBox:{
        backgroundColor:'white', 
        shadowOffset: { height: 6, width: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowColor: "black",
        borderRadius:8, 
        overflow:'hidden',
        marginBottom:20
    },
    headingView:{
        backgroundColor:'red', 
        height:40, 
        // alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:10,
        marginBottom:10
    },
    individualInfoBox:{
        backgroundColor:'#FFE5B4', 
        marginBottom:10,
        marginHorizontal:10,
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:8
    },
    viewInfo: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: 10,
      },
      textInfo: { fontWeight: "bold", width: 130 },
    viewNothing:{justifyContent:'center', alignItems:'center',height:'100%'},
    textNothing:{fontWeight:'bold', fontSize:24, color:'white'},
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
      mainView:{
        marginTop: 10,
        marginHorizontal: 10,
        marginBottom: 10,
      },
})

export default OrderStatus;
