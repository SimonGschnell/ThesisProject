import Scan from "./Scan"
import Nav from "./Nav"
import {View, Text,TouchableOpacity,StyleSheet} from "react-native"
import {useScan,getScannedData} from "../hooks/useScan.jsx"

export default function Software({navigation,route}) {
    const {test} = route.params
    const [modalVisible,setModalVisible, data] = useScan(navigation);
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

  const styles = StyleSheet.create({
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
      },});