
import {View, Text,Modal,Pressable,Alert,StyleSheet,TextInput} from "react-native"

import {useEffect, useState} from "react"
import Step from "./Step"
import config from "../config.json"

const res = config.solve;


export default function Stepper(){
    const [visible, setVisible] = useState(0)
    const states = res.map((question)=>useState({question:question.question, answer:question.answer,providedAnswer:""}))
    
    const handleSubmit = ()=>{
        
        states.forEach(([state,_])=>{
            alert(state.providedAnswer)
        })
    }

    return (
    <>
    {states.map(([state,setState],index)=>
    <Step key={state.question} handleSubmit={handleSubmit} listSize={states.length} visible={visible} index={index} setVisible={setVisible} state={state} setState={setState} />
    )}
    
    
    </>
      )
}

const styles = StyleSheet.create({
    
  });


