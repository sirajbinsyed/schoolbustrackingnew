import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Footer from './Partials/Footer';
import Header from './Partials/Header';
import { auth, collection, db, where, query, getDocs,getDownloadURL,storage,ref,uploadBytes, indexOf} from './firebase';
import * as ImagePicker from 'expo-image-picker';
import { async, contains } from '@firebase/util';
import { updateDoc } from 'firebase/firestore';

const StudentProfile = () => {
  
  const [data, setData] = useState([]);
  const [profileimage, setProfileImage] = useState();
  const [stopNo, setStopNo] = useState();
  const [busNumber,setBusNo] = useState();
  const [stopIndex,setStopIndex] = useState();
  const [StopDetails, setStopDetails] =useState([]);
console.log("this is stop details 1",StopDetails);

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
       // console.log(fetchedData[0].imageurl);
        setProfileImage(fetchedData[0].imageurl);
        setStopNo(fetchedData[0].stopNo);
        setBusNo(fetchedData[0].busNo)     }
    } catch (error) {
      console.error(' User error fetching user data from Firestore:', error);
    }
  };


  // fetch stops details and index of stop

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
        
       

        const fetchedDatas = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          busNo: doc.busNo,
          ...doc.data(),
          // setBus(BusNo)
        }));
         
        setStopDetails(fetchedDatas);
        console.log("hi",fetchedDatas);
        
        const doc = querySnapshot.docs[0];
        console.log(doc);
        const arrayField = doc.data().stopNo;
        const index = arrayField.indexOf(stopNo);
        console.log(index,"this is stop index");
        setStopIndex(index)
       
        
       
      }
    } catch (error) {
      console.error('Stop error fetching user data from Firestore:', error);
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({

        mediaType : ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
      });

      if(!result.canceled && result.assets.length > 0) {
        const response = await uploadImage(result.assets[0]);

        if(response.success){
          await updateImageUrlFirestore(response.imageUrl);
          console.log(response.imageUrl);
          setProfileImage(response.imageUrl);
        }else{
          console.error('Error uploading image to firebase storage');
        }
      }
    }catch (error) {
      console.error('Error picking an image:',error);
    }


  };


  const uploadImage = async (selectedAsset) =>{
  try{
    const response = await fetch(selectedAsset.uri);
    const blob = await response.blob();

    const user = auth.currentUser

    if(user) {
      const userId = user.uid;
      const imageName = `profile/${userId}_${Date.now()}.jpj`;
      const storageRef = ref(storage, imageName);

      await uploadBytes(storageRef,blob);

      const downloadURL = await getDownloadURL(storageRef);

      return {success: true,imageUrl:downloadURL};
    }else{
      return { success: false };
    }
  } catch (error) {
    console.error('Error uploading image:',error);
    return { success: false};
  }

};
const updateImageUrlFirestore= async (imageurl) =>{
  try {
    const user =auth.currentUser;
    if (user) {
      const userId =user.uid;
       
     
      const q = query(collection(db, 'Users'), where('UserId', '==', userId));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDocRef = querySnapshot.docs[0].ref;

        await updateDoc(userDocRef, { imageurl});
        
      }else {
        console.error('User document not found in Firestore.');
      }
    }
  }
  catch(error) {
    console.log('Error updating image imageUrl in Firestore :',error);
  }
};
  



  return (
    <View style={styles.Background}>
      <Header/>
      <View style={styles.body}>
        <View style={styles.container1}>

          <TouchableOpacity style={[styles.profilePhoto, { zIndex: 1 }]} onPress={pickImage}>
            {profileimage? (
              <Image source={{ uri: profileimage}} style={{ width: '100%', height:'100%', borderRadius:20}}></Image>
              ) : (
                <View style={{width:'100%', height: '100%', justifyContent: 'center',alignItems:"center"}}>
                <Image source={require('../assets/person.png')} style={{ width: '80%', height:'65%', borderRadius:10}}></Image>
                 <Text style={{ color:'white', textAlign: 'center', fontSize: 10, }}>upload image</Text>
                 </View>
              )
            }

          </TouchableOpacity>
          {data.map((item) => (
            <View style={styles.stdinfo} key={item.id}>
              <Text style={styles.heading}>STD Name : {item.stdName}</Text> 
              <Text style={styles.heading}>Student ID :{item.IdNo}</Text>
              <Text style={styles.heading}>Mobile No :{item.phoneNo} </Text>
              <Text style={styles.heading}>Bus No :{item.busNo}</Text>
             
              
            </View>
          ))}
           {StopDetails.map((item) => (
    
    <View style={styles.stopdetails} key={item.id}>
    <Text style={styles.heading}>Stop Name  : {item.stopNames[stopIndex]} </Text> 
    <Text style={styles.heading}>Stop Fare  : {item.stopFare[stopIndex]} </Text>
    <Text style={styles.heading}>Normal pickup time  : {item.pickup[stopIndex]}</Text> 
    <Text style={styles.heading}>Normal drop time  : {item.boarding[stopIndex]}</Text>
    </View>
    
    ))}
        </View>
        
      </View>
      <Footer/>
    </View>
  );
};

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
    height:"90%",
    backgroundColor:"#DDDDDD",
    borderRadius:10,
    flexDirection:"row",
    flexWrap:"wrap",
    padding:15,
    paddingTop:"10%",
    justifyContent:"center",
    marginTop:"20%",
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 0.5, // For iOS shadow
    shadowRadius: 5, // For iOS shadow
  },
  profilePhoto : {
    alignItems: 'center',
     justifyContent: 'center',
    height: "20%",
    width:"28%",
    backgroundColor:"#545454",
    borderRadius:20,
    position:"absolute",
    marginTop:"5%",
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 10, // For iOS shadow
    shadowRadius: 5, // For iOS shadow 
    borderBlockColor: "#6A6C72",
    borderWidth:1,
    
  },
  stdinfo : { 
    height: "40%",
    width:"95%",
    backgroundColor:"white",
    borderRadius:5,
    marginTop:70,
    paddingTop:20,
    padding:15,
  },
  heading : {
    margin:10,
  },
  textbox: {
    backgroundColor:"black",
    width: "10%",
    height:"5%",
    color:"black",
    fontSize:10,
    borderRadius:10,
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
  stopdetails :{
    height: "40%",
    width:"95%",
    backgroundColor:"#DFE6F6",
    borderRadius:3,
    marginTop:0,
    padding:5,
    margin:5,
    borderWidth:0.5,
  }
});

export default StudentProfile;
