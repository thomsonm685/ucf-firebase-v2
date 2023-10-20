import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Alert, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { Button, Card, Header, Image } from '@rneui/themed';
import ScreenTitle from '../components/ScreenTitle'; 
import ImageSlider from '../components/ImageSlider';
import Announcement from '../components/Announcement';
import { DrawerActions } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import { TouchableOpacity } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
console.log('windowWidth:', windowWidth);

const Directory = ({navigation}) => {

  const [blocks, setBlocks] = useState([]);
  const [hero, setHero] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadInitial = async () => {
    setLoading(true);
    try{
      const fetchHomeSettings = await fetch('https://0e35c3726008.ngrok.app/api/directory').then(d=>d.json());
      console.log('fetchHomeSettings:', fetchHomeSettings)
      setBlocks(fetchHomeSettings.data.directory.blocks); 
      setHero(fetchHomeSettings.data.directory.hero); 
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
        <View style={styles.container}>
          <View>
            <Image style={styles.hero} source={{uri:hero.imageUrl}} />
          </View>
          {Object.keys(blocks).map(key=>(
            <TouchableOpacity
              onPress={()=>blocks[key].openIframe?WebBrowser.openBrowserAsync(blocks[key].openIframe, {showTitle:false}):navigation.navigate(blocks[key].navigateTo)} 
            >
              <Image 
                style={styles.blockImage}
                source={{uri:blocks[key].imageUrl}}
              />
            </TouchableOpacity>
          ))}
        </View>                       
        }
      </ScrollView>
    </View>
  )
}

export default Directory;


const styles = StyleSheet.create({
  bannerContainer:{
    height:500, 
    display:'flex', 
    justifyContent:'center', 
    alignItems:'center',
  },
  hero:{
    // flex: 1,
    // objectFit:'contain'
    paddingBottom: 5,
    borderColor: "#BC1E2E",
    // borderWidth: 4,
    // borderRadius: 10,
    // borderStyle: 'solid',
    marginTop: 35,
    width: windowWidth-20,
    height:(windowWidth-20)/4,
  },
  container:{
    // aspectRatio: 1,
    // width: '100%',
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    flexGrow:1
  },
  blockImage:{
    marginTop: 35,
    // flex:1,
    // aspectRatio: 1,
    // marginLeft: 10,
    // marginRight: 10,
    // maxWidth: 1000,
    width: windowWidth-20,
    height:(windowWidth-20)/4,
    // height: 50,
    // height: windowWidth,
    // flex: 1,
    // objectFit:'contain'
  }
})