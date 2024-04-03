import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import Footer from './Partials/Footer'
import Header from './Partials/Header'
import { auth, collection, db, where, query, getDocs,getDownloadURL,storage,ref,uploadBytes} from './firebase';
import {DataTable} from 'react-native-paper'

const Notifications = () => {
  const [data, setData] = useState([]);
    
   
    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          
          const user =auth.currentUser;
         // console.log(user);
          if (user) {
            console.log(user);
            
            const q = collection(db, 'Notifications');
            
            const querySnapshot = await getDocs(q);
    
          //  console.log(querySnapshot);
            
            const fetchedData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log(fetchedData);
            setData(fetchedData);
            
          
                 }
        } catch (error) {
          console.error('error fetching user data from Firestore:', error);
        }
      };
  return (
    <View style={styles.Background}>
       
       <Header/>
        <View style={styles.body}>
          <View style={styles.container1}>
            
              <Text style={styles.heading}>Notifications</Text>
              <ScrollView style={{flex:1, width:"100%"}}>
              {data.map((item) => (
           <View style={styles.block}  key={item.id} >
                <Text >Date    :<Text style={{color:"blue"}}> {item.date}</Text> </Text>
                <Text>Notification On  - {item.subject}. </Text>
                <Text>- {item.content}-</Text>
                
                </View>
                
           ))}
              </ScrollView>
          </View>
          
        </View>
        <Footer/>
    </View>
  )
}

export default Notifications

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
        
        justifyContent:"center",
        flexDirection:"row",
        flexWrap:"wrap"
    },
    container1 : {
      width:"85%",
      height:"80%",
      backgroundColor:"#DDDDDD",
      borderRadius:10,
      
     // flexDirection:"row",
      //flexWrap:"wrap",
      justifyContent:"center",
      alignItems:"center",
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      marginTop:"20%"
    
  },
  heading : {
      margin:20,
      fontWeight:"bold",

  },
  block : {
    
     
    width:"95%",
    backgroundColor:"#9cc4dd",
    borderRadius:5,
    margin:5,
    borderBlockColor:"red",
    borderWidth:1,
    padding:5,
   
    
 },

  button1: {
    backgroundColor: "#28282B",
    borderRadius:10,
    width:"35%",
    height:"6%",
    marginLeft:10,
    alignItems:"center",
    justifyContent:"center",
    borderBlockColor:"black",
    borderWidth:1,
    
   },
   t3 : {
    textAlign: 'center', 
    color:"#DDDDDD", 
},
table : {
    
  borderWidth:3,
  backgroundColor:"#8E9DC1",
  borderRadius:5,
  borderColor:"white",
  color:"black",
  height:'25%'
  
  },

})