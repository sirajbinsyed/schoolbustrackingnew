import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './COMPONENTS/Login';
import Register from './COMPONENTS/Register';
import Intro from './COMPONENTS/Intro';
import home from './COMPONENTS/Home';
import TrackBus from './COMPONENTS/TrackBus';
import BusDetails from './COMPONENTS/BusDetails';
import BusRoutes from './COMPONENTS/BusRoutes';
import PaymentDetails from './COMPONENTS/PaymentDetails';
import  StudentReg from './COMPONENTS/StudentReg';
import contact from './COMPONENTS/Contact';
import StudentProfile from './COMPONENTS/StudentProfile';
import Notifications from './COMPONENTS/Notifications';
import Payment from './COMPONENTS/Payment';
import StaffHome from './COMPONENTS/Staff/StaffHome';
import AddStops from './COMPONENTS/Staff/AddStops';
import BusLocation from './COMPONENTS/Staff/BusLocation';
import Attendance from './COMPONENTS/Staff/Attendance';
import ScanAttendence from './COMPONENTS/Staff/ScanAttendence';
import ContactUsers from './COMPONENTS/Staff/ContactUsers';
import ShowAttendance from './COMPONENTS/Staff/ShowAttendance';
import StaffProfile from './COMPONENTS/Staff/StaffProfile';
import UpdateNotifications from './COMPONENTS/Staff/UpdateNotifications';
import UpdatePayment from './COMPONENTS/Staff/UpdatePayment';
import Broadcast from './COMPONENTS/Staff/Broadcast';

const stack= createNativeStackNavigator()

export default function App() {
  return (
    
     <NavigationContainer>
       
        <stack.Navigator screenOptions={{headerShown:false}}>
        <stack.Screen name='login' component={Login}></stack.Screen>
      
        <stack.Screen name='register' component={Register}></stack.Screen>
        <stack.Screen name='home' component={home}></stack.Screen>
      
        <stack.Screen name='intro' component={Intro}></stack.Screen>
        
        <stack.Screen name='trackBus' component={TrackBus}></stack.Screen>
        <stack.Screen name='busdetails' component={BusDetails}></stack.Screen>
        <stack.Screen name='busroutes' component={BusRoutes}></stack.Screen>
        <stack.Screen name='paymentdetails' component={PaymentDetails}></stack.Screen>
        <stack.Screen name='studentreg' component={StudentReg}></stack.Screen>
        <stack.Screen name='contactstaff' component={contact}></stack.Screen>
        <stack.Screen name='studentprofile' component={StudentProfile}></stack.Screen>
        <stack.Screen name='notifications' component={Notifications}></stack.Screen>
        <stack.Screen name='payment' component={Payment}></stack.Screen>
        
         {/* staff navigations  */}

         <stack.Screen name='staffhome' component={StaffHome}></stack.Screen>
         <stack.Screen name='buslocation' component={BusLocation}></stack.Screen>
         <stack.Screen name='addstops' component={AddStops}></stack.Screen>
         <stack.Screen name='attendance' component={Attendance}></stack.Screen>
         <stack.Screen name='Scan' component={ScanAttendence}></stack.Screen>
         <stack.Screen name='contactUsers' component={ContactUsers}></stack.Screen>
         <stack.Screen name='showAttendance' component={ShowAttendance}></stack.Screen>
         <stack.Screen name='staffProfile' component={StaffProfile}></stack.Screen>
         <stack.Screen name='updateNotifications' component={UpdateNotifications}></stack.Screen>
         <stack.Screen name='updatepayment' component={UpdatePayment}></stack.Screen>
         <stack.Screen name='broadcast' component={Broadcast}></stack.Screen>
         
      </stack.Navigator>
     </NavigationContainer>
      
  );
}

const styles = StyleSheet.create({
});
