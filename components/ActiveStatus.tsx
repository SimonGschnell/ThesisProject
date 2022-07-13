import {View,TouchableOpacity,Text,StyleSheet} from "react-native";

const colors = ["#2EB885", "#f44336","#46A7F5","#FFA92A"]

const randomColor = () =>{
    let item = colors[Math.floor(Math.random()*colors.length)];
    return {backgroundColor: item}
}

export default function ActiveStatus ({status,setStatus}){
  return(
    <View style={[randomColor(),{position:"absolute", top:50, right:20,flex:1,flexDirection:"row"},styles.alertBox]}>
        <Text style={{color:"white"}}>{status} is active</Text>
        <TouchableOpacity onPress={()=>setStatus(null)}>
            <Text style={styles.closebtn}>&times;</Text>
        </TouchableOpacity>
    </View>
  )
}



const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
      },
      alertBox:{
        borderRadius:20,
    padding: 20,
   
    color: "white",
    marginBottom: 15
  },
  closebtn: {
    marginLeft: 15,
    color: "white",
    fontWeight: "bold",
  
    fontSize: 22,
    lineHeight: 20,
    transition: 0.9
  },
  });