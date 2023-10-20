import { View, Text, TextInput, StyleSheet, ActivityIndicator, KeyboardAvoidingView,TouchableWithoutFeedback, Platform } from 'react-native'
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

const isAndroid = Platform.OS === "android";

const ScreenTitle = ({title, navigation}) => {

    console.log('PLATFORM:', Platform.OS);
    const isAndroid = Platform.OS === "android";

    return (
        <View style={styles.container}>
                        <Icon 
    name='three-bars' 
    size={25} 
    color='#fff' 
    style={styles.hamburger}
    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
/>
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}

export default ScreenTitle

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#BC1F2D',
        height: isAndroid?90:70,
        paddingTop: isAndroid?40:30,
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
        left: '15%',
        top:isAndroid?55:38,
        
    }
})