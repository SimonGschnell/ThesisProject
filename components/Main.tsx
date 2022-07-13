import {useLayoutEffect, useState,useEffect} from "react"
import {View, Text,TouchableOpacity,StyleSheet, Image, StatusBar,SectionList,ScrollView} from "react-native"
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

let getScannedData : (para:object) => void;
function useScan(){
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState(null);

    getScannedData = ({ type, data }:{type:string, data:string}):void =>  {
      setData({ type, data });
      setModalVisible(false);
    };

    
    return [data,setData,modalVisible,setModalVisible]
}

//export as standalone component
function HistoryList({history}:{history:object}){

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
    {Object.keys(history).map((ele)=>
    <>
    <Text style={{paddingBottom:15}}>{ele}</Text>
    {history[ele].map((info)=><Text style={{paddingLeft:15}}>{info}</Text>)}
    </>)}
    </ScrollView>
  )
}

export default function Main() {
  
    const [data,setData,modalVisible,setModalVisible] = useScan();
    const [tool, setTool] = useState(null)
    const [toolState, setToolState] = useState(false)
    const [information, setInformation] = useState("")
    const [drawer, setDrawer] = useState(false)
    const [history, setHistory] = useState({})

    const handleIncomingData = (data,information) =>{
      let obj = {...history}
      if (!obj.hasOwnProperty(data)){
        obj[data] = [information]
      }else{
        if(!(obj[data].includes(information))){
          obj[data].push(information)
          
        }
      }
      return obj;
    }

    useEffect(() => {
        if(tools.includes(data?.data)){
            setTool(data?.data)
        }
        if(data && !tools.includes(data.data)){
           
        const options = cards.find((ele)=> ele.name ==data.data)?.scanOptions
        const result = tool?  options[tool]: options.general;
        setTool(null)
        setInformation(result)
        setHistory(handleIncomingData(data.data,result))
      }
        
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
     
      <Drawer
      styles={{
        drawer: { shadowColor: 'black', shadowOpacity: 0.8, shadowRadius: 6, backgroundColor:"lightgreen"},
        
      }}
      openDrawerOffset={0.2}
      tweenHandler={(ratio) => ({
        main: { opacity:(2-ratio)/2 }
      })}
        open={drawer}
        content={
        <View style={{flex:1, paddingLeft:30, justifyContent: 'center' }}>
        <HistoryList history={history}/>
        </View>
      }
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
      <Text>{JSON.stringify(history)}</Text>
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
    <View style={{position: 'absolute', top: 50, left: 20}}>
      <TouchableOpacity>
      <Hamburger color="green"  type="spinCross" active={drawer}  onPress={() => {
                 console.log("hello")
               setDrawer(!drawer)
           }}
           underlayColor="transparent"
           >
         </Hamburger>
         </TouchableOpacity>
         </View> 
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