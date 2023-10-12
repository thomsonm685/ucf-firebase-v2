import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Platform } from 'react-native'
import React, { useEffect, useState, Component } from 'react'
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { WebView } from 'react-native-webview';
// import fs from 'fs';
// import frameStyles from '../../assets/formFrame.css'
import formFrameStyles from '../../assets/formFrameStyles';
import ScreenTitle from '../components/ScreenTitle';

const SaveTens = ({navigation}) => {


  const [loading, setLoading] = useState(false);
  const [formId, setFormId] = useState(false);

 
  const loadInitial = async () => {
    setLoading(true);
    try{
      const fetchSettingsRes = await fetch('https://c44f9f63345e.ngrok.app/api/settings').then(d=>d.json());
      console.log("🚀 ~ file: saveTens.tsx:22 ~ loadInitial ~ fetchSettingsRes:", fetchSettingsRes)
      setFormId(fetchSettingsRes.data.settings.forms.saveTens.formId);
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
      <ScreenTitle title="SHARE & SAVE" navigation={navigation}/>


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
      <script type="text/javascript" src="https://form.jotform.com/jsform/${formId}"></script>
      <script>
      setTimeout(()=>{
        alert('HIII HERE');
        let newStyles = document.querySelectorAll('iframe')[0].contentDocument.createElement('style');
        newStyles.innerHTML ='${formFrameStyles.replaceAll('\n', '')}';
        document.querySelectorAll('iframe')[0].contentDocument.querySelector('body').appendChild(newStyles);
      }, 5000)
      </script>`}
       frameBorder="0" scrolling="no" style={{width:'100%', height:'100%'}} />
      :
      <WebView
        scalesPageToFit={true}
        bounces={false} 
        javaScriptEnabled 
        originWhitelist={['*']}
        source={{ html: `
        <script type="text/javascript" src="https://form.jotform.com/jsform/${formId}"></script>
        <script>
        setTimeout(()=>{
          // alert('HIII HERE');
          let newStyles = document.querySelectorAll('iframe')[0].contentDocument.createElement('style');
          newStyles.innerHTML ='${formFrameStyles.replaceAll('\n', '')}';
          document.querySelectorAll('iframe')[0].contentDocument.querySelector('body').appendChild(newStyles);
        }, 2000)
        </script>
        `}}
        // source={{ html: `<iframe id="theFrame" /><script>document.querySelector("#theFrame").setAttribute('srcDoc',"${encodeURI(srcDoc)}")</script>`}}
        // source={{ html: ` 
        // <object data="https://form.jotform.com/193535797748176" frameBorder="0" scrolling="no" width="100%" height="100%" type="text/html"/>
        // <script></script>
        // `}}
      />}
{/* frameBorder="0" scrolling="no" width="100%" height="100%" */}

    </View>
  )
}


export default SaveTens;