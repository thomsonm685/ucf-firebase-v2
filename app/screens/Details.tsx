import { View, Text, Button } from 'react-native'
import React, { useEffect } from 'react'
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const Details = ({navigation}) => {

  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH, (user)=>{
      user?navigation.navigate('Home'):'';
    })
  }, [])

  const appendFormTest = async () => {
    const formSourceReq = await fetch('https://api.jotform.com/form/193535797748176/source?apikey=f2499e61ca51b029d77282c75d0fc892').then(d=>d.json());
    const formHtmlString = formSourceReq.content;
    // const parser = new DOMParser();
    // const formHTML = parser.parseFromString(formHtmlString,'text/html');
    document.querySelector('#theForm').innerHTML = formHtmlString.replace('\\"', '');
  }
  

  useEffect(()=>{
    // appendFormTest();
  },[]);

  return (
    <View>
      <Text>Details</Text>
      {/* <div id="theForm"></div>
          <Button 
        title="Login Page"
        onPress={()=>navigation.navigate('Login')}
        /> */}
                  <Button 
        title="Sign Out"
        onPress={()=>FIREBASE_AUTH.signOut()}
        />
    </View>
  )
}

export default Details