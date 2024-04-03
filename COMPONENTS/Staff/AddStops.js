import { StyleSheet, Text, View ,Image,TextInput,TouchableOpacity, Alert} from 'react-native'
import React from 'react'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth ,getFirestore,collection,addDoc,db,query,where,getDocs,doc,updateDoc} from '../firebase'
import Header from '../StaffPartials/Header'
import Footer from '../StaffPartials/Footer'

const AddStops = ({ navigation, route }) => {
  
   const {email} = route.params;

    const [busNo, setBusno] = useState('')
    const [StopName, setName] =useState([])
    const [StopNo, setNumber] =useState([])
    const [PickupTime, setPickup] = useState([])
    const [BoardingTime, setBoarding] = useState([])
    const [StopFare, setStopFare] = useState([])
   // const [stdId, setStdId]= useState([])

    // function declare
    // creaate object
    
    const updateStop = async () => {
      const db = getFirestore();
      const stopsCollection = collection(db, 'Stops');
      const stopQuery = query(stopsCollection, where('busNo', '==', busNo));


      try {
          const querySnapshot = await getDocs(stopQuery);

          if (querySnapshot.empty) {
              // If no document with the same stop number exists, add a new document
              const newStopDetails = {
                  stopNames: StopName,
                  stopNo: StopNo,
                  pickup: PickupTime,
                  boarding: BoardingTime,
                  busNo: busNo,
                  stopFare: StopFare,
              };

              await addDoc(stopsCollection, newStopDetails);
              console.log("New Bus and Stop  ADDED");
              Alert.alert("Stop Added Successfully");
          } else {
            const existingDoc = querySnapshot.docs[0];
            const existingDocRef = doc(stopsCollection, existingDoc.id);

            // Retrieve the existing stop names array and add the current StopName to it
            // If the existing data structure has nested arrays
            // If the existing data structure has nested arrays
            // If the existing data structure has nested arrays

const existingStopNames = existingDoc.data().stopNames || [];
const existingPickup = existingDoc.data().pickup || [];
const existingBoarding = existingDoc.data().boarding || [];
const existingStopNo = existingDoc.data().stopNo || [];
const existingStopFare = existingDoc.data().stopFare || [];

// Concatenate the new stop name to the existing array

const updatedStopNames = existingStopNames.concat(StopName);
const updatedpickupTime = existingPickup.concat(PickupTime);
const updatedBoarding = existingBoarding.concat(BoardingTime);
const updatedStopNo = existingStopNo.concat(StopNo);
const updatedStopFare = existingStopFare.concat(StopFare);

// Create a new object with the updated array and other properties
const updatedData = {
    stopNames: updatedStopNames,
    pickup: updatedpickupTime,
    boarding: updatedBoarding,
    busNo: busNo,
    stopFare: updatedStopFare,
    stopNo: updatedStopNo,
};



            // Update the entire document with the new object
            await updateDoc(existingDocRef, updatedData);


              console.log("new Stop UPDATED");
              Alert.alert("Stop Updated Successfully");
          }
      } catch (error) {
          console.error("Error updating/add stop: ", error);
          Alert.alert("Error updating/add stop. Please try again.");
      }
  }
    

  return (
    
   <View style={styles.Background}>
      <Header email={email}/>
    <View style={styles.body}>
     
   
    
    <View style={styles.input}>
    
    <TextInput style={styles.textbox} placeholder=" Bus Number" value={busNo} onChangeText= {(text) => setBusno(text)}/>
    <TextInput style={styles.textbox} placeholder="  New Stop Name" value={StopName} onChangeText= {(text) => setName([text])}/>
    <TextInput style={styles.textbox} placeholder="  New Stop Number" value={StopNo} onChangeText= {(text) => setNumber([text])}/>
    <TextInput style={styles.textbox} placeholder="  Pickup Time" value={PickupTime} onChangeText= {(text) => setPickup([text])}  />
    <TextInput style={styles.textbox} placeholder="  Boarding Time" value={BoardingTime}  onChangeText= {(text) => setBoarding([text])}/>
    <TextInput style={styles.textbox} placeholder="  Stop Fare" value={StopFare}  onChangeText= {(text) => setStopFare([text])}/>


    <TouchableOpacity style={{marginLeft:100,}}></TouchableOpacity>
     

  <TouchableOpacity style={styles.button1} onPress={updateStop}><Text style={styles.t3}>Add Stop</Text></TouchableOpacity>
  


   
   </View>
  
     </View>
     <Footer email={email}/>
     </View>
  )
}

export default AddStops

const styles = StyleSheet.create({

  body : {
    width:"100%",
    height:"80%",
    backgroundColor:"#9EBFE6",
    alignItems:"center",
    justifyContent:"center",
},
  Background : {
    backgroundColor:"#FAF9F6",
      flex: 1,
  },
  logo :{
    width: '100%',
    height: "26%",
  },
  input: {
    alignItems:"center",
    justifyContent:"center",
    width:"100%",
    height:"100%",
   
  },
  t1 : {
    fontSize:20,
  },
  textbox: {
    backgroundColor:"white",
    width: "70%",
    height:"8%",
    color:"black",
    fontSize:10,
    borderRadius:10,
    marginTop:25,
    
  },
 
   button1: {
    backgroundColor: "#DDDDDD",
    borderRadius:10,
    width:"35%",
    height:"6%",
    marginTop:25,
    alignItems:"center",
    justifyContent:"center",
    borderBlockColor:"black",
    borderWidth:1,
    
   },
   button2: {
    backgroundColor: "#DDDDDD",
    borderRadius:10,
    width:"30%",
    height:"5%",
    marginTop:5,
    alignItems:"center",
    justifyContent:"center",
    
   },
  forgetPassword: {
    marginTop:10,
    marginLeft:60,
    
  },
  signup : {
    marginLeft:130,

  },
  t2 : {
    textAlign: 'center', 
    marginTop:10,
    color:'blue'
    
  },
  t3 : {
      textAlign: 'center', 
      
  },
})