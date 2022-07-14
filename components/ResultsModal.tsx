

import {View, Text,Modal,Pressable,Alert,StyleSheet,TextInput,Image} from "react-native"

import {useEffect, useState} from "react"
import Stepper from "./Stepper"



export default function ResultsModal({resultsModalVisible, setResultsModalVisible}) {
  

  
    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={resultsModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setResultsModalVisible(!resultsModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Pressable
              style={{position:"absolute",top:10,right:30,padding:20}}
              onPress={() => setResultsModalVisible(!resultsModalVisible)}
            >
              <Image
                style={styles.verytinyLogo}
                source={require('../assets/close.png')}
              />
            </Pressable>

            <Stepper/>
          </View>
        </View>
      </Modal>
    );
  }

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
      
      verytinyLogo: {
        
        width: 15,
        height: 15,
      },
    modalView: {
      margin: 0,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 0,
      padding: 10,
      elevation: 0
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }

  });