import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
    <TouchableOpacity style={styles.destinations} onPress={()=> navigation.navigate('home')} >
      <Image source={require('../../assets/home.png')} style={styles.desicons}></Image>
    </TouchableOpacity>
    <TouchableOpacity style={styles.destinations} onPress={()=> navigation.navigate('studentprofile')}>
    <Image source={require('../../assets/profileicon.png')} style={styles.desicons} ></Image>
    </TouchableOpacity>
    <TouchableOpacity style={styles.destinations} onPress={()=> navigation.navigate('payment')} >
    <Image source={require('../../assets/paymenticon.png')} style={styles.desicons}></Image>
    </TouchableOpacity>
    <TouchableOpacity style={styles.destinations} onPress={()=> navigation.navigate('notifications')}>
    <Image source={require('../../assets/notification.png')} style={styles.desicons}></Image>

    </TouchableOpacity>
</View>
  )
}

export default Footer

const styles = StyleSheet.create({
    footer : {
        width:"100%",
        height:"8%",
        backgroundColor:"#DDDDDD",
        justifyContent:"center",
        alignItems:"center",
        flexWrap:"wrap",
      },
      destinations : {
        backgroundColor:"white",
        width:"20%",
        height:"65%",
        borderRadius:10,
        marginLeft:18,
        justifyContent:"center",
        alignItems:"center",
      },
      desicons : {
       backgroundColor:"white",
       height:"75%",
       width:"40%" ,
       alignItems:"center",
       alignContent:"center",
      }
})