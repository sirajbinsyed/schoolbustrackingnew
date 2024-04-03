import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import * as Location from 'expo-location';
import { collection, db, where, query, getDocs, doc, updateDoc, setDoc } from '../firebase';

const BusLocation = ({ navigation, route }) => {
  const { email } = route.params;
   console.log(email);
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState([]);
  const [busNum, setBusNum] = useState(null); // State variable to store busNum globally

  const fetchData = async () => {
    try {
      await getLocation(); // Fetch location first
      await fetchStaffData(); // Fetch staff data next
      await updateLocation(); // Finally, update location
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  useEffect(() => {
    // Extract busNum from the first item in data array if it exists
    if (data.length > 0) {
      setBusNum(data[0].busNum);
    }
  }, [data]); // Update busNum whenever data changes

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Location permission not granted');
      }

      const locationResult = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = locationResult.coords;
      setLocation({ latitude, longitude });
    } catch (error) {
      console.error("Error getting location:", error);
      setErrorMessage(error.message);
    }
  };

  const fetchStaffData = async () => {
    try {
      const userRef = collection(db, 'staff');
      const q = query(userRef, where("staffEmail", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No matching document");
        return;
      }

      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching user data from Firestore:', error);
    }
  };

  const updateLocation = async () => {
    try {
      if (busNum) {
        const locationCollectionRef = collection(db, 'location'); // Reference to the 'location' collection
        const querySnapshot = await getDocs(locationCollectionRef);

        // Check if a document with the same busNum exists
        let locationDocRef;
        querySnapshot.forEach(doc => {
          const data = doc.data();
          if (data.busNum === busNum) {
            locationDocRef = doc.ref;
          }
        });

        if (locationDocRef) {
          // If document with busNum exists, update it
          await updateDoc(locationDocRef, {
            email: email,
            latitude: location.latitude,
            longitude: location.longitude,
            busNum: busNum // Ensure busNum is defined
          });
          console.log(location);
          console.log('Location updated successfully');
        } else {
          // If document with busNum does not exist, create a new document
          await setDoc(doc(locationCollectionRef), {
            email: email,
            latitude: location.latitude,
            longitude: location.longitude,
            busNum: busNum // Ensure busNum is defined
          });
          console.log('New location document created successfully');
        }
      }
    } catch (error) {
      console.error('Error updating location in Firestore:', error);
    }
  };

  const handleFetchData = () => {
    fetchData();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Allow current Location" onPress={handleFetchData} />
      {errorMessage ? <Text>Error: {errorMessage}</Text> : null}
      {location ? (
        <Text>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </Text>
      ) : (
        <Text>Loading...</Text>
      )}
      {busNum && <Text>Bus Number: {busNum}</Text>}
    </View>
  );
};

export default BusLocation;
