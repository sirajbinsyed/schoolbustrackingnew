
import { Image,StyleSheet, Text, View,TextInput,TouchableOpacity,ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth ,getFirestore,collection,addDoc,db} from './firebase'


const Register = ({navigation}) => {

  const [stdName,setStdNAme] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [phoneNo,setPhoneNo] = useState('');
  const [idNo,setIdNo] = useState('');
  const [busNo,setBusNo] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [stopNo,setStopNo] =useState('');
  const [currentDate, setCurrentDate] = useState('');


  useEffect(() => {
    // Function to set current date when component mounts
    const setCurrentDateOnMount = () => {
      const date = new Date();
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
      setCurrentDate(formattedDate);
      console.log(currentDate);
    };

    // Call the function to set current date when component mounts
    setCurrentDateOnMount();
  }, []);

const handleRegistration = () =>{
  createUserWithEmailAndPassword(auth,email,password)
  .then((userCredentials) => {
    navigation.navigate('login')
    
const user = userCredentials.user
const userId = user.uid

const userdetails = {
       stdName : stdName,
       Email : email,
       Password : password,
       phoneNo : phoneNo,
       IdNo : idNo,
       busNo : busNo,
       stopNo : stopNo,
       UserId : userId,
       dateOfReg : currentDate,
}
const db = getFirestore();

 addDoc(collection(db, "Users"),userdetails)
 .then(()=>{
   console.log("user details added")
 })

  })
  .catch((error) => {
    console.error('Error registering user:',error);
    alert('Error registering user:',error)
  })
console.log("sucess");

  
}
  return (

    <View style={styles.Background}>
      
   
   <ScrollView style={styles.ScrollView}>
   <View style={styles.logo}></View>
    <View style={styles.input}>
    
      <Text style={styles.heading}>Register User</Text>
    <TextInput  placeholderTextColor="black" style={styles.textbox} placeholder=" Email" value={email} onChangeText= {(text) => setEmail(text)}/>
    <TextInput placeholderTextColor="black" style={styles.textbox} placeholder="  PHONE NO" value={phoneNo} onChangeText= {(text) => setPhoneNo(text)}  />
    <TextInput  placeholderTextColor="black" style={styles.textbox} placeholder="  ID NO" value={idNo}  onChangeText= {(text) => setIdNo(text)}/>
    <TextInput  placeholderTextColor="black" style={styles.textbox} placeholder="  STD NAME" value={stdName}  onChangeText= {(text) => setStdNAme(text)}/>
    <TextInput  placeholderTextColor="black" style={styles.textbox} placeholder="  BUS NO" value={busNo}  onChangeText= {(text) => setBusNo(text)}/>
    <TextInput  placeholderTextColor="black" style={styles.textbox} placeholder="  Stop No" value={stopNo}  onChangeText= {(text) => setStopNo(text)}/>
    <TextInput  placeholderTextColor="black" style={styles.textbox} placeholder="  PASSWORD" value={password} onChangeText= {(text) => setPassword(text)}/>
    <TextInput  placeholderTextColor="black" style={styles.textbox} placeholder=" CONFIRM PASSWORD" value={confirmPassword} onChangeText = {(text) => setConfirmPassword(text)} />

    <TouchableOpacity style={{marginLeft:100,}}></TouchableOpacity>
     

  <TouchableOpacity style={styles.button1} onPress={handleRegistration}><Text style={styles.t3}>SIGN UP</Text></TouchableOpacity>
  <TouchableOpacity>
  <Text style={styles.t2} onPress={()=>navigation.navigate('login')} >Already have account ?</Text>
  </TouchableOpacity>

  
    
   </View>
   </ScrollView>
   
     </View>
    
  )
}


export default Register

const styles = StyleSheet.create({
    Background : {
      backgroundColor:"#FAF9F6",
        flex: 1,
    },
    logo :{
      width: '100%',
      
    },
    input: {
      
      alignItems:"center",
      justifyContent:"center",
      width:"100%",
      height:"85%",
      
      
      paddingTop:150
      
     
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

    ScrollView: {
      flex: 1, // Take up the entire available space within the container
      width:"100%",
      height:"100%",
      alignContent:"center",
      

      
      

      
    },
})