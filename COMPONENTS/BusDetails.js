import { Image,StyleSheet, Text, View,TextInput,TouchableOpacity,ScrollView } from 'react-native'
import {DataTable} from 'react-native-paper'
import { auth, collection, db, where, query, getDocs,getDownloadURL,storage,ref,uploadBytes} from './firebase';
import React,{useState,useEffect} from 'react'
import Header from './Partials/Header'
import Footer from './Partials/Footer'

const BusDetails = ({navigation,route}) => {
  const { BusNo } = route.params;
 
 console.log("have params",BusNo);

  const [busNumber, setUserData] = useState('') 
  const [data, setData] = useState([]);
  
  
 
  useEffect(() => {
    checkBus();
  },[]);

  useEffect(() => {
    // Call fetchData() only when busNumber is updated
    if (busNumber !== '') {
      fetchData();
    }
  }, [busNumber]);

   
  
 
console.log(data);

  const checkBus = async () => {
    try {
      const user = auth.currentUser;

     // console.log(user);
      if (user) {
        
        const userId = user.uid;
        const userRef = collection(db, 'Users');
        const q = query(userRef, where ("UserId", "==", userId));
      
        const querySnapshot = await getDocs(q);

      //  console.log(querySnapshot);
        
        if (querySnapshot.empty) {
          console.log("no matching document");
          return;
        }
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        console.log("hello",fetchedData[0].busNo);
        if(BusNo){
          setUserData(BusNo)
          console.log("params Bus Number",BusNo );
        }
        else{
          setUserData(fetchedData[0].busNo);  
          console.log("User Bus Number",fetchedData[0].busNo );
        }
       
      }
    } catch (error) {
      console.error('error fetching user data from Firestore:', error);
    }
  };





  const fetchData = async () => {
    try {
      const user = auth.currentUser;

      console.log(user);
      if (user) {
        
        
        const BusNumber = busNumber;
        const userRef = collection(db, 'Stops');
        const q = query(userRef, where ("busNo", "==", BusNumber));
       
        const querySnapshot = await getDocs(q);

       
        
        if (querySnapshot.empty) {
          console.log("no matching document");
          return;
        }

        
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          busNo: doc.busNo,
          ...doc.data(),
          // setBus(BusNo)
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
        <Header/>
        <View style={styles.body}>
        
          <View style={styles.container1} >
          
              
              <Text style={styles.heading}>Bus No: {busNumber} </Text>
              
              
        
          <DataTable style={styles.table} > 
      <DataTable.Header> 
        <DataTable.Title>No</DataTable.Title> 
        <DataTable.Title>Stop Name</DataTable.Title> 
        <DataTable.Title>Pickup </DataTable.Title> 
        <DataTable.Title>Boarding </DataTable.Title> 
      </DataTable.Header> 
      {data.map((item) => (
    item.stopNames.map((stopName, index) => (
      <DataTable.Row key={`${item.id}_${index}`}>  
        <DataTable.Cell>{item.stopNo[index]}</DataTable.Cell> 
        <DataTable.Cell>{stopName}</DataTable.Cell> 
        <DataTable.Cell>{item.pickup[index]}</DataTable.Cell> 
        <DataTable.Cell>{item.boarding[index]}</DataTable.Cell> 
      </DataTable.Row> 
        ))
        ))}
      
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
      width:"90%",
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