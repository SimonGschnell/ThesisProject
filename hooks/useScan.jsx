
import {useState,useLayoutEffect} from "react"
import {TouchableOpacity,Text} from "react-native"

const getScannedData = ({ type, data }) => {
    setData({ type, data });
    setModalVisible(false);
  };

  function useScan(navigation){
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState(null);
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