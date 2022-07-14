import {useScan,getScannedData} from "../hooks/useScan"
import Scan from "../components/Scan"
import {View, Text} from "react-native"

import Nav from "./Nav"
import {useLayoutEffect, useState} from "react"




export default function Server({navigation}) {
  
  
  const [data,setData,modalVisible,setModalVisible] = useScan(navigation);
    return (
        <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Scan getter={getScannedData} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        <Text>Server Screen </Text>
        <Text>scanned data: {JSON.stringify(data)} </Text>
     
       
        <Nav navigation={navigation}/> 
  
      </View>
      </>
    );
  }