import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Footer from './Partials/Footer';
import Header from './Partials/Header';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { collection, db, where, query, getDocs,auth } from './firebase'; // Import Firestore methods

export default function App() {
  const [busLocation, setBusLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    fetchData(); // Fetch user data to get bus location
    requestLocationPermission(); // Request permission to access user's location
  }, []);

  const fetchData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        console.log(userId);
        const userRef = collection(db, 'Users');
        const q = query(userRef, where("UserId", "==", userId));
        console.log(q);
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          console.log("hii");
          const userData = querySnapshot.docs[0].data();
          // Assuming the busNum is stored in the userData
          const busNum = userData.busNo;
          // Fetch the location data for the busNum
          const locationRef = collection(db, 'location');
          const locationQuery = query(locationRef, where("busNum", "==", busNum));
          const locationSnapshot = await getDocs(locationQuery);
          if (!locationSnapshot.empty) {
            const locationData = locationSnapshot.docs[0].data();
            setBusLocation(locationData);
          } else {
            setErrorMsg('Location data not found for the busNum');
          }
        } else {
          setErrorMsg('User data not found');
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const requestLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      setErrorMsg('Error requesting location permission');
    }
  };

  return (
    
    <View style={styles.Background}>
      <Header/>
    <View style={styles.body}>
    <View style={styles.container1}>
    <View style={styles.container}>
      {busLocation ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: busLocation.latitude,
            longitude: busLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: busLocation.latitude,
              longitude: busLocation.longitude,
            }}
            title="Bus Location"
            description="This is the location of the bus."
          />
        </MapView>
      ) : (
        <Text>{errorMsg ? errorMsg : 'Loading...'}</Text>
      )}
    </View>
    </View>
    </View>
    <Footer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
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
    flexWrap:"wrap",
    padding:10
    
  },
  container1 : {
    width:"85%",
    height:"90%",
    backgroundColor:"#A9C9EE",
    borderRadius:10,
    flexDirection:"row",
    flexWrap:"wrap",
   
    justifyContent:"center",
    marginTop:"20%",
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 0.5, // For iOS shadow
    shadowRadius: 5, // For iOS shadow
  },


});
