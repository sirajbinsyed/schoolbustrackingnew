import { Image,StyleSheet, Text, View,TextInput,TouchableOpacity,ScrollView } from 'react-native'
import {DataTable} from 'react-native-paper'
import { auth, collection, db, where, query, getDocs,getDownloadURL,storage,ref,uploadBytes} from '../firebase';
import React,{useState,useEffect} from 'react'
import Header from '../StaffPartials/Header'
import Footer from '../StaffPartials/Footer'

const ContactUsers = ({ navigation, route }) => {
    const {email} = route.params;
    const [busNumber, setUserData] = useState('') 
    const [data, setData] = useState([]);
    const totalstd = data.length;
 
  useEffect(() => {
    checkBus();
  },[]);

  useEffect(() => {
    // Call fetchData() only when busNumber is updated
    if (busNumber !== '') {
      fetchData();
    }
    else{
        console.log("No Bus Details");
    }
  }, [busNumber]);

  
console.log(data);

const checkBus = async () => {
  try {
    

   // console.log(user);
    if (email) {
      
      
      const userRef = collection(db, 'busroutes');
      const q = query(userRef, where ("staffEmail", "==", email));
    
      const querySnapshot = await getDocs(q);

    //  console.log(querySnapshot);
      
      if (querySnapshot.empty) {
        console.log("no matching document in busrutes");
        return;
      }
      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      console.log("hello",fetchedData[0].busNum);
      setUserData(fetchedData[0].busNum);  
    }
  } catch (error) {
    console.error('error fetching user data from Firestore:', error);
  }
};





const fetchData = async () => {
  try {
    

    console.log(busNumber);
    if (busNumber) {
      
      console.log( "StaffbusNo",busNumber);
      const BusNo = busNumber;
      const userRef = collection(db, 'Users');
      const q = query(userRef, where ("busNo", "==", BusNo));
     
      const querySnapshot = await getDocs(q);

     
      
      if (querySnapshot.empty) {
        console.log("no matching document");
        return;
      }
      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        busNo: doc.busNo,
        ...doc.data(),
        
      }));

      setData(fetchedData);
      console.log("hi",fetchedData);
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
          <Text style={styles.heading}>Total Student:  <Text style={{color:"green"}}>{totalstd}</Text></Text>
      <DataTable  style={styles.table}> 
      
  <DataTable.Header style={styles.tableHead}> 
    <DataTable.Title>Student ID:</DataTable.Title> 
    <DataTable.Title>Student Name:</DataTable.Title> 
    <DataTable.Title>Parents Mobile:</DataTable.Title> 
  </DataTable.Header> 
  {data.map( (route) =>(
  <DataTable.Row key={route.id} style={styles.tableRow}> 
    <DataTable.Cell>{route.IdNo}</DataTable.Cell> 
    <DataTable.Cell>{route.stdName}</DataTable.Cell> 
    <DataTable.Cell><TouchableOpacity><Text style={{color:"#0F2766"}}>{route.phoneNo}</Text></TouchableOpacity></DataTable.Cell> 
  </DataTable.Row> 
  ))}
</DataTable> 
      </View>
      
    </View>
    <Footer email={email}/>
</View>
  )
}

export default ContactUsers

const styles = StyleSheet.create({

    Background : {
        backgroundColor: "#FAF9F6",
        flex: 1,
    },
    
    
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
      marginTop:"38%"
    },
    heading : {
      margin:10
    },
    
    //table styling
    table : {
    
    borderWidth:5,
    backgroundColor:"#8E9DC1",
    borderRadius:5,
    borderColor:"white",
    color:"black"
    
    },

})