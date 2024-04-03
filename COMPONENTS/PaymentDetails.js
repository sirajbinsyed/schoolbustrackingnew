import { Animation,Image,StyleSheet, Text, View,TextInput,TouchableOpacity,ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import { auth, collection, db, where, query, getDocs,getDownloadURL,storage,ref,uploadBytes, indexOf} from './firebase';

import {DataTable} from 'react-native-paper'
import Footer from './Partials/Footer'
import Header from './Partials/Header'

const StudentReg = ({navigation}) => {
  const [data, setData] = useState([]);
  const [stopNo, setStopNo] = useState();
  const [busNumber,setBusNo] = useState();
  const [stdId,setStdId] = useState();
  const [dateOfCard, setDateOfCard] = useState();
  const [stopIndex,setStopIndex] = useState();
  const [StopDetails, setStopDetails] =useState([]);
  const [stopName,setStopName] = useState('');
  const [stopFare,setStopFare] = useState('');
  const [paymentDetails,setPaymentDetails] = useState([]);

console.log("payment details",paymentDetails);

useEffect(() => {
  fetchData();
}, []);



useEffect(() => {
  // Call fetchData() only when stdId is updated
  if (stdId!=='') {
    fetchStopData();
    fetchPaymentDetails();
  }
}, [stdId]);

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
     
      setData(fetchedData);
     
      setStopNo(fetchedData[0].stopNo);
      setBusNo(fetchedData[0].busNo);
      setDateOfCard(fetchedData[0].dateOfReg);
      setStdId(fetchedData[0].IdNo);  
    }
  } catch (error) {
    console.error(' User error fetching user data from Firestore:', error);
  }
};


// fetch stops details and index of stop

const fetchStopData = async () => {
  try {
    

    if (busNumber) {
      
      console.log("hai");
      
      const userRef = collection(db, 'Stops');
      const q = query(userRef, where("busNo", "==", busNumber));
     
      const querySnapshot = await getDocs(q);

     
      
      if (querySnapshot.empty) {
        console.log("no matching document Stops");
        return;
      }
      
      const doc = querySnapshot.docs[0];
      console.log(doc);
      const arrayField = doc.data().stopNo;
      const index = arrayField.indexOf(stopNo);
      console.log(index,"this is stop index");
      setStopIndex(index)

      const fetchedDatas = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        busNo: doc.busNo,
        ...doc.data(),
        // setBus(BusNo)
      }));
       
      setStopDetails(fetchedDatas);
      console.log(fetchedDatas);
      setStopName(fetchedDatas[0].stopNames[index]);
      setStopFare(fetchedDatas[0].stopFare[index]);
      console.log(fetchedDatas[0].stopNames[index]);
        
     
    }
  } catch (error) {
    console.error('Stop error fetching user data from Firestore:', error);
  }
};

const fetchPaymentDetails = async () => {
  try {
   
    if (stdId) {
      
      
      
      const userRef = collection(db, 'stdpaymentdetails');
      const q = query(userRef, where("stdId", "==", stdId));
     
      const querySnapshot = await getDocs(q);
     
     
      
      if (querySnapshot.empty) {
        console.log("no matching document");
        return;
      }
      
     

      const fetchedPayment = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        busNo: doc.busNo,
        ...doc.data(),
        // setBus(BusNo)
      }));
       
      setPaymentDetails(fetchedPayment);
     
     
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
          <Text style={styles.heading}>Stop Name:  {stopName}</Text>
          <Text style={styles.heading}>Date of Card Issued: <Text style={{color:'#426997'}}>{dateOfCard}</Text> </Text>
          <Text style={styles.heading}>Monthly Fare :  <Text style={{color:'green'}}>Rs. {stopFare}</Text> </Text>

      <DataTable style={styles.table} > 
  <DataTable.Header> 
    <DataTable.Title>Date</DataTable.Title> 
    <DataTable.Title>Amount</DataTable.Title> 
    <DataTable.Title>Payment Mode</DataTable.Title> 
  </DataTable.Header> 
  {paymentDetails.map((item)=>(

  <DataTable.Row key={item.id}> 
    <DataTable.Cell><Text style={{color:'#368FF7'}}>{item.dateofPayment}</Text></DataTable.Cell> 
    <DataTable.Cell><Text style={{color:'green'}}>{item.paymentAmt}</Text></DataTable.Cell> 
    <DataTable.Cell>{item.paymentMode}</DataTable.Cell> 
  </DataTable.Row> 
  ))}
</DataTable> 
      </View>
      <TouchableOpacity style={styles.button1} onPress={()=> navigation.navigate('payment')} >
    
     <Text style={styles.t3}>Pay Now</Text>
    
     </TouchableOpacity>
    </View>
   <Footer/>
</View>
  )
}

export default  StudentReg

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
      marginTop:45,
  },
  heading : {
      margin:10
  },
  button1: {
    backgroundColor: "green",
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
  backgroundColor:"white",
  borderRadius:5,
  borderColor:"green",
  color:"blue",
  
  
},



    //footer


   
})