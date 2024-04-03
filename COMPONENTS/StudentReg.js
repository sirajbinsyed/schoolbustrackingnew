import React, { useState, useEffect } from 'react';
import { auth, collection, db, where, query, getDocs,getDownloadURL,storage,ref,uploadBytes} from './firebase';
import { Image,StyleSheet, Text, View,TextInput,TouchableOpacity,ScrollView } from 'react-native'
import CheckBox from 'react-native-check-box'
import {DataTable} from 'react-native-paper'
import Footer from './Partials/Footer'
import Header from './Partials/Header'
import { setStatusBarHidden } from 'expo-status-bar';


const StudentReg = () => {
    
  const [data, setData] = useState([]);
  const [stdName,setStdName] = useState('') ;
  const [stdId,setStdId] =useState('');
  const [stdStatus,setStdStatus] = useState('');
  const  [busNumber, setStdBusNo] = useState('');
  const [pickupTime,setPickupTime] = useState('');
  const [dropTime, setDropTime] = useState('');
  const [stopNo, setStdStopNo] = useState();
  const [stopName,setStopName] =useState();
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Call fetchData() only when busNumber is updated
    if (busNumber !== ''&& stopNo!=='') {
      fetchStopData();
    }
  }, [busNumber, stopNo]);
  const fetchData = async () => {
    try {
      const user = auth.currentUser;

     // console.log(user);
      if (user) {
        console.log(user);
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
        console.log(fetchedData);
        setData(fetchedData);
        setStdName(fetchedData[0].stdName) ;
        setStdId(fetchedData[0].IdNo);
        setStdStatus(fetchedData[0].Attendance);
        setStdBusNo(fetchedData[0].busNo);
        setPickupTime(fetchedData[0].pickupTime);
        setDropTime(fetchedData[0].dropTime);
        setStdStopNo(fetchedData[0].stopNo)
            }
    } catch (error) {
      console.error('error fetching user data from Firestore:', error);
    }
  };
  const fetchStopData = async () => {
    try {
     
      if (busNumber) {
        
        
        const BusNumber = busNumber;
        const userRef = collection(db, 'Stops');
        const q = query(userRef, where("busNo", "==", BusNumber));
       
        const querySnapshot = await getDocs(q);

       
        
        if (querySnapshot.empty) {
          console.log("no matching document");
          return;
        }
        
        const doc = querySnapshot.docs[0];
        console.log(doc);
        const arrayField = doc.data().stopNo;
        const index = arrayField.indexOf(stopNo);
        console.log(index,"this is stop index");
        

        const fetchedDatas = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          busNo: doc.busNo,
          ...doc.data(),
          // setBus(BusNo)
        }));
         
        console.log(fetchedDatas);
        setStopName(fetchedDatas[0].stopNames[index]);
        
        
       
       
        
       
      }
    } catch (error) {
      console.error('Stop error fetching user data from Firestore:', error);
    }
  };


  return (
    <View style={styles.Background}>
        <Header/>
        <View style={styles.body}>
          <View style={styles.container1}>
             
              <Text style={styles.heading}>Student Name :<Text style={{color:'black', fontFamily:"Arial",fontWeight: 'bold'}}>  {stdName}</Text> </Text>
              <Text style={styles.heading}>Bus No :     {busNumber}</Text>
              {/* <Text style={styles.heading}>Stop Name: </Text> */}
              <Text style={styles.heading}>Std ID :       {stdId} </Text>
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
        <DataTable.Cell><Text style={{color:"#66330F"}}>{stopName}</Text></DataTable.Cell> 
        <DataTable.Cell>school</DataTable.Cell> 
        
      </DataTable.Row> 
  
      <DataTable.Row> 
        <DataTable.Cell>Time</DataTable.Cell>
        <DataTable.Cell><Text style={{color:"blue"}}>{pickupTime}</Text></DataTable.Cell> 
        <DataTable.Cell>9:00 am</DataTable.Cell> 
        
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
        <DataTable.Cell>school</DataTable.Cell> 
        <DataTable.Cell><Text style={{color:"#66330F"}}>{stopName}</Text></DataTable.Cell> 
        
      </DataTable.Row> 
  
      <DataTable.Row> 
        <DataTable.Cell>Time</DataTable.Cell>
        <DataTable.Cell>4:00 pm</DataTable.Cell> 
        <DataTable.Cell><Text style={{color:"blue"}}>{dropTime}</Text></DataTable.Cell> 
        
      </DataTable.Row> 
     
    </DataTable> 
    <Text style={styles.heading}>Attandence Status :  <Text style={{color:'green'}}> {stdStatus}</Text></Text>
    </View>
    
          </View>
          
        </View>
      <Footer/>
    </View>
  )
}

export default StudentReg

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
      margin:8,
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