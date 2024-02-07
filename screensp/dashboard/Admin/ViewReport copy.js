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
import axios from "axios";

import Splash from "../../../components/Splash";
import EnvVariables from "../../../constant/EnvVariables";

const List = [
  { title: "Monthly", id: 1 },
  { title: "Quaterly", id: 2 },
  { title: "Yearly", id: 3 },
];

const dummyJSON = 
  {
    title: "Quantity And Volume",
    data:[
      {
        id:1,
        heading:'Monthly',
        months: [
          {
            month: "Jan",
            value: 10,
          },
          {
            month: "Feb",
            value: 25,
          },
          {
            month: "Mar",
            value: 5,
          },
          {
            month: "Apr",
            value: 65,
          },
          {
            month: "May",
            value: 51,
          },
          {
            month: "Jun",
            value: 98,
          },
          {
            month: "Jul",
            value: 37,
          },
          {
            month: "Aug",
            value: 78,
          },
          {
            month: "Sept",
            value: 12,
          },
          {
            month: "Oct",
            value: 62,
          },
          {
            month: "Nov",
            value: 52,
          },
          {
            month: "Dec",
            value: 44,
          },
        ],
      },
      {
        id:2,
        heading:'Quaterly',
        months: [
          {
            month: "Jan-Mar",
            value: 10,
          },
          {
            month: "April-Jun",
            value: 25,
          },
          {
            month: "July-Sep",
            value: 5,
          },
          {
            month: "Oct-Dec",
            value: 65,
          },
        ],
      },
      {
        id:3,
        heading:'Yearly',
        months:[
          {
            month: "2018",
            value: 10,
          },
          {
            month: "2019",
            value: 25,
          },
          {
            month: "2020",
            value: 5,
          },
          {
            month: "2021",
            value: 65,
          },
        ]
      }
    ]
  }

  const SalesJson=
  {
    title: "Sales",
    data:[
      {
        id:1,
        heading:'Monthly',
        months: [
          {
            month: "Jan",
            value: 10,
          },
          {
            month: "Feb",
            value: 20,
          },
          {
            month: "Mar",
            value: 50,
          },
          {
            month: "Apr",
            value: 30,
          },
          {
            month: "May",
            value: 25,
          },
          {
            month: "Jun",
            value: 15,
          },
          {
            month: "Jul",
            value: 40,
          },
          {
            month: "Aug",
            value: 45,
          },
          {
            month: "Sept",
            value: 5,
          },
          {
            month: "Oct",
            value: 55,
          },
          {
            month: "Nov",
            value: 38,
          },
          {
            month: "Dec",
            value: 14,
          },
        ],
      },
      {
        id:2,
        heading:'Quaterly',
        months: [
          {
            month: "Jan-Mar",
            value: 10,
          },
          {
            month: "April-Jun",
            value: 25,
          },
          {
            month: "July-Sep",
            value: 5,
          },
          {
            month: "Oct-Dec",
            value: 65,
          },
        ],
      },
      {
        id:3,
        heading:'Yearly',
        months:[
          {
            month: "2018",
            value: 10,
          },
          {
            month: "2019",
            value: 25,
          },
          {
            month: "2020",
            value: 5,
          },
          {
            month: "2021",
            value: 65,
          },
        ]
      }
    ]
  }

  const nCustomerJson=
  {
    title: "Number Of Customers",
    data:[
      {
        id:1,
        heading:'Monthly',
        months: [
          {
            month: "Jan",
            value: 90,
          },
          {
            month: "Feb",
            value: 80,
          },
          {
            month: "Mar",
            value: 70,
          },
          {
            month: "Apr",
            value: 60,
          },
          {
            month: "May",
            value: 15,
          },
          {
            month: "Jun",
            value: 25,
          },
          {
            month: "Jul",
            value: 35,
          },
          {
            month: "Aug",
            value: 45,
          },
          {
            month: "Sept",
            value: 50,
          },
          {
            month: "Oct",
            value: 55,
          },
          {
            month: "Nov",
            value: 60,
          },
          {
            month: "Dec",
            value: 65,
          },
        ],
      },
      {
        id:2,
        heading:'Quaterly',
        months: [
          {
            month: "Jan-Mar",
            value: 10,
          },
          {
            month: "April-Jun",
            value: 25,
          },
          {
            month: "July-Sep",
            value: 5,
          },
          {
            month: "Oct-Dec",
            value: 65,
          },
        ],
      },
      {
        id:3,
        heading:'Yearly',
        months:[
          {
            month: "2018",
            value: 10,
          },
          {
            month: "2019",
            value: 25,
          },
          {
            month: "2020",
            value: 5,
          },
          {
            month: "2021",
            value: 65,
          },
        ]
      }
    ]
  }

