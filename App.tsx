import { StatusBar } from 'expo-status-bar';
import {useState, useEffect, useLayoutEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity,Pressable,Modal } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'


import routes from "./routes"

//custom hook for the scan, doesnt let me put it in a seperate file (weird errors)
function useScan(navigation) {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState(null);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={[styles.button, { marginRight: 10 }]}
          onPress={() => setModalVisible(true)}
        >
          <Text>scan</Text>
        </TouchableOpacity>
      ),
    });
    return navigation.setOptions({});
  }, [navigation]);

  const getScannedData = ({ type, data }) => {
    setData({ type, data });
    setModalVisible(false);
  };

  return [modalVisible, setModalVisible, data, getScannedData];
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
