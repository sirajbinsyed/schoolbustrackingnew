import { Image,StyleSheet, Text, View,TextInput,TouchableOpacity,ScrollView } from 'react-native'
import CheckBox from 'react-native-check-box'
import React from 'react'
import {DataTable} from 'react-native-paper'
import Header from '../StaffPartials/Header'
import Footer from '../StaffPartials/Footer'

const MarkAttendance = () => {
  return (
    <View style={styles.Background}>
    <Header/>
    <View style={styles.body}>
      <View style={styles.container1}>
         
          <Text style={styles.heading}>Student Name:</Text>
          <Text style={styles.heading}>Bus No:</Text>
          <Text style={styles.heading}>Stop Name:</Text>
    <View style={styles.tableContainer}>
           
      <DataTable>    
      <Text style={styles.tableHeading}>Pickup</Text> 
  <DataTable.Header> 
    <DataTable.Title>-</DataTable.Title>
    <DataTable.Title><Text style={styles.headerCell}>From</Text></DataTable.Title> 
    <DataTable.Title><Text style={styles.headerCell}>To</Text></DataTable.Title> 
    
  </DataTable.Header> 
  <DataTable.Row> 
    <DataTable.Cell>-</DataTable.Cell>
    <DataTable.Cell>kakanad</DataTable.Cell> 
    <DataTable.Cell>school</DataTable.Cell> 
    
  </DataTable.Row> 

  <DataTable.Row> 
    <DataTable.Cell>ATTD</DataTable.Cell>
    <DataTable.Cell>false</DataTable.Cell> 
    <DataTable.Cell>true</DataTable.Cell> 
    
  </DataTable.Row> 
  
</DataTable> 
</View>
<View style={styles.tableContainer}>
<DataTable>    
<Text style={styles.tableHeading}>Drop</Text>
  <DataTable.Header> 
    <DataTable.Title>-</DataTable.Title>
    <DataTable.Title><Text style={styles.headerCell}>From</Text></DataTable.Title> 
    <DataTable.Title><Text style={styles.headerCell}>To</Text></DataTable.Title> 
    
  </DataTable.Header> 
  <DataTable.Row> 
    <DataTable.Cell>-</DataTable.Cell>
    <DataTable.Cell>kakanad</DataTable.Cell> 
    <DataTable.Cell>school</DataTable.Cell> 
    
  </DataTable.Row> 

  <DataTable.Row> 
    <DataTable.Cell>ATTD</DataTable.Cell>
    <DataTable.Cell>true</DataTable.Cell> 
    <DataTable.Cell>false</DataTable.Cell> 
    
  </DataTable.Row> 
 
</DataTable> 
</View>

      </View>
      
    </View>
  <Footer/>
</View>
  )
}

export default MarkAttendance

const styles = StyleSheet.create({
    Background : {
        backgroundColor: "#FAF9F6",
        flex: 1,
        justifyContent:"center",
        alignItems:"center",
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
      justifyContent:"center",
      alignItems:"center",
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      marginTop:"30%",
      paddingLeft:6,
  },
  heading : {
      margin:10,
      alignSelf:"flex-start"
  },
  tableContainer :{
      marginBottom:3,
      flex:1,
      width:"98%",
      backgroundColor:"#C5DEE2",
      paddingTop:0,
      borderRadius:3,
      borderColor:"#545454",
      borderWidth:2,
      
  },
  tableHeading : {
    fontSize:16,
    alignSelf:"center",
    color:"black",
    fontFamily: "sans-serif",
   
  },
  headerCell : {
    color:"black",
    fontSize:14,
  },
  checkbox: {
    alignSelf: 'center',
  },
})