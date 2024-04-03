import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from './Partials/Header'
import Footer from './Partials/Footer'

const Payment = () => {
  return (
    <View style={styles.Background}>
    <Header/>
     <View style={styles.body}>
       <View style={styles.container1}></View>
      
       <TouchableOpacity style={styles.button1}><Text style={styles.pay}>Pay Now</Text></TouchableOpacity>
     </View>
     <Footer/>
 </View>
  )
}

export default Payment

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
      flexDirection:"row",
      flexWrap:"wrap",
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
    
   },
   pay : {
    textAlign: 'center', 
    color:"#DDDDDD", 
},
})