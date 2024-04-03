import { Animation,Image,StyleSheet, Text, View,TextInput,TouchableOpacity,ScrollView } from 'react-native'
import React from 'react'

const Intro = ({navigation}) => {
  return (
    <View style={styles.Background}>
      
    <Image source={require('../assets/busLogo.png')} style={styles.logo}></Image>
  
  <View style={styles.input}>
    
 

<TouchableOpacity style={styles.button}  onPress={()=>navigation.navigate('login')}><Text style={styles.t3}>LOGIN</Text></TouchableOpacity>
<TouchableOpacity style={styles.button}  onPress={()=>navigation.navigate('register')}><Text style={styles.t3}>REGISTER</Text></TouchableOpacity>
 </View>
 </View>
  )
}

export default Intro

const styles = StyleSheet.create({
    Background : {
      backgroundColor:"#FAF9F6",
        flex: 1,
    
    },
    logo :{
        width: "100%",
        height: "60%",
        borderRadius:10,
       
      },
      input:{
        alignItems:"center",
        justifyContent:"center",
        width:"100%",
        height:"40%",
        
      },
      button: {
        backgroundColor: "#DDDDDD",
        color:"white",
        borderRadius:15,
        width:"35%",
        height:"12%",
        marginTop:40,
        alignItems:"center",
        justifyContent:"center",
        shadowColor:"black",
        shadowOpacity:10,
       },
       t3 : {
        textAlign: 'center', 
       
    },
})