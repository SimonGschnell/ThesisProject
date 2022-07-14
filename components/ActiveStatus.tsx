import {View,TouchableOpacity,Text,StyleSheet,Image} from "react-native";

const colors = ["#2EB885", "#f44336","#46A7F5","#FFA92A"]

const randomColor = () =>{
    let item = colors[Math.floor(Math.random()*colors.length)];
    return {backgroundColor: item}
}

export default function ActiveStatus ({status,setStatus}){
  return(
    <View style={[randomColor(),{position:"absolute", top:56, right:20,flex:1,flexDirection:"row"},styles.alertBox]}>
        <Text style={{color:"white",fontWeight:"bold"}}>{status} is active</Text>
        <TouchableOpacity onPress={()=>setStatus(null)}
         style={styles.closebtn}
        >
        
             
           
              <Image
                style={styles.verytinyLogo}
                source={require('../assets/closeWhite.png')}
              />
          
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
      verytinyLogo: {
        
        width: 15,
        height: 15,
      },
      alertBox:{
        borderRadius:20,
    padding: 15,
   
    color: "white",
    marginBottom: 15
  },
  closebtn: {
    paddingLeft: 10,
    color: "white",
    fontWeight: "bold",
    paddingTop:5,
    fontSize: 22,
    transition: 0.9
  },
  });