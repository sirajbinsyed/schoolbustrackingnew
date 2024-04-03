import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../StaffPartials/Header'
import Footer from '../StaffPartials/Footer'

const Attendance = ({navigation,route}) => {
   
  const {email}= route.params;

  return (
    <View style={styles.Background}>
    <Header email={email}/>
     <View style={styles.body}>
       <View style={styles.container1}>
       <TouchableOpacity style={styles.button1} onPress={()=>navigation.navigate('Scan')}><Text style={styles.pay}>Scan QR Code</Text></TouchableOpacity>
       <TouchableOpacity style={styles.button1}  onPress={()=>navigation.navigate('showAttendance',{email})}><Text style={styles.pay}>Show Attendance</Text></TouchableOpacity>

       </View>
      
       
     </View>
     <Footer email={email}/>
 </View>
  )
}

export default Attendance

const styles = StyleSheet.create({

    Background : {
        backgroundColor: "#FAF9F6",
        flex: 1,
    },
    

  //body

    body : {
        width:"100%",
        height:"80%",
        backgroundColor:"white",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        flexWrap:"wrap"
    },
    container1 : {
      width:"85%",
      height:"80%",
      backgroundColor:"#DDDDDD",
      borderRadius:10,
      alignItems:"center",
      justifyContent:"center",
      
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      marginTop:"20%"
    
  },

  button1: {
    backgroundColor: "green",
    borderRadius:10,
    width:"35%",
    height:"5%",
    marginLeft:10,
    alignItems:"center",
    justifyContent:"center",
    borderBlockColor:"black",
    borderWidth:1,
    margin:10,
    
   },
   pay : {
    textAlign: 'center', 
    color:"#DDDDDD", 
},

})