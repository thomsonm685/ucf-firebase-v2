import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { Button, Card, Header } from '@rneui/themed';
import ScreenTitle from '../components/ScreenTitle'; 
import ImageSlider from '../components/ImageSlider';
import Announcement from '../components/Announcement';
import { DrawerActions } from '@react-navigation/native';

const Announcements = ({navigation}) => {

  const [announcements, setAnnouncements] = useState([]);
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
      const fetchAnnouncements = await fetch('https://5312e5690e7d.ngrok.app/api/announcements').then(d=>d.json());
      // console.log("🚀 ~ file: Announcements.tsx:17 ~ loadInitial ~ fetchAnnouncements:", fetchAnnouncements);
      setAnnouncements(fetchAnnouncements.data.announcements.filter(c=>c.tag==="announcement")); 
      console.log('fetchAnnouncements.data.announcements.filter(c=>c.tag==="announcement"):', fetchAnnouncements.data.announcements.filter(c=>c.tag==="announcement"));
      // const getSettingsRes = await fetch('https://5312e5690e7d.ngrok.app/api/settings').then(d=>d.json());
      // if(getSettingsRes.data.settings.appErrorAlert.active){
      //     alert(getSettingsRes.data.settings.appErrorAlert.message);
      // }
      setLoading(false);
    }
    catch(e){
      console.log('ERROR in fetchAnnouncements:', e);
    }
  }

  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH, (user)=>{
      console.log("🚀 ~ file: Announcements.tsx:35 ~ onAuthStateChanged ~ user:", user)
      user?'':navigation.navigate('Start Page');
    });
    loadInitial();
  }, [])

  return (
    <View style={{flex:1, overflow:'hidden'}}>
                                    {/* <Button 
        title="Sign Out"
        onPress={()=>FIREBASE_AUTH.signOut()}
        /> */}
        {/* <Button 
        title="HAM B"
        onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
        /> */}
      <ScreenTitle navigation={navigation} title="ANNOUNCEMENTS" navigation={navigation}/>
      <ScrollView  contentContainerStyle={styles.scrollView}>
        {loading?
        <View style={{height:500, display:'flex', justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size={"large"} color="#BC1E2E"/>
        </View>
        :    
        <View>
          {announcements.map(announcement=>(
            <Announcement key={announcement._id} announcement={announcement} />
          ))}
        </View>                       
        }
      </ScrollView>
    </View>
  )
}

export default Announcements;


const styles = StyleSheet.create({
  scrollView:{
    // height:'90%',
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom:50
  },
})