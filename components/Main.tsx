import {useLayoutEffect, useState,useEffect} from "react"
import {View, Text,TouchableOpacity,StyleSheet, Image, StatusBar,SectionList,ScrollView} from "react-native"
import QRCode from 'react-native-qrcode-svg';
import Scan from "./Scan"
import ActiveStatus from "./ActiveStatus"
import ResultsModal from "./ResultsModal"
const tool_image = require('../assets/tools.png');
const star_image = require('../assets/star.png');
import conf from "../config.json"
import Drawer from "react-native-drawer"
import Hamburger from 'react-native-animated-hamburger';

let tools = conf.tools;
let cards = conf.cards;
let start = conf.startingCard;

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
    <ScrollView style={{paddingRight:20}}>
    {Object.keys(history).map((title)=>
    <View key={title}>
    <Text style={{paddingBottom:15, fontWeight: 'bold'}}>{title}</Text>
    {history[title].map((info)=><><Text style={{paddingLeft:15}}>{info}</Text><View
  style={{
    borderBottomColor: 'black',
    marginLeft:15,
    borderBottomWidth: StyleSheet.hairlineWidth,
  }}
/></>)}
    </View>)}
    </ScrollView>
  )
}

export default function Main() {
  
    const [data,setData,modalVisible,setModalVisible] = useScan();
    const [tool, setTool] = useState(null)
    const [toolState, setToolState] = useState(false)
    const [information, setInformation] = useState([])
    const [drawer, setDrawer] = useState(false)
    const [history, setHistory] = useState({})
    const [resultsModalVisible,setResultsModalVisible] = useState(false)

    const [started, setStarted] = useState(false)

    const handleIncomingData = (data,information) =>{
      let obj = {...history}
      if (!obj.hasOwnProperty(data)){
        obj[data] = [...information]
      }else{
        
          information.forEach((ele)=> {if(!(obj[data].includes(ele))){obj[data].push(ele)}})
          
          
        
      }
      return obj;
    }

    //also add the starting card information in the history
    useEffect(() => {
      if(started){
        let result = getInformation(data)
        setHistory(handleIncomingData(data.data,result.filter((ele)=>typeof ele == "string")))
      }
    },[started])

    const getInformation=(data)=>{

      const options = cards.find((ele)=> ele.name ==data.data)?.scanOptions
      let result = tool?  options[tool]: options.general;
      setTool(null)
      Array.isArray(result)? null : result = [result]

      return result
    }
    

    useEffect(() => {
        if(tools.includes(data?.data)){
            setTool(data?.data)
        }  
        if(data && !tools.includes(data.data)){
        if(data.data == start){
          setStarted(true)
        }
        let result = getInformation(data)
        setInformation(result)
        if(started){
          setHistory(handleIncomingData(data.data,result.filter((ele)=>typeof ele == "string")))
        }
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
      openDrawerOffset={0.1}
      tweenHandler={(ratio) => ({
        main: { opacity:(2-ratio)/2 }
      })}
        open={drawer}
        content={
        <View style={{flex:1, paddingLeft:30,marginTop:130 }}>
        {Object.keys(history).length>0?<HistoryList history={history}/>:<Text>Scan cards to gather more information 🔎</Text>}
        </View>
      }
        >
            
     {toolState? <ActiveStatus status={tool} setStatus={setTool}/>:<></>}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',padding:40 }}>
      
      <Scan getter={getScannedData} modalVisible={modalVisible} setModalVisible={setModalVisible}/> 
   
      
      <TouchableOpacity style={{position:"absolute", bottom:20, right:20}}
             
              onPress={() => setModalVisible(true)}
            >
              
              <Image
        style={styles.tinyLogo}
        source={require('../assets/scan.png')} 
      />
      <Text style={{textAlign: "center",fontWeight:"bold"}}>Scan</Text>
            </TouchableOpacity>


        <TouchableOpacity style={{position:"absolute", bottom:20, left:20}}
          
          onPress={() =>   setResultsModalVisible(true)}
        >
              
              <Image
        style={styles.tinyLogo}
        source={require('../assets/goal.png')} 
      />
      <Text style={{textAlign: "center",fontWeight:"bold"}}>Solve</Text>
            </TouchableOpacity>
            <ResultsModal resultsModalVisible={resultsModalVisible} setResultsModalVisible={setResultsModalVisible}/>

    
    
      {!started?<Text>Please start with the card: {start}</Text>:
      
       information.map((ele)=> {
        
          return !isNaN(ele)? <Text style={{color:"lightsalmon"}}>You found card number <Text style={{fontWeight:"bold", fontSize:17}}>{ele}</Text></Text>: <Text style={{color:"darkcyan"}}>{ele}</Text>
        
      })
      
      
      }
      
       
     
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