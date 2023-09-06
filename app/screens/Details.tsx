import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

const Details = () => {

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
      <div id="theForm"></div>
      
    </View>
  )
}

export default Details