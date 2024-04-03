import { Image,StyleSheet, Text, View,TextInput,TouchableOpacity,ScrollView } from 'react-native'
import {DataTable} from 'react-native-paper'
import { auth, collection, db, where, query, getDocs,getDownloadURL,storage,ref,uploadBytes} from './firebase';
import React,{useState,useEffect} from 'react'
import Header from './Partials/Header'
import Footer from './Partials/Footer'

const BusRoutes = ({navigation}) => {

const [Routes,setRoutes] = useState([]) ;
  
const totalRoutes = Routes.length;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const user = auth.currentUser;

      
      if (user) {

        
        const userRef = collection(db, 'busroutes');
        const q = query(userRef);
        const querySnapshot = await getDocs(q);

        console.log(querySnapshot);
        
        if (querySnapshot.empty) {
          console.log("no matching document");
          return;
        }
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(fetchedData);
        setRoutes(fetchedData);
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
              <Text style={styles.heading}>Total Buses   : {totalRoutes}</Text>
             
          <DataTable  style={styles.table}> 
      <DataTable.Header style={styles.tableHead}> 
        <DataTable.Title>Bus No: </DataTable.Title> 
        <DataTable.Title>Route : </DataTable.Title> 
        <DataTable.Title>check Stops: </DataTable.Title> 
      </DataTable.Header> 
      {Routes.map((route) => (
        
        <DataTable.Row key={route.id} style={styles.tableRow}>
            <DataTable.Cell>{route.busNum}</DataTable.Cell>
            <DataTable.Cell>{route.routeName}</DataTable.Cell>
            <DataTable.Cell>
                <TouchableOpacity onPress={()=> navigation.navigate('busdetails',{BusNo: route.busNum})}>
                    <Text style={{color:'blue'}}>   check</Text>
                </TouchableOpacity>    
            </DataTable.Cell>
        </DataTable.Row>
         ))}
  
    </DataTable> 
    
          </View>
          
        </View>
        <Footer/>
    </View>
  )
}

export default BusRoutes

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
    color:"blue",
    
    
  },
      
})