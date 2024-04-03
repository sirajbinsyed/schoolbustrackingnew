import { Image,StyleSheet, Text, View,TextInput,TouchableOpacity,ScrollView } from 'react-native'
import React from 'react'
import Header from '../StaffPartials/Header'
import Footer from '../StaffPartials/Footer'


const StaffHome = ({navigation,route}) => {
  const { email} = route.params;
  
  console.log(email,"is the staff");
  
  return (
    <View style={styles.Background}>

    
    
    
    <Header email={email}/>

    <View style={styles.body}>
      <Text style={{margin : 20}} >STAFF</Text>
           <View style={styles.container1}>
                  <TouchableOpacity style={styles.options1} onPress={()=> navigation.navigate('buslocation',{email})}>
                  <View style={styles.options2}>
                  <Image source={require('../../assets/trackbus.png')} style={styles.options3} ></Image>
                  </View>
                  
                  <Text style={styles.label}>Allow Location</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.options1} onPress={()=> navigation.navigate('broadcast',{email})}>
                  <View style={styles.options2}>
                  <Image source={require('../../assets/communication2.png')} style={styles.options3} ></Image>
                  </View>
                  
                  <Text style={styles.label} >Broadcast Message</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.options1} onPress={()=> navigation.navigate('attendance',{email})}>
                  <View style={styles.options2}>
                  <Image source={require('../../assets/register.png')} style={styles.options3} ></Image>
                  </View>
                 
                  <Text style={styles.label}>Student Register</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.options1} onPress={()=> navigation.navigate('addstops',{email})}>
                  <View style={styles.options2}>
                  <Image source={require('../../assets/busroutes.png')} style={styles.options3} ></Image>
                  </View>
                  
                  <Text style={styles.label} >Add/Delete Stops</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.options1} onPress={()=> navigation.navigate('updatepayment',{email})}>
                    <View style={styles.options2}>
                    <Image source={require('../../assets/paymentmethod.png')} style={styles.options3}></Image>
                    </View>
                  
                  <Text style={styles.label}>Update Payment</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.options1} onPress={()=> navigation.navigate('contactUsers',{email})}>
                    <View style={styles.options2}>
                    <Image source={require('../../assets/drivercontact.png')} style={styles.options3} ></Image>
                    </View>
                  <Text style={styles.label}>Contact Parents</Text>
                  </TouchableOpacity>       
          </View>
    </View>
 <Footer  email={email}/>
  </View>
  )
}

export default StaffHome

const styles = StyleSheet.create({
  Background : {
    backgroundColor: "#FAF9F6",
    flex: 1,
},



//body design

body : {
    width:"100%",
    height:"80%",
    backgroundColor:"white",
    alignItems:"center",
    justifyContent:"center",
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
  
  
},

options1 : {
  backgroundColor:"#DDDDDD",
    height:"30%",
    width:"40%" ,
    marginLeft:20,
    marginTop:10,
    overflow: "hidden",
    justifyContent:"center",
    alignItems:"center",
    borderBottomWidth:1,
    borderBottomColor:" rgb(182, 193, 196)",

    
    
   
   
},
options2 : {
  backgroundColor:"white",
  height:"70%",
  width:"100%" ,
  borderRadius:10,
  borderBottomWidth:1,
  alignItems:"center",
  alignContent:"center",
  backgroundColor:"white",
  justifyContent :"center",
  shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
 
},
options3 : {

backgroundColor:"white",
  height:"70%",
  width:"60%" ,
  backgroundColor:"white",
  

},
label : {
 fontSize:12,
 color:"black",
 marginTop:6,
 
}

})