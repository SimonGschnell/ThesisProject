
import {View, Text,Modal,Pressable,Alert,StyleSheet,TextInput,BackHandler} from "react-native"

import {useEffect, useState} from "react"
import Step from "./Step"
import config from "../config.json"

const res = config.solve;


function Results({states}){
    
    return(
        <>
        {states.map(([state,setState])=>{
            return (<><Text style={{fontWeight:"bold"}}>{state.question}</Text>
                      <Text>{state.answer}</Text>
                      <Text>{state.providedAnswer}</Text>
                      <Pressable
                        
                        onPress={() => BackHandler.exitApp()}
                        >
                        <Text>Close app</Text>
                      </Pressable></>)
        })}
        </>
    )
}

export default function Stepper({disableClose}){
    const [visible, setVisible] = useState(0)
    const states = res.map((question)=>useState({question:question.question, answer:question.answer,providedAnswer:""}))
    
    useEffect(() => {
        if(visible==states.length){
            disableClose(false)
        }else{
            disableClose(true)
        }
    },[visible])

    return (
    <>
    {states.map(([state,setState],index)=>
    <Step key={state.question}  listSize={states.length} visible={visible} index={index} setVisible={setVisible} state={state} setState={setState} />
    )}

    {visible==states.length? <Results  states={states}/>:<></>}
    
    
    </>
      )
}

const styles = StyleSheet.create({
    
  });


