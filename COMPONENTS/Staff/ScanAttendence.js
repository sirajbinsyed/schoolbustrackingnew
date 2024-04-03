import { Camera } from 'expo-camera';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { collection, db, where, query, getDocs, doc, updateDoc } from '../firebase'; // Import Firestore methods

const SacnAttendence = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log('Camera permission status:', status);
      setHasPermission(status === 'granted');
    })();
  }, []);

  const getCurrentTime = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes(); // Convert current time to minutes since midnight
  };

  function minutesToClockTime(minutes) {
    // Calculate the hours and minutes
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    // Determine AM or PM
    const period = hours >= 12 ? 'PM' : 'AM';
    // Adjust hours to 12-hour format
    const formattedHours = hours % 12 || 12;

    // Format the time with AM or PM
    const formattedTime = `${formattedHours}:${remainingMinutes < 10 ? '0' : ''}${remainingMinutes} ${period}`;

    return formattedTime;
}
  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    try {
      const currentTime = getCurrentTime();
      const userRef = collection(db, 'Users');
      const q = query(userRef, where("IdNo", "==", data));
      console.log(data);
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userId = userDoc.id;
        
        console.log(minutesToClockTime(currentTime));

        const attendanceStatus = currentTime < 600 ? 'Entered From House' : 'Departed on House'; // 600 minutes is 10:00 AM
        await updateDoc(doc(userRef, userId), {
           Attendance: attendanceStatus,
           
          });

        if(currentTime<600){
          const EnteredTime = minutesToClockTime(currentTime);
          await updateDoc(doc(userRef, userId), {
            pickupTime: EnteredTime,
           });
        }else{
          const DropedTime = minutesToClockTime(currentTime);
          await updateDoc(doc(userRef, userId), {
            dropTime: DropedTime,
           });
        }

        Alert.alert('Success', 'Attendance updated successfully!');
      } else {
        Alert.alert('Error', 'User not found.');
      }
    } catch (error) {
      console.error('Error updating attendance:', error);
      Alert.alert('Error', 'Failed to update attendance.');
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      {scanned && (
        <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
          <Text style={styles.buttonText}>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 10,
    position: 'absolute',
    bottom: 20,
    left: '20%',
    right: '20%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default SacnAttendence;