const ViewReport = ({ navigation }) => {

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

  console.log('selected='+selected)

  const [apiLoader, setApiLoader]=useState(false)
  const [dataLoaded, setDataLoaded]=useState(true)

  const [selectedData, setSelectedData]=useState()
  const [selectedSalesData, setSelectedSalesData]=useState()
  const [selectedCustomerData, setSelectedCustomerData]=useState()


  let qvMonths=[];
  let qvValues=[];

  const [volumeData, setVolumeData]=useState(undefined)

  const getDetails=()=>{
    let webApiUrl=EnvVariables.API_HOST +`APIs/ViewReportQuantityAndVolume/ViewReportQuantityAndVolume.php`;
    axios.get(webApiUrl).then((response)=>{
      setVolumeData(response.data)
      // setSelected(await response.data.data.find((value)=>value.heading==selected))
      console.log('selected in api call='+JSON.stringify(response.data.data))
    })
    setSelectedData(dummyJSON.data.find((value)=>value.heading==selected))
    console.log('after api call')
    if(selectedData!=undefined){
      qvMonths=selectedData.months.map((value)=>value.month)
      qvValues=selectedData.months.map((value)=>value.value)
    }
    
  }

  let sMonths=[]; let sValues=[];
  const getSalesDetails=async()=>{
    setSelectedSalesData(SalesJson.data.find((value)=>value.heading==selected))
    sMonths=selectedSalesData.months.map((value)=>value.month)
    sValues=selectedSalesData.months.map((value)=>value.value)
  }

  let cMonths=[]; let cValues=[];
  const getCustomerDetails=async()=>{
    setSelectedCustomerData(nCustomerJson.data.find((value)=>value.heading==selected))
    cMonths=selectedCustomerData.months.map((value)=>value.month)
    cValues=selectedCustomerData.months.map((value)=>value.value)
  }

  useEffect(()=>{
    console.log('before 1st function')
    getDetails()
    console.log('before second function')
    getSalesDetails()
    console.log('before 3rd function')
    getCustomerDetails()
    console.log('after last function')
  },[selectedData, selected, getDetails, getSalesDetails, selectedSalesData, getCustomerDetails, selectedCustomerData])

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
            <View ref={qvMonths=selectedData!=undefined ? selectedData.months.map((value)=>value.month):[]} style={{ marginTop: 20 }}>
              <Text style={{color:'white', fontWeight:'500', fontSize:20, marginBottom:10}}>{dummyJSON.title}</Text>
              <ScrollView horizontal ref={qvValues=selectedData!=undefined?selectedData.months.map((value)=>value.value):[]}>
                <BarChart
                  data={{
                    labels:qvMonths,
                    datasets: [
                      {
                        data: qvValues,
                      },
                    ],
                  }}
                  // yAxisInterval={20}
                  // horizontalLabelRotation={-20} 
                  // verticalLabelRotation={-90}
                  width={(selected=='Quaterly' || selected=='Yearly')?Dimensions.get('window').width-16:600}
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
                  width={(selected=='Quaterly' || selected=='Yearly')?Dimensions.get('window').width-16:600}
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
            <View ref={sMonths=selectedSalesData!=undefined ? selectedSalesData.months.map((value)=>value.month):[]} style={{ marginTop: 20 }}>
              <Text style={{color:'white', fontWeight:'500', fontSize:20, marginBottom:10}}>{SalesJson.title}</Text>
              <ScrollView horizontal ref={sValues=selectedSalesData!=undefined?selectedSalesData.months.map((value)=>value.value):[]}>
                <BarChart
                  data={{
                    labels:sMonths,
                    datasets: [
                      {
                        data: sValues,
                      },
                    ],
                  }}
                  // yAxisInterval={20}
                  // horizontalLabelRotation={-20} 
                  // verticalLabelRotation={-90}
                  width={(selected=='Quaterly' || selected=='Yearly')?Dimensions.get('window').width-16:600}
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
                  showValuesOnTopOfBars
                />
              </ScrollView>
            </View>
            {/* sales ends */}

            {/* Number of customer starts */}
            <View ref={cMonths=selectedCustomerData!=undefined ? selectedCustomerData.months.map((value)=>value.month):[]} style={{ marginTop: 20 }}>
              <Text style={{color:'white', fontWeight:'500', fontSize:20, marginBottom:10}}>{nCustomerJson.title}</Text>
              <ScrollView horizontal ref={cValues=selectedCustomerData!=undefined?selectedCustomerData.months.map((value)=>value.value):[]}>
                <BarChart
                  data={{
                    labels:cMonths,
                    datasets: [
                      {
                        data: cValues,
                      },
                    ],
                  }}
                  // yAxisInterval={20}
                  // horizontalLabelRotation={-20} 
                  // verticalLabelRotation={-90}
                  width={(selected=='Quaterly' || selected=='Yearly')?Dimensions.get('window').width-16:600}
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
                  showValuesOnTopOfBars
                />
              </ScrollView>
            </View>
            {/* Number of customer ends */}

            {/* Chart ends */}
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
