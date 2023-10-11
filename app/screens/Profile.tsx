import { View, Text, TextInput, StyleSheet, ActivityIndicator, KeyboardAvoidingView,TouchableWithoutFeedback } from 'react-native'
import React, {useState, useEffect} from 'react'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_APP, FIREBASE_AUTH } from '../../firebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '@rneui/themed';
import { Image } from '@rneui/themed';
import logo from '../../assets/welcome2.jpg';
import { Button } from '@rneui/themed';
import GLOBAL from '../global.js'
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore'
import { FIRESTORE_DB } from '../../firebaseConfig'
import ScreenTitle from '../components/ScreenTitle';

const Profile = ({navigation}) => {

    const [loading,setLoading] = useState(false);
    const [userData,setUserData] = useState(null);
    const [firebaseUser,setFirebaseUser] = useState(null);


    useEffect(()=>{
        loadInitial();
    }, []);

    
    const loadInitial = async () => {
        setLoading(true);
        try{
            const userFromDb = await (await getDoc(doc(FIRESTORE_DB, "users", FIREBASE_AUTH.currentUser.uid))).data();
            console.log("🚀 ~ file: Profile.tsx:31 ~ loadInitial ~ FIREBASE_AUTH.currentUser:", FIREBASE_AUTH.currentUser)
            console.log("🚀 ~ file: Timer.tsx:34 ~ loadInitial ~ userFromDb:", userFromDb);
            setFirebaseUser(FIREBASE_AUTH.currentUser);
            setUserData(userFromDb);
            setLoading(false);
        }
        catch(e){
            console.log('ERROR in loadInital in Profile.tsx:', e);
        }
    }


    const logout = async () => {
        FIREBASE_AUTH.signOut();
    };

    const resetPassword = async () => {
        await sendPasswordResetEmail(FIREBASE_AUTH, FIREBASE_AUTH.currentUser.email);
        console.log("🚀 ~ file: Profile.tsx:49 ~ resetPassword ~ thingy:", thingy)
    };

    if(loading) return(
        <View style={styles.container}>
            <ScreenTitle navigation={navigation} title="PROFILE SETTINGS"/>
            <View style={styles.profileContainer}>
                <ActivityIndicator size={"large"} color="#BC1E2E"/>
            </View>
        </View>
    )

    if(!firebaseUser) return (
        <View style={styles.container}>
        <ScreenTitle navigation={navigation} title="PROFILE SETTINGS"/>
        <View style={styles.profileContainer}>
            <Text style={styles.loginHeader}>No Account Found</Text>
        </View>
    </View>
    )

    return (
        <View style={styles.container}>
            <ScreenTitle navigation={navigation} title="PROFILE SETTINGS"/>
            <View style={styles.profileContainer}>
                {/* <Text style={styles.loginHeader}>Your Account</Text> */}
                <KeyboardAvoidingView style={styles.loginForm}>         
                    <Text style={styles.loginHeader}>{firebaseUser.email}</Text>       
                    <Button style={styles.button} title="Logout" onPress={logout}/>
                    <View style={styles.signUpText}>
                        <Text onPress={resetPassword} style={styles.signUpLink}>Reset Your Password</Text>
                    </View>
                </KeyboardAvoidingView>
                
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    profileContainer:{
        flexDirection: 'column',
        paddingVertical: 10,
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        alignItems: 'center'
    },
    loginForm:{
        flexDirection: 'column', 
        alignItems: 'center',
        marginVertical: 20,
        width: '80%',
    },
    loginHeader:{
        fontWeight: "800",
        fontSize: 20,
        marginTop: 20
    },
    button:{
        width: 200,
        margin: 10,
        marginTop: 30
    },
    signUpText:{
        display: 'flex',
        flexDirection: 'row',
    },
    signUpLink:{
        color:'blue'
    },
})