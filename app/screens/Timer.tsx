import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Platform, Dimensions } from 'react-native'
import React, { useEffect, useState, Component } from 'react'
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import WebView from 'react-native-webview';
import { Button, ListItem } from '@rneui/themed';
import ObjectiveTimer from '../components/ObjectiveTimer';
import { collection, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import ConfettiCannon from 'react-native-confetti-cannon';


const windowWidth = Dimensions.get('window').width;

const Timer = ({navigation, route}) => {

    console.log("🚀 ~ file: AnswerKey.tsx:11 ~ AnswerKey ~ Platform.OS:", Platform.OS)

  const {thisCase} = route.params;
  const [loading, setLoading] = useState(true);
  const [totalTime, setTotalTime] = useState(-1);
  const [userData, setUserData] = useState(null);
  const [rainingConfetti, setRainingConfetti] = useState(false);

  const addTotalTime = (amount) => {
    setTotalTime(totalTime + amount);
  }

  const makeItRain = () => {
    setRainingConfetti(true);
    setTimeout(()=>{
      setRainingConfetti(false);
    }, 5000)
  }


  const loadInitial = async () => {
    setLoading(true);
    try{
      const userFromDb = await (await getDoc(doc(FIRESTORE_DB, "users", FIREBASE_AUTH.currentUser.uid))).data();
      console.log("🚀 ~ file: Timer.tsx:34 ~ loadInitial ~ userFromDb:", userFromDb);
      setUserData(userFromDb);
      setLoading(false);
    }
    catch(e){
      console.log('ERROR in fetchAnnouncements:', e);
    }
  }

  const saveTime = async () => {
    // await setDoc(doc(FIRESTORE_DB, "users", FIREBASE_AUTH.currentUser.uid), {times:[...userData.times, {
    //     caseId:thisCase._id,
    //     date: new Date(),
    //     totalTime: totalTime
    // }]});
    makeItRain();
  }
  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH, (user)=>{
      user?'':navigation.navigate('Start Page');
    });
    loadInitial();

    const todoRef = collection(FIRESTORE_DB,'users');


    const subscriber = onSnapshot(todoRef, {
        next: (snapshot) => {
            const users: any[] = [];
            snapshot.docs.forEach(doc=>{
              if(doc.id===FIREBASE_AUTH.currentUser.uid)
              setUserData(doc.data());
            })
        },
    });
  
    return () => subscriber();
  }, [])

  if(loading) return(
  <View style={{height:500, display:'flex', justifyContent:'center', alignItems:'center'}}>
    <ActivityIndicator size={"large"} color="#BC1E2E"/>
  </View>
  )

  return (
    <>
    {rainingConfetti?<ConfettiCannon count={200} origin={{x: -10, y: 0}} autoStart={true}  />:''}
    <ScrollView contentContainerStyle={styles.timerContainer}>
      <Text style={styles.subheading}>Use the timer below to see how quickly you can solve an Unsolved Case File.</Text>
        {thisCase.objectives.map((objective, i)=>
          <ObjectiveTimer navigation={navigation} objective={objective} i={i} addTotalTime={addTotalTime} />
        )}
      <Button style={styles.button} title="Complete Case" onPress={saveTime}/>
      <Text style={styles.subheading}>Your previous times:</Text>
      <View style={{width:'100%'}}>
        {userData.times.slice().reverse().map(time=>(
          <ListItem bottomDivider topDivider containerStyle={styles.historicTime}>
            <View style={styles.historicTime}>
              <Text style={{marginBottom:10}}><Text style={{fontWeight:'500'}}>Time: </Text>{new Date(time.totalTime * 1000).toISOString().slice(11, 19)}</Text>
              <Text><Text style={{fontWeight:'500'}}>Date: </Text>{new Date(time.date.seconds*1000).toLocaleString()}</Text>
            </View>
          </ListItem>
        ))}
      </View>
    </ScrollView>
    </>
  )
}


export default Timer

const styles = StyleSheet.create({
  button:{
    backgroundColor:'#BC1F2D',
    color: '#fff',
    margin: 10,
    width: windowWidth*.6,
    maxWidth: '400px'
  },
  subheading:{
    textAlign:'center',
    color: '#BC1F2D',
    fontSize: 20,
    margin: 10,
    fontWeight: 500
  },
  timerContainer:{
    marginBottom:50,
    textAlign:'center',
    display: 'flex',
    alignItems: 'center',
  },
  historicTime: {
    textAlign:'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
