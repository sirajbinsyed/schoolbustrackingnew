import { Image,StyleSheet, Text, View,TextInput,TouchableOpacity,ScrollView } from 'react-native'
import { auth, collection, db, where, query, getDocs,getDownloadURL,storage,ref,uploadBytes} from '../firebase';
import React,{useState,useEffect} from 'react'
import Header from '../StaffPartials/Header'
import Footer from '../StaffPartials/Footer'
import { updateDoc } from 'firebase/firestore';

const UpdateNotifications = ({ navigation, route } ) => {
    const {email} = route.params;
    const [data, setData] = useState([]);
    const [date,setDate] =useState('');
   
    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          
    
         // console.log(user);
          if (email) {
            console.log(email);
            
            const q = collection(db, 'Notifications');
            
            const querySnapshot = await getDocs(q);
    
          //  console.log(querySnapshot);
            
            const fetchedData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log(fetchedData);
            setData(fetchedData);
            setDate(fetchedData[0].date)
          
                 }
        } catch (error) {
          console.error('error fetching user data from Firestore:', error);
        }
      };
  return (
    <View style={styles.Background}>
       
    <Header email={email}/>
     <View style={styles.body}>
       <View style={styles.container1}>
         
           <Text style={styles.heading}>Notifications</Text>
           <ScrollView style={{flex:1,width:"100%"}}>
           {data.map((item) => (
           <View style={styles.block}  key={item.id} >
                <Text >Date    :<Text style={{color:"blue"}}> {item.date}</Text> </Text>
                <Text>Notification On <Text style={{color:"#8d5853"}}> - {item.subject}.</Text> </Text>
                <Text>- {item.content}-</Text>
                
                </View>
           ))}
           </ScrollView>
       </View>
       
     </View>
     <Footer  email={email}/>
 </View>
  )
}

export default UpdateNotifications

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
     // flexWrap:"wrap",
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
})