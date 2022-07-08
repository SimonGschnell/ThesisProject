import {useLayoutEffect, useState} from "react"
import {View, Text,TouchableOpacity,StyleSheet} from "react-native"
import QRCode from 'react-native-qrcode-svg';
import Scan from "./Scan"
import Nav from "./Nav"
import {getScannedData,useScan} from "../hooks/useScan"



export default function Hardware({navigation}) {
  
    const [modalVisible,setModalVisible, data] = useScan(navigation);
    
  
    return (
      <>
      
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Scan getter={getScannedData} modalVisible={modalVisible} setModalVisible={setModalVisible}/> 
      <Text>Hardware Screen</Text>
      <View style={{ flex:1,flexDirection: 'row',gap:200}}><QRCode
        value="tool1"
      />
      <QRCode
        value="tool2"
      /></View>
      <Text>{JSON.stringify(data)}</Text>
      <Text>{data?.data=="tool1"?"Tool 1 was selected 🔧":""}</Text>
      <Text>{data?.data=="tool2"?"Tool 2 was selected ⛏️":""}</Text>
      <Nav navigation={navigation}/>
      
     
    </View>
    </>
      
    );
  }