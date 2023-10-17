import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Platform } from 'react-native'
import React, { useEffect, useState, Component } from 'react'
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { WebView } from 'react-native-webview';
// import fs from 'fs';
// import frameStyles from '../../assets/formFrame.css'
import formFrameStyles from '../../assets/formFrameStyles';
import ScreenTitle from '../components/ScreenTitle';

const WhichCase = ({navigation}) => {


  const [loading, setLoading] = useState(false);
  const [formUrl, setFormUrl] = useState(false);

 
  const loadInitial = async () => {
    setLoading(true);
    try{
      const fetchSettingsRes = await fetch('https://5312e5690e7d.ngrok.app/api/settings').then(d=>d.json());
      console.log("🚀 ~ file: WhichCase.tsx:22 ~ loadInitial ~ fetchSettingsRes:", fetchSettingsRes)
      setFormUrl(fetchSettingsRes.data.settings.iframeUrls.whichCase);
      setLoading(false);
    }
    catch(e){
      console.log('ERROR in loadInitial:', e); 
      setLoading(false);
    }
  }

  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH, (user)=>{
      user?'':navigation.navigate('Start Page');
    });
    loadInitial();
  }, [])

  if(loading) return(
  <View style={{height:500, display:'flex', justifyContent:'center', alignItems:'center'}}>
    <ActivityIndicator size={"large"} color="#BC1E2E"/>
  </View>
  )

  console.log('formFrameStyles:', formFrameStyles);

  return (
    <View style={{marginBottom:50, width: '100%', height: '100%'}}>
      <ScreenTitle title="WHICH CASE" navigation={navigation}/>


      {/* {Platform.OS==="web"?
      <iframe src='https://form.jotform.com/193535797748176' frameBorder="0" scrolling="no" style={{width:'100%', height:'100%'}} />:
      <WebView
        scalesPageToFit={true}
        bounces={false}
        javaScriptEnabled
        originWhitelist={['*']}
        source={{ html: `<iframe src='https://form.jotform.com/193535797748176' frameBorder="0" scrolling="no" width="100%" height="100%" />` }}
      />} */}

      {/* eiter src or srcDoc, idk yet */}

      {Platform.OS==="web"?
        // <object data="https://form.jotform.com/193535797748176" width="400" height="300" type="text/html"/>
      <iframe srcDoc={`
      <script type="text/javascript" src="${formUrl}"></script>
      <script>
      var myIframe = document.querySelector('iframe');
      myIframe.style.display='none';
      myIframe.addEventListener("load", function() {
        let newStyles = document.querySelectorAll('iframe')[0].contentDocument.createElement('style');
        newStyles.innerHTML ='${formFrameStyles.replaceAll('\n', '')}';
        document.querySelectorAll('iframe')[0].contentDocument.querySelector('body').appendChild(newStyles);
        myIframe.style.display='block';
      });
      </script>`}
       frameBorder="0" style={{width:'100%', height:'100%'}} />
      :
      <WebView
        scalesPageToFit={true}
        bounces={false} 
        javaScriptEnabled 
        originWhitelist={['*']}
        source={{ html: `
        <script type="text/javascript" src="${formUrl}"></script>
        <script>
        var myIframe = document.querySelector('iframe');
        myIframe.style.display='none';
        myIframe.addEventListener("load", function() {
          let newStyles = document.querySelectorAll('iframe')[0].contentDocument.createElement('style');
          newStyles.innerHTML ='${formFrameStyles.replaceAll('\n', '')}';
          document.querySelectorAll('iframe')[0].contentDocument.querySelector('body').appendChild(newStyles);
          myIframe.style.display='block';
        });
        </script>
        `}}
      />}
{/* frameBorder="0" scrolling="no" width="100%" height="100%" */}

    </View>
  )
}


export default WhichCase;