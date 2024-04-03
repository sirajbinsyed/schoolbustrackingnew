import { Image,StyleSheet, Text, View,TextInput,TouchableOpacity,ScrollView } from 'react-native'
import {DataTable} from 'react-native-paper'
import React from 'react'
import Header from '../StaffPartials/Header'
import Footer from '../StaffPartials/Footer'

const BusDetails = () => {

     

  return (
    <View style={styles.Background}>
        <Header/>
        <View style={styles.body}>
          <View style={styles.container1}>
              <Text style={styles.heading}>Bus No:</Text>
              <Text style={styles.heading}>Route Name:</Text>
              <Text style={styles.heading}>Total students:</Text>
              <TouchableOpacity style={styles.button1}><Text style={styles.t3}>Add Stop</Text></TouchableOpacity>
          <DataTable style={styles.table} > 
      <DataTable.Header> 
        <DataTable.Title>Stop Name</DataTable.Title> 
        <DataTable.Title>Pickup Time</DataTable.Title> 
        <DataTable.Title>Drop Time</DataTable.Title> 
      </DataTable.Header> 
      <DataTable.Row> 
        <DataTable.Cell>kakanad</DataTable.Cell> 
        <DataTable.Cell>6:00</DataTable.Cell> 
        <DataTable.Cell>5:00</DataTable.Cell> 
      </DataTable.Row> 
  
      <DataTable.Row> 
        <DataTable.Cell>edapally</DataTable.Cell> 
        <DataTable.Cell>6:00</DataTable.Cell> 
        <DataTable.Cell>6:00</DataTable.Cell> 
      </DataTable.Row> 
      <DataTable.Row> 
        <DataTable.Cell>sm junction</DataTable.Cell> 
        <DataTable.Cell>6:00</DataTable.Cell> 
        <DataTable.Cell>6:00</DataTable.Cell> 
      </DataTable.Row> 
      <DataTable.Row> 
        <DataTable.Cell>vadekekota</DataTable.Cell> 
        <DataTable.Cell>6:00</DataTable.Cell> 
        <DataTable.Cell>6:00</DataTable.Cell> 
      </DataTable.Row> 
    </DataTable> 
          </View>
          
        </View>
     <Footer/>
    </View>
  )
}

export default BusDetails

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
      flexDirection:"column",
      flexWrap:"wrap",
      alignItems:"center",
      justifyContent:"flex-start",
      alignItems:"flex-start",
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
  },
  heading : {
      margin:10
  },
  //table

  table : {
  
    borderWidth:5,
    backgroundColor:"#8E9DC1",
    borderRadius:5,
    borderColor:"white",
    color:"#BDB6B6"
    
  },


    
})