import { View, Text, TextInput, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { createUserWithEmailAndPassword, getAdditionalUserInfo, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import logo from '../../assets/welcome.jpg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, useTheme } from '@rneui/themed';

const StartPage = ({navigation}) => {
    const { theme, updateTheme } = useTheme();
    
    // useEffect(()=>{
    //     console.log('current User:', user);
    //       user?navigation.navigate('Home'):'';
    // }, [])

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Image 
                    style={styles.logo}
                    source={logo}
                />
                <Button 
                    color={'#fff'}
                    style={styles.button}
                    onPress={()=>navigation.navigate('Login')}
                >   
                    <Text style={{ color: theme.colors.primary, fontSize: 18}}>
                        Sign In
                    </Text>
                </Button>
                <Button 
                    color={'#fff'}
                    style={styles.button}
                    onPress={()=>navigation.navigate('Sign Up')}
                >   
                    <Text style={{ color: theme.colors.primary, fontSize: 18}}>
                        Sign Up
                    </Text>
                </Button>  
                <Button 
                    color={'#fff'}
                    style={styles.button}
                    onPress={()=>navigation.navigate('Details')}
                >   
                    <Text style={{ color: theme.colors.primary, fontSize: 18}}>
                        Answer Keys
                    </Text>
                </Button>            
            </View>
        </SafeAreaView>
    )
}

export default StartPage

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