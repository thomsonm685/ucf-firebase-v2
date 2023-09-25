// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// // Screens
// import Announcements from './screens/Announcements';
// import Details from './screens/Details';

// //Screen names
// const announcementsName = "Home";
// const detailsName = "Details";

// const Tab = createBottomTabNavigator();

// function MainContainer() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         initialRouteName={announcementsName}
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;
//             let rn = route.name;

//             if (rn === announcementsName) {
//               iconName = focused ? 'home' : 'home-outline';

//             } else if (rn === detailsName) {
//               iconName = focused ? 'list' : 'list-outline';
//             }

//             // You can return any component that you like here!
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         })}
//         tabBarOptions={{
//           activeTintColor: 'tomato',
//           inactiveTintColor: 'grey',
//           labelStyle: { paddingBottom: 10, fontSize: 10 },
//           style: { padding: 10, height: 70}
//         }}>

//         <Tab.Screen name={announcementsName} component={Announcements} />
//         <Tab.Screen name={detailsName} component={Details} />

//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// export default MainContainer;