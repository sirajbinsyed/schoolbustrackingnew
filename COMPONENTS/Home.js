import { Image,StyleSheet, Text, View,TextInput,TouchableOpacity,ScrollView } from 'react-native'
import React from 'react'
import Header from './Partials/Header'
import Footer from './Partials/Footer'



const Home = ({navigation}) => {
  
  return (
    <View style={styles.Background}>

      <Header/>

      <View style={styles.body}>
             <View style={styles.container1}>
                    <TouchableOpacity style={styles.options1} onPress={()=> navigation.navigate('trackBus')}>
                    <View style={styles.options2}>
                    <Image source={require('../assets/trackbus.png')} style={styles.options3} ></Image>
                    </View>
                    
                    <Text style={styles.label}>Track Bus</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.options1} onPress={()=> navigation.navigate('busdetails',{BusNo: null})}>
                    <View style={styles.options2}>
                    <Image source={require('../assets/stopsandtiming.png')} style={styles.options3} ></Image>
                    </View>
                    
                    <Text style={styles.label} >Stops and Timing</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.options1} onPress={()=> navigation.navigate('studentreg')}>
                    <View style={styles.options2}>
                    <Image source={require('../assets/register.png')} style={styles.options3} ></Image>
                    </View>
                   
                    <Text style={styles.label}>Student Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.options1} onPress={()=> navigation.navigate('busroutes')}>
                    <View style={styles.options2}>
                    <Image source={require('../assets/busroutes.png')} style={styles.options3} ></Image>
                    </View>
                    
                    <Text style={styles.label} >Available Bus Routes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.options1} onPress={()=> navigation.navigate('paymentdetails')}>
                      <View style={styles.options2}>
                      <Image source={require('../assets/paymentmethod.png')} style={styles.options3}></Image>
                      </View>
                    
                    <Text style={styles.label}>Payment Details</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.options1} onPress={()=> navigation.navigate('contactstaff')}>
                      <View style={styles.options2}>
                      <Image source={require('../assets/drivercontact.png')} style={styles.options3} ></Image>
                      </View>
                    <Text style={styles.label}>Contact Staff</Text>
                    </TouchableOpacity>       
            </View>
      </View>
   <Footer/>
    </View>
  )
}

export default Home

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

  //footer design

})