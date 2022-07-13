import { StatusBar } from 'expo-status-bar';
import Main from "./components/Main"
import {useState, useEffect, useRef} from 'react'
import {Text} from 'react-native'
import { StyleSheet,Button } from 'react-native';


import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import routes from "./routes"













const Stack = createNativeStackNavigator();



export default function App() {
  const drawer = useRef(null);
  return (
   <>
    <StatusBar style="light" backgroundColor={'transparent'} translucent />
    
    
        <Main/>
   
   </>
  );
}
/*
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
