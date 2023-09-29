import { View, Text, TextInput, StyleSheet, ActivityIndicator, KeyboardAvoidingView,TouchableWithoutFeedback } from 'react-native'
import React, {useState, useEffect} from 'react'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '@rneui/themed';
import { Image } from '@rneui/themed';
import logo from '../../assets/welcome2.jpg';
import { Button } from '@rneui/themed';
import GLOBAL from '../global.js'
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore'
import { FIRESTORE_DB } from '../../firebaseConfig'

const Login = ({navigation}) => {

    // useEffect(()=>{
    //     onAuthStateChanged(FIREBASE_AUTH, (user)=>{
    //       user?navigation.navigate('Home'):'';
    //     })
    // }, [])

    useEffect(()=>{
        onAuthStateChanged(FIREBASE_AUTH, async (user)=>{
            if(user){
                const userFromDb = await (await getDoc(doc(FIRESTORE_DB, "users", user.uid))).data();
                if(!userFromDb){
                    console.log('no user from db!');
                    await addDoc(collection(FIRESTORE_DB, 'users'), {
                        times: []
                    });
                }
                navigation.navigate('Home');
            }
        })
    }, [])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try{
            const signInReq = await signInWithEmailAndPassword(auth, email, password);
            console.log("🚀 ~ file: Login.tsx:19 ~ signIn ~ signInReq:", signInReq);
        }
        catch(error){
            console.log("🚀 ~ file: Login.tsx:26 ~ signIn ~ error:", error);
            alert('Sign In Failed: '+error.message);
        }
        finally{
            setLoading(false);
        }
    };

    // const signUp = async () => {
    //     setLoading(true);
    //     try{
    //         const signInReq = await createUserWithEmailAndPassword(auth, email, password);
    //         console.log("🚀 ~ file: Login.tsx:32 ~ signUp ~ signInReq:", signInReq)

    //     }
    //     catch(error){
    //         console.log("🚀 ~ file: Login.tsx:36 ~ signUp ~ error:", error);
    //         alert('Sign Up Failed: '+error.message);
    //     }
    //     finally{
    //         setLoading(false);
    //     }
    // };

    return (
        <View style={styles.container}>
                              {/* <Button 
        title="Sign Out"
        onPress={()=>FIREBASE_AUTH.signOut()}
        /> */}
                <Image 
                    style={styles.logo}
                    source={logo}
                />
                <Text style={styles.loginHeader}>Log into your account</Text>
                <KeyboardAvoidingView style={styles.loginForm}>
                    <Input style={styles.input} placeholder='Email' onChangeText={input=>setEmail(input)} value={email}/>
                    <Input style={styles.input} secureTextEntry={true} placeholder='Password' onChangeText={input=>setPassword(input)} value={password}/>
                    
                    {
                    loading        
                    ?        
                    <ActivityIndicator size={"large"} color="#BC1E2E"/>
                    :
                    <>
                    <Button style={styles.button} title="Sign in" disabled={email===''||password===''} onPress={signIn}/>
                    </>
                    }
                    <View style={styles.signUpText}>
                        <Text>Don't have an account?</Text>
                        <Text onPress={()=>navigation.navigate('Sign Up')} style={styles.signUpLink}> Sign up here</Text>
                    </View>
                </KeyboardAvoidingView>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        paddingVertical: 10,
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
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
    buttonOne:{
        backgroundColor:'#BC1F2D',
        color: '#fff'
    },
    logo:{
        margin: 'auto',
        width: 200,
        height: 100,
        objectFit: 'contain',
    },
    button:{
        width: 200,
        margin: 10,
    },
    signUpText:{
        display: 'flex',
        flexDirection: 'row',
    },
    signUpLink:{
        color:'blue'
    },
})