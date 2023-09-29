import { View, Text, TextInput, StyleSheet, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { Button, Image, Input } from '@rneui/themed';
import logo from '../../assets/welcome2.jpg';
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { FIRESTORE_DB } from '../../firebaseConfig'

const SignUp = ({navigation}) => {

    useEffect(()=>{
        onAuthStateChanged(FIREBASE_AUTH, async (user)=>{
            if(user){
                console.log("🚀 ~ file: SignUp.tsx:15 ~ onAuthStateChanged ~ user:", user);
                console.log("🚀 ~ file: SignUp.tsx:16 ~ onAuthStateChanged ~ user.uid:", user.uid)
                const userFromDb = await getDoc(doc(FIRESTORE_DB, "users", user.uid))
                console.log("🚀 ~ file: SignUp.tsx:18 ~ onAuthStateChanged ~ userFromDb:", userFromDb);
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

    // const signIn = async () => {
    //     setLoading(true);
    //     try{
    //         const signInReq = await signInWithEmailAndPassword(auth, email, password);
    //         console.log("🚀 ~ file: Login.tsx:19 ~ signIn ~ signInReq:", signInReq);
    //     }
    //     catch(error){
    //         console.log("🚀 ~ file: Login.tsx:26 ~ signIn ~ error:", error);
    //         alert('Sign In Failed: '+error.message);
    //     }
    //     finally{
    //         setLoading(false);
    //     }
    // };

    const signUpUser = async () => {
        setLoading(true);
        try{
            const signInReq = await createUserWithEmailAndPassword(auth, email, password);
            console.log("🚀 ~ file: Login.tsx:32 ~ signUp ~ signInReq:", signInReq)

        }
        catch(error){
            console.log("🚀 ~ file: Login.tsx:36 ~ signUp ~ error:", error);
            alert('Sign Up Failed: '+ error.message);
        }
        finally{
            setLoading(false);
        }
    };
    return (
        <View style={styles.container}>
                <Image 
                    style={styles.logo}
                    source={logo}
                />
                <Text style={styles.loginHeader}>Create your account</Text>
                <KeyboardAvoidingView style={styles.loginForm}>
                    <Input style={styles.input} placeholder='Email' onChangeText={input=>setEmail(input)} value={email}/>
                    <Input style={styles.input} secureTextEntry={true} placeholder='Password' onChangeText={input=>setPassword(input)} value={password}/>
                    
                    {
                    loading        
                    ?        
                    <ActivityIndicator size={"large"} color="#BC1E2E"/>
                    :
                    <>
                    <Button style={styles.button} title="Sign up" disabled={email===''||password===''} onPress={signUpUser}/>
                    </>
                    }
                    <View style={styles.signUpText}>
                        <Text>Already have an account?</Text>
                        <Text onPress={()=>navigation.navigate('Login')} style={styles.signUpLink}> Sign in here</Text>
                    </View>
                </KeyboardAvoidingView>
        </View>
    )
}

export default SignUp

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