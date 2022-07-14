import {useState, useEffect} from "react"
import { BarCodeScanner } from 'expo-barcode-scanner';
import {Text,Modal,StyleSheet,TouchableOpacity} from "react-native";

export default function Scan({getter,setModalVisible,modalVisible}) {
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
      transparent
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
            style={[styles.button, styles.buttonClose, {position:"absolute", width:"100%",bottom:108}]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
       
      
        
     
          
        
    </Modal>
      
    );
  }

  /*
  <BarCodeScanner
          style={StyleSheet.absoluteFillObject}
          onBarCodeScanned={getter}
        />*/ 

  const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
      },
      
      buttonClose: {
        backgroundColor: "#00BD68",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },});