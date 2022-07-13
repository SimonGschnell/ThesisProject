import {useLayoutEffect, useState,useEffect} from "react"
import {View, Text,TouchableOpacity,StyleSheet, Image, StatusBar} from "react-native"
import QRCode from 'react-native-qrcode-svg';
import Scan from "./Scan"
import ActiveStatus from "./ActiveStatus"
const tool_image = require('../assets/tools.png');
const star_image = require('../assets/star.png');
import conf from "../config.json"
import Drawer from "react-native-drawer"
import Hamburger from 'react-native-animated-hamburger';

let tools = conf.tools;
let cards = conf.cards;

let getScannedData;
function useScan(){
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState(null);

    getScannedData = ({ type, data }) => {
      setData({ type, data });
      setModalVisible(false);
    };

    
    return [data,setData,modalVisible,setModalVisible]
}



export default function Main() {
  
    const [data,setData,modalVisible,setModalVisible] = useScan();
    const [tool, setTool] = useState(null)
    const [toolState, setToolState] = useState(false)
    const [information, setInformation] = useState("")
    const [drawer, setDrawer] = useState(false)

    useEffect(() => {
        if(tools.includes(data?.data)){
            setTool(data?.data)
        }
        if(data && !tools.includes(data.data)){
            console.log(tools)
            console.log(data.data)
        const test = cards.find((ele)=> ele.name ==data.data)?.scanOptions
        const result = tool?  test[tool]: test.general;
        setTool(null)
        setInformation(result)}
        
    },[data])

    useEffect(() => {
        if(tool){
            setToolState(true)
        }else{
            setToolState(false)
        }
        
    },[tool])
   
    return (
      <>
      <View style={{marginTop:40, marginLeft:20}}>
     <Hamburger color="green" size={300}  type="spinCross" active={drawer}  onPress={() => {
                console.log("hello")
              setDrawer(!drawer)
          }}
          underlayColor="transparent"
          >
        </Hamburger>
        </View>
      <Drawer
        open={drawer}
        content={<Text>asdf</Text>}
        >
            
     {toolState? <ActiveStatus status={tool} setStatus={setTool}/>:<></>}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
      <Scan getter={getScannedData} modalVisible={modalVisible} setModalVisible={setModalVisible}/> 
   
      
      <TouchableOpacity style={{position:"absolute", bottom:20, right:20}}
             
              onPress={() => setModalVisible(true)}
            >
              
              <Image
        style={styles.tinyLogo}
        source={require('../assets/scan.png')} 
      />
      <Text style={{textAlign: "center",fontWeight:"bold",textDecoration: "underline"}}>Scan</Text>
            </TouchableOpacity>
      <View style={{flexDirection:"row"}}>
      
      
      </View>
    
      <Text>{JSON.stringify(data)}</Text>
      <Text>{information}</Text>
      <View style={{flexDirection:"row",gap:500}}><QRCode
        value="softwareInspection"
        logo={tool_image}
        logoBackgroundColor="white"
        quietZone={5}
      />
      <QRCode
        value="Hardware-EntryServer"
        logo={star_image}
        logoBackgroundColor="white"
        quietZone={5}
      /></View>
      
       
     
    </View>
    </Drawer>
    </>
      
    );
  }

  /* 
  <QRCode
        value="cpuPerformance"
        logo={tool_image}
        logoBackgroundColor="white"
        quietZone={5}
      />
      */

  const styles= StyleSheet.create({
    tinyLogo: {
        width: 50,
        height: 50,
      },
  })