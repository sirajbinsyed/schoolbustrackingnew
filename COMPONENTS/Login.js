import { Animation,Image,StyleSheet, Text, View,TextInput,TouchableOpacity,ScrollView } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { auth,db,query,where ,getDocs} from './firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { collection } from 'firebase/firestore'
import { async } from '@firebase/util'


const Login = ({navigation}) => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
   console.log(email,"hai");
  const loginAccount = async () => {
    if (email && password) {
      try {
        // Try signing in with email and password
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User login success");
        alert("User login success");
        navigation.navigate('home');
      } catch (error) {
        // If sign-in fails, attempt staff login
        const staffCollectionRef = collection(db, 'busroutes');
        const staffQuery = query(staffCollectionRef, where("staffEmail", "==", email), where("staffPassword", "==", password));
        
        try {
          const staffQuerySnapshot = await getDocs(staffQuery);
          if (staffQuerySnapshot.docs.length > 0) {
            console.log("Staff login success");
            alert("Staff login success");
            navigation.navigate('staffhome',{ email});
          } else {
            console.log("Incorrect staff credentials");
            alert("Incorrect staff credentials");
          }
        } catch (staffError) {
          console.error("Error during staff login:", staffError);
          alert("Error during staff login");
        }
      }
    } else {
      console.log("Incomplete login information");
      alert("Incomplete login information");
    }
  };
  







  return (
    <View style={styles.Background}>
      
      <Image source={require('../assets/busLogo.png')} style={styles.logo}></Image>
    
    <View style={styles.input}>
      <Text style={styles.t1}> welcome back</Text>
      
    <TextInput style={styles.textbox} placeholder="  Email"  value={email} onChangeText={(text) => setEmail(text) } />
    <TextInput style={styles.textbox} placeholder="  PASSWORD" value={password} onChangeText={(password) => setPassword(password) } />
    <TouchableOpacity style={{marginLeft:100}}></TouchableOpacity>
      <Text style={styles.forgetPassword} >forget password ?</Text>

  <TouchableOpacity style={styles.button1} onPress={loginAccount}><Text>LOGIN</Text></TouchableOpacity>
  
   <TouchableOpacity  onPress={()=>navigation.navigate('register')}>
   <Text style={styles.t2}>Do not have account ?</Text>
     </TouchableOpacity>
   </View>
   </View>
 
  )
}

export default Login

const styles = StyleSheet.create({
  Background : {
    backgroundColor: "#FAF9F6",
    flex: 1,
},
  logo :{
    width: "100%",
    height: "30%",
  },
  
  input: { 
    width:"100%",
    height:"70%",
    alignItems:"center",
    justifyContent:"center",

  },
  t1 : {
    fontSize:0,
  },
  textbox: {
    backgroundColor:"white",
    width: 300,
    color:"black",
    borderRadius:10,
    marginTop:50,
    height:50
  },
  textbox1: {
    backgroundColor:"white",
    width: 300,
    marginTop:200,
    color:"black",
    position:"absolute",
    borderRadius:10,
  },
   button1: {
    backgroundColor: '#DDDDDD',
    borderRadius:10,
    width:"35%",
    height:"6%",
    marginTop:40,
    alignItems:"center",
    justifyContent:"center"
    
  
   },
   button2: {
    backgroundColor: '#DDDDDD',
    borderRadius:10,
    width:"30%",
    height:"5%",
    marginTop:5,
    alignItems:"center",
    justifyContent:"center"
   },
  forgetPassword: {
    marginTop:10,
    marginRight:170, 
    color:'blue',  
  },
  signup : {
    marginLeft:130,
  },
  t2 : {
    textAlign: 'center', 
    marginTop:10,
    color:'blue',
  },
 
  
})