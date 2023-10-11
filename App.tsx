import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import List from './app/screens/List';
import Details from './app/screens/Details';
import Login from './app/screens/Login'; 
import SignUp from './app/screens/SignUp'; 
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';
import StartPage from './app/screens/StartPage';
import Announcements from './app/screens/Announcements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@rneui/themed';
import { createTheme } from '@rneui/themed/dist/config';
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AnswerKeys from './app/screens/Cases';
import Cases from './app/screens/Cases';
import AnswerKey from './app/screens/AnswerKey';
import CaseTimers from './app/screens/CaseTimers';
import Timer from './app/screens/Timer';
import WhichCase from './app/screens/WhichCase';
import SaveTens from './app/screens/SaveTens';
import * as WebBrowser from 'expo-web-browser';
import Profile from './app/screens/Profile';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {

  const [authenticated,setAuthenticated] = useState(false); 
  const [user,SetUser] = useState<User | null>(null);

  // const navigate = useNavigation();

  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH, (user)=>{
      console.log("🚀 ~ file: App.tsx:24 ~ onAuthStateChanged ~ user:", user);
      SetUser(user);
      console.log('USER IS TRUE:', user?true:false);
      // user?navigation.navigate('Announcements'):navigation.navigate('Start Page');
    })
  }, [])

  const theme = createTheme({
    lightColors: {
      primary: '#BC1F2D',
    },
    darkColors: {
      primary: 'blue',
    },
    components: {
      Button: {
        radius: 7,
        size: 'lg',
      },
    },
  });

  function HomeTabs() {
    return (
      <Tab.Navigator 
            initialRouteName={'Home'}
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;

                if (rn === "Announcements") {
                  iconName = focused ? 'home' : 'home-outline';

                } 
                else if (rn === "Answer Keys") {
                  iconName = focused ? 'list' : 'list-outline';
                } 
                else if (rn === "Timers") {
                  iconName = focused ? 'timer' : 'timer-outline';
                }
                else if (rn === "Which Case") {
                  iconName = focused ? 'albums' : 'albums-outline';
                }

                // else if (rn === "Timer") {
                //   iconName = focused ? 'list' : 'list-outline';w
                // }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={'#BC1F2D'} />;
              },
              tabBarLabelStyle:{color:'#BC1F2D', paddingBottom:3},
              activeTintColor: '#BC1F2D',
              inactiveTintColor: 'grey',
              style: { padding: 10, height: 70}
            }
          )}>

            <Tab.Screen name={"Announcements"} component={Announcements} options={{headerShown: false}}/>
            <Tab.Screen name={"Answer Keys"} component={Cases} options={{headerShown: false}}/>
            <Tab.Screen name={"Timers"} component={CaseTimers} options={{headerShown: false}}/>
            <Tab.Screen name={"Which Case"} component={WhichCase} options={{headerShown: false}}/>
          </Tab.Navigator>
    );
  }

  const Drawer = createDrawerNavigator();

  
  function DrawerScreen() {
    return (
    <Drawer.Navigator id="MyDrawer" initialRouteName="Home">
      <Drawer.Screen name="Answer Keys" component={Cases} />
      <Drawer.Screen name="Announcements" component={Announcements} />
    </Drawer.Navigator>
    );
  }

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Help & Support" onPress={()=>WebBrowser.openBrowserAsync('https://www.unsolvedcasefiles.com/support.html', {controlsColor: "#BC1F2D"})} />
      </DrawerContentScrollView>
    );
  }

  return (
    <ThemeProvider theme={theme}> 
      <SafeAreaProvider>
          <NavigationContainer>
          {/* <Stack.Navigator initialRouteName={user?'Announcements':'Start Page'}> */}
          <Drawer.Navigator 
            initialRouteName={'Announcements'}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
          >

          <Stack.Screen name="Home" component={HomeTabs} options={{headerShown: false}} />

          <Stack.Screen name="Drawer" component={DrawerScreen} options={{headerShown: false, drawerItemStyle: {display:'none'}}} />

            {/* <Stack.Screen name="Announcements" component={Announcements} options={{headerShown: false}} />
            <Stack.Screen name="Start Page" component={StartPage} options={{headerShown: false}}/>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Sign Up" component={SignUp} /> */}

            <Stack.Screen name="Case Timer" component={Timer} />
            <Stack.Screen name="Answer Key" component={AnswerKey}/>

            <Stack.Screen name="Login" component={Login} options={{headerShown: false, drawerItemStyle: {display:'none'}}}  />
            <Stack.Screen name="Sign Up" component={SignUp} options={{headerShown: false, drawerItemStyle: {display:'none'}}} />
            <Stack.Screen name="Start Page" component={StartPage} options={{headerShown: false, drawerItemStyle: {display:'none'}}} />
            <Stack.Screen name="Share & Save" component={SaveTens} options={{headerShown: false}} />
            <Stack.Screen name="Profile Settings" component={Profile} options={{headerShown: false}} />

          </Drawer.Navigator>
          {/* <Tab.Navigator 
            initialRouteName={'Home'}
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;

                if (rn === "Home") {
                  iconName = focused ? 'home' : 'home-outline';

                } else if (rn === "Answer Keys") {
                  iconName = focused ? 'list' : 'list-outline';
                }
                // else if (rn === "Timer") {
                //   iconName = focused ? 'list' : 'list-outline';w
                // }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={'#BC1F2D'} />;
              },
              tabBarLabelStyle:{color:'#BC1F2D', paddingBottom:3},
              activeTintColor: '#BC1F2D',
              inactiveTintColor: 'grey',
              style: { padding: 10, height: 70}
            }
          )}>

            <Tab.Screen name={"Home"} component={Announcements} options={{headerShown: false}}/>
            <Tab.Screen name={"Answer Keys"} component={Cases} options={{headerShown: false}}/>
            <Tab.Screen name={"Case Timers"} component={CaseTimers} options={{headerShown: false}}/>
            <Tab.Screen name={"Timer"} component={Timer}/>

            <Tab.Screen name={"Answer Key"} component={AnswerKey}/>
            <Tab.Screen name={"Which Case"} component={WhichCase}/>
            <Tab.Screen name={"Share & Save"} component={SaveTens}/>

            <Tab.Screen name={"Start Page"} user={user} component={StartPage} options={{headerShown: false}}/>
            <Tab.Screen name={"Login"} component={Login} options={{headerShown: false, tabBarStyle: {display:'none'}}}/>
            <Tab.Screen name={"Sign Up"} component={SignUp} options={{headerShown: false, tabBarStyle: {display:'none'}}}/>

          </Tab.Navigator> */}
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
