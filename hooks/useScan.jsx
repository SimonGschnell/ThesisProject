
import {useState,useLayoutEffect} from "react"
import {TouchableOpacity,Text} from "react-native"

let getScannedData;

  function useScan(navigation){
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState(null);

    getScannedData = ({ type, data }) => {
      setData({ type, data });
      setModalVisible(false);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
             
              onPress={() => setModalVisible(true)}
            >
              <Text>scan</Text>
            </TouchableOpacity>
          ),
        });
        
      }, [navigation]);
    return [data,setData,modalVisible,setModalVisible]
}


export {getScannedData,useScan};