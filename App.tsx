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
import MiniCases from './app/screens/MiniCases';
import Discounts from './app/screens/Discounts';
import BuyCases from './app/screens/BuyCases';
import NoApp from './app/screens/NoApp';
import Socials from './app/screens/Socials';

import home from './assets/home.png';
import help from './assets/help.png';
import freebies from './assets/freebies.png';
import shop from './assets/shop.png';
import answers from './assets/answers.png';
import Directory from './app/screens/Directory';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {

  const [authenticated,setAuthenticated] = useState(false); 
  const [user,SetUser] = useState<User | null>(null);
  const [hideApp,setHideApp] = useState(false);
  const [appAlertMsg,setAppAlertMsg] = useState(false);
  const [shopUrl,setShopUrl] = useState(null);
  const [supportUrl,setSupportUrl] = useState(null);
  const [whichCaseUrl,setWhichCaseUrl] = useState(null);
  const [saveTenUrl,setSaveTenUrl] = useState(null);

  // const [c,SetUser] = useState(null);
 
  // const navigate = useNavigation();

  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH, (user)=>{
      console.log("🚀 ~ file: App.tsx:24 ~ onAuthStateChanged ~ user:", user);
      SetUser(user);
      console.log('USER IS TRUE:', user?true:false);
      // const getSettingsRes = await fetch('https://ucf-server-2c6f04fbd850.herokuapp.com/api/settings').then(d=>d.json());
      // if(getSettingsRes.data.settings.appErrorAlert.active){
      //     alert(getSettingsRes.data.settings.appErrorAlert.message);
      // }
      // user?navigation.navigate('Announcements'):navigation.navigate('Start Page');
    });
    loadSettings();
  }, []);

  // useEffect(()=>{
  //   alert('HI')
  //   loadSettings();
  // })

  const loadSettings = async () => {
    try{
      const getSettingsRes = await fetch('https://ucf-server-2c6f04fbd850.herokuapp.com/api/settings').then(d=>d.json());
      console.log("🚀 ~ file: App.tsx:64 ~ loadSettings ~ getSettingsRes:", getSettingsRes)
      setSupportUrl(getSettingsRes.data.settings.iframeUrls.support);
      setSaveTenUrl(getSettingsRes.data.settings.iframeUrls.saveTens);
      setWhichCaseUrl(getSettingsRes.data.settings.iframeUrls.whichCase);
      setShopUrl(getSettingsRes.data.settings.iframeUrls.shop);
      if(getSettingsRes.data.settings.appErrorAlert.active){
          alert(getSettingsRes.data.settings.appErrorAlert.message);
          setAppAlertMsg(getSettingsRes.data.settings.appErrorAlert.message);
      }
      if(getSettingsRes.data.settings.hideApp){
        setHideApp(true);
      }
    }
    catch(e){
      console.log("APP[ERROR] in loadSettings:", e)
    }
  }

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

  if(hideApp) return(
    <ThemeProvider theme={theme}> 
      <SafeAreaProvider>
          <NavigationContainer>
          {/* <Stack.Navigator initialRouteName={user?'Announcements':'Start Page'}> */}
          <Stack.Navigator 
            initialRouteName={'NoApp'}
          >
            <Stack.Screen name="Home"  children={()=><NoApp message={appAlertMsg}/>} options={{headerShown: false}} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
  

  function HomeTabs() {
    return (
      <Tab.Navigator 
            initialRouteName={'Home'}
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;

                if (rn === "Home") {
                  iconName = focused ? 'home' : 'home-outline';

                } 
                else if (rn === "Answers") {
                  iconName = focused ? 'list' : 'list-outline';
                } 
                else if (rn === "Shop") {
                  iconName = focused ? 'pricetags' : 'pricetags-outline';
                }
                else if (rn === "Free") {
                  iconName = focused ? 'gift' : 'gift-outline';
                }
                else if (rn === "Help") {
                  iconName = focused ? 'help-circle' : 'help-circle-outline';
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
 
            <Tab.Screen name={"Home"} component={Directory} options={{headerShown: false}}/>
            <Tab.Screen name={"Answers"} component={Cases} options={{headerShown: false}}/>
            <Tab.Screen   name={"Shop"} 
              listeners={({ navigation }) => ({
                tabPress: e => {
                  e.preventDefault();
                  WebBrowser.openBrowserAsync(shopUrl, {showTitle:false});
                }
              })}
              component={Cases} />
            <Tab.Screen name={"Free"} component={MiniCases} options={{headerShown: false}}/>
            <Tab.Screen   name={"Help"} 
              listeners={({ navigation }) => ({
                tabPress: e => {
                  e.preventDefault();
                  WebBrowser.openBrowserAsync(supportUrl, {showTitle:false});
                }
              })}
              component={Cases} />
          </Tab.Navigator>
    );
  }

  const Drawer = createDrawerNavigator();

  
  function DrawerScreen() {
    return (
    <Drawer.Navigator id="MyDrawer" initialRouteName="Home">
      <Drawer.Screen name="Answer Keys" component={Cases} />
      <Drawer.Screen name="Social" component={Announcements} />
      <Drawer.Screen name="Discounts" component={Discounts} />
      <Drawer.Screen name="Freebies" component={BuyCases} />
    </Drawer.Navigator>
    ); 
  } 

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Help" onPress={()=>WebBrowser.openBrowserAsync(supportUrl, {controlsColor: "#BC1F2D"})} />
        <DrawerItem label="Share & Save" onPress={()=>WebBrowser.openBrowserAsync(saveTenUrl, {controlsColor: "#BC1F2D"})} />
        <DrawerItem label="Which Case" onPress={()=>WebBrowser.openBrowserAsync(whichCaseUrl, {controlsColor: "#BC1F2D"})} />
      </DrawerContentScrollView>
    );
  }

  // function ShopDrawerLink(props) {
  //   return (
  //     <DrawerContentScrollView {...props}>
  //       <DrawerItemList {...props} />
  //       <DrawerItem label="Shop" onPress={()=>WebBrowser.openBrowserAsync(shopUrl, {controlsColor: "#BC1F2D"})} />
  //     </DrawerContentScrollView>
  //   );
  // }

  return (
    <ThemeProvider theme={theme}> 
      <SafeAreaProvider>
          <NavigationContainer>
          {/* <Stack.Navigator initialRouteName={user?'Announcements':'Start Page'}> */}
          <Drawer.Navigator 
            initialRouteName={'Home'}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
          >

          <Stack.Screen name="Home" component={HomeTabs} options={{headerShown: false}} />

          <Stack.Screen name="Drawer" component={DrawerScreen} options={{headerShown: false, drawerItemStyle: {display:'none'}}} />

            {/* <Stack.Screen name="Announcements" component={Announcements} options={{headerShown: false}} />
            <Stack.Screen name="Start Page" component={StartPage} options={{headerShown: false}}/>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Sign Up" component={SignUp} /> */}

            {/* <Stack.Screen name="Case Timer" component={Timer} /> */}
            
            {/* <Stack.Screen name="Answer Key" component={AnswerKey}/> */}
            
            <Stack.Screen name="Login" component={Login} options={{headerShown: false, drawerItemStyle: {display:'none'}}}  />
            <Stack.Screen name="Sign Up" component={SignUp} options={{headerShown: false, drawerItemStyle: {display:'none'}}} />
            <Stack.Screen name="Start Page" component={StartPage} options={{headerShown: false, drawerItemStyle: {display:'none'}}} />
            {/* <Drawer.Screen name="Answer Keys" component={AnswerKeys} options={{headerShown: false}} />        */}
            <Stack.Screen name="Answer Keys" component={AnswerKeys} options={{headerShown: false}} />
            <Drawer.Screen name="Announcements" component={Announcements} options={{headerShown: false}} />      
            <Drawer.Screen name="Discounts" component={Discounts} options={{headerShown: false}} />
            {/* <Drawer.Screen name="Open Cases" component={BuyCases} options={{headerShown: false}} /> */}
            <Drawer.Screen name="Freebies" component={BuyCases} options={{headerShown: false}} />
            <Stack.Screen name="Settings" component={Profile} options={{headerShown: false}} />
            <Stack.Screen name="Follow Us" component={Socials} options={{headerShown: false}} />
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
