import { StatusBar } from 'expo-status-bar';
import {useState, useEffect, useLayoutEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity,Pressable,Modal } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { BarCodeScanner } from 'expo-barcode-scanner';
import QRCode from 'react-native-qrcode-svg';

const routes =[
  {name:"Hardware", title: "Hardware 💾", component:Hardware},
  {name:"Server", title: "Server 🖥️", component:Server},
  {name:"Software", title: "Software ℹ️", component:Software, initialParams:{test:"someTest"}}
]

function Nav ({navigation}){
  return(
    <View style={{flexDirection:"row",alignItems:"center"}}>
    {routes.map((route)=>{
      return <TouchableOpacity
      style={styles.button}
      key={route.name}
      onPress={()=> navigation.navigate(route.name,{name:Math.random()+"test", test:"test"})}>
     <Text>{route.name}</Text>
     </TouchableOpacity>
    })}
    </View>
  )
}

function Scan({getter,setModalVisible,modalVisible}) {
  const [hasPermission, setHasPermission] = useState(null);
 

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null){
  return <Text>Requesting for camera permission</Text>}
  if (hasPermission === false){
  return <Text>No access to camera</Text>}

  return (

    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      alert("Modal has been closed.");
      setModalVisible(!modalVisible);
    }}
  >
  
       
       <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={getter}
      />
      <TouchableOpacity
          style={[styles.button, styles.buttonClose, {position:"absolute", width:"100%",bottom:50}]}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={styles.textStyle}>Hide Modal</Text>
        </TouchableOpacity>
     
    
      
   
        
      
  </Modal>
    
  );
}

function useScan(navigation){
  const [modalVisible, setModalVisible] = useState(false);
  const [data,setData] = useState(null)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={[styles.button,{marginRight:10}]} onPress={() => setModalVisible(true)}  ><Text>scan</Text></TouchableOpacity> 
      ),
    });
  }, [navigation]);

  const getScannedData = ({ type, data })=>{
   
    setData({type,data})
    setModalVisible(false)
 }

 return [modalVisible, setModalVisible,data,getScannedData]
}

function Hardware({navigation}) {
  
  const [modalVisible,setModalVisible, data,getScannedData] = useScan(navigation);
  

  return (
    <>
    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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

function Software({navigation,route}) {
  const {test} = route.params
  const [modalVisible,setModalVisible, data,getScannedData] = useScan(navigation);
  return (
    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Scan getter={getScannedData} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
      <Text>About Screen </Text>
      <Text>{JSON.stringify(data)} </Text>
      <Text>parameter: {test}</Text>
      <TouchableOpacity
       style={styles.button}
       onPress={()=> navigation.setParams({test:"newTest"})}>
        <Text>here</Text>
      </TouchableOpacity>
      <Nav navigation={navigation}/> 
    </View>
  );
}

function Server({navigation,route}) {
  
  
  const [modalVisible,setModalVisible, data,getScannedData] = useScan(navigation);
  return (
    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Scan getter={getScannedData} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
      <Text>Server Screen </Text>
      <Text>scanned data: {JSON.stringify(data)} </Text>
   
     
      <Nav navigation={navigation}/> 

    </View>
  );
}

const Stack = createNativeStackNavigator();



export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
       initialRouteName="Hardware">

        
        {routes.map((route)=>
          <Stack.Screen   
          name={route.name} 
          key={route.name}
          options={{title:route.title}}
          component={route.component}
          initialParams={route.initialParams?route.initialParams:{}} />
        )}
       
       
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}
/*
options={({route})=>({
          title:route.params?.name,
        })}
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});
