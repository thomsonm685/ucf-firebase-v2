import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { Button, Card, Header, Image } from '@rneui/themed';
import ScreenTitle from '../components/ScreenTitle'; 
import ImageSlider from '../components/ImageSlider';
import Announcement from '../components/Announcement';
import { DrawerActions } from '@react-navigation/native';

const Announcements = ({navigation}) => {

  const [homeCards, setHomeCards] = useState([]);
  const [hero, setHero] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadInitial = async () => {
    setLoading(true);
    try{
      const fetchHomeSettings = await fetch('https://5312e5690e7d.ngrok.app/api/home-settings').then(d=>d.json());
      console.log('fetchHomeSettings:', fetchHomeSettings)
      setHomeCards(fetchHomeSettings.data.homeSettings.cards); 
      setHero(fetchHomeSettings.data.homeSettings.hero); 
      setLoading(false);
    }
    catch(e){
      console.log('ERROR in fetchHomeSettings:', e);
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
      <ScreenTitle navigation={navigation} title="HOME" navigation={navigation}/>
      <ScrollView  contentContainerStyle={styles.scrollView}>
        {loading?
        <View style={{height:500, display:'flex', justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size={"large"} color="#BC1E2E"/>
        </View>
        :    
        <View>
          <View style={styles.hero}>
            <Image source={{uri:hero.url}} />
          </View>
          {homeCards.map(card=>(
            <Image source={{uri:card.url}} onPress={{navigation.navigate(card.navigateTo)}} />
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
  hero:{

  },
  card:{

  }
})