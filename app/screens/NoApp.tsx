import { View, Text, TextInput, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { createUserWithEmailAndPassword, getAdditionalUserInfo, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import logo from '../../assets/welcome.jpg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, useTheme } from '@rneui/themed';

const NoApp = ({message}) => {
    const { theme, updateTheme } = useTheme();

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Image 
                    style={styles.logo}
                    source={logo}
                />
                    <Text style={{ color: '#fff', fontSize: 18, textAlign:'center'}}>
                        {message}
                    </Text>
            </View>
        </SafeAreaView>
    )
}

export default NoApp

const styles = StyleSheet.create({
    container:{
        // marginHorizontal: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        paddingVertical: 10,
        backgroundColor: '#BC1F2D',
        height: '100%'
    },
    buttonOne:{
        backgroundColor:'#BC1F2D',
        color: '#fff'
    },
    logo:{
        margin: 'auto',
        width: 200,
        height: 100,
        objectFit: 'contain',
        marginBottom: 50
    },
    button:{
        width: 200,
        margin: 10,
    },

})