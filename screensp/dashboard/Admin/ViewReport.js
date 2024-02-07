import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
  Image
} from "react-native";
import { BarChart, LineChart, ProgressChart } from "react-native-chart-kit";
import {useIsFocused} from "@react-navigation/native";
import axios from "axios";

import Splash from "../../../components/Splash";
import EnvVariables from "../../../constant/EnvVariables";

const List = [
  { title: "Monthly", id: 1 },
  { title: "Quarterly", id: 2 },
  { title: "Yearly", id: 3 },  
];

const ViewReport = ({ navigation, route }) => {

  const [volumeReport, setvolumeReport]=useState(JSON.parse(route.params.volumeReport))
  const [CReport, setCReport]=useState(JSON.parse(route.params.CReport))
  const [SReport, setSReport]=useState(JSON.parse(route.params.SReport))
  const [QReport, setQReport]=useState(JSON.parse(route.params.QReport))


  const [selected, setSelected] = useState([List[0].title]);

  const renderList = ({ item, index }) => {
    const { id, title } = item;
    const isSelected = selected.filter((i) => i === title).length > 0;

    return (
      <TouchableOpacity
        onPress={() => {
          if (isSelected) {
            setSelected((prev) => prev.filter((i) => i !== title));
            if (selected.length == 1) {
              setSelected([List[0].title]);
            }
          } else {
            setSelected((prev) => [title]);
          }
        }}
      >
        {isSelected ? (
          <View style={[styles.newItem, { borderWidth: 0 }]}>
            <Text
              style={[isSelected && { color: "#102799", fontWeight: "bold" }]}
            >
              {title}
            </Text>
          </View>
        ) : (
          <View
            style={[
              styles.newItem,
              { backgroundColor: "transparent", borderColor: "white" },
            ]}
          >
            <Text style={{ color: "white" }}>{title}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };


  const [selectedData, setSelectedData]=useState(undefined)
  const [selectedSalesData, setSelectedSalesData]=useState(undefined)
  const [selectedCustomerData, setSelectedCustomerData]=useState(undefined)
  const [selectedQuantityData, setSelectedQuantityData]=useState(undefined)


  let qvMonths=[];
  let qvValues=[];

  const getDetails=()=>{
    console.log('inside get detailsss')
    setSelectedData(volumeReport.data.find((value)=>value.heading==selected))
    qvMonths=selectedData?.Months.map((value)=>value.month)
    qvValues=selectedData?.Months.map((value)=>value.value)
  }

  let sMonths=[]; let sValues=[];
  const getSalesDetails=()=>{
    setSelectedSalesData(SReport.data.find((value)=>value.heading==selected))
    sMonths=selectedSalesData?.Months.map((value)=>value.month)
    sValues=selectedSalesData?.Months.map((value)=>value.value)
  }

  let cMonths=[]; let cValues=[];
  const getCustomerDetails=()=>{
    setSelectedCustomerData(CReport.data.find((value)=>value.heading==selected))
    cMonths=selectedCustomerData?.Months.map((value)=>value.month)
    cValues=selectedCustomerData?.Months.map((value)=>value.value)
  }

  let qMonths=[]; let qValues=[];
  const getQuantityDetails=()=>{
    setSelectedQuantityData(QReport.data.find((value)=>value.heading==selected))
    qMonths=selectedQuantityData?.Months.map((value)=>value.month)
    qValues=selectedQuantityData?.Months.map((value)=>value.value)
  }

  const [avTime, setAvgTime]=useState(undefined)
  const [apiLoader, setApiLoader]=useState(true)
  const [dataLoaded, setDataLoaded]=useState(false)

  const apiCall=async()=>{
    if(dataLoaded==false){
      setApiLoader(true)
      let webapiUrl=EnvVariables.API_HOST +`APIs/ViewScheduleTimeAverageReport/ViewScheduleTimeAverageReport.php`
      axios.get(webapiUrl).then(async(res)=>{
        console.log('response of new api='+JSON.stringify(await res.data))
        if(res.data.status==true){
        setAvgTime(await res.data.Schedule_Average_Time)
        setApiLoader(false)
        setDataLoaded(true)
        }
        else if(res.data.status==false){
          setAvgTime(await res.data.message)
          setApiLoader(false)
          setDataLoaded(true)
        }
      })
    }
  }

  const isFocused = useIsFocused();

  useEffect(()=>{
    if(isFocused){

      setSelectedSalesData(SReport.data.find((value)=>value.heading==selected))
      sMonths=selectedSalesData?.Months.map((value)=>value.month)
      sValues=selectedSalesData?.Months.map((value)=>value.value)

      setSelectedData(volumeReport.data.find((value)=>value.heading==selected))
      qvMonths=selectedData?.Months.map((value)=>value.month)
      qvValues=selectedData?.Months.map((value)=>value.value)

      setSelectedCustomerData(CReport.data.find((value)=>value.heading==selected))
      cMonths=selectedCustomerData?.Months.map((value)=>value.month)
      cValues=selectedCustomerData?.Months.map((value)=>value.value)

      setSelectedQuantityData(QReport.data.find((value)=>value.heading==selected))
      qMonths=selectedQuantityData?.Months.map((value)=>value.month)
      qValues=selectedQuantityData?.Months.map((value)=>value.value)


      if(dataLoaded==false){
        console.log('inside data loaded')
        setApiLoader(true)
        // getDetails()
        // getSalesDetails()
        // getCustomerDetails()
        // getQuantityDetails()
        apiCall()
        setDataLoaded(true)
        setApiLoader(false)
      }
    }
  },[selectedData, selected, 
    // getDetails, 
    // getSalesDetails, 
    selectedSalesData, 
    // getCustomerDetails, 
    selectedCustomerData, volumeReport, CReport, SReport, QReport, 
    // getQuantityDetails, 
    apiCall
  ])

  useEffect(() => {
    navigation.addListener("blur", () => {
      console.log('getting blurred')
      setSelected([List[0].title]);
      setSelectedData(undefined)
      setSelectedSalesData(undefined)
      setSelectedCustomerData(undefined)
      setSelectedQuantityData(undefined)
      setApiLoader(true);
      setDataLoaded(false); 
    });
  }, []);

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
        <View style={{ marginHorizontal: 10 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              numColumns={3}
              data={List}
              renderItem={renderList}
              columnWrapperStyle={{ flex: 1, justifyContent: "space-between" }}
              centerContent={true}
            />
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "grey",
                marginTop: 20,
              }}
            />

            {/* Chart starts */}
            {/* Quantity and volume starts  */}
            <View 
              ref={qvMonths=selectedData!=undefined ? selectedData.Months.map((value)=>value.month):[]} 
              style={{ marginTop: 20 }}
            >
              <Text style={{color:'white', fontWeight:'500', fontSize:20, marginBottom:10}}>{volumeReport.title}</Text>
              <ScrollView horizontal 
                ref={qvValues=selectedData!=undefined?selectedData.Months.map((value)=>value.value):[]}
              >
                <BarChart
                  data={{
                    labels:qvMonths,
                    datasets: [
                      {
                        data: qvValues,
                      },
                    ],
                  }}
                  width={qvMonths.length<7?Dimensions.get('window').width-16:600}
                  height={240}
                  fromZero={true}
                  chartConfig={{
                    barPercentage: 0.7,
                    backgroundColor: "#1cc910",
                    backgroundGradientFrom: "#eff3ff",
                    backgroundGradientTo: "#efefef",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                  }}
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                  showValuesOnTopOfBars
                />
                {/* <LineChart
                  data={{
                    labels:qvMonths,
                    datasets: [
                      {
                        data: qvValues
                        // data: [1,2,3,4,5,6,7,8,9,0,8,7],
                      },
                    ],
                  }}
                  // yAxisInterval={20}
                  // horizontalLabelRotation={-20} 
                  // verticalLabelRotation={-90}
                  width={(selected=='Quarterly' || selected=='Yearly')?Dimensions.get('window').width-16:600}
                  height={240}
                  chartConfig={{
                    barPercentage: 0.7,
                    backgroundColor: "#1cc910",
                    backgroundGradientFrom: "#eff3ff",
                    backgroundGradientTo: "#efefef",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                  }}
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                /> */}
              </ScrollView>
            </View>
            {/* Quantity and volume ends */}

            {/* Sales starts */}
            <View ref={sMonths=selectedSalesData!=undefined ? selectedSalesData.Months.map((value)=>value.month):[]} style={{ marginTop: 20 }}>
              <Text style={{color:'white', fontWeight:'500', fontSize:20, marginBottom:10}}>{SReport.title}</Text>
              <ScrollView horizontal ref={sValues=selectedSalesData!=undefined?selectedSalesData.Months.map((value)=>value.value):[]}>
                <BarChart
                  data={{
                    labels:sMonths,
                    datasets: [
                      {
                        data: sValues,
                      },
                    ],
                  }}
                  width={sMonths.length<7?Dimensions.get('window').width-16:600}
                  height={240}
                  fromNumber={0}
                  fromZero={true}
                  chartConfig={{
                    barPercentage: 0.7,
                    backgroundColor: "#1cc910",
                    backgroundGradientFrom: "#eff3ff",
                    backgroundGradientTo: "#efefef",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                  }}
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                  showValuesOnTopOfBars
                />
              </ScrollView> 
            </View>
            {/* sales ends */}

            {/* Number of customer starts */}
            <View ref={cMonths=selectedCustomerData!=undefined ? selectedCustomerData.Months.map((value)=>value.month):[]} style={{ marginTop: 20 }}>
              <Text style={{color:'white', fontWeight:'500', fontSize:20, marginBottom:10}}>{CReport.title}</Text>
              <ScrollView horizontal ref={cValues=selectedCustomerData!=undefined?selectedCustomerData.Months.map((value)=>value.value):[]}>
                <BarChart
                  data={{
                    labels:cMonths,
                    datasets: [
                      {
                        data: cValues,
                      },
                    ],
                  }}
                  width={cMonths.length<7?Dimensions.get('window').width-16:600}
                  height={240}
                  fromZero={true}
                  chartConfig={{
                    barPercentage: 0.7,
                    backgroundColor: "#1cc910",
                    backgroundGradientFrom: "#eff3ff",
                    backgroundGradientTo: "#efefef",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                  }}
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                  showValuesOnTopOfBars
                />
              </ScrollView>
            </View>
            {/* Number of customer ends */}

            {/* Quantity starts */}
            <View ref={qMonths=selectedQuantityData!=undefined ? selectedQuantityData.Months.map((value)=>value.month):[]} style={{ marginTop: 20 }}>
              <Text style={{color:'white', fontWeight:'500', fontSize:20, marginBottom:10}}>{QReport.title}</Text>
              <ScrollView horizontal ref={qValues=selectedQuantityData!=undefined?selectedQuantityData.Months.map((value)=>value.value):[]}>
                <BarChart
                  data={{
                    labels:qMonths,
                    datasets: [
                      {
                        data: qValues,
                      },
                    ],
                  }}
                  width={qMonths.length<7?Dimensions.get('window').width-16:600}
                  height={240}
                  fromZero={true}
                  chartConfig={{
                    barPercentage: 0.7,
                    backgroundColor: "#1cc910",
                    backgroundGradientFrom: "#eff3ff",
                    backgroundGradientTo: "#efefef",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                  }}
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                  showValuesOnTopOfBars
                />
              </ScrollView>
            </View>
            {/* Quantity ends */}

            {/* Chart ends */}
            <View style={{marginVertical:20, alignItems:'center', width:'100%'}}>
              <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Average time to complete</Text>
              <Text style={{paddingVertical:15, paddingHorizontal:30, borderWidth:1,borderColor:'white', borderRadius:8, color:'white', marginVertical:15}} >{avTime}</Text>
            </View>
          </ScrollView>
        </View>
      )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 1,
  },
  newItem: {
    backgroundColor: "white",
    borderRadius: 4,
    marginTop: 20,
    height: 40,
    paddingHorizontal: 16,
    // width:110,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    // paddingHorizontal: 20,
    borderColor: "black",
  },
});

export default ViewReport;
