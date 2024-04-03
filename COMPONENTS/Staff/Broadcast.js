import { StyleSheet, Text, View ,Button} from 'react-native'
import React from 'react'
import Sms from 'react-native-sms';
const Broadcast = () => {
    const handleSendSMS = () => {
        console.log("hai");
        // Compose SMS message
        const message = 'Hello, this is a test SMS message!';
    
        // Specify recipients (comma-separated phone numbers)
        const recipients = ['+91 9744849679', '+91 9633039117'];
    
        // Send SMS
        Sms.send(recipients, message, (completed, cancelled, error) => {
          if (completed) {
            console.log('SMS sent successfully!');
          } else if (cancelled) {
            console.log('SMS cancelled.');
          } else if (error) {
            console.error('Error sending SMS:', error);
          }
        });
      };
  return (
    <View style={{marginTop:25}}>
      <Button style={{marginTop:25}} title="Send SMS" onPress={handleSendSMS} />
    </View>
  )
}

export default Broadcast

const styles = StyleSheet.create({})