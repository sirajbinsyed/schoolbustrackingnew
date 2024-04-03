import { StyleSheet, Text, View ,Image,TextInput,TouchableOpacity, Alert} from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth ,getFirestore,collection,addDoc,db,query,where,getDocs,doc,updateDoc} from '../firebase'
import Header from '../StaffPartials/Header'
import Footer from '../StaffPartials/Footer'

const UpdatePayment = ({ navigation, route }) => {
    const {email} = route.params;

    const [dateOfPayment, setDateOfPayment] = useState();
    const [busNo, setBusNo] =useState();
    const [payedAmt, setPayedAmt] =useState();
    const [stdId, setStdId] = useState();
    const [paymentMode, setPaymentMode] = useState();

    useEffect(() => {
        // Function to set current date when component mounts
        const setCurrentDateOnMount = () => {
          const date = new Date();
          const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
          setDateOfPayment(formattedDate);
         
        };
    
        // Call the function to set current date when component mounts
        setCurrentDateOnMount();
      }, []);


      const updatePayment = async () => {
        try {
         
        //   const firestore = firebase.firestore();
    
         
        //   await firestore.collection('PaymentDetails').add({
        //     stdId: stdId,
        //     busNo: busNo,
        //     paymentAmt: payedAmt,
        //     dateofPayment: dateOfPayment,
        //     paymentMode : paymentMode,
            
        //   });
    
        const docRef =await addDoc(collection(db, "stdpaymentdetails"), {
            stdId: stdId,
            busNo: busNo,
            paymentAmt: payedAmt,
            dateofPayment: dateOfPayment,
            paymentMode : paymentMode,
          });
          console.log('Document written with ID: ', docRef.id);
          alert('Document added to Notificatons');
          
          setPaymentMode('');
          setStdId('');
          setPayedAmt('');
          setBusNo('');
          setDateOfPayment('');
    
          console.log('Data uploaded successfully to Firestore');
        } catch (error) {
          console.error('Error uploading data to Firestore:', error);
        }
      };

  return (
    <View style={styles.Background}>
    <Header email={email}/>
  <View style={styles.body}>
   
 
  
  <View style={styles.input}>
  
  <TextInput style={styles.textbox} placeholder=" Bus Number" value={busNo} onChangeText= {(text) => setBusNo(text)}/>
  <TextInput style={styles.textbox} placeholder="  Payed Amount" value={payedAmt} onChangeText= {(text) => setPayedAmt(text)}/>
  <TextInput style={styles.textbox} placeholder="  Student ID" value={stdId} onChangeText= {(text) => setStdId(text)}/>
  <TextInput style={styles.textbox} placeholder="  Payment Mode" value={paymentMode} onChangeText= {(text) => setPaymentMode(text)}  />
  <TouchableOpacity style={{marginLeft:100,}}></TouchableOpacity>
   

<TouchableOpacity style={styles.button1} onPress={updatePayment}><Text style={styles.t3}>Add Payment</Text></TouchableOpacity>



 
 </View>

   </View>
   <Footer email={email}/>
   </View>
  )
}

export default UpdatePayment

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