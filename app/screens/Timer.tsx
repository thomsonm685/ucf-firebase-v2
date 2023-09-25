import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Platform } from 'react-native'
import React, { useEffect, useState, Component } from 'react'
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import WebView from 'react-native-webview';
import { Button, ListItem } from '@rneui/themed';

const Timer = ({navigation, route}) => {

    console.log("🚀 ~ file: AnswerKey.tsx:11 ~ AnswerKey ~ Platform.OS:", Platform.OS)

  const {thisCase} = route.params;
  const [timerRunning, setTimerRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(false);

  // const appendFormTest = async () => {  
  //   const formSourceReq = await fetch('https://api.jotform.com/form/193535797748176/source?apikey=f2499e61ca51b029d77282c75d0fc892').then(d=>d.json());
  //   const formHtmlString = formSourceReq.content;
  //   // const parser = new DOMParser();
  //   // const formHTML = parser.parseFromString(formHtmlString,'text/html');
  //   document.querySelector('#theForm').innerHTML = formHtmlString.replace('\\"', '');
  // }

  const loadInitial = async () => {
    setLoading(true);
    try{
    //   const fetchAnnouncements = await fetch('https://4a4da62e9f24.ngrok.app/api/announcements').then(d=>d.json());

      setLoading(false);
    }
    catch(e){
      console.log('ERROR in fetchAnnouncements:', e);
    }
  }

  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH, (user)=>{
      user?'':navigation.navigate('Start Page');
    });
    loadInitial();
  }, [])

  return (
    <View style={{marginBottom:50}}>
        {thisCase.objectives.map(objective=>
            <ListItem key={objective._id}>
                <Button>Start Objective</Button>
            </ListItem>
        )}
    </View>
  )
}


export default Timer