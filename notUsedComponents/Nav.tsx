import {View,TouchableOpacity,Text,StyleSheet} from "react-native";
import routes from "../routes"

export default function Nav ({navigation}){
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

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
      },});