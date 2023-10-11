import { View, Text, TextInput, StyleSheet, ActivityIndicator, KeyboardAvoidingView,TouchableWithoutFeedback } from 'react-native'
import React, {useState, useEffect} from 'react'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '@rneui/themed';
import { Image } from '@rneui/themed';
import logo from '../../assets/welcome2.jpg';
import { Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Octicons';
import { DrawerActions } from '@react-navigation/native';



const ScreenTitle = ({title, navigation}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            <Icon 
    name='three-bars' 
    size={30} 
    color='#fff' 
    style={styles.hamburger}
    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
/>
        </View>
    )
}

export default ScreenTitle

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#BC1F2D',
        height: 70,
        paddingTop: 20,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection: "row"
    },
    text:{
        color: '#fff',
        fontWeight: '500',
        fontSize: 20
    },
    hamburger:{
        position: 'absolute',
        right: '10%',
        top:30,
        
    }
})