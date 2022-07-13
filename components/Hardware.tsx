import {useLayoutEffect, useState} from "react"
import {View, Text,TouchableOpacity,StyleSheet} from "react-native"
import QRCode from 'react-native-qrcode-svg';
import Scan from "./Scan"
import Nav from "./Nav"
import {getScannedData,useScan} from "../hooks/useScan"
const tool_image = require('../assets/tools.png');
const star_image = require('../assets/star.png');


export default function Hardware({navigation}) {
  
    const [data,setData,modalVisible,setModalVisible] = useScan(navigation);
    
   
    return (
      <>
      
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Scan getter={getScannedData} modalVisible={modalVisible} setModalVisible={setModalVisible}/> 
      <Text>Hardware Screen</Text>
      <View style={{flexDirection:"row"}}>
        <QRCode
        value="tool1"
        logo={tool_image}
        logoBackgroundColor="white"
        quietZone={5}
      />
      <QRCode
        value="tool2"
        logo={star_image}
        logoBackgroundColor="white"
        quietZone={5}
      />
      <QRCode
        value="Hardware-DB"
        logo={star_image}
        logoBackgroundColor="white"
        quietZone={5}
      />
      <QRCode
        value="cpuPerformance"
        logo={tool_image}
        logoBackgroundColor="white"
        quietZone={5}
      />
      </View>
      <Text>{JSON.stringify(data)}</Text>
      <Text>{data?.data=="tool1"?"Tool 1 was selected 🔧":""}</Text>
      <Text>{data?.data=="tool2"?"Tool 2 was selected ⛏️":""}</Text>
      <Nav navigation={navigation}/>
       
     
    </View>
    </>
      
    );
  }