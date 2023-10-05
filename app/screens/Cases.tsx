import { View, Text, ScrollView, ActivityIndicator, StyleSheet, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { Button, Card } from '@rneui/themed';
import ScreenTitle from '../components/ScreenTitle'; 
import ImageSlider from '../components/ImageSlider';
import Announcement from '../components/Announcement';
import Case from '../components/Case';

const Cases = ({navigation}) => {

  const cardRows = (Dimensions.get('window').width) < 500 ? 2 : 3;


  const [cases, setCases] = useState([]);
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
      const fetchCases = await fetch('https://2bcea1442efb.ngrok.app/api/cases').then(d=>d.json());
      // console.log("🚀 ~ file: Announcements.tsx:17 ~ loadInitial ~ fetchAnnouncements:", fetchAnnouncements);
      setCases(fetchCases.data.cases);
      setLoading(false);
    }
    catch(e){
      console.log('ERROR in fetchCases:', e);
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
      <ScreenTitle title="ANSWER KEYS"/>
      <Text style={styles.subheading}>Choose your case below:</Text>
      <View>
        {loading?
        <View style={{height:500, display:'flex', justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size={"large"} color="#BC1E2E"/>
        </View>
        :    
        <FlatList horizontal={false} numColumns={cardRows}
          data={cases}
          renderItem={(thisCase) => <Case key={thisCase._id} item={thisCase} navigation={navigation} />}
          keyExtractor={item => item._id}
        >
          {/* {cases.map(thisCase=>(
            <Case key={thisCase._id} thisCase={thisCase} navigation={navigation} />
          ))} */}
        </FlatList>                      
        }
      </View>
    </View>
  )
}

export default Cases

const styles = StyleSheet.create({
  subheading:{
    textAlign:'center',
    color: '#BC1F2D',
    fontSize: 15,
    margin: 10,
    fontWeight: 500
  },
})