import { Image,StyleSheet, Text, View,TextInput,TouchableOpacity,ScrollView } from 'react-native'
import {DataTable} from 'react-native-paper'
import { auth, collection, db, where, query, getDocs,getDownloadURL,storage,ref,uploadBytes} from '../firebase';
import React,{useState,useEffect} from 'react'
import Header from '../StaffPartials/Header'
import Footer from '../StaffPartials/Footer'
import * as ImagePicker from 'expo-image-picker';
import { updateDoc } from 'firebase/firestore';


const StaffProfile = ( {navigation,route}) => {
     
    const {email} = route.params;
    console.log(email,"is the staff");
    const [data, setData] = useState([]);
    const [profileimage, setProfileImage] = useState();
    
      useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          
    
         // console.log(user);
          if (email) {
            console.log(email);
            
            const userRef = collection(db, 'busroutes');
            const q = query(userRef, where ("staffEmail", "==", email));
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
            setProfileImage(fetchedData[0].imageurl)      }
        } catch (error) {
          console.error('error fetching user data from Firestore:', error);
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
    
        if(email) {
          const userId = email;
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
        
        if (email) {
          
           
         
          const q = query(collection(db, 'busroutes'), where('staffEmail', '==', email));
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
      <Header email={email}/>
      <View style={styles.body}>
      <Text style={{margin : 10, marginTop:20}} >STAFF</Text>
        <View style={styles.container1}>

          <TouchableOpacity style={[styles.profilePhoto, { zIndex: 1 }]} onPress={pickImage}>
            {profileimage? (
              <Image source={{ uri: profileimage}} style={{ width: '100%', height:'100%', borderRadius:20}}></Image>
              ) : (
                <View style={{width:'100%', height: '100%', justifyContent: 'center',alignItems:"center"}}>
                <Image source={require('../../assets/person.png')} style={{ width: '80%', height:'65%', borderRadius:10}}></Image>
                 <Text style={{ color:'white', textAlign: 'center', fontSize: 10, }}>upload image</Text>
                 </View>
              )
            }

          </TouchableOpacity>
          {data.map((item) => (
            <View style={styles.stdinfo} key={item.id}>
              <Text style={styles.heading}>Staff Name : {item.staffName}</Text> 
              <Text style={styles.heading}>Staff EmailId :{item.staffEmail}</Text>
              <Text style={styles.heading}>Mobile No :{item.staffMob} </Text>
              <Text style={styles.heading}>Bus No :{item.busNum}</Text>
              {/* <Text style={styles.heading}>Bus Route        : </Text>  */}
              
             
              
            </View>
          ))}
        </View>
        
      </View>
      <Footer email={email}/>
    </View>
  )
}

export default StaffProfile

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
        shadowColor: 'black', // For iOS shadow
        shadowOffset: { width: 0, height: 2 }, // For iOS shadow
        shadowOpacity: 20, // For iOS shadow
        shadowRadius: 5, // For iOS shadow 
        borderBlockColor: "black",
        borderWidth:0.5,
        
      },
      stdinfo : { 
        height: "60%",
        width:"95%",
        backgroundColor:"white",
        borderRadius:10,
        marginTop:70,
        paddingTop:30,
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

})