import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Platform } from 'react-native'
import React, { useEffect, useState, Component } from 'react'
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { WebView } from 'react-native-webview';
// import fs from 'fs';
// import frameStyles from '../../assets/formFrame.css'
import formFrameStyles from '../../assets/formFrameStyles';

const AnswerKey = ({navigation, route}) => {

    console.log("🚀 ~ file: AnswerKey.tsx:11 ~ AnswerKey ~ Platform.OS:", Platform.OS)
  console.log('AHHHHHII')
  const {objective} = route.params;
  console.log("🚀 ~ file: AnswerKey.tsx:12 ~ AnswerKey ~ objective:", objective);
  const [loading, setLoading] = useState(false);
  const [srcDoc, setSrcDoc] = useState(null);


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
      const fetchFormRes = await fetch('https://4a4da62e9f24.ngrok.app/api/forms/'+objective.jotformId).then(d=>d.json());
      console.log("🚀 ~ file: AnswerKey.tsx:29 ~ loadInitial ~ fetchFormRes:", fetchFormRes);
      setSrcDoc(fetchFormRes.data.form.srcDoc);
      setLoading(false);
    }
    catch(e){
      console.log('ERROR in fetchAnnouncements:', e); 
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
      <script type="text/javascript" src="https://form.jotform.com/jsform/193535797748176"></script>
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
        <script type="text/javascript" src="https://form.jotform.com/jsform/193535797748176"></script>
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


export default AnswerKey