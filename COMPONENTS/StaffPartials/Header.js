
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Linking  } from 'react-native'
import { auth, collection, db, where, query, getDocs,getDownloadURL,storage,ref,uploadBytes} from '../firebase';
import { useNavigation } from '@react-navigation/native';

const Header = ({email}) => {
  
 
  
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const navigation = useNavigation();
  const [profileimage, setProfileImage] = useState();


  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    console.log('dropdown');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      

     // console.log(user);
      if (email) {
        console.log(email ,"email to found photo");
       
        const userRef = collection(db, 'busroutes');
        const q = query(userRef, where ("staffEmail", "==", email));
        const querySnapshot = await getDocs(q);

      //  console.log(querySnapshot);
        
        if (querySnapshot.empty) {
          console.log("no profile photo");
          return;
        }
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(fetchedData);
        
       // console.log(fetchedData[0].imageurl);
        setProfileImage(fetchedData[0].imageurl)      }
    } catch (error) {
      console.error('error fetching user data from Firestore:', error);
    }
  };


  const handlePress = () => {
    
    Linking.openURL('https://sirajbinsyed.github.io/siraj/');
  };

  return (
    
    <View style={styles.header}>
       <TouchableOpacity style={styles.profile}  onPress={()=> navigation.navigate('staffProfile',{email})}>
            {profileimage? (
              <Image source={{ uri: profileimage}} style={{ width: '100%', height:'100%', borderRadius:50}}></Image>
              ) : (
                <Image source={require('../../assets/man.png') } style={styles.icons} ></Image>
              )
            }
            </TouchableOpacity>
      
      <View style={styles.logocontainer}>
        <Image source={require('../../assets/busLogo.png')} style={styles.logo} ></Image>
        </View>
      
      <TouchableOpacity style={styles.dots}  onPress={toggleDropdown}>
      <Image source={require('../../assets/menu.png')} style={styles.icons} ></Image>
     
      </TouchableOpacity>
      {dropdownVisible && (
        <View style={styles.dropdown}>
         <TouchableOpacity onPress={()=> navigation.navigate('login')} ><Text style={styles.dropdown1} >  Logout</Text></TouchableOpacity> 
         <TouchableOpacity  onPress={handlePress}><Text  style={styles.dropdown2}>  Contact Us</Text></TouchableOpacity> 

        </View>
      )}
    </View>
    
  )
}

export default Header

const styles = StyleSheet.create({
  header : {
    width: "100%",
    height: "12%",
    backgroundColor:"#FAF9F6",
    flexWrap:"wrap",

},
profile : {
  marginTop:45,
  margin:20,
  height:"40%",
  width:"9%",
  alignSelf:"flex-start",
  backgroundColor:"white",
  borderRadius:50,
  borderWidth:0.8,
  borderBlockColor:"black",

},

icons : {
     width:"100%",
     height:"100%",
     flex:1,
     justifyContent:"center",

    
},
profilelogo : {
 width:"100%",
 height:"100%",
 flex:1,
 justifyContent:"center",

},

logocontainer : {
  width:"70%",
  height:"100%",
  justifyContent:"center",
  alignItems:"center"
},
logo : {
    width:"50%",
    height:"80%",
    marginTop:20,
    justifyContent:"center",
        
},
dots: {
   marginTop:50,
   height:"25%",
   width:"6%",
   alignSelf:"flex-start",
   backgroundColor:"#FAF9F6",
   borderRadius:10,
   
   
},
dropdown: {
  position: 'absolute',
  left: 180, // Adjust as needed
  bottom:0,
  top:35,
  backgroundColor: '#d5dde2',
  padding: 0,
  borderWidth: 1,
  borderColor: 'gray',
  borderRadius: 5,
  width:'40%',
  height:"57%",
},
dropdown1 : {
   margin:1,
   fontSize: 15,
   color: '#1b1a1d',
   backgroundColor: "#b9c0c4",
   
   
},
dropdown2 : {
  margin:1,
  marginTop:3,
  fontSize: 13,
  color: 'blue',
  backgroundColor: "#b9c0c4",
  
  
},

})