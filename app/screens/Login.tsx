import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();

    const signUp = async () => {
        const signUpReq = await createUserWithEmailAndPassword(auth, email, password);
        console.log("🚀 ~ file: Login.tsx:14 ~ signUp ~ signUpReq:", signUpReq);
    };

    const signIn = async () => {
        const signInReq = await signInWithEmailAndPassword(auth, email, password);
        console.log("🚀 ~ file: Login.tsx:19 ~ signIn ~ signInReq:", signInReq);
    };

  return (
    <View style={styles.container}>
        <TextInput style={styles.input} placeholder='Email' onChangeText={input=>setEmail(input)} value={email}/>
        <TextInput style={styles.input} textContentType='password' placeholder='Password' onChangeText={input=>setPassword(input)} value={password}/>
        
        <Button title="Create account" disabled={email===''||password===''} onPress={signUp}/>
        <Button title="Sign in" disabled={email===''||password===''} onPress={signUp}/>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 20,
        flexDirection: 'column',
        paddingVertical: 10,
    },
    form:{
        flexDirection: 'row', 
        alignItems: 'center',
        marginVertical: 20,
    },
    input:{
        marginVertical: 4,
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff'
    },
})