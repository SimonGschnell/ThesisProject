
import {View, Text,Modal,Pressable,Alert,StyleSheet,TextInput} from "react-native"

import {useEffect, useState} from "react"
import { LinearGradient } from 'expo-linear-gradient';

export default function Stepper({handleSubmit,listSize, visible, index, setVisible, state, setState}){
    const [answer,setAnswer] = useState("")

    const handleAnswer=(answer) => {
        setAnswer(answer)
        setState((old)=>{return {...old,providedAnswer:answer}})
    }

    return (
    <>
    <View style={[{display: visible==index?"flex":"none"}, styles.step]}>
        <Text style={styles.question}>{state.question}</Text>
        <TextInput
        multiline 
        numberOfLines = {4}
        style={styles.input}
        onChangeText={handleAnswer}
        value={answer}
        placeholder="enter answer"
      />
      <View style={styles.buttonContainer}>
        {index!=0?
        <LinearGradient  
        colors={['#00D775', '#00BD68']}
        style={styles.btn}>
        <Pressable
        // @ts-ignore
               
              onPress={() => setVisible((old:number)=>old-1)}
            >
              <Text style={styles.textStyle}>previous</Text>
            </Pressable>
            </LinearGradient>
            :<></>}
            
            {(listSize-1)!=index?
            <LinearGradient  
            colors={['#00D775', '#00BD68']}
            style={styles.btn}>
            <Pressable
            // @ts-ignore
         
              onPress={() => setVisible((old:number)=>old+1)}
            >
              <Text style={styles.textStyle}>next</Text>
            </Pressable>
            </LinearGradient>
            :
            <LinearGradient  
            colors={['#005577', '#0087bd']}
            style={styles.btn}>
            <Pressable
            // @ts-ignore
            
              onPress={() => handleSubmit()}
            >
               
              <Text style={styles.textStyle}>submit</Text>
            </Pressable>
            </LinearGradient>}
      </View>
    </View>
    </>
      )
}

const styles = StyleSheet.create({
    step:{
        margin:20,
        

    },
    question:{
        fontSize:20,
        margin:10
    },
    buttonContainer:{
      
        justifyContent:"space-between",
        flexDirection:"row",
        margin:10
    },

    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
    
    input: {
        height: 80,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
      btn :{
    backgroundColor: "initial",
    
    borderRadius: 5,
    boxShadow: "rgba(0, 0, 0, 0.1) 0 2px 4px",
    color: "#FFFFFF",
    
    outline: 0,
    overflow: "hidden",
    padding:10,
   
    position: "relative",
    textAlign: "center",
    verticalAlign: "top",
    whiteSpace: "nowrap",
    
    border: 0
  }
  });